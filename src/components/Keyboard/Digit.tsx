import React from "react";
import { LetterStatus } from "@/utils/wordle";

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

interface DigitProps {
  digit: string;
  theme?: "light" | "dark";
  status?: LetterStatus;
  onPress?: (key: string) => void;
  // Backward compatibility
  set?: (val: string) => void;
  digitCounter?: any;
  deleteCounter?: any;
  compare?: () => void;
}

const Digit: React.FC<DigitProps> = ({
  digit,
  theme = "light",
  status,
  onPress,
  set,
  digitCounter,
  deleteCounter,
}) => {
  const handleClick = () => {
    if (onPress) {
      onPress(digit);
    } else if (set) {
      // Legacy behavior
      set(digit);
      if (digit === "delete") {
        if (digitCounter?.setCounter) digitCounter.setCounter(digitCounter.counter - 1);
        if (deleteCounter?.setDeleteCounter) deleteCounter.setDeleteCounter(deleteCounter.deleteCounter + 1);
      } else {
        if (digitCounter?.setCounter) digitCounter.setCounter(digitCounter.counter + 1);
      }
    }
  };

  const isSpecial = digit === "enter" || digit === "delete";

  // Compute background and text color based on status and theme
  let colorClasses = "";
  if (!isSpecial && status === "good") {
    colorClasses = "bg-app-green text-white";
  } else if (!isSpecial && status === "warn") {
    colorClasses = "bg-app-yellow text-white";
  } else if (!isSpecial && status === "none") {
    colorClasses = "bg-dark-gray text-white";
  } else {
    // Default unplayed key
    colorClasses =
      theme === "dark"
        ? "bg-app-gray-digit text-white hover:brightness-110"
        : "bg-gray text-black hover:brightness-95";
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={digit}
      className={`select-none cursor-pointer flex items-center justify-center rounded-md font-semibold uppercase transition-colors duration-150 active:scale-95 ${
        isSpecial
          ? "w-[71.8px] h-[51px] text-xsamall"
          : "w-[44.5px] h-[51px] text-small"
      } ${colorClasses}`}
    >
      {digit === "delete" ? (
        <div className="flex justify-center items-center pointer-events-none">
          <img
            src={theme === "dark" ? asset("inc_remove_white.svg") : asset("inc_remove.svg")}
            alt="Delete letter"
            width={22.3}
            height={16}
          />
        </div>
      ) : (
        <span className="pointer-events-none">{digit}</span>
      )}
    </button>
  );
};

export default Digit;
