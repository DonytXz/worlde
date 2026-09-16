import React from "react";
import { LetterStatus, Theme } from "@/types/game";

export interface BoardTileProps {
  letter?: string;
  status?: LetterStatus;
  isTutorial?: boolean;
  theme?: Theme;
}

export const BoardTile: React.FC<BoardTileProps> = ({
  letter,
  status,
  isTutorial = false,
  theme = "light",
}) => {
  const getStatusClasses = (): string => {
    switch (status) {
      case "good":
        return "bg-app-green text-white border-transparent";
      case "warn":
        return "bg-app-yellow text-white border-transparent";
      case "none":
        return "bg-dark-gray text-white border-transparent";
      default:
        if (isTutorial) {
          return theme === "dark"
            ? "bg-app-darkers-gray text-white border border-neutral-700"
            : "bg-white border-2 border-black text-black";
        }
        return "bg-gray-normal text-black dark:text-white border-transparent";
    }
  };

  return (
    <div
      className={`rounded-md text-center w-[75px] h-[75px] flex items-center justify-center mx-auto select-none transition-colors duration-200 ${getStatusClasses()}`}
    >
      {letter ? (
        <span className="uppercase text-medium font-bold leading-none">
          {letter}
        </span>
      ) : null}
    </div>
  );
};

export default BoardTile;
