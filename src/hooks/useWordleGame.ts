import { useState, useCallback, useMemo, useEffect } from "react";
import { GameStatus, LetterStatus, KeyStatuses } from "@/types/game";
import { WORD_LENGTH, MAX_ATTEMPTS, CYCLE_DURATION_MS } from "@/constants/game";
import { evaluateGuess, pickRandomWord } from "@/utils/wordle";

export interface UseWordleGameOptions {
  words: string[];
  onGameWon?: () => void;
  onGameLost?: () => void;
}

export interface UseWordleGameReturn {
  solution: string;
  guesses: string[];
  evaluations: LetterStatus[][];
  currentGuess: string;
  gameStatus: GameStatus;
  keyStatuses: KeyStatuses;
  nextWordTime: number;
  addLetter: (letter: string) => void;
  deleteLetter: () => void;
  submitGuess: (guess?: string) => void;
  startNewGame: () => void;
}

/**
 * Custom hook encapsulating the Wordle game mechanics, board state, word evaluation,
 * keyboard mapping, and the 5-minute word refresh cycle.
 */
export function useWordleGame({
  words,
  onGameWon,
  onGameLost,
}: UseWordleGameOptions): UseWordleGameReturn {
  // Current target word
  const [solution, setSolution] = useState<string>(() => pickRandomWord(words));

  // Pool of used words in current session to prevent repetition
  const [usedWords, setUsedWords] = useState<string[]>(() => [solution]);

  // Board state
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<LetterStatus[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("IN_PROGRESS");

  // 5-minute cycle timestamp
  const [nextWordTime, setNextWordTime] = useState<number>(
    () => Date.now() + CYCLE_DURATION_MS
  );

  // Initialize or synchronize target word when words load
  useEffect(() => {
    if (words.length > 0 && !solution) {
      const chosen = pickRandomWord(words);
      setSolution(chosen);
      setUsedWords([chosen]);
    }
  }, [words, solution]);

  // Reset board for a new word
  const startNewGame = useCallback(() => {
    if (words.length === 0) return;

    const chosen = pickRandomWord(words, usedWords);
    setSolution(chosen);
    setUsedWords((prev) => [...prev, chosen]);
    setGuesses([]);
    setEvaluations([]);
    setCurrentGuess("");
    setGameStatus("IN_PROGRESS");
    setNextWordTime(Date.now() + CYCLE_DURATION_MS);
  }, [words, usedWords]);

  // Periodic check for the 5-minute cycle expiration
  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() >= nextWordTime) {
        startNewGame();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextWordTime, startNewGame]);

  // Submit and evaluate guess
  const submitGuess = useCallback(
    (explicitGuess?: string) => {
      const guessWord = explicitGuess ?? currentGuess;
      if (guessWord.length !== WORD_LENGTH || gameStatus !== "IN_PROGRESS") return;

      const evalResult = evaluateGuess(guessWord, solution);
      const updatedGuesses = [...guesses, guessWord];
      const updatedEvaluations = [...evaluations, evalResult];

      setGuesses(updatedGuesses);
      setEvaluations(updatedEvaluations);
      setCurrentGuess("");

      const isWin = guessWord === solution;

      if (isWin) {
        setGameStatus("WON");
        onGameWon?.();
      } else if (updatedGuesses.length >= MAX_ATTEMPTS) {
        setGameStatus("LOST");
        onGameLost?.();
      }
    },
    [currentGuess, gameStatus, solution, guesses, evaluations, onGameWon, onGameLost]
  );

  // Add letter with automatic evaluation on row completion
  const addLetter = useCallback(
    (letter: string) => {
      if (gameStatus !== "IN_PROGRESS") return;
      if (currentGuess.length >= WORD_LENGTH) return;

      const nextGuess = currentGuess + letter.toLowerCase();
      if (nextGuess.length === WORD_LENGTH) {
        submitGuess(nextGuess);
      } else {
        setCurrentGuess(nextGuess);
      }
    },
    [gameStatus, currentGuess, submitGuess]
  );

  // Delete previous letter
  const deleteLetter = useCallback(() => {
    if (gameStatus !== "IN_PROGRESS") return;
    if (currentGuess.length === 0) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameStatus, currentGuess]);

  // Compute key statuses for the virtual keyboard
  const keyStatuses = useMemo(() => {
    const map: KeyStatuses = {};
    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i];
      const evalRow = evaluations[i];
      if (!evalRow) continue;

      for (let j = 0; j < WORD_LENGTH; j++) {
        const char = guess[j];
        const status = evalRow[j];
        const current = map[char];

        if (status === "good") {
          map[char] = "good";
        } else if (status === "warn" && current !== "good") {
          map[char] = "warn";
        } else if (status === "none" && !current) {
          map[char] = "none";
        }
      }
    }
    return map;
  }, [guesses, evaluations]);

  return {
    solution,
    guesses,
    evaluations,
    currentGuess,
    gameStatus,
    keyStatuses,
    nextWordTime,
    addLetter,
    deleteLetter,
    submitGuess,
    startNewGame,
  };
}
