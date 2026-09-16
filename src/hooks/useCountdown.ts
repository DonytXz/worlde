import { useState, useEffect } from "react";

export interface UseCountdownOptions {
  targetTime: number;
  onExpire?: () => void;
}

export interface UseCountdownReturn {
  remainingMs: number;
  minutes: number;
  seconds: number;
  formattedTime: string;
  isExpired: boolean;
}

function pad(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * Custom hook to track a countdown to a target timestamp.
 */
export function useCountdown({ targetTime, onExpire }: UseCountdownOptions): UseCountdownReturn {
  const [remainingMs, setRemainingMs] = useState<number>(() =>
    Math.max(0, targetTime - Date.now())
  );

  useEffect(() => {
    const calculateRemaining = () => {
      const remaining = Math.max(0, targetTime - Date.now());
      setRemainingMs(remaining);

      if (remaining === 0 && onExpire) {
        onExpire();
      }
    };

    calculateRemaining();

    const intervalId = setInterval(calculateRemaining, 1000);
    return () => clearInterval(intervalId);
  }, [targetTime, onExpire]);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    remainingMs,
    minutes,
    seconds,
    formattedTime: `${pad(minutes)}:${pad(seconds)}`,
    isExpired: remainingMs <= 0,
  };
}
