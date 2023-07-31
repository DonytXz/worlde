"use client";
import React from "react";
import Letter from "./Letter";

const Board = (props: any) => {
  let userLettersInput: any = [];
  const defaultPlaces: any = [];
  let pos: any = 0;
  let startingElement = 0;
  const statusArr = props.chartFind;
  const rows = props.rows;

  const configureDefaultPlaces = () => {
    for (let i = 0; i < 25; i++) {
      defaultPlaces.push(<Letter key={i} />);
    }
  };
  configureDefaultPlaces();
  
  rows.map((rowCharacter: any, index: number) => {
    if (index + 1 <= 5) {
      pos = 0;
      startingElement = 0;
    } else if (index + 1 <= 10) {
      pos = 1;
      startingElement = 5;
    } else if (index + 1 <= 15) {
      pos = 2;
      startingElement = 10;
    } else if (index + 1 <= 20) {
      pos = 3;
      startingElement = 15;
    } else if (index + 1 <= 25) {
      pos = 4;
      startingElement = 20;
    }
    const calc = index - startingElement;

    let status = false;
    console.log(calc >= 0, calc, {index}, {startingElement}, {pos}, [rowCharacter]);
    
    if (calc >= 0) {
      const statusRow = statusArr?.[pos];
      const statusElement = statusRow?.[calc];
      status = statusElement;
    }
    
    

    userLettersInput.push(
      <Letter status={status} letter={rowCharacter} key={index} />
    );
    defaultPlaces.pop();
  });

  return (
    <>
      <div className="grid grid-cols-[repeat(_5,_75px)] grid-rows-5 gap-3 mx-auto">
        {userLettersInput}
        {defaultPlaces}
      </div>
    </>
  );
};

export default Board;
