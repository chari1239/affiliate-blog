"use client";

import { useEffect, useRef, useState } from "react";

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

// Interactive reading quiz, one word at a time: the reader types the
// romaji reading for the kana word on the card and checks it. Meanings
// and memory hooks stay hidden until the reader answers correctly, asks
// for the answer, or opens the full answers panel at the end. A hint
// (the meaning plus the first letter) is available on every card so
// nobody gets stuck on word one. Finishing swaps the cards for a score
// screen that invites the reader to share their score back in the
// reel's comments.
export default function ReadingQuiz({ quiz, quizSlug }) {
  const [values, setValues] = useState({});
  const [states, setStates] = useState({});
  const [hints, setHints] = useState({});
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [copied, setCopied] = useState(false);
  const startedRef = useRef(false);
  const finishedRef = useRef(false);
  const inputRef = useRef(null);

  const total = quiz.items.length;
  const score = quiz.items.filter((_, i) => states[i] === "correct").length;
  const resolved = quiz.items.filter(
    (_, i) => states[i] === "correct" || states[i] === "revealed"
  ).length;
  const minutes = Math.max(1, Math.round(total / 8));

  const item = quiz.items[current];
  const st = states[current];
  const done = st === "correct" || st === "revealed";

  // Keep the typing box focused as the reader moves between cards.
  useEffect(() => {
    if (!showFinish && !done && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [current, showFinish, done]);

  // A quiz counts as finished once every word is resolved — answered
  // correctly or revealed. Fires at most once per page view (Play again
  // resets the refs, so a genuine replay counts as a fresh run).
  function maybeFinish(nextStates) {
    if (finishedRef.current) return;
    const allResolved = quiz.items.every(
      (_, i) => nextStates[i] === "correct" || nextStates[i] === "revealed"
    );
    if (!allResolved) return;
    finishedRef.current = true;
    const finalScore = quiz.items.filter(
      (_, i) => nextStates[i] === "correct"
    ).length;
    sendQuizEvent(quizSlug, { type: "finish", score: finalScore });
    setShowFinish(true);
  }

  function check(i) {
    const v = (values[i] || "").trim().toLowerCase();
    if (!v) return;
    const isCorrect = v === quiz.items[i].reading;
    if (!startedRef.current) {
      startedRef.current = true;
      sendQuizEvent(quizSlug, { type: "start" });
    }
    sendQuizEvent(quizSlug, { type: "check", correct: isCorrect, index: i });
    const nextStates = { ...states, [i]: isCorrect ? "correct" : "wrong" };
    setStates(nextStates);
    maybeFinish(nextStates);
  }

  function reveal(i) {
    const nextStates = { ...states, [i]: "revealed" };
    setStates(nextStates);
    maybeFinish(nextStates);
  }

  function useHint(i) {
    if (hints[i]) return;
    setHints((h) => ({ ...h, [i]: true }));
    sendQuizEvent(quizSlug, { type: "hint", index: i });
  }

  // Next = the next word that still needs an answer, wrapping around to
  // the first unresolved one; stays put when everything is resolved.
  function goNext() {
    for (let step = 1; step <= total; step += 1) {
      const idx = (current + step) % total;
      if (states[idx] !== "correct" && states[idx] !== "revealed") {
        setCurrent(idx);
        return;
      }
    }
  }

  function playAgain() {
    setValues({});
    setStates({});
    setHints({});
    setCurrent(0);
    setShowAll(false);
    setShowFinish(false);
    setCopied(false);
    startedRef.current = false;
    finishedRef.current = false;
  }

  function copyScore() {
    const text = `I scored ${score}/${total} on the Nihon Diaries reading quiz 🇯🇵 Try it: ${window.location.origin}/articles/${quizSlug}#quiz`;
    const doneCopy = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(doneCopy).catch(doneCopy);
    } else {
      doneCopy();
    }
  }

  const bandMessage =
    score === total
      ? "Flawless — you read every single word! 🎉"
      : score >= Math.ceil(total * 0.7)
        ? "Great reading — most of those were first-try correct."
        : score >= Math.ceil(total * 0.4)
          ? "Good start — the letters are starting to stick."
          : "Every attempt makes the letters stick — one more run?";

  const answersPanel = showAll ? (
    <div className="quiz-answers">
      <h3>Answers &amp; explanations</h3>
      <ul>
        {quiz.items.map((it) => (
          <li key={it.word}>
            <strong>
              {it.word} ({it.reading}) = {it.meaning}
            </strong>
            <span className="quiz-hook">{it.hook}</span>
          </li>
        ))}
      </ul>
      {quiz.nextNote ? <p className="quiz-next">{quiz.nextNote}</p> : null}
    </div>
  ) : null;

  return (
    <div className="quiz">
      <h2 className="quiz-title">{quiz.title}</h2>
      <p className="quiz-intro">{quiz.intro}</p>
      <p className="quiz-meta">
        🎯 {total} words · about {minutes} min · type the romaji reading
      </p>

      {showFinish ? (
        <div className="quiz-finish">
          <p className="quiz-finish-emoji">🎉</p>
          <h3 className="quiz-finish-title">Quiz complete!</h3>
          <p className="quiz-finish-score">
            {score} / {total}
          </p>
          <p className="quiz-finish-band">{bandMessage}</p>
          <div className="quiz-finish-actions">
            <button type="button" className="btn" onClick={copyScore}>
              {copied ? "Copied ✓" : "📋 Copy my score"}
            </button>
            <button type="button" className="btn-secondary" onClick={playAgain}>
              ↻ Play again
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowAll((s) => !s)}
            >
              {showAll ? "Hide the answers" : "Review all answers"}
            </button>
          </div>
          <p className="quiz-finish-loop">
            💬 Paste your score in the comments on today&apos;s reel — we
            read every one!
          </p>
          <button
            type="button"
            className="quiz-link"
            onClick={() => setShowFinish(false)}
          >
            Look at the words again
          </button>
          {answersPanel}
        </div>
      ) : (
        <>
          <div className="quiz-progress-row">
            <span className="quiz-count">
              Word {current + 1} of {total}
            </span>
            <span className="quiz-score-chip">Score: {score}</span>
          </div>
          <div
            className="quiz-progress"
            role="progressbar"
            aria-valuenow={resolved}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label="Words completed"
          >
            <div
              className="quiz-progress-fill"
              style={{ width: `${(resolved / total) * 100}%` }}
            />
          </div>

          <div className="quiz-dots" aria-label="Jump to a word">
            {quiz.items.map((it, i) => {
              const s = states[i];
              const cls =
                "quiz-dot" +
                (i === current ? " quiz-dot-current" : "") +
                (s === "correct"
                  ? " quiz-dot-correct"
                  : s === "revealed"
                    ? " quiz-dot-revealed"
                    : "");
              return (
                <button
                  key={it.word}
                  type="button"
                  className={cls}
                  aria-label={`Word ${i + 1}${s ? ` (${s})` : ""}`}
                  onClick={() => setCurrent(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className={`quiz-card quiz-card-${st || "idle"}`}>
            <div className="quiz-word-row">
              <span className="quiz-word">{item.word}</span>
              <span className="quiz-count">
                {current + 1} / {total}
              </span>
            </div>

            {!done ? (
              <>
                <div className="quiz-form">
                  <input
                    ref={inputRef}
                    className="quiz-input"
                    type="text"
                    inputMode="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="Type the romaji…"
                    aria-label={`Romaji reading for ${item.word}`}
                    value={values[current] || ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [current]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") check(current);
                    }}
                  />
                  <button
                    type="button"
                    className="btn quiz-check"
                    onClick={() => check(current)}
                  >
                    Check
                  </button>
                </div>
                {st === "wrong" ? (
                  <p className="quiz-feedback quiz-feedback-wrong">
                    Not quite — try again.{" "}
                    <button
                      type="button"
                      className="quiz-link"
                      onClick={() => reveal(current)}
                    >
                      Show the answer
                    </button>
                  </p>
                ) : null}
                {hints[current] ? (
                  <p className="quiz-hint">
                    💡 Means “{item.meaning}” · starts with “
                    {item.reading.charAt(0)}”
                  </p>
                ) : (
                  <p className="quiz-hint-row">
                    <button
                      type="button"
                      className="quiz-link"
                      onClick={() => useHint(current)}
                    >
                      💡 Need a hint?
                    </button>
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="quiz-feedback quiz-feedback-right">
                  {st === "correct" ? "✓ Correct! " : "Answer: "}
                  <strong>
                    {item.word} ({item.reading}) = {item.meaning}
                  </strong>
                  <span className="quiz-hook">{item.hook}</span>
                </p>
                <div className="quiz-navrow">
                  {current > 0 ? (
                    <button
                      type="button"
                      className="quiz-link"
                      onClick={() => setCurrent(current - 1)}
                    >
                      ← Previous word
                    </button>
                  ) : (
                    <span />
                  )}
                  {resolved < total ? (
                    <button type="button" className="btn" onClick={goNext}>
                      Next word →
                    </button>
                  ) : null}
                </div>
              </>
            )}
          </div>

          <div className="quiz-footer">
            <p className="quiz-score">
              Score: {score} / {total} · {resolved} of {total} words done
            </p>
            <button
              type="button"
              className="btn-secondary quiz-reveal-all"
              onClick={() => setShowAll((s) => !s)}
            >
              {showAll
                ? "Hide the answers"
                : "I'm done — show all answers & explanations"}
            </button>
          </div>

          {answersPanel}
        </>
      )}
    </div>
  );
}
