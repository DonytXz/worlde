import React from "react";
import { LetterStatus, Theme } from "@/types/game";

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

export interface KeyboardKeyProps {
  value: string;
  theme?: Theme;
  status?: LetterStatus;
  onPress: (key: string) => void;
  disabled?: boolean;
}

export const KeyboardKey: React.FC<KeyboardKeyProps> = ({
  value,
  theme = "light",
  status,
  onPress,
  disabled = false,
}) => {
  const isSpecial = value === "enter" || value === "delete";

  const getKeyColorClasses = (): string => {
    if (!isSpecial && status === "good") {
      return "bg-app-green text-white";
    }
    if (!isSpecial && status === "warn") {
      return "bg-app-yellow text-white";
    }
    if (!isSpecial && status === "none") {
      return "bg-dark-gray text-white";
    }

    return theme === "dark"
      ? "bg-app-gray-digit text-white hover:brightness-110"
      : "bg-gray text-black hover:brightness-95";
  };

  const keyWidthClass = isSpecial
    ? "w-[71.8px] h-[51px] text-xsamall"
    : "w-[44.5px] h-[51px] text-small";

  return (
    <button
      type="button"
      onClick={() => onPress(value)}
      disabled={disabled}
      aria-label={value === "delete" ? "Borrar letra" : value}
      className={`select-none cursor-pointer flex items-center justify-center rounded-md font-semibold uppercase transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${keyWidthClass} ${getKeyColorClasses()}`}
    >
      {value === "delete" ? (
        <img
          src={theme === "dark" ? asset("inc_remove_white.svg") : asset("inc_remove.svg")}
          alt="Borrar"
          width={22.3}
          height={16}
          className="pointer-events-none"
        />
      ) : (
        <span className="pointer-events-none">{value}</span>
      )}
    </button>
  );
};

export default KeyboardKey;
