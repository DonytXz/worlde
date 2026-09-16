"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Board from "@/components/Board/Board";
import Header from "@/components/Header";
import Keyboard from "@/components/Keyboard/Keyboard";
import Modal from "@/components/common/Modal/Modal";
import Stats from "@/components/common/Modal/content/Stats";
import Tutorial from "@/components/common/Modal/content/Tutorial";
import {
  LetterStatus,
  GameStats,
  evaluateGuess,
  getStoredStats,
  saveStoredStats,
  hasSeenTutorial,
  markTutorialAsSeen,
  getStoredTheme,
  saveStoredTheme,
} from "@/utils/wordle";

const FIVE_MINUTES_MS = 300000;

interface WordleProps {
  words: string[];
  date?: number;
}

const Wordle: React.FC<WordleProps> = ({ words }) => {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState<"light" | "dark">(() => getStoredTheme());

  // First-time visit detection with localStorage
  const [showTutorial, setShowTutorial] = useState<boolean>(() => !hasSeenTutorial());
  const [showStats, setShowStats] = useState<boolean>(false);

  // Statistics state with localStorage persistence
  const [stats, setStats] = useState<GameStats>(() => getStoredStats());

  // Current target word
  const [solution, setSolution] = useState<string>(() => {
    if (!words || words.length === 0) return "gatos";
    return words[Math.floor(Math.random() * words.length)];
  });

  // Pool of used words in current session to prevent repetition (Requirement 8)
  const [usedWords, setUsedWords] = useState<string[]>(() => [solution]);

  // Board state
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<LetterStatus[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<"IN_PROGRESS" | "WON" | "LOST">("IN_PROGRESS");

  // 5-minute cycle timestamp
  const [nextWordTime, setNextWordTime] = useState<number>(() => Date.now() + FIVE_MINUTES_MS);

  // Update theme handler
  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    saveStoredTheme(newTheme);
  };

  // Close tutorial handler
  const handleCloseTutorial = () => {
    setShowTutorial(false);
    markTutorialAsSeen();
  };

  // Reset board for a new word
  const startNewGame = useCallback(() => {
    if (!words || words.length === 0) return;

    let available = words.filter((w) => !usedWords.includes(w));
    if (available.length === 0) {
      available = words;
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex];

    setSolution(chosen);
    setUsedWords((prev) => [...prev, chosen]);
    setGuesses([]);
    setEvaluations([]);
    setCurrentGuess("");
    setGameStatus("IN_PROGRESS");
    setNextWordTime(Date.now() + FIVE_MINUTES_MS);
  }, [words, usedWords]);

  // Periodic check for the 5-minute cycle expiration (Requirement 8)
  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() >= nextWordTime) {
        startNewGame();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextWordTime, startNewGame]);

  // Handle word evaluation and submission (Requirements 5, 6, 7)
  const submitGuess = useCallback(
    (guessWord: string) => {
      if (guessWord.length !== 5 || gameStatus !== "IN_PROGRESS") return;

      const evalResult = evaluateGuess(guessWord, solution);
      const updatedGuesses = [...guesses, guessWord];
      const updatedEvaluations = [...evaluations, evalResult];

      setGuesses(updatedGuesses);
      setEvaluations(updatedEvaluations);
      setCurrentGuess("");

      const isWin = guessWord === solution;

      if (isWin) {
        // Requirement 6: Sum victory and game, show stats modal
        setGameStatus("WON");
        setStats((prev) => {
          const next = { games: prev.games + 1, wins: prev.wins + 1 };
          saveStoredStats(next);
          return next;
        });
        setTimeout(() => setShowStats(true), 500);
      } else if (updatedGuesses.length >= 5) {
        // Requirement 7: Sum game, show stats modal revealing word
        setGameStatus("LOST");
        setStats((prev) => {
          const next = { games: prev.games + 1, wins: prev.wins };
          saveStoredStats(next);
          return next;
        });
        setTimeout(() => setShowStats(true), 500);
      }
    },
    [solution, guesses, evaluations, gameStatus]
  );

  // Handle adding letter (Requirement 4 & 5)
  const handleLetter = useCallback(
    (letter: string) => {
      if (gameStatus !== "IN_PROGRESS" || showTutorial || showStats) return;
      if (currentGuess.length >= 5) return;

      const nextGuess = currentGuess + letter.toLowerCase();
      if (nextGuess.length === 5) {
        // Requirement 5: Auto-evaluates upon completing the 5 letters of the row
        submitGuess(nextGuess);
      } else {
        setCurrentGuess(nextGuess);
      }
    },
    [currentGuess, gameStatus, showTutorial, showStats, submitGuess]
  );

  // Handle backspace / delete
  const handleDelete = useCallback(() => {
    if (gameStatus !== "IN_PROGRESS" || showTutorial || showStats) return;
    if (currentGuess.length === 0) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameStatus, showTutorial, showStats, currentGuess]);

  // Handle Enter key (optional explicit submit if 5 letters typed)
  const handleEnter = useCallback(() => {
    if (currentGuess.length === 5) {
      submitGuess(currentGuess);
    }
  }, [currentGuess, submitGuess]);

  // Compute key statuses for the virtual keyboard
  const keyStatuses = useMemo(() => {
    const map: Record<string, LetterStatus> = {};
    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i];
      const evalRow = evaluations[i];
      if (!evalRow) continue;
      for (let j = 0; j < 5; j++) {
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

  return (
    <div
      id={theme}
      className="min-h-screen h-full max-w-screen no-scrollbar overflow-x-hidden main flex flex-col justify-between"
    >
      <div className="flex flex-col px-4 sm:px-10 py-6 sm:py-8 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="pb-8">
          <Header
            theme={theme}
            setTheme={handleThemeChange}
            onOpenTutorial={() => setShowTutorial(true)}
            onOpenStats={() => setShowStats(true)}
          />
        </div>

        {/* Board */}
        <div className="pb-8 mx-auto flex justify-center w-full">
          <Board
            guesses={guesses}
            evaluations={evaluations}
            currentGuess={currentGuess}
            theme={theme}
          />
        </div>

        {/* Virtual Keyboard */}
        <div className="flex flex-col justify-center w-full">
          <Keyboard
            onLetter={handleLetter}
            onDelete={handleDelete}
            onEnter={handleEnter}
            keyStatuses={keyStatuses}
            theme={theme}
            disabled={gameStatus !== "IN_PROGRESS" || showTutorial || showStats}
          />
        </div>
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <Modal onClose={handleCloseTutorial}>
          <Tutorial theme={theme} onClose={handleCloseTutorial} />
        </Modal>
      )}

      {/* Stats Modal */}
      {showStats && (
        <Modal onClose={() => setShowStats(false)}>
          <Stats
            stats={stats}
            nextWordTime={nextWordTime}
            solution={solution}
            gameStatus={gameStatus}
            theme={theme}
            onClose={() => setShowStats(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Wordle;
