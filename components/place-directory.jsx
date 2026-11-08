"use client";

import "./place-directory.css";

// Interactive place directory: each place is a card with Call / Website /
// Map / Share actions. The phone number itself is never printed — it only
// exists inside the tel: link — so the guide can be shared freely and
// stays one-tap friendly on mobile. Sharing uses the Web Share API where
// available and falls back to a WhatsApp share link.

function telHref(phone) {
  const digits = String(phone || "").replace(/[^0-9]/g, "");
  if (!digits) return null;
  return digits.startsWith("0") ? `tel:+81${digits.slice(1)}` : `tel:+${digits}`;
}

function anchorId(name) {
  return `place-${String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

function placeShareText(entry) {
  const lines = [entry.name];
  if (entry.address) lines.push(entry.address);
  if (entry.map) lines.push(`Map: ${entry.map}`);
  if (entry.website) lines.push(entry.website);
  lines.push("— via Nihon Diaries Ojima guide");
  return lines.join("\n");
}

async function shareText(title, text, url) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(url ? { title, text, url } : { title, text });
      return;
    } catch {
      // Reader dismissed the share sheet (or sharing failed): fall
      // through to the WhatsApp link rather than doing nothing.
    }
  }
  const waText = url ? `${text}\n${url}` : text;
  window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, "_blank", "noopener");
}

function PlaceCard({ entry }) {
  const tel = telHref(entry.phone);

  return (
    <article className="place-card" id={anchorId(entry.name)}>
      <h4 className="place-name">
        {entry.name}
        {entry.jp ? <span className="place-jp">{entry.jp}</span> : null}
      </h4>
      {entry.note ? <p className="place-note">{entry.note}</p> : null}
      {entry.address ? <p className="place-address">{entry.address}</p> : null}
      {entry.hours ? <p className="place-hours">🕐 {entry.hours}</p> : null}
      <div className="place-actions">
        {tel ? (
          <a className="place-btn place-btn-call" href={tel}>
            📞 Call
          </a>
        ) : null}
        {entry.website ? (
          <a
            className="place-btn"
            href={entry.website}
            target="_blank"
            rel="noreferrer"
          >
            🌐 Website
          </a>
        ) : null}
        {entry.map ? (
          <a className="place-btn" href={entry.map} target="_blank" rel="noreferrer">
            📍 Map
          </a>
        ) : null}
        <button
          type="button"
          className="place-btn place-btn-share"
          onClick={() => shareText(entry.name, placeShareText(entry))}
        >
          🔗 Share
        </button>
      </div>
    </article>
  );
}

export default function PlaceDirectory({ directory }) {
  if (!directory?.sections?.length) return null;

  const shareGuide = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text =
      "Living in Ojima, Tokyo — schools, clinics, post office, banks & everyday essentials, with tap-to-call, maps and websites.";
    shareText(directory.title || "Ojima directory", text, url);
  };

  return (
    <div className="place-directory">
      <div className="directory-head">
        <h2 className="directory-title">{directory.title}</h2>
        <button type="button" className="place-btn place-btn-guide" onClick={shareGuide}>
          🔗 Share this guide
        </button>
      </div>
      <p className="directory-intro">
        Tap <strong>Call</strong> to phone a place straight from your mobile,{" "}
        <strong>Map</strong> for directions, or <strong>Share</strong> to send
        one place to family on WhatsApp.
      </p>
      {directory.sections.map((section) => (
        <section className="directory-section" key={section.title}>
          <h3 className="directory-section-title">{section.title}</h3>
          <div className="directory-grid">
            {section.entries.map((entry) => (
              <PlaceCard key={entry.name} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
