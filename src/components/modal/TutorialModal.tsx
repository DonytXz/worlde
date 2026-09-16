import React from "react";
import BoardTile from "@/components/Board/BoardTile";
import { Theme, LetterStatus } from "@/types/game";

export interface TutorialModalProps {
  theme?: Theme;
  onClose: () => void;
}

interface ExampleRowProps {
  word: string;
  highlightIndex: number;
  status: LetterStatus;
  theme: Theme;
}

const TutorialExampleRow: React.FC<ExampleRowProps> = ({
  word,
  highlightIndex,
  status,
  theme,
}) => {
  return (
    <div className="grid grid-cols-5 gap-x-3 w-fit mx-auto my-2">
      {word.split("").map((char, index) => (
        <BoardTile
          key={index}
          theme={theme}
          isTutorial
          letter={char}
          status={index === highlightIndex ? status : undefined}
        />
      ))}
    </div>
  );
};

export const TutorialModal: React.FC<TutorialModalProps> = ({
  theme = "light",
  onClose,
}) => {
  return (
    <div id={theme} className="flex items-center justify-center p-2">
      <div
        id="tutorialContent"
        className="bg-white-gray z-30 w-full max-w-[546px] border border-neutral-300 dark:border-neutral-700 py-6 px-8 sm:px-10 flex flex-col rounded-xl shadow-2xl"
      >
        <h2 className="text-medium text-center font-bold">Cómo jugar</h2>
        <p className="pt-4 text-small leading-relaxed">
          Adivina la palabra oculta en cinco intentos.
          <br />
          <br />
          Cada intento debe ser una palabra válida de 5 letras.
          <br />
          <br />
          Después de cada intento el color de las letras cambia para mostrar
          qué tan cerca estás de acertar la palabra.
        </p>

        <span className="font-bold text-small pt-3">Ejemplos</span>

        <TutorialExampleRow
          word="gatos"
          highlightIndex={0}
          status="good"
          theme={theme}
        />
        <p className="text-small">
          La letra <span className="font-bold">G</span> está en la palabra y
          en la posición correcta.
        </p>

        <TutorialExampleRow
          word="vocal"
          highlightIndex={2}
          status="warn"
          theme={theme}
        />
        <p className="text-small">
          La letra <span className="font-bold">C</span> está en la palabra
          pero en la posición incorrecta.
        </p>

        <TutorialExampleRow
          word="canto"
          highlightIndex={4}
          status="none"
          theme={theme}
        />
        <p className="text-small">
          La letra <span className="font-bold">O</span> no está en la palabra.
        </p>

        <p className="text-small pt-4">
          Puede haber letras repetidas. Las pistas son independientes para
          cada letra.
        </p>
        <p className="text-small text-center font-medium pt-3">
          ¡Una palabra nueva cada 5 minutos!
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 bg-app-green hover:brightness-105 active:scale-95 transition-transform w-[263px] h-[50px] mx-auto flex items-center justify-center rounded-lg shadow cursor-pointer text-white text-xl font-bold tracking-wide"
        >
          !JUGAR¡
        </button>
      </div>
    </div>
  );
};

export default TutorialModal;
