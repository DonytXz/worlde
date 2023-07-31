import React from "react";
import Letter from "@/components/Board/Letter";

const Tutorial = (props: any) => {
  const handleClose = () => {
    props.type == "tutorial"
      ? props.setShow.setshowTutorial(false)
      : props.setShow.setshowStats(false);
  };

  return (
    <>
      <div id={props.theme} className="flex items-center h-full bg-transparent">
        <div
          id="tutorialContent"
          className="bg-white-gray z-30 min-w-[_546px] border-2 border-neutral-400 max-w-5xl py-5 px-10 flex flex-col rounded-lg"
        >
          <span className="text-medium text-center font-bold">Cómo jugar</span>
          <p className="pt-5 text-small">
            Adivina la palabra oculta en cinco intentos.
            <br />
            <br />
            Cada intento debe ser una palabra válida de 5 letras.
            <br />
            <br />
            Después de cada intento el color de las letras cambia para mostrar
            qué tan cerca estás de acertar la palabra.
          </p>
          <span className="font-bold text-small pt-2">Ejemplos</span>
          <div className="grid grid-cols-5 gap-x-4 w-fit mx-auto my-1">
            <Letter
              theme={props.theme}
              isTutorial={true}
              status="good"
              letter={"g"}
            />
            <Letter theme={props.theme} isTutorial={true} letter={"a"} />
            <Letter theme={props.theme} isTutorial={true} letter={"t"} />
            <Letter theme={props.theme} isTutorial={true} letter={"o"} />
            <Letter theme={props.theme} isTutorial={true} letter={"s"} />
          </div>
          <p className="text-small">
            La letra <span className="font-bold">G</span> está en la palabra y
            en la posición correcta.
          </p>
          <div className="grid grid-cols-5 gap-x-4 w-fit mx-auto my-1">
            <Letter theme={props.theme} isTutorial={true} letter={"v"} />
            <Letter theme={props.theme} isTutorial={true} letter={"o"} />
            <Letter
              theme={props.theme}
              isTutorial={true}
              status="warn"
              letter={"c"}
            />
            <Letter theme={props.theme} isTutorial={true} letter={"a"} />
            <Letter theme={props.theme} isTutorial={true} letter={"l"} />
          </div>
          <p className="text-small">
            La letra <span className="font-bold">C</span> está en la palabra
            pero en la posición incorrecta.
          </p>
          <div className="grid grid-cols-5 gap-x-4 w-fit mx-auto my-1">
            <Letter theme={props.theme} isTutorial={true} letter={"c"} />
            <Letter theme={props.theme} isTutorial={true} letter={"a"} />
            <Letter theme={props.theme} isTutorial={true} letter={"n"} />
            <Letter theme={props.theme} isTutorial={true} letter={"t"} />
            <Letter
              theme={props.theme}
              isTutorial={true}
              status={"none"}
              letter={"o"}
            />
          </div>
          <p className="text-small">
            La letra <span className="font-bold">O</span> no está en la palabra.
          </p>
          <br />
          <p className="text-small">
            Puede haber letras repetidas. Las pistas son independientes para
            cada letra.
          </p>
          <br />
          <p className="text-small text-center">
            ¡Una palabra nueva cada 5 minutos!
          </p>
          <button
            className="mt-5 bg-app-green w-[_263px] h-[_50px] mx-auto flex items-center justify-center"
            onClick={() => handleClose()}
          >
            <p className="text-white small-plus font-bold">!JUGAR¡</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Tutorial;
