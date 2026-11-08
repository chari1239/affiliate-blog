"use client";

import { useMemo, useState } from "react";
import "./place-directory.css";

// Interactive place directory: each place is a card with Call / Website /
// Map / Share actions. The phone number itself is never printed — it only
// exists inside the tel: link — so the guide can be shared freely and
// stays one-tap friendly on mobile. Sharing uses the Web Share API where
// available and falls back to a WhatsApp share link.
//
// A search box + category chips at the top filter the cards live. The
// search text for an entry is built only from its section, name, Japanese
// name, note and address (plus a few type keywords) — never the phone.
//
// Within the schools section, a second, quieter chip row filters by school
// level (the "level" field in the data): nursery / kindergarten /
// elementary / junior-high / international. While a level is active only
// schools of that level are shown; the search text still applies on top.

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

// Lower-cased text an entry can be found by. Type keywords make common
// searches land even when the exact word is not in the entry: dentists
// also answer to "dental"/"teeth", schools to "kids"/"children", and
// kindergartens to the common misspellings "kindergarden"/"kindery".
// Specialties written in a note (e.g. "orthopedics") are included via the
// note itself, so "orthopedic" matches as a substring.
function entrySearchText(sectionTitle, entry) {
  const base = [sectionTitle, entry.name, entry.jp, entry.note, entry.address]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  let keywords = "";
  if (sectionTitle === "Dentists") {
    keywords += " dental teeth";
  }
  if (sectionTitle === "Schools & nursery") {
    keywords += " school kids children";
    if (base.includes("kindergarten")) {
      keywords += " kindergarten kindergarden kindery";
    }
  }
  return base + keywords;
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

const SCHOOLS_SECTION = "Schools & nursery";

const SCHOOL_LEVELS = [
  { value: "All", label: "All levels" },
  { value: "nursery", label: "Nursery" },
  { value: "kindergarten", label: "Kindergarten" },
  { value: "elementary", label: "Elementary" },
  { value: "junior-high", label: "Junior high" },
  { value: "international", label: "International" },
];

export default function PlaceDirectory({ directory }) {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");

  const sections = useMemo(() => directory?.sections || [], [directory]);

  const visible = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    const levelActive = activeLevel !== "All";
    return sections
      .filter((section) => activeSection === "All" || section.title === activeSection)
      .filter((section) => !levelActive || section.title === SCHOOLS_SECTION)
      .map((section) => ({
        ...section,
        entries: section.entries.filter((entry) => {
          if (levelActive && entry.level !== activeLevel) return false;
          if (!tokens.length) return true;
          const text = entrySearchText(section.title, entry);
          return tokens.every((token) => text.includes(token));
        }),
      }))
      .filter((section) => section.entries.length > 0);
  }, [sections, query, activeSection, activeLevel]);

  if (!directory?.sections?.length) return null;

  const totalShown = visible.reduce((sum, section) => sum + section.entries.length, 0);
  const isFiltering =
    query.trim() !== "" || activeSection !== "All" || activeLevel !== "All";

  const clearFilters = () => {
    setQuery("");
    setActiveSection("All");
    setActiveLevel("All");
  };

  const pickSection = (title) => {
    setActiveSection(title);
    // The level row only exists for All / Schools & nursery; leaving it
    // active under another category would hide everything, so reset it.
    if (title !== "All" && title !== SCHOOLS_SECTION) setActiveLevel("All");
  };

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

      <div className="directory-filters">
        <input
          type="search"
          className="directory-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search places — try 'dentist', 'orthopedic', 'kindergarten'…"
          aria-label="Search places"
        />
        <div className="directory-chips" role="group" aria-label="Filter by category">
          {["All", ...sections.map((section) => section.title)].map((title) => (
            <button
              key={title}
              type="button"
              className={
                title === activeSection ? "filter-chip filter-chip-active" : "filter-chip"
              }
              onClick={() => pickSection(title)}
              aria-pressed={title === activeSection}
            >
              {title}
            </button>
          ))}
        </div>
        {activeSection === "All" || activeSection === SCHOOLS_SECTION ? (
          <div
            className="directory-chips directory-chips-levels"
            role="group"
            aria-label="Filter schools by level"
          >
            {SCHOOL_LEVELS.map((level) => (
              <button
                key={level.value}
                type="button"
                className={
                  level.value === activeLevel
                    ? "filter-chip filter-chip-level filter-chip-level-active"
                    : "filter-chip filter-chip-level"
                }
                onClick={() => setActiveLevel(level.value)}
                aria-pressed={level.value === activeLevel}
              >
                {level.label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="directory-filter-meta">
          <span className="directory-count" aria-live="polite">
            {totalShown} {totalShown === 1 ? "place" : "places"}
          </span>
          {isFiltering ? (
            <button type="button" className="filter-clear" onClick={clearFilters}>
              Clear ✕
            </button>
          ) : null}
        </div>
      </div>

      {totalShown === 0 ? (
        <p className="directory-empty">No places match — try another word.</p>
      ) : (
        visible.map((section) => (
          <section className="directory-section" key={section.title}>
            <h3 className="directory-section-title">{section.title}</h3>
            <div className="directory-grid">
              {section.entries.map((entry) => (
                <PlaceCard key={entry.name} entry={entry} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
