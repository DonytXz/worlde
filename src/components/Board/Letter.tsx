import React from "react";
import { LetterStatus } from "@/utils/wordle";

interface LetterProps {
  letter?: string;
  status?: LetterStatus | boolean;
  isTutorial?: boolean;
  theme?: "light" | "dark";
}

const Letter: React.FC<LetterProps> = ({ letter, status, isTutorial, theme }) => {
  const hasStatus = status === "good" || status === "warn" || status === "none";

  let statusClass = "";
  if (status === "good") {
    statusClass = "bg-app-green text-white border-transparent";
  } else if (status === "warn") {
    statusClass = "bg-app-yellow text-white border-transparent";
  } else if (status === "none") {
    statusClass = "bg-dark-gray text-white border-transparent";
  } else if (isTutorial && !hasStatus) {
    statusClass =
      theme === "dark"
        ? "bg-app-darkers-gray text-white border border-neutral-700"
        : "bg-white border-2 border-black text-black";
  } else {
    // Normal board cell without evaluation yet
    statusClass = "bg-gray-normal text-black dark:text-white";
  }

  return (
    <div
      className={`rounded-md text-center w-[75px] h-[75px] flex items-center justify-center mx-auto select-none transition-colors duration-200 ${statusClass}`}
    >
      {letter ? (
        <span className="uppercase text-medium font-bold leading-none">
          {letter}
        </span>
      ) : null}
    </div>
  );
};

export default Letter;
