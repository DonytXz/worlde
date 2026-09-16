import React from "react";

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

interface HeaderProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  onOpenTutorial?: () => void;
  onOpenStats?: () => void;
  // Backward compatibility
  handleModal?: {
    tutorial: { set: (val: boolean) => void; val?: boolean };
    stats: { set: (val: boolean) => void; val?: boolean };
  };
}

const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  onOpenTutorial,
  onOpenStats,
  handleModal,
}) => {
  const handleTutorialClick = () => {
    if (onOpenTutorial) {
      onOpenTutorial();
    } else if (handleModal?.tutorial?.set) {
      handleModal.tutorial.set(true);
    }
  };

  const handleStatsClick = () => {
    if (onOpenStats) {
      onOpenStats();
    } else if (handleModal?.stats?.set) {
      handleModal.stats.set(true);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="flex justify-center w-full">
      <div
        className={`flex relative w-full max-w-[638px] h-[84px] rounded-lg px-6 py-4 justify-between items-center ${
          theme === "light" ? "bg-ligth-gray" : "bg-app-darkers-gray-less"
        }`}
      >
        {/* Tutorial Question Mark button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleTutorialClick}
            className="cursor-pointer hover:opacity-80 transition-opacity p-1"
            aria-label="Cómo jugar"
          >
            <img
              src={asset("inc_quetionMark.svg")}
              alt="How to play"
              width={27}
              height={27}
            />
          </button>
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
          <button
            type="button"
            onClick={handleStatsClick}
            className="cursor-pointer hover:opacity-80 transition-opacity p-1"
            aria-label="Estadísticas"
          >
            <img
              src={asset("inc_chart.svg")}
              alt="Game statistics"
              width={39.5}
              height={36}
            />
          </button>

          {/* Theme switch toggle */}
          <div
            onClick={toggleTheme}
            className="relative flex flex-row cursor-pointer select-none hover:opacity-90 transition-opacity"
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Cambiar modo oscuro/claro"
          >
            {theme === "light" ? (
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
                  alt="Activar modo oscuro"
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
                  alt="Activar modo claro"
                  width={60}
                  height={30}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
