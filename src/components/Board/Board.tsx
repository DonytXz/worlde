import React from "react";
import BoardRow from "./BoardRow";
import { LetterStatus, Theme } from "@/types/game";
import { MAX_ATTEMPTS } from "@/constants/game";

export interface BoardProps {
  guesses: string[];
  evaluations: LetterStatus[][];
  currentGuess?: string;
  theme?: Theme;
}

export const Board: React.FC<BoardProps> = ({
  guesses,
  evaluations,
  currentGuess = "",
  theme = "light",
}) => {
  return (
    <div className="flex flex-col gap-3 mx-auto w-fit select-none">
      {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
        if (rowIndex < guesses.length) {
          return (
            <BoardRow
              key={rowIndex}
              type="completed"
              guess={guesses[rowIndex]}
              evaluation={evaluations[rowIndex] || []}
              theme={theme}
            />
          );
        }

        if (rowIndex === guesses.length) {
          return (
            <BoardRow
              key={rowIndex}
              type="current"
              guess={currentGuess}
              theme={theme}
            />
          );
        }

        return <BoardRow key={rowIndex} type="empty" theme={theme} />;
      })}
    </div>
  );
};

export default Board;
