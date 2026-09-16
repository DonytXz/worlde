import React from "react";
import BoardTile from "./BoardTile";
import { LetterStatus, Theme } from "@/types/game";
import { WORD_LENGTH } from "@/constants/game";

export interface CompletedRowProps {
  type: "completed";
  guess: string;
  evaluation: LetterStatus[];
  theme?: Theme;
}

export interface CurrentRowProps {
  type: "current";
  guess: string;
  theme?: Theme;
}

export interface EmptyRowProps {
  type: "empty";
  theme?: Theme;
}

export type BoardRowProps = CompletedRowProps | CurrentRowProps | EmptyRowProps;

export const BoardRow: React.FC<BoardRowProps> = (props) => {
  const { theme } = props;

  if (props.type === "completed") {
    return (
      <div className="flex gap-3">
        {Array.from({ length: WORD_LENGTH }).map((_, i) => (
          <BoardTile
            key={i}
            letter={props.guess[i] || ""}
            status={props.evaluation[i]}
            theme={theme}
          />
        ))}
      </div>
    );
  }

  if (props.type === "current") {
    return (
      <div className="flex gap-3">
        {Array.from({ length: WORD_LENGTH }).map((_, i) => (
          <BoardTile
            key={i}
            letter={props.guess[i] || ""}
            theme={theme}
          />
        ))}
      </div>
    );
  }

  // Empty row
  return (
    <div className="flex gap-3">
      {Array.from({ length: WORD_LENGTH }).map((_, i) => (
        <BoardTile key={i} letter="" theme={theme} />
      ))}
    </div>
  );
};

export default BoardRow;
