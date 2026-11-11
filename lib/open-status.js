// Open-now status for directory places.
//
// A place's data may carry a structured "hoursSpec" next to its
// free-text "hours":
//
//   hoursSpec: {
//     days: { mon: [["09:00", "12:15"], ["14:00", "17:45"]], ... },
//     closedOnHolidays: true,              // optional
//     holiday: [["08:30", "12:30"], ...],  // optional — replaces the
//                                          // weekday entry on a
//                                          // Japanese national holiday
//   }
//   — or, for a genuinely round-the-clock service:
//   hoursSpec: { always: true }
//
// A spec is only ever added when the entry's own hours text pins the
// weekly pattern down exactly (explicit day sets, "Daily", a stated
// closed day, split shifts). Vague, seasonal, appointment-only or
// conflicting hours get NO spec and therefore no badge — a missing
// badge is better than a wrong one.
//
// Everything is computed against Asia/Tokyo wall-clock time, wherever
// the reader is: the guides cover Tokyo places, so "open now" must
// mean "open now in Tokyo". Japanese national holidays are computed
// from the statutory rules (fixed days, Happy Mondays, the equinox
// formulas, substitute holidays and citizen's holidays), because many
// entries close on them.

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DAY_LABELS = {
  sun: "Sun",
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
};

function toMinutes(hhmm) {
  const [h, m] = String(hhmm).split(":").map(Number);
  return h * 60 + m;
}

// "09:00" → "9:00" for display, matching the guides' own style.
function fmtTime(hhmm) {
  const [h, m] = String(hhmm).split(":");
  return `${Number(h)}:${m}`;
}

// --- Japanese national holidays -------------------------------------

function nthWeekdayOfMonth(year, month, weekday, n) {
  // month is 1-based; weekday 0 = Sunday … 1 = Monday …
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const offset = (weekday - first + 7) % 7;
  return 1 + offset + (n - 1) * 7;
}

function dateKey(year, month, day) {
  return `${year}-${month}-${day}`;
}

const holidayCache = new Map();

// The set of "Y-M-D" national-holiday dates for one year, including
// substitute holidays (a holiday on a Sunday moves to the next day
// that is not already a holiday) and citizen's holidays (a weekday
// sandwiched between two holidays). Valid for modern rules
// (Emperor's birthday on Feb 23, i.e. 2020 onwards).
export function japaneseHolidays(year) {
  if (holidayCache.has(year)) return holidayCache.get(year);
  const set = new Set();
  const add = (month, day) => set.add(dateKey(year, month, day));

  // Fixed days.
  add(1, 1); // New Year's Day
  add(2, 11); // Foundation Day
  add(2, 23); // Emperor's Birthday
  add(4, 29); // Showa Day
  add(5, 3); // Constitution Memorial Day
  add(5, 4); // Greenery Day
  add(5, 5); // Children's Day
  add(8, 11); // Mountain Day
  add(11, 3); // Culture Day
  add(11, 23); // Labour Thanksgiving Day
  // Happy Mondays.
  add(1, nthWeekdayOfMonth(year, 1, 1, 2)); // Coming of Age Day
  add(7, nthWeekdayOfMonth(year, 7, 1, 3)); // Marine Day
  add(9, nthWeekdayOfMonth(year, 9, 1, 3)); // Respect for the Aged Day
  add(10, nthWeekdayOfMonth(year, 10, 1, 2)); // Sports Day
  // Equinox days (official formulas, valid 1980–2099).
  add(3, Math.floor(20.8431 + 0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4));
  add(9, Math.floor(23.2488 + 0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4));

  const dayMs = 24 * 60 * 60 * 1000;
  const toDate = (key) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  };
  const keyOf = (date) =>
    dateKey(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());

  // Substitute holidays: a holiday on a Sunday pushes a holiday to
  // the next day that is not already one.
  for (const key of [...set]) {
    const date = toDate(key);
    if (date.getUTCFullYear() !== year) continue;
    if (date.getUTCDay() === 0) {
      let next = new Date(date.getTime() + dayMs);
      while (set.has(keyOf(next))) next = new Date(next.getTime() + dayMs);
      set.add(keyOf(next));
    }
  }
  // Citizen's holidays: a weekday (Mon–Fri) whose previous and next
  // days are both holidays becomes a holiday itself.
  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    for (let day = 2; day < daysInMonth; day++) {
      const date = new Date(Date.UTC(year, month - 1, day));
      const dow = date.getUTCDay();
      if (dow === 0 || dow === 6) continue;
      const key = dateKey(year, month, day);
      if (set.has(key)) continue;
      const prev = keyOf(new Date(date.getTime() - dayMs));
      const next = keyOf(new Date(date.getTime() + dayMs));
      if (set.has(prev) && set.has(next)) set.add(key);
    }
  }

  holidayCache.set(year, set);
  return set;
}

