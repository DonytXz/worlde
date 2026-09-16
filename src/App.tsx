import WordleGame from "@/pages/WordleGame";
import { useWordList } from "@/hooks/useWordList";

export default function App() {
  const { words, loading, error } = useWordList();

  if (error) {
    return (
      <main className="p-8 text-center text-red-500 font-semibold">
        No se pudo cargar la lista de palabras.
      </main>
    );
  }

  if (loading || words.length === 0) {
    return (
      <main className="p-8 text-center text-lg font-semibold">
        Cargando…
      </main>
    );
  }

  return (
    <main className="min-h-full h-full max-w-screen no-scrollbar overflow-x-hidden">
      <WordleGame words={words} />
    </main>
  );
}
