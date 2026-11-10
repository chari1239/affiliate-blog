"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getLearnerName, recordQuizResult } from "@/lib/progress";
import { quizCheer } from "@/lib/cheers";

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

// Interactive reading quiz as a one-word-at-a-time stepper. A slim
// header stays on screen throughout (step label, "Question n of N", a
// progress bar filled by answered questions, and a dot row that jumps
// to any question). Each step shows one kana word, large and centred;
// the reader types the romaji reading and presses Check, which locks
// the word and reveals the reading, meaning and memory hook. From the
// last word, "See my result" leads to the score screen — via a
// skip-check first when earlier words were left unanswered.
//
// External behaviour matches the previous card design: a "start"
// counter event on the first check, a "check" event per checked word,
// and — exactly once per run, when the results screen is reached — a
// "finish" event plus the reader's local record via recordQuizResult
// (lib/progress.js). Retaking the quiz starts a fresh run that records
// again, just like the old Play again.
export default function ReadingQuiz({ quiz, quizSlug }) {
  const [values, setValues] = useState({});
  const [results, setResults] = useState({});
  const [current, setCurrent] = useState(0);
  // "questions" | "confirm-skip" | "results"
  const [phase, setPhase] = useState("questions");
  const [savedToProgress, setSavedToProgress] = useState(false);
  const [finishCheer, setFinishCheer] = useState("");
  const startedRef = useRef(false);
  const finishedRef = useRef(false);
  const inputRef = useRef(null);

  const total = quiz.items.length;
  const score = quiz.items.filter((_, i) => results[i] === "correct").length;
  const answered = Object.keys(results).length;
  const skipped = quiz.items
    .map((_, i) => i)
    .filter((i) => !results[i]);
  const minutes = Math.max(1, Math.round(total / 8));

  const item = quiz.items[current];
  const result = results[current];
  const locked = Boolean(result);
  const isLast = current === total - 1;

  // Keep the typing box focused as the reader steps between words
  // (only while the word on screen is still theirs to answer).
  useEffect(() => {
    if (phase === "questions" && !results[current] && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [current, phase, results]);

  function check(i) {
    const v = (values[i] || "").trim().toLowerCase();
    if (!v || results[i]) return;
    const isCorrect = v === quiz.items[i].reading;
    if (!startedRef.current) {
      startedRef.current = true;
      sendQuizEvent(quizSlug, { type: "start" });
    }
    sendQuizEvent(quizSlug, { type: "check", correct: isCorrect, index: i });
    setResults((r) => ({ ...r, [i]: isCorrect ? "correct" : "wrong" }));
  }

  // The run finishes the moment the results screen is reached — once
  // per run. Unanswered words simply count as not correct.
  function finishRun() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const finalScore = quiz.items.filter(
      (_, i) => results[i] === "correct"
    ).length;
    sendQuizEvent(quizSlug, { type: "finish", score: finalScore });
    // The same finish moment also writes the reader's own local
    // record — this device only, no server involved (lib/progress.js).
    recordQuizResult(quizSlug, finalScore, total);
    setFinishCheer(quizCheer(finalScore, total, getLearnerName()));
    setSavedToProgress(true);
    setPhase("results");
  }

  // Stepping forward from a locked word. The last word leads to the
  // results — unless earlier words were skipped, in which case the
  // reader chooses: go back for them, or take the score as it stands.
  function advance() {
    if (!isLast) {
      setCurrent(current + 1);
      return;
    }
    if (skipped.length > 0) {
      setPhase("confirm-skip");
    } else {
      finishRun();
    }
  }

  // One form, one submit: Enter (or the primary button) checks an
  // open word and steps forward from a locked one.
  function onSubmit(e) {
    e.preventDefault();
    if (phase !== "questions") return;
    if (locked) {
      advance();
    } else {
      check(current);
    }
  }

  function jumpTo(i) {
    setCurrent(i);
    if (phase === "confirm-skip") setPhase("questions");
  }

  function retake() {
    setValues({});
    setResults({});
    setCurrent(0);
    setPhase("questions");
    setSavedToProgress(false);
    setFinishCheer("");
    startedRef.current = false;
    finishedRef.current = false;
  }

  const header = (
    <div className="quiz-stepper-head">
      <div className="quiz-progress-row">
        <span className="quiz-stepper-label">Reading quiz</span>
        <span className="quiz-count">
          {phase === "results"
            ? "Your result"
            : `Question ${current + 1} of ${total}`}
        </span>
      </div>
      <div
        className="quiz-progress"
        role="progressbar"
        aria-valuenow={answered}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Questions answered"
      >
        <div
          className="quiz-progress-fill"
          style={{ width: `${(answered / total) * 100}%` }}
        />
      </div>
      <div className="quiz-dots" aria-label="Jump to a question">
        {quiz.items.map((it, i) => {
          const r = results[i];
          const cls =
            "quiz-dot" +
            (i === current && phase !== "results" ? " quiz-dot-current" : "") +
            (r === "correct"
              ? " quiz-dot-correct"
              : r === "wrong"
                ? " quiz-dot-wrong"
                : "");
          const status =
            r === "correct"
              ? "answered correctly"
              : r === "wrong"
                ? "answered, not quite"
                : "not answered yet";
          return (
            <button
              key={`${it.word}-${i}`}
              type="button"
              className={cls}
              aria-label={`Question ${i + 1}, ${status}`}
              disabled={phase === "results"}
              onClick={() => jumpTo(i)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="quiz">
      <h2 className="quiz-title">{quiz.title}</h2>
      <p className="quiz-intro">{quiz.intro}</p>
      <p className="quiz-meta">
        🎯 {total} words · about {minutes} min · type the romaji reading
      </p>

      {header}

      {phase === "results" ? (
        <div className="quiz-finish">
          <h3 className="quiz-finish-title">Quiz complete!</h3>
          <p className="quiz-finish-score">
            You scored {score} of {total}
          </p>
          {finishCheer ? (
            <p className="quiz-finish-cheer">{finishCheer}</p>
          ) : null}
          {savedToProgress ? (
            <p className="quiz-finish-loop">
              Saved to your progress on this device ·{" "}
              <Link href="/my-progress">See My progress</Link>
            </p>
          ) : null}
          <div className="quiz-finish-actions">
            <button type="button" className="btn" onClick={retake}>
              Retake quiz
            </button>
          </div>
          <details className="quiz-review">
            <summary>See all answers</summary>
            <ul>
              {quiz.items.map((it, i) => {
                const r = results[i];
                return (
                  <li key={`${it.word}-${i}`} className="quiz-review-item">
                    <span className="quiz-review-main">
                      <strong>{it.word}</strong> · {it.reading} · {it.meaning}
                    </span>
                    {r === "correct" ? (
                      <span
                        className="quiz-review-mark quiz-review-mark-correct"
                        aria-label="You read this correctly"
                      >
                        ✓
                      </span>
                    ) : r === "wrong" ? (
                      <span
                        className="quiz-review-mark quiz-review-mark-wrong"
                        aria-label="You did not read this correctly"
                      >
                        ✗
                      </span>
                    ) : (
                      <span className="quiz-review-mark quiz-review-mark-skipped">
                        Not answered
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            {quiz.nextNote ? <p className="quiz-next">{quiz.nextNote}</p> : null}
          </details>
        </div>
      ) : phase === "confirm-skip" ? (
        <div className="quiz-skip">
          <p className="quiz-skip-text">
            You skipped {skipped.length}{" "}
            {skipped.length === 1 ? "word" : "words"} — go back and try
            them, or see your score anyway.
          </p>
          <div className="quiz-finish-actions">
            <button
              type="button"
              className="btn"
              onClick={() => jumpTo(skipped[0])}
            >
              Try the skipped words
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={finishRun}
            >
              See my score anyway
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-step" key={current}>
          <p className="quiz-step-word">{item.word}</p>

          <form className="quiz-form" onSubmit={onSubmit}>
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
              readOnly={locked}
              value={values[current] || ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, [current]: e.target.value }))
              }
            />
            <button type="submit" className="btn quiz-check">
              {locked ? (isLast ? "See my result →" : "Next →") : "Check"}
            </button>
          </form>

          {locked ? (
            <p
              className={
                result === "correct"
                  ? "quiz-feedback quiz-feedback-correct"
                  : "quiz-feedback quiz-feedback-wrong"
              }
              aria-live="polite"
            >
              {result === "correct" ? (
                <>
                  Correct — <strong>{item.reading}</strong>. {item.word}{" "}
                  means “{item.meaning}”.
                </>
              ) : (
                <>
                  Not quite — this is <strong>{item.reading}</strong>. It
                  means “{item.meaning}”.
                </>
              )}
              <span className="quiz-hook">{item.hook}</span>
            </p>
          ) : null}

          {current > 0 ? (
            <div className="quiz-navrow">
              <button
                type="button"
                className="quiz-link"
                onClick={() => setCurrent(current - 1)}
              >
                ← Back
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
