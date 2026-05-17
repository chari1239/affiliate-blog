"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const initialState = {
  name: "",
  email: "",
  message: ""
};

function buildMailtoHref({ name, email, message }) {
  const subject = `Nihon Diaries message from ${name || "a reader"}`;
  const body = [`Name: ${name || "-"}`, `Email: ${email || "-"}`, "", message || ""].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildGmailHref({ name, email, message }) {
  const subject = `Nihon Diaries message from ${name || "a reader"}`;
  const body = [`Name: ${name || "-"}`, `Email: ${email || "-"}`, "", message || ""].join("\n");
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    site.email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [feedback, setFeedback] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const gmailUrl = buildGmailHref(form);
    const mailtoUrl = buildMailtoHref(form);

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setFeedback("Opened Gmail compose. If that does not work, use the email link below.");

    setTimeout(() => {
      if (!document.hidden) {
        window.location.href = mailtoUrl;
      }
    }, 250);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="label">
        Name
        <input
          className="input"
          type="text"
          name="name"
          value={form.name}
          onChange={updateField}
          placeholder="Your name"
          required
        />
      </label>
      <label className="label">
        Email
        <input
          className="input"
          type="email"
          name="email"
          value={form.email}
          onChange={updateField}
          placeholder="you@example.com"
          required
        />
      </label>
      <label className="label">
        Message
        <textarea
          className="textarea"
          name="message"
          value={form.message}
          onChange={updateField}
          placeholder="How can we help?"
          required
        />
      </label>
      <button type="submit" className="btn-secondary">
        Open Gmail compose
      </button>
      {feedback ? <p className="form-note form-note-success">{feedback}</p> : null}
    </form>
  );
}
