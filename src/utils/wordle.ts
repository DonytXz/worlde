import { LetterStatus, GameStats, Theme } from "@/types/game";
import { WORD_LENGTH, STORAGE_KEYS } from "@/constants/game";
import { getStorageItem, setStorageItem, getStorageString, setStorageString } from "./storage";

export type { LetterStatus, GameStats, Theme };

/**
 * Evaluates a guess against the target solution using standard Wordle logic.
 * - 'good': Correct letter in the correct position (Green)
 * - 'warn': Letter present in the word but in a different position (Yellow)
 * - 'none': Letter not present (or occurrences already accounted for) (Gray)
 */
export function evaluateGuess(guess: string, solution: string): LetterStatus[] {
  const result: LetterStatus[] = new Array(WORD_LENGTH).fill("none");
  const solutionLetters = solution.toLowerCase().split("");
  const guessLetters = guess.toLowerCase().split("");
  const letterCounts: Record<string, number> = {};

  // Pass 1: exact matches ('good')
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] === solutionLetters[i]) {
      result[i] = "good";
    } else {
      const char = solutionLetters[i];
      letterCounts[char] = (letterCounts[char] || 0) + 1;
    }
  }

  // Pass 2: misplaced matches ('warn')
  for (let i = 0; i < WORD_LENGTH; i++) {
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

/**
 * Returns a new random word from the word list, prioritizing words not in `usedWords`.
 */
export function pickRandomWord(words: string[], usedWords: string[] = []): string {
  if (!words || words.length === 0) return "gatos";

  let available = words.filter((w) => !usedWords.includes(w));
  if (available.length === 0) {
    available = words;
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

export function getStoredStats(): GameStats {
  return getStorageItem<GameStats>(STORAGE_KEYS.STATS, { games: 0, wins: 0 });
}

export function saveStoredStats(stats: GameStats): void {
  setStorageItem(STORAGE_KEYS.STATS, stats);
}

export function hasSeenTutorial(): boolean {
  return getStorageString(STORAGE_KEYS.TUTORIAL_SEEN, "false") === "true";
}

export function markTutorialAsSeen(): void {
  setStorageString(STORAGE_KEYS.TUTORIAL_SEEN, "true");
}

export function getStoredTheme(): Theme {
  const theme = getStorageString(STORAGE_KEYS.THEME, "light");
  return theme === "dark" ? "dark" : "light";
}

export function saveStoredTheme(theme: Theme): void {
  setStorageString(STORAGE_KEYS.THEME, theme);
}