export function isJapaneseHoliday(year, month, day) {
  return japaneseHolidays(year).has(dateKey(year, month, day));
}

// --- Status ----------------------------------------------------------

const jstFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

// The Tokyo wall-clock parts of a Date, plus the weekday key and the
// minutes since Tokyo midnight.
function tokyoParts(date) {
  const parts = {};
  for (const part of jstFormatter.formatToParts(date)) {
    if (part.type !== "literal") parts[part.type] = Number(part.value);
  }
  const utc = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    minutes: parts.hour * 60 + parts.minute,
    dayKey: DAY_KEYS[utc.getUTCDay()],
  };
}

function addDays(year, month, day, offset) {
  const date = new Date(Date.UTC(year, month - 1, day + offset));
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    dayKey: DAY_KEYS[date.getUTCDay()],
  };
}

// The ranges in force on one Tokyo calendar date: a holiday override
// wins, a closedOnHolidays spec closes the place, otherwise the
// weekday entry applies (a missing weekday means closed that day).
function rangesOn(spec, year, month, day, dayKey) {
  if (isJapaneseHoliday(year, month, day)) {
    if (spec.holiday) return spec.holiday;
    if (spec.closedOnHolidays) return [];
  }
  return (spec.days && spec.days[dayKey]) || [];
}

// Status of a place at a moment in time.
// Returns null when there is no spec, otherwise:
//   { open: true, always: true }
//   { open: true, closesAt: "18:30" }
//   { open: false, opensInDays: 0|1|n, opensDayLabel: "Tue", opensTime: "9:00" }
//   { open: false } — no opening found within a week (defensive)
export function getOpenStatus(spec, date) {
  if (!spec) return null;
  if (spec.always) return { open: true, always: true };
  if (!spec.days && !spec.holiday) return null;

  const now = tokyoParts(date);
  const today = rangesOn(spec, now.year, now.month, now.day, now.dayKey);
  for (const [start, end] of today) {
    if (now.minutes >= toMinutes(start) && now.minutes < toMinutes(end)) {
      return { open: true, closesAt: fmtTime(end) };
    }
  }
  for (let offset = 0; offset <= 7; offset++) {
    const when = addDays(now.year, now.month, now.day, offset);
    const ranges = rangesOn(spec, when.year, when.month, when.day, when.dayKey);
    for (const [start] of ranges) {
      if (offset === 0 && toMinutes(start) <= now.minutes) continue;
      return {
        open: false,
        opensInDays: offset,
        opensDayLabel: DAY_LABELS[when.dayKey],
        opensTime: fmtTime(start),
      };
    }
  }
  return { open: false };
}

// The one-line detail shown in the details sheet:
// "Open now · closes 18:30" / "Closed · opens Tue 9:00".
export function openStatusDetail(status) {
  if (!status) return null;
  if (status.open) {
    return status.always ? "Open now · 24 hours" : `Open now · closes ${status.closesAt}`;
  }
  if (status.opensTime) {
    if (status.opensInDays === 0) return `Closed · opens ${status.opensTime}`;
    if (status.opensInDays === 1) return `Closed · opens tomorrow ${status.opensTime}`;
    return `Closed · opens ${status.opensDayLabel} ${status.opensTime}`;
  }
  return "Closed";
}
