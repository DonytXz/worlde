export type LetterStatus = "good" | "warn" | "none";

export type GameStatus = "IN_PROGRESS" | "WON" | "LOST";

export type Theme = "light" | "dark";

export interface GameStats {
  games: number;
  wins: number;
}

export type KeyStatuses = Record<string, LetterStatus>;

export interface WordListState {
  words: string[];
  loading: boolean;
  error: boolean;
}
