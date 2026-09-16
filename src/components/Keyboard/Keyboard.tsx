import React, { useEffect, useCallback } from "react";
import Digit from "./Digit";
import { LetterStatus } from "@/utils/wordle";

const ROW_1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const ROW_2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"];
const ROW_3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"];

interface KeyboardProps {
  onLetter?: (letter: string) => void;
  onDelete?: () => void;
  onEnter?: () => void;
  keyStatuses?: Record<string, LetterStatus>;
  theme?: "light" | "dark";
  disabled?: boolean;
  // Legacy props
  currentWChartArr?: string[];
  findChart?: any;
  rows?: any;
  setRows?: any;
  games?: any;
  wins?: any;
  setshowStats?: any;
  choseWord?: any;
}

const Keyboard: React.FC<KeyboardProps> = ({
  onLetter,
  onDelete,
  onEnter,
  keyStatuses = {},
  theme = "light",
  disabled = false,
  setRows,
  rows,
}) => {
  const handleKey = useCallback(
    (key: string) => {
      if (disabled) return;

      if (key === "delete" || key === "backspace") {
        if (onDelete) {
          onDelete();
        } else if (setRows && rows && rows.length > 0) {
          setRows((prev: string[]) => prev.slice(0, -1));
        }
      } else if (key === "enter") {
        if (onEnter) {
          onEnter();
        }
      } else if (/^[a-zñ]$/i.test(key)) {
        const lower = key.toLowerCase();
        if (onLetter) {
          onLetter(lower);
        } else if (setRows && rows) {
          setRows((prev: string[]) => [...prev, lower]);
        }
      }
    },
    [disabled, onDelete, setRows, rows, onEnter, onLetter]
  );

  // Listen for physical keyboard strokes
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore key strokes with modifier keys (Ctrl, Alt, Meta)
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      const key = event.key;
      if (key === "Backspace" || key === "Delete") {
        event.preventDefault();
        handleKey("delete");
      } else if (key === "Enter") {
        event.preventDefault();
        handleKey("enter");
      } else if (/^[a-zA-ZñÑ]$/.test(key)) {
        event.preventDefault();
        handleKey(key.toLowerCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKey]);

  return (
    <div
      className={`flex flex-col w-full max-w-[638px] min-h-[238px] ${
        theme === "light" ? "bg-gray-ligth" : "bg-app-gray-keyboard"
      } mx-auto items-center justify-center p-3 rounded-2xl shadow-sm`}
    >
      <div className="w-full flex flex-col items-center gap-2">
        {/* Row 1 */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {ROW_1.map((letter) => (
            <Digit
              key={letter}
              digit={letter}
              theme={theme}
              status={keyStatuses[letter]}
              onPress={() => handleKey(letter)}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {ROW_2.map((letter) => (
            <Digit
              key={letter}
              digit={letter}
              theme={theme}
              status={keyStatuses[letter]}
              onPress={() => handleKey(letter)}
            />
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {ROW_3.map((letter) => (
            <Digit
              key={letter}
              digit={letter}
              theme={theme}
              status={keyStatuses[letter]}
              onPress={() => handleKey(letter)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
