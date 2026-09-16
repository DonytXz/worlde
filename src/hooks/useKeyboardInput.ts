import { useEffect } from "react";

export interface UseKeyboardInputOptions {
  onLetter: (letter: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  disabled?: boolean;
}

/**
 * Custom hook to capture physical keyboard keystrokes for the Wordle game.
 */
export function useKeyboardInput({
  onLetter,
  onDelete,
  onEnter,
  disabled = false,
}: UseKeyboardInputOptions): void {
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      const key = event.key;

      if (key === "Backspace" || key === "Delete") {
        event.preventDefault();
        onDelete();
      } else if (key === "Enter") {
        event.preventDefault();
        onEnter();
      } else if (/^[a-zA-ZñÑ]$/.test(key)) {
        event.preventDefault();
        onLetter(key.toLowerCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onLetter, onDelete, onEnter, disabled]);
}
