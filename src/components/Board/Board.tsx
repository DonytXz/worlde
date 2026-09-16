import React from "react";
import Letter from "./Letter";
import { LetterStatus } from "@/utils/wordle";

interface BoardProps {
  guesses?: string[];
  evaluations?: LetterStatus[][];
  currentGuess?: string;
  theme?: "light" | "dark";
  // Backward compatibility with previous flat props
  rows?: string[];
  chartFind?: LetterStatus[][];
  currentWChartArr?: string[];
}

const Board: React.FC<BoardProps> = ({
  guesses,
  evaluations,
  currentGuess = "",
  theme,
  rows,
  chartFind,
}) => {
  // If modern structured props are provided, use them
  let resolvedGuesses: string[] = [];
  let resolvedEvaluations: LetterStatus[][] = [];
  let activeGuess = currentGuess;

  if (guesses && evaluations) {
    resolvedGuesses = guesses;
    resolvedEvaluations = evaluations;
  } else if (rows) {
    // Legacy adapter for flat array of characters
    const totalChars = rows.length;
    const completedRowsCount = chartFind ? chartFind.length : Math.floor(totalChars / 5);
    for (let r = 0; r < completedRowsCount; r++) {
      resolvedGuesses.push(rows.slice(r * 5, r * 5 + 5).join(""));
    }
    resolvedEvaluations = chartFind || [];
    activeGuess = rows.slice(completedRowsCount * 5).join("");
  }

  const boardCells: React.ReactNode[] = [];

  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    if (rowIndex < resolvedGuesses.length) {
      // Completed row with evaluated statuses
      const word = resolvedGuesses[rowIndex];
      const rowStatus = resolvedEvaluations[rowIndex] || [];
      for (let colIndex = 0; colIndex < 5; colIndex++) {
        boardCells.push(
          <Letter
            key={`row-${rowIndex}-col-${colIndex}`}
            letter={word[colIndex] || ""}
            status={rowStatus[colIndex]}
            theme={theme}
          />
        );
      }
    } else if (rowIndex === resolvedGuesses.length) {
      // Active in-progress row
      for (let colIndex = 0; colIndex < 5; colIndex++) {
        boardCells.push(
          <Letter
            key={`row-${rowIndex}-col-${colIndex}`}
            letter={activeGuess[colIndex] || ""}
            theme={theme}
          />
        );
      }
    } else {
      // Future empty row
      for (let colIndex = 0; colIndex < 5; colIndex++) {
        boardCells.push(
          <Letter
            key={`row-${rowIndex}-col-${colIndex}`}
            letter=""
            theme={theme}
          />
        );
      }
    }
  }

  return (
    <div className="grid grid-cols-[repeat(5,_75px)] grid-rows-5 gap-3 mx-auto">
      {boardCells}
    </div>
  );
};

export default Board;
