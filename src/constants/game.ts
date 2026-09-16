export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 5;
export const CYCLE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export const STORAGE_KEYS = {
  STATS: "wordle_stats",
  TUTORIAL_SEEN: "wordle_tutorial_seen",
  THEME: "wordle_theme",
} as const;

export const KEYBOARD_ROWS = {
  ROW_1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ROW_2: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  ROW_3: ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
} as const;
