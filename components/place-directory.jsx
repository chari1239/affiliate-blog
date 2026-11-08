"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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


// Button icons are inline SVGs drawn in the current text colour, so every
// icon is exactly the same size and sits on the same baseline. The old
// emoji icons (phone, globe, pin, link) rendered at a different size on
// every phone — on Android the phone emoji in particular dwarfed its
// label, which is what made the Call button look mismatched.
function PhoneIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

// The Website button shows the place's own favicon (via Google's favicon
// service) instead of a generic globe emoji; if the stored URL cannot be
// parsed, the caller falls back to the drawn globe icon.
function websiteFavicon(website) {
  try {
    const host = new URL(website).hostname;
    return host ? `https://www.google.com/s2/favicons?domain=${host}&sz=32` : null;
  } catch {
    return null;
  }
}

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
// Restaurants and grocery stores get their trade words too — note that
// "grocery" is not a substring of the section title "Groceries", so the
// keyword is what makes that search land. Specialties and diets written
// in a note (e.g. "orthopedics", "pure veg") are included via the note
// itself, so they match as substrings.
function entrySearchText(sectionTitle, entry) {
  const base = [sectionTitle, entry.name, entry.jp, entry.note, entry.address]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  let keywords = "";
  if (sectionTitle === "Dentists") {
    keywords += " dental teeth";
  }
  if (sectionTitle === "Restaurants") {
    keywords += " restaurant food indian vegetarian curry";
  }
  if (sectionTitle === "Groceries & Indian stores") {
    keywords += " grocery store indian spices food shopping";
  }
  if (sectionTitle === "Schools & nursery") {
    keywords += " school kids children";
    if (base.includes("kindergarten")) {
      keywords += " kindergarten kindergarden kindery";
    }
  }
  return base + keywords;
}

