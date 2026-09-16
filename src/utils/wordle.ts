export type LetterStatus = "good" | "warn" | "none";

export interface GameStats {
  games: number;
  wins: number;
}

const STATS_STORAGE_KEY = "wordle_stats";
const TUTORIAL_STORAGE_KEY = "wordle_tutorial_seen";
const THEME_STORAGE_KEY = "wordle_theme";

/**
 * Evaluates a 5-letter guess against the target solution using standard Wordle logic.
 * - 'good': Correct letter in the correct position (Green)
 * - 'warn': Letter present in the word but in a different position (Yellow)
 * - 'none': Letter not present (or occurrences already accounted for) (Gray)
 */
export function evaluateGuess(guess: string, solution: string): LetterStatus[] {
  const result: LetterStatus[] = new Array(5).fill("none");
  const solutionLetters = solution.toLowerCase().split("");
  const guessLetters = guess.toLowerCase().split("");
  const letterCounts: Record<string, number> = {};

  // Pass 1: exact matches ('good')
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === solutionLetters[i]) {
      result[i] = "good";
    } else {
      const char = solutionLetters[i];
      letterCounts[char] = (letterCounts[char] || 0) + 1;
    }
  }

  // Pass 2: misplaced matches ('warn')
  for (let i = 0; i < 5; i++) {
    if (result[i] !== "good") {
      const char = guessLetters[i];
      if (letterCounts[char] && letterCounts[char] > 0) {
        result[i] = "warn";
        letterCounts[char]--;
      } else {
        result[i] = "none";
      }
    }
  }

  return result;
}

export function getStoredStats(): GameStats {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.games === "number" && typeof parsed.wins === "number") {
        return { games: parsed.games, wins: parsed.wins };
      }
    }
  } catch {
    // Fallback if localStorage is unavailable
  }
  return { games: 0, wins: 0 };
}

export function saveStoredStats(stats: GameStats): void {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Fallback if localStorage is unavailable
  }
}

export function hasSeenTutorial(): boolean {
  try {
    return localStorage.getItem(TUTORIAL_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function markTutorialAsSeen(): void {
  try {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, "true");
  } catch {
    // Fallback if localStorage is unavailable
  }
}

export function getStoredTheme(): "light" | "dark" {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch {
    // Fallback if localStorage is unavailable
  }
  return "light";
}

export function saveStoredTheme(theme: "light" | "dark"): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Fallback if localStorage is unavailable
  }
}
