import { useState, useEffect } from "react";

export interface UseWordListReturn {
  words: string[];
  loading: boolean;
  error: boolean;
}

const parseWords = (source: string): string[] =>
  source
    .split(/\r?\n/)
    .map((word) => word.trim().toLowerCase())
    .filter((word) => /^[a-zñ]{5}$/.test(word));

/**
 * Custom hook to load and parse the 5-letter Spanish word list.
 */
export function useWordList(): UseWordListReturn {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${import.meta.env.BASE_URL}words.txt`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load the word list");
        }
        return response.text();
      })
      .then((source) => {
        const parsed = parseWords(source);
        setWords(parsed);
        setLoading(false);
      })
      .catch((reason: unknown) => {
        if (!(reason instanceof DOMException && reason.name === "AbortError")) {
          setError(true);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return { words, loading, error };
}