function PlaceCard({ entry, onSuggest }) {
  const tel = telHref(entry.phone);

  return (
    <article className="place-card" id={anchorId(entry.name)}>
      <h4 className="place-name">
        {entry.name}
        {entry.jp ? <span className="place-jp">{entry.jp}</span> : null}
      </h4>
      {entry.note ? <p className="place-note">{entry.note}</p> : null}
      {entry.address ? <p className="place-address">{entry.address}</p> : null}
      {entry.hours ? (
        <p className="place-hours">
          <ClockIcon /> {entry.hours}
        </p>
      ) : null}
      <div className="place-actions">
        {tel ? (
          <a className="place-btn place-btn-call" href={tel}>
            <PhoneIcon /> Call
          </a>
        ) : null}
        {entry.website ? (
          <a
            className="place-btn"
            href={entry.website}
            target="_blank"
            rel="noreferrer"
          >
            {websiteFavicon(entry.website) ? (
              <img
                className="btn-favicon"
                src={websiteFavicon(entry.website)}
                alt=""
                width="16"
                height="16"
                loading="lazy"
              />
            ) : (
              <GlobeIcon />
            )}{" "}
            Website
          </a>
        ) : null}
        {entry.map ? (
          <a className="place-btn" href={entry.map} target="_blank" rel="noreferrer">
            <PinIcon /> Map
          </a>
        ) : null}
        <button
          type="button"
          className="place-btn place-btn-share"
          onClick={() => shareText(entry.name, placeShareText(entry))}
        >
          <ShareIcon /> Share
        </button>
        {onSuggest ? (
          <button
            type="button"
            className="place-btn-fix"
            onClick={() => onSuggest(entry.name)}
          >
            <PencilIcon /> Suggest a fix
          </button>
        ) : null}
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

export default function PlaceDirectory({ directory, articleSlug }) {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");

  // Suggest-an-update: an inline form (top of the directory) that posts
  // to /api/suggestion. Suggestions are private — they land in the
  // Studio as a to-do list, never on the page. A card's "Suggest a fix"
  // opens this same form with the place name pre-filled.
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [suggestPlace, setSuggestPlace] = useState("");
  const [suggestName, setSuggestName] = useState("");
  const [suggestMessage, setSuggestMessage] = useState("");
  const [suggestWebsite, setSuggestWebsite] = useState("");
  const [suggestStatus, setSuggestStatus] = useState("idle"); // idle | sending | sent | error
  const suggestFormRef = useRef(null);
  const scrollToSuggestRef = useRef(false);

  useEffect(() => {
    if (suggestOpen && scrollToSuggestRef.current && suggestFormRef.current) {
      scrollToSuggestRef.current = false;
      suggestFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [suggestOpen]);

  const openSuggestForPlace = (placeName) => {
    setSuggestPlace(placeName || "");
    setSuggestStatus("idle");
    scrollToSuggestRef.current = true;
    setSuggestOpen(true);
  };

  const submitSuggestion = async (event) => {
    event.preventDefault();
    const placeName = suggestPlace.trim();
    const message = suggestMessage.trim();
    const name = suggestName.trim();
    if (!placeName || placeName.length > 120 || !message || message.length > 1000 || name.length > 60) {
      setSuggestStatus("error");
      return;
    }
    setSuggestStatus("sending");
    try {
      const res = await fetch("/api/suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: articleSlug,
          placeName,
          name,
          message,
          website: suggestWebsite
        })
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setSuggestStatus("error");
        return;
      }
      setSuggestPlace("");
      setSuggestName("");
      setSuggestMessage("");
      setSuggestWebsite("");
      setSuggestStatus("sent");
    } catch {
      setSuggestStatus("error");
    }
  };

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
        <div className="directory-head-actions">
          <button type="button" className="place-btn place-btn-guide" onClick={shareGuide}>
            <ShareIcon /> Share this guide
          </button>
          {articleSlug ? (
            <button
              type="button"
              className="place-btn"
              onClick={() => setSuggestOpen((open) => !open)}
              aria-expanded={suggestOpen}
            >
              <PencilIcon /> Suggest an update
            </button>
          ) : null}
        </div>
      </div>
      <p className="directory-intro">
        Tap <strong>Call</strong> to phone a place straight from your mobile,{" "}
        <strong>Map</strong> for directions, or <strong>Share</strong> to send
        one place to family on WhatsApp.
      </p>

      {articleSlug && suggestOpen ? (
        <form className="suggest-form" onSubmit={submitSuggestion} ref={suggestFormRef}>
          <label className="suggest-field">
            <span className="suggest-label">Place name</span>
            <input
              type="text"
              className="suggest-input"
              value={suggestPlace}
              onChange={(event) => setSuggestPlace(event.target.value)}
              maxLength={120}
              required
              placeholder="Which place is this about?"
            />
          </label>
          <label className="suggest-field">
            <span className="suggest-label">What should change?</span>
            <textarea
              className="suggest-textarea"
              value={suggestMessage}
              onChange={(event) => setSuggestMessage(event.target.value)}
              maxLength={1000}
              rows={3}
              required
              placeholder="A place moved, closed, changed its hours — or one we should add…"
            />
          </label>
          <label className="suggest-field">
            <span className="suggest-label">Name (optional)</span>
            <input
              type="text"
              className="suggest-input"
              value={suggestName}
              onChange={(event) => setSuggestName(event.target.value)}
              maxLength={60}
              autoComplete="off"
            />
          </label>
          {/* Honeypot — hidden from readers, filled only by bots. */}
          <input
            type="text"
            name="website"
            className="hp-field"
            value={suggestWebsite}
            onChange={(event) => setSuggestWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <button
            type="submit"
            className="place-btn place-btn-call"
            disabled={suggestStatus === "sending"}
          >
            {suggestStatus === "sending" ? "Sending…" : "Send suggestion"}
          </button>
          <p className="suggest-note">
            Suggestions go to the site owner — they're not posted publicly.
          </p>
          {suggestStatus === "sent" ? (
            <p className="suggest-status suggest-status-ok" role="status">
              Thanks! We'll check and update the guide.
            </p>
          ) : null}
          {suggestStatus === "error" ? (
            <p className="suggest-status suggest-status-error" role="alert">
              Sorry — that didn't go through. Please check the form and try again.
            </p>
          ) : null}
        </form>
      ) : null}

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
                <PlaceCard
                  key={entry.name}
                  entry={entry}
                  onSuggest={articleSlug ? openSuggestForPlace : null}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
