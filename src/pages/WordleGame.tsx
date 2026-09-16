import React from "react";
import Header from "@/components/header/Header";
import Board from "@/components/Board/Board";
import Keyboard from "@/components/Keyboard/Keyboard";
import Modal from "@/components/modal/Modal";
import StatsModal from "@/components/modal/StatsModal";
import TutorialModal from "@/components/modal/TutorialModal";

import { useTheme } from "@/hooks/useTheme";
import { useGameStats } from "@/hooks/useGameStats";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useWordleGame } from "@/hooks/useWordleGame";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { markTutorialAsSeen } from "@/utils/wordle";

export interface WordleGameProps {
  words: string[];
}

export const WordleGame: React.FC<WordleGameProps> = ({ words }) => {
  // Theme state
  const { theme, toggleTheme } = useTheme();

  // Statistics state
  const { stats, recordResult } = useGameStats();

  // Modal disclosures: requirement 2 specifies showing instructions on first load
  const tutorialModal = useDisclosure(true);
  const statsModal = useDisclosure(false);

  // Close tutorial handler marking it as seen
  const handleCloseTutorial = () => {
    tutorialModal.close();
    markTutorialAsSeen();
  };

  // Core Wordle game logic
  const {
    solution,
    guesses,
    evaluations,
    currentGuess,
    gameStatus,
    keyStatuses,
    nextWordTime,
    addLetter,
    deleteLetter,
    submitGuess,
  } = useWordleGame({
    words,
    onGameWon: () => {
      recordResult(true);
      setTimeout(statsModal.open, 500);
    },
    onGameLost: () => {
      recordResult(false);
      setTimeout(statsModal.open, 500);
    },
  });

  const isInputDisabled =
    gameStatus !== "IN_PROGRESS" || tutorialModal.isOpen || statsModal.isOpen;

  // Listen for physical keyboard input
  useKeyboardInput({
    onLetter: addLetter,
    onDelete: deleteLetter,
    onEnter: () => submitGuess(),
    disabled: isInputDisabled,
  });

  return (
    <div
      id={theme}
      className="min-h-screen h-full max-w-screen no-scrollbar overflow-x-hidden main flex flex-col justify-between"
    >
      <div className="flex flex-col px-4 sm:px-10 py-6 sm:py-8 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="pb-8">
          <Header
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenTutorial={tutorialModal.open}
            onOpenStats={statsModal.open}
          />
        </div>

        {/* Board */}
        <div className="pb-8 mx-auto flex justify-center w-full">
          <Board
            guesses={guesses}
            evaluations={evaluations}
            currentGuess={currentGuess}
            theme={theme}
          />
        </div>

        {/* Virtual Keyboard */}
        <div className="flex flex-col justify-center w-full">
          <Keyboard
            onLetter={addLetter}
            onDelete={deleteLetter}
            onEnter={() => submitGuess()}
            keyStatuses={keyStatuses}
            theme={theme}
            disabled={isInputDisabled}
          />
        </div>
      </div>

      {/* Tutorial Modal */}
      {tutorialModal.isOpen && (
        <Modal onClose={handleCloseTutorial}>
          <TutorialModal theme={theme} onClose={handleCloseTutorial} />
        </Modal>
      )}

      {/* Stats Modal */}
      {statsModal.isOpen && (
        <Modal onClose={statsModal.close}>
          <StatsModal
            stats={stats}
            nextWordTime={nextWordTime}
            solution={solution}
            gameStatus={gameStatus}
            theme={theme}
            onClose={statsModal.close}
          />
        </Modal>
      )}
    </div>
  );
};

export default WordleGame;
