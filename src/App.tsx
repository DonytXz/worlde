import { useEffect, useState } from "react";
import Wordle from "@/app/pages/Wordle";

const parseWords = (source: string) =>
  source
    .split(/\r?\n/)
    .map((word) => word.trim().toLowerCase())
    .filter((word) => /^[a-zñ]{5}$/.test(word));

export default function App() {
  const [words, setWords] = useState<string[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${import.meta.env.BASE_URL}words.txt`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load the word list");
        return response.text();
      })
      .then((source) => setWords(parseWords(source)))
      .catch((reason: unknown) => {
        if (!(reason instanceof DOMException && reason.name === "AbortError")) {
          setError(true);
        }
      });

    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <main className="p-8 text-center text-red-500 font-semibold">
        No se pudo cargar la lista de palabras.
      </main>
    );
  }

  if (!words || words.length === 0) {
    return (
      <main className="p-8 text-center text-lg font-semibold">
        Cargando…
      </main>
    );
  }

  return (
    <main className="min-h-full h-full max-w-screen no-scrollbar overflow-x-hidden">
      <Wordle words={words} />
    </main>
  );
}
