"use client";
import React, { useEffect, useState } from "react";
import Digit from "./Digit";

const Keyboard = (props: any) => {
  const queryKeyboard: Array<string> = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "ñ",
    "enter",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "delete",
  ];
  const [digit, setDigit] = useState();
  const [counter, setCounter] = useState(0);
  const [deleteCounter, setDeleteCounter] = useState(0);
  const fristRow: Array<any> = [];
  const secondRow: Array<any> = [];
  const lastRow: Array<any> = [];
  let findArrAux: any = [];

  const getWord = (): string => {
    const rowsLength: number = props.rows.length;
    const rows = props.rows;
    let word: string = "";
    if (rowsLength <= 5) {
      const row: string = rows.join("");
      word = row;
    } else if (rowsLength <= 10 && rowsLength > 5) {
      const row: string = rows.slice(5, 10).join("");
      word = row;
    } else if (rowsLength <= 15 && rowsLength > 10) {
      const row: string = rows.slice(10, 15).join("");
      word = row;
    } else if (rowsLength <= 20 && rowsLength > 15) {
      const row: string = rows.slice(15, 20).join("");
      word = row;
    } else if (rowsLength <= 25 && rowsLength > 20) {
      const row: string = rows.slice(20, 25).join("");
      word = row;
    }
    return word;
  };

  const setWin = () =>{
    props.wins.setWins(props.wins.wins+1);
  }

  const setGame = () =>{
    props.games.setGames(props.games.games+1);
  }
  const compareWords = () => {
    findArrAux = [];
    const word = getWord().trim();
    const includes = props.currentWChartArr?.some(
      (element: any, index: number) => {
        const wordCharacter = word[index];
        return element.localeCompare(wordCharacter, "es", {
          sensitivity: "base",
        }) != 0
          ? false
          : true;
      }
    );

    props.currentWChartArr?.map((element: string, index: number) => {
      const wordCharacter = word[index];
      const atPosition = element.localeCompare(wordCharacter, "es", {
        sensitivity: "base",
      });
      if (atPosition == 0) {
        findArrAux.push("good");
      } else if (includes) {
        findArrAux.push("warn");
      } else {
        findArrAux.push("none");
      }
    });
    const isWin = findArrAux.every((element:any) => element == "good");
    if(isWin){
      setWin();
      setGame();
      props.setshowStats(true);
    }
    props.findChart.setChartFind([...props.findChart.chartFind, findArrAux]);
  };

  queryKeyboard.map((element: string, index: number, array: any) => {
    if (index < 10) {
      fristRow.push(
        <Digit
          theme={props.theme}
          compare={compareWords}
          digitCounter={{ counter, setCounter }}
          set={setDigit}
          digit={element}
          key={index}
        />
      );
    } else if (index <= 19) {
      secondRow.push(
        <Digit
          theme={props.theme}
          compare={compareWords}
          digitCounter={{ counter, setCounter }}
          set={setDigit}
          digit={element}
          key={index}
        />
      );
    } else {
      lastRow.push(
        <Digit
          theme={props.theme}
          compare={compareWords}
          deleteCounter={{ deleteCounter, setDeleteCounter }}
          digitCounter={{ counter, setCounter }}
          set={setDigit}
          digit={element}
          key={index}
        />
      );
    }
  });

  useEffect(() => {
    if (digit) {
      if (digit == "delete" && props.rows.length > 0) {
        props.setRows((prevArr: Array<string>) => prevArr.slice(0, -1));
        props.findChart.setChartFind((prevArr: Array<string>) =>
          prevArr.slice(0, -1)
        );
      } else if (
        digit == "enter" &&
        props.rows.length > 0 &&
        props.rows.length % 5 == 0
      ) {
      } else if (digit != "delete" && digit != "enter") {
        props.setRows([...props.rows, digit]);
      }
    }
  }, [digit, counter, deleteCounter]);

  useEffect(() => {
    if (props.rows.length > 0 && props.rows.length % 5 == 0) {
      compareWords();
    }
  }, [props.rows]);

  return (
    <>
      <div
        className={`flex flex-col w-[_638px] h-[_238px] ${
          props.theme == "light" ? "bg-gray-ligth" : "bg-app-gray-keyboard"
        }  mx-auto items-center rounded-2xl`}
      >
        <div className="my-auto">
          <div className="grid grid-cols-[repeat(_10,_44.5px)] grid-rows-1 gap-2 mx-auto pl-6">
            {fristRow.length == queryKeyboard.length - 19 ? fristRow : <></>}
          </div>
          <div className="grid grid-cols-[repeat(_10,_44.5px)] grid-rows-1 gap-2 mx-auto pt-2 pl-10">
            {secondRow.length == queryKeyboard.length - 19 ? secondRow : <></>}
          </div>
          <div className="grid lastKeyboardRow grid-rows-1 gap-2 mx-auto pt-2">
            {lastRow.length == queryKeyboard.length - 20 ? lastRow : <></>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Keyboard;
