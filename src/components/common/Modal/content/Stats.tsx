import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

const Stats = (props: any) => {
  const handleClose = () => {
    props.type == "tutorial"
      ? props.setShow.setshowTutorial(false)
      : props.setShow.setshowStats(false);
  };
  const [reset, setReset] = useState(1);

  useEffect(() => {
    if(props.prev != ""){
      setReset(reset+1);
    }
  }, [])
  
  useEffect(() => {
    if(props.newDate !=  props.date){
      //on unmont - destroy clean the prev word
      return () => {
        props.setPrevWord("");
      }
    }
  }, [props.newDate])
  
  

  return (
    <>
      <div id={props.props} className="flex items-center h-full">
        <div
          id="statsContent"
          className="bg-white-gray min-w-[_546px] max-w-5xl py-5 px-10 flex flex-col my-auto rounded-lg"
        >
          <span className="text-medium text-center font-bold">
            Estadísticas
          </span>
          <div className="flex justify-between">
            <div className="flex flex-col px-2">
              <div className="text-medium text-center font-bold">
                {props.games.games}
              </div>
              <div>Jugadas</div>
            </div>
            <div className="flex flex-col px-2">
              <div className="text-medium text-center font-bold">
                {props.wins.wins}
              </div>
              <div>Victorias</div>
            </div>
          </div>
          <span className="text-center">SIGUIENTE PALABRA</span>
          <p className="font-bold text-center">
            <Countdown key={reset} date={props.newDate !=  props.date ? props.newDate + 300000 : props.date + 300000} />
          </p>
          {props.prevWord ? (
            <p className="font-bold text-center text-xl py-6">
              La palabra era:{" "}
              <span className="text-2xl">{props.prevWord}</span>
            </p>
          ) : (
            ""
          )}

          <button
            className="mt-5 bg-app-green w-[_263px] h-[_50px] mx-auto flex items-center justify-center"
            onClick={() => handleClose()}
          >
            <p className="text-white small-plus font-bold">Aceptar</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Stats;
