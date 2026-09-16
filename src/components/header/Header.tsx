import React from "react";
import ThemeToggle from "./ThemeToggle";
import IconButton from "@/components/ui/IconButton";
import { Theme } from "@/types/game";

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

export interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenTutorial: () => void;
  onOpenStats: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenTutorial,
  onOpenStats,
}) => {
  return (
    <header className="flex justify-center w-full">
      <div
        className={`flex relative w-full max-w-[638px] h-[84px] rounded-lg px-6 py-4 justify-between items-center ${
          theme === "light" ? "bg-ligth-gray" : "bg-app-darkers-gray-less"
        }`}
      >
        {/* Tutorial Question Mark button */}
        <div className="flex items-center">
          <IconButton onClick={onOpenTutorial} ariaLabel="Cómo jugar">
            <img
              src={asset("inc_quetionMark.svg")}
              alt="Instrucciones"
              width={27}
              height={27}
            />
          </IconButton>
        </div>

        {/* Title */}
        <div className="flex-1 flex justify-center pointer-events-none">
          <h1
            className={`font-bold text-big tracking-widest select-none ${
              theme === "light" ? "text-[#202537]" : "text-gray"
            }`}
          >
            WORDLE
          </h1>
        </div>

        {/* Right actions: Stats button and Theme Toggle */}
        <div className="flex items-center gap-3">
          <IconButton onClick={onOpenStats} ariaLabel="Estadísticas">
            <img
              src={asset("inc_chart.svg")}
              alt="Estadísticas"
              width={39.5}
              height={36}
            />
          </IconButton>

          {/* Theme switch toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Header;
