import { useState, useCallback } from "react";
import { GameStats } from "@/types/game";
import { getStoredStats, saveStoredStats } from "@/utils/wordle";

export interface UseGameStatsReturn {
  stats: GameStats;
  recordResult: (isWin: boolean) => void;
  resetStats: () => void;
}

/**
 * Custom hook to manage game statistics with localStorage persistence.
 */
export function useGameStats(): UseGameStatsReturn {
  const [stats, setStats] = useState<GameStats>(() => getStoredStats());

  const recordResult = useCallback((isWin: boolean) => {
    setStats((prev) => {
      const updated: GameStats = {
        games: prev.games + 1,
        wins: isWin ? prev.wins + 1 : prev.wins,
      };
      saveStoredStats(updated);
      return updated;
    });
  }, []);

  const resetStats = useCallback(() => {
    const fresh: GameStats = { games: 0, wins: 0 };
    saveStoredStats(fresh);
    setStats(fresh);
  }, []);

  return {
    stats,
    recordResult,
    resetStats,
  };
}
