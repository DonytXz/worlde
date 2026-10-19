import React from "react";
import StatItem from "./StatItem";
import { GameStats, GameStatus, Theme } from "@/types/game";
import { useCountdown } from "@/hooks/useCountdown";

export interface StatsModalProps {
  stats: GameStats;
  nextWordTime: number;
  solution?: string;
  gameStatus: GameStatus;
  theme?: Theme;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  stats,
  nextWordTime,
  solution,
  gameStatus,
  theme = "light",
  onClose,
}) => {
  const { formattedTime } = useCountdown({ targetTime: nextWordTime });

  const wordToReveal = gameStatus === "LOST" ? solution : null;

  return (
    <div id={theme} className="flex items-center justify-center p-2">
      <div
        id="statsContent"
        className="bg-white-gray z-30 w-full max-w-[546px] border border-neutral-300 dark:border-neutral-700 py-6 px-8 sm:px-10 flex flex-col rounded-xl shadow-2xl"
      >
        <h2 className="text-medium text-center font-bold">Estadísticas</h2>

        <div className="flex justify-around my-6">
          <StatItem value={stats.games} label="Jugadas" />
          <StatItem value={stats.wins} label="Victorias" />
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
            {formattedTime}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 bg-app-green hover:brightness-105 active:scale-95 transition-transform w-[263px] h-[50px] mx-auto flex items-center justify-center rounded-lg shadow-sm cursor-pointer text-white text-xl font-bold tracking-wide"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default StatsModal;
