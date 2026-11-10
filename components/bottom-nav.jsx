"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./bottom-nav.css";

// Tab icons, drawn in the same stroke style as the notify bell.
function HomeIcon() {
  return (
    <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ArticlesIcon() {
  return (
    <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function LearnIcon() {
  return (
    <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ProgressIcon() {
  return (
    <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

const TABS = [
  {
    href: "/",
    label: "Home",
    Icon: HomeIcon,
    isActive: (pathname) => pathname === "/"
  },
  {
    href: "/articles",
    label: "Articles",
    Icon: ArticlesIcon,
    isActive: (pathname) =>
      pathname === "/articles" || pathname.startsWith("/articles/")
  },
  {
    href: "/learn-japanese",
    label: "Learn",
    Icon: LearnIcon,
    isActive: (pathname) =>
      pathname === "/learn-japanese" ||
      pathname.startsWith("/learn-japanese/")
  },
  {
    // /quiz redirects to the newest quiz article, so this tab is a
    // shortcut, never a resting place — it never stays highlighted.
    href: "/quiz",
    label: "Quiz",
    Icon: QuizIcon,
    isActive: () => false
  },
  {
    href: "/my-progress",
    label: "Progress",
    Icon: ProgressIcon,
    isActive: (pathname) =>
      pathname === "/my-progress" || pathname.startsWith("/my-progress/")
  }
];

// App-style bottom tab bar, mounted in the root layout. Mobile only
// (the CSS hides it from 768px up, where the header nav serves) and
// never shown in the Sanity Studio, which keeps its own chrome.
export default function BottomNav() {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const current = pathname || "/";

  return (
    <nav className="bottom-nav" aria-label="App">
      <ul className="bottom-nav-list">
        {TABS.map(({ href, label, Icon, isActive }) => {
          const active = isActive(current);
          return (
            <li key={href} className="bottom-nav-item">
              <Link
                href={href}
                className={
                  active ? "bottom-nav-link is-active" : "bottom-nav-link"
                }
                aria-current={active ? "page" : undefined}
              >
                <Icon />
                <span className="bottom-nav-label">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
