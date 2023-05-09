import dayjs from "dayjs";
import React from "react";

export const checkGameSave = (
  setTopGameState,
  setBottomGameState,
  setMovesLeft
) => {
  const gameSave = JSON.parse(localStorage.getItem("7dos-today"));

  // check if it's today
  if (gameSave && gameSave.date === dayjs().format("MM/DD/YYYY")) {
    // load gameSave
    const topGameState = gameSave.topGameState;
    const bottomGameState = gameSave.bottomGameState;
    const movesLeft = gameSave.movesLeft;

    // load gameSave into state
    setTopGameState(topGameState);
    setBottomGameState(bottomGameState);
    setMovesLeft(movesLeft);
  }
};
