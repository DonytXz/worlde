import React from "react";
import KeyboardKey from "./KeyboardKey";
import { KeyStatuses, Theme } from "@/types/game";
import { KEYBOARD_ROWS } from "@/constants/game";

export interface KeyboardProps {
  onLetter: (letter: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  keyStatuses?: KeyStatuses;
  theme?: Theme;
  disabled?: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  onLetter,
  onDelete,
  onEnter,
  keyStatuses = {},
  theme = "light",
  disabled = false,
}) => {
  const handleKeyPress = (key: string) => {
    if (disabled) return;

    if (key === "delete") {
      onDelete();
    } else if (key === "enter") {
      onEnter();
    } else {
      onLetter(key);
    }
  };

  return (
    <div
      className={`flex flex-col w-full max-w-[638px] min-h-[238px] ${
        theme === "light" ? "bg-gray-ligth" : "bg-app-gray-keyboard"
      } mx-auto items-center justify-center p-3 rounded-2xl shadow-xs`}
    >
      <div className="w-full flex flex-col items-center gap-2">
        {/* Row 1 */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {KEYBOARD_ROWS.ROW_1.map((letter) => (
            <KeyboardKey
              key={letter}
              value={letter}
              theme={theme}
              status={keyStatuses[letter]}
              onPress={handleKeyPress}
              disabled={disabled}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {KEYBOARD_ROWS.ROW_2.map((letter) => (
            <KeyboardKey
              key={letter}
              value={letter}
              theme={theme}
              status={keyStatuses[letter]}
              onPress={handleKeyPress}
              disabled={disabled}
            />
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {KEYBOARD_ROWS.ROW_3.map((key) => (
            <KeyboardKey
              key={key}
              value={key}
              theme={theme}
              status={keyStatuses[key]}
              onPress={handleKeyPress}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
