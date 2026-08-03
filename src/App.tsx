import { useEffect, useState } from "react";
import Wordle from "@/app/pages/Wordle";

const parseWords = (source: string) =>
  source
    .split(/\r?\n/)
    .map((word) => word.trim())
    .filter((word) => word.length === 5);

export default function App() {
  const [words, setWords] = useState<string[] | null>(null);
  const [error, setError] = useState(false);
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${import.meta.env.BASE_URL}words2.md`, { signal: controller.signal })
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
    return <main className="p-8 text-center">No se pudo cargar la lista de palabras.</main>;
  }

  if (!words) {
    return <main className="p-8 text-center">Cargando…</main>;
  }

  return (
    <main className="min-h-full h-full max-w-screen no-scrollbar overflow-x-hidden">
      <Wordle date={startedAt} words={words} />
    </main>
  );
}
