import React from "react";
import Letter from "@/components/Board/Letter";

interface TutorialProps {
  theme?: "light" | "dark";
  onClose?: () => void;
  // Backward compatibility with previous prop signature
  setShow?: {
    setshowTutorial: (val: boolean) => void;
    setshowStats?: (val: boolean) => void;
  };
}

const Tutorial: React.FC<TutorialProps> = ({ theme = "light", onClose, setShow }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (setShow?.setshowTutorial) {
      setShow.setshowTutorial(false);
    }
  };

  return (
    <div id={theme} className="flex items-center justify-center p-2">
      <div
        id="tutorialContent"
        className="bg-white-gray z-30 w-full max-w-[546px] border border-neutral-300 dark:border-neutral-700 py-6 px-8 sm:px-10 flex flex-col rounded-xl shadow-2xl"
      >
        <span className="text-medium text-center font-bold">Cómo jugar</span>
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

        <div className="grid grid-cols-5 gap-x-3 w-fit mx-auto my-2">
          <Letter theme={theme} isTutorial={true} status="good" letter={"g"} />
          <Letter theme={theme} isTutorial={true} letter={"a"} />
          <Letter theme={theme} isTutorial={true} letter={"t"} />
          <Letter theme={theme} isTutorial={true} letter={"o"} />
          <Letter theme={theme} isTutorial={true} letter={"s"} />
        </div>
        <p className="text-small">
          La letra <span className="font-bold">G</span> está en la palabra y
          en la posición correcta.
        </p>

        <div className="grid grid-cols-5 gap-x-3 w-fit mx-auto my-2">
          <Letter theme={theme} isTutorial={true} letter={"v"} />
          <Letter theme={theme} isTutorial={true} letter={"o"} />
          <Letter theme={theme} isTutorial={true} status="warn" letter={"c"} />
          <Letter theme={theme} isTutorial={true} letter={"a"} />
          <Letter theme={theme} isTutorial={true} letter={"l"} />
        </div>
        <p className="text-small">
          La letra <span className="font-bold">C</span> está en la palabra
          pero en la posición incorrecta.
        </p>

        <div className="grid grid-cols-5 gap-x-3 w-fit mx-auto my-2">
          <Letter theme={theme} isTutorial={true} letter={"c"} />
          <Letter theme={theme} isTutorial={true} letter={"a"} />
          <Letter theme={theme} isTutorial={true} letter={"n"} />
          <Letter theme={theme} isTutorial={true} letter={"t"} />
          <Letter theme={theme} isTutorial={true} status={"none"} letter={"o"} />
        </div>
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
          className="mt-6 bg-app-green hover:brightness-105 active:scale-95 transition-transform w-[263px] h-[50px] mx-auto flex items-center justify-center rounded-lg shadow cursor-pointer"
          onClick={handleClose}
        >
          <p className="text-white text-xl font-bold tracking-wide">!JUGAR¡</p>
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
