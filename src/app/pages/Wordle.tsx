"use client";
import Board from "@/components/Board/Board";
import Letter from "@/components/Board/Letter";
import Header from "@/components/Header";
import Keyboard from "@/components/Keyboard/Keyboard";
import Modal from "@/components/common/Modal/Modal";
import Stats from "@/components/common/Modal/content/Stats";
import Tutorial from "@/components/common/Modal/content/Tutorial";

import React, { useEffect, useState } from "react";

const Wordle = (props: any) => {
  const [showTutorial, setshowTutorial] = useState(false);
  const [showStats, setshowStats] = useState(false);
  const [rows, setRows] = useState([]);
  const [chartFind, setChartFind] = useState([]);
  const [games, setGames] = useState(0);
  const [wins, setWins] = useState(0);
  const [prevWord, setPrevWord] = useState("");
  const [currentWChartArr2, setCurrentWChartArr2] = useState("");
  // const currentWChartArr2 = "herbé".split(""); //test
  const [theme, setTheme] = useState("light");
  const [newDate, setNewDate] = useState(props.date);

  useEffect(() => {
    setshowTutorial(true);
  }, []);

  useEffect(() => {
    setNewDate(Date.now());
    choseWord();
    setPrevWord(currentWChartArr2.slice());
    setChartFind([]);
    setRows([]);
  }, [wins]);
  function choseWord() {
    let currentWordAux: any = { val: "", idx: null };
    let coppyObj: any = {};
    if (props.words.length > 0) {
      currentWordAux.idx = Math.floor(Math.random() * props.words.length);
      currentWordAux.val = props.words[currentWordAux.idx];
      props.words.splice(currentWordAux.idx, 1);

      coppyObj = Object.assign(coppyObj, currentWordAux);
      Object.assign(coppyObj, currentWordAux);
    }
    setCurrentWChartArr2(coppyObj.val?.split(""));
  }

  useEffect(() => {
    const victoryArrr: Array<string> = ["good", "good", "good", "good", "good"];
    chartFind.map((statusRow: any) => {
      if (chartFind.length == 5) {
        const isGame: any = !(chartFind as Array<Array<string>>).includes(
          victoryArrr
        );
        if (isGame) {
          setNewDate(Date.now());
          setPrevWord(currentWChartArr2.slice());
          setRows([]);
          setChartFind([]);
          setshowStats(true);
          choseWord();
        }
      }
    });
  }, [chartFind]);

  useEffect(() => {
    choseWord();
    const interval = setInterval(() => {
      setNewDate(Date.now());
      choseWord();
      setPrevWord(currentWChartArr2.slice());
      setChartFind([]);
      setRows([]);
      setGames(games + 1);
      setshowStats(true);
    // }, 5000); //test
    }, 300000); //5min
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        id={theme}
        className="min-h-screen h-full max-w-screen no-scrollbar overflow-x-hidden main"
      >
        <div className="flex flex-col px-10 py-10">
          <div className="pb-8">
            <Header
              setTheme={setTheme}
              theme={theme}
              handleModal={{
                tutorial: { set: setshowTutorial, val: showTutorial },
                stats: { set: setshowStats, val: showStats },
              }}
            />
          </div>

          <div className="pb-6 mx-auto flex">
            <Board
              currentWChartArr={currentWChartArr2}
              chartFind={chartFind}
              rows={rows}
            />
          </div>
          <div className="flex flex-col justify-center">
            <Keyboard
              currentWChartArr={currentWChartArr2}
              findChart={{ chartFind, setChartFind }}
              rows={rows}
              setRows={setRows}
              theme={theme}
              games={{ games, setGames }}
              wins={{ wins, setWins }}
              setshowStats={setshowStats}
              choseWord={choseWord}
            />
          </div>
        </div>
        {showTutorial ? (
          <Modal
            setShow={{ setshowTutorial, setshowStats }}
            type={"tutorial"}
            theme={theme}
          >
            <Tutorial
              setShow={{ setshowTutorial, setshowStats }}
              type={"tutorial"}
              theme={theme}
            />
          </Modal>
        ) : (
          <></>
        )}
        {showStats ? (
          <Modal setShow={{ setshowStats, setshowTutorial }} type={"stats"}>
            <Stats
              games={{ games, setGames }}
              wins={{ wins, setWins }}
              setShow={{ setshowTutorial, setshowStats }}
              type={"stats"}
              prevWord={prevWord}
              setPrevWord={setPrevWord}
              date={props.date}
              newDate={newDate}
              currentWChartArr2={currentWChartArr2}
            />
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Wordle;
