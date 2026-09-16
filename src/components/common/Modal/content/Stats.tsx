import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import { GameStats } from "@/utils/wordle";

interface StatsProps {
  stats?: GameStats;
  nextWordTime: number;
  solution?: string;
  gameStatus?: "IN_PROGRESS" | "WON" | "LOST";
  theme?: "light" | "dark";
  onClose?: () => void;
  // Backward compatibility with previous signatures
  games?: { games: number; setGames?: (val: number) => void };
  wins?: { wins: number; setWins?: (val: number) => void };
  setShow?: {
    setshowStats: (val: boolean) => void;
    setshowTutorial?: (val: boolean) => void;
  };
  prevWord?: string;
}

const Stats: React.FC<StatsProps> = ({
  stats,
  nextWordTime,
  solution,
  gameStatus,
  theme = "light",
  onClose,
  setShow,
  games,
  wins,
  prevWord,
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (setShow?.setshowStats) {
      setShow.setshowStats(false);
    }
  };

  const displayedGames = stats?.games ?? games?.games ?? 0;
  const displayedWins = stats?.wins ?? wins?.wins ?? 0;

  // Show "La palabra era: ..." only if the player lost
  const wordToReveal = gameStatus === "LOST" ? solution || prevWord || null : null;

  const renderer = ({ minutes, seconds, completed }: { minutes: number; seconds: number; completed: boolean }) => {
    if (completed) {
      return <span>00:00</span>;
    }
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  return (
    <div id={theme} className="flex items-center justify-center p-2">
      <div
        id="statsContent"
        className="bg-white-gray z-30 w-full max-w-[546px] border border-neutral-300 dark:border-neutral-700 py-6 px-8 sm:px-10 flex flex-col rounded-xl shadow-2xl"
      >
        <h2 className="text-medium text-center font-bold">Estadísticas</h2>

        <div className="flex justify-around my-6">
          <div className="flex flex-col items-center">
            <span className="text-medium font-bold">{displayedGames}</span>
            <span className="text-small">Jugadas</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-medium font-bold">{displayedWins}</span>
            <span className="text-small">Victorias</span>
          </div>
        </div>

        {wordToReveal && (
          <div className="text-center py-3">
            <p className="text-base uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
              La palabra era:
            </p>
            <p className="text-2xl font-bold uppercase tracking-widest text-app-green mt-1">
              {wordToReveal}
            </p>
          </div>
        )}

        <div className="flex flex-col items-center my-4">
          <span className="text-sm font-semibold tracking-wider uppercase text-neutral-600 dark:text-neutral-300">
            SIGUIENTE PALABRA
          </span>
          <p className="font-bold text-2xl mt-1 tracking-widest">
            <Countdown key={nextWordTime} date={nextWordTime} renderer={renderer} />
          </p>
        </div>

        <button
          className="mt-4 bg-app-green hover:brightness-105 active:scale-95 transition-transform w-[263px] h-[50px] mx-auto flex items-center justify-center rounded-lg shadow cursor-pointer"
          onClick={handleClose}
        >
          <p className="text-white text-xl font-bold tracking-wide">Aceptar</p>
        </button>
      </div>
    </div>
  );
};

export default Stats;
