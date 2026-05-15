"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "warm-shelf-saved-products";

function readSaved() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveProductSlug(slug) {
  const current = readSaved();

  if (current.includes(slug)) {
    return current;
  }

  const next = [...current, slug];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("saved-products-updated"));
  return next;
}

export function removeProductSlug(slug) {
  const next = readSaved().filter((item) => item !== slug);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("saved-products-updated"));
  return next;
}

export function SaveButton({ slug }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => {
      setSaved(readSaved().includes(slug));
    };

    sync();
    window.addEventListener("saved-products-updated", sync);

    return () => {
      window.removeEventListener("saved-products-updated", sync);
    };
  }, [slug]);

  const toggle = () => {
    if (saved) {
      removeProductSlug(slug);
    } else {
      saveProductSlug(slug);
    }
  };

  return (
    <button type="button" onClick={toggle} className="btn-secondary">
      {saved ? "Remove from saved" : "Save for later"}
    </button>
  );
}
