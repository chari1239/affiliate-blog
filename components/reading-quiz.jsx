"use client";

import { useRef, useState } from "react";

// Fire-and-forget anonymous counting (per quiz, keyed by article slug).
// The /api/quiz-event route turns these into counters; failures are
// swallowed so counting can never disturb the reader.
function sendQuizEvent(slug, payload) {
  if (!slug) return;
  try {
    fetch("/api/quiz-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, ...payload }),
      keepalive: true
    }).catch(() => {});
  } catch {}
}

// Interactive reading quiz: the reader types the romaji reading for each
// kana word and checks it. Meanings and memory hooks stay hidden until the
// reader answers correctly, asks for the answer on a card, or opens the
// full answers panel at the end.
export default function ReadingQuiz({ quiz, quizSlug }) {
  const [values, setValues] = useState({});
  const [states, setStates] = useState({});
  const [showAll, setShowAll] = useState(false);
  const startedRef = useRef(false);
  const finishedRef = useRef(false);

  const total = quiz.items.length;
  const score = quiz.items.filter((_, i) => states[i] === "correct").length;
  const attempted = quiz.items.filter((_, i) => states[i]).length;

  // A quiz counts as finished once every word is resolved — answered
  // correctly or revealed. Fires at most once per page view.
  function maybeFinish(nextStates) {
    if (finishedRef.current) return;
    const resolved = quiz.items.every(
      (_, i) => nextStates[i] === "correct" || nextStates[i] === "revealed"
    );
    if (!resolved) return;
    finishedRef.current = true;
    const finalScore = quiz.items.filter(
      (_, i) => nextStates[i] === "correct"
    ).length;
    sendQuizEvent(quizSlug, { type: "finish", score: finalScore });
  }

  function check(i) {
    const v = (values[i] || "").trim().toLowerCase();
    if (!v) return;
    const isCorrect = v === quiz.items[i].reading;
    if (!startedRef.current) {
      startedRef.current = true;
      sendQuizEvent(quizSlug, { type: "start" });
    }
    sendQuizEvent(quizSlug, { type: "check", correct: isCorrect });
    const nextStates = { ...states, [i]: isCorrect ? "correct" : "wrong" };
    setStates(nextStates);
    maybeFinish(nextStates);
  }

  function reveal(i) {
    const nextStates = { ...states, [i]: "revealed" };
    setStates(nextStates);
    maybeFinish(nextStates);
  }

  return (
    <div className="quiz">
      <h2 className="quiz-title">{quiz.title}</h2>
      <p className="quiz-intro">{quiz.intro}</p>

      <div className="quiz-cards">
        {quiz.items.map((item, i) => {
          const st = states[i];
          const done = st === "correct" || st === "revealed";
          return (
            <div key={item.word} className={`quiz-card quiz-card-${st || "idle"}`}>
              <div className="quiz-word-row">
                <span className="quiz-word">{item.word}</span>
                <span className="quiz-count">
                  {i + 1} / {total}
                </span>
              </div>

              {!done ? (
                <>
                  <div className="quiz-form">
                    <input
                      className="quiz-input"
                      type="text"
                      inputMode="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck="false"
                      placeholder="Type the romaji…"
                      aria-label={`Romaji reading for ${item.word}`}
                      value={values[i] || ""}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [i]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") check(i);
                      }}
                    />
                    <button type="button" className="btn quiz-check" onClick={() => check(i)}>
                      Check
                    </button>
                  </div>
                  {st === "wrong" ? (
                    <p className="quiz-feedback quiz-feedback-wrong">
                      Not quite — try again.{" "}
                      <button type="button" className="quiz-link" onClick={() => reveal(i)}>
                        Show the answer
                      </button>
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="quiz-feedback quiz-feedback-right">
                  {st === "correct" ? "✓ Correct! " : "Answer: "}
                  <strong>
                    {item.word} ({item.reading}) = {item.meaning}
                  </strong>
                  <span className="quiz-hook">{item.hook}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="quiz-footer">
        <p className="quiz-score">
          Score: {score} / {total}
          {attempted === total && !showAll
            ? " — you've tried them all. Open the answers to review!"
            : ""}
        </p>
        <button
          type="button"
          className="btn-secondary quiz-reveal-all"
          onClick={() => setShowAll((s) => !s)}
        >
          {showAll ? "Hide the answers" : "I'm done — show all answers & explanations"}
        </button>
      </div>

      {showAll ? (
        <div className="quiz-answers">
          <h3>Answers & explanations</h3>
          <ul>
            {quiz.items.map((item) => (
              <li key={item.word}>
                <strong>
                  {item.word} ({item.reading}) = {item.meaning}
                </strong>
                <span className="quiz-hook">{item.hook}</span>
              </li>
            ))}
          </ul>
          {quiz.nextNote ? <p className="quiz-next">{quiz.nextNote}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
