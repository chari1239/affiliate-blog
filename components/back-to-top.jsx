"use client";

import { useEffect, useState } from "react";
import "./back-to-top.css";

// Floating "back to top" button for article pages: appears once the
// reader has scrolled a screenful or two (the Ojima guide runs to 127
// place cards), and smooth-scrolls back to the top. Rendered by the
// article page template, so every article gets it.
//
// An article can pass targetId + label to send the button somewhere
// more useful than the page top: the Ojima guide points it at the
// directory's filter bar ("Back to filters") — the one control a
// reader scrolling 127 cards actually wants to get back to.
export default function BackToTop({ targetId, label = "Back to top" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const onClick = () => {
    const target = targetId ? document.getElementById(targetId) : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      className="back-to-top"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
