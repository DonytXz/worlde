import React from "react";
import { Theme } from "@/types/game";

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

export interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isDark = theme === "dark";

  return (
    <div
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className="relative flex flex-row cursor-pointer select-none hover:opacity-90 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-app-green rounded-full"
    >
      {!isDark ? (
        <>
          <div className="h-full absolute right-1 my-auto flex items-center pointer-events-none">
            <img
              src={asset("orangeDot.svg")}
              alt=""
              width={21}
              height={23.3}
            />
            <div className="z-10 absolute w-full h-full flex items-center justify-center">
              <img
                src={asset("orangeDot2.svg")}
                alt=""
                width={17.4}
                height={19.3}
              />
            </div>
          </div>
          <img
            src={asset("inc_themeSwitch.svg")}
            alt=""
            width={60}
            height={30}
          />
        </>
      ) : (
        <>
          <div className="h-full absolute left-1 my-auto flex items-center pointer-events-none">
            <img
              src={asset("grayDot.svg")}
              alt=""
              width={21}
              height={23.3}
            />
          </div>
          <img
            src={asset("inc_themeSwitch_dark.svg")}
            alt=""
            width={60}
            height={30}
          />
        </>
      )}
    </div>
  );
};

export default ThemeToggle;
