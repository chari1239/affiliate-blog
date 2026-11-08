"use client";

import { useState } from "react";
import "./comments.css";

// Anonymous, approval-based comments for an article. The server passes
// only comments that were approved in the Studio (see
// lib/sanity/fetchers.js getApprovedComments) — this component never
// sees a pending one. Posting goes to /api/comment, which stores the
// comment as unapproved; the reader is told it appears after review.
//
// The form carries a hidden honeypot field named "website" that real
// readers never see or fill; /api/comment silently drops any
// submission where it has a value.

const MAX_NAME = 60;
const MAX_TEXT = 1000;

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

export default function Comments({ slug, comments }) {
  const list = Array.isArray(comments) ? comments : [];
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const submit = async (event) => {
    event.preventDefault();
    const trimmedText = text.trim();
    const trimmedName = name.trim();
    if (!trimmedText || trimmedText.length > MAX_TEXT || trimmedName.length > MAX_NAME) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name: trimmedName, text: trimmedText, website })
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setStatus("error");
        return;
      }
      setName("");
      setText("");
      setWebsite("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="comments">
      <h2 className="comments-title">Comments ({list.length})</h2>

      {list.length ? (
        <div className="comments-list">
          {list.map((comment) => (
            <article className="comment-card" key={comment._id}>
              <p className="comment-meta">
                <span className="comment-name">{comment.name || "Anonymous"}</span>
                {comment.createdAt ? (
                  <span className="comment-date">{formatDate(comment.createdAt)}</span>
                ) : null}
              </p>
              <p className="comment-text">{comment.text}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="comments-empty">No comments yet — be the first to share an update or a tip.</p>
      )}

      <form className="comment-form" onSubmit={submit}>
        <label className="comment-field">
          <span className="comment-label">Name (optional)</span>
          <input
            type="text"
            className="comment-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={MAX_NAME}
            autoComplete="off"
            placeholder="Anonymous is fine too"
          />
        </label>
        <label className="comment-field">
          <span className="comment-label">Your comment</span>
          <textarea
            className="comment-textarea"
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxLength={MAX_TEXT}
            rows={4}
            required
            placeholder="Share an update, a tip, or just say hello…"
          />
        </label>
        {/* Honeypot — hidden from readers, filled only by bots. */}
        <input
          type="text"
          name="website"
          className="hp-field"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <button type="submit" className="comment-submit" disabled={status === "sending"}>
          {status === "sending" ? "Posting…" : "Post comment"}
        </button>
        <p className="comment-note">
          Comments appear after a quick review — no account or email needed.
        </p>
        {status === "sent" ? (
          <p className="comment-status comment-status-ok" role="status">
            Thanks! Your comment is with us and will appear after review.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="comment-status comment-status-error" role="alert">
            Sorry — that didn't go through. Please check your comment and try again.
          </p>
        ) : null}
      </form>
    </div>
  );
}
