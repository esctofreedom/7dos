import dayjs from "dayjs";
import { CloudCog } from "lucide-react";

export const saveGameLocalStorage = (
  topGameState,
  bottomGameState,
  movesLeft
) => {
  const gameObj = {
    date: dayjs().format("MM/DD/YYYY"),
    topGameState,
    bottomGameState,
    movesLeft,
  };

  const localStorage = window.localStorage.getItem("7dos-today");

  const gameSave = JSON.parse(localStorage);

  if (gameSave && gameSave.date === dayjs().format("MM/DD/YYYY")) {
    // check if movesLeft is less than gameSave.movesLeft
    // if it is, replace gameSave.movesLeft with movesLeft

    if (movesLeft < gameSave.movesLeft) {
      console.log("saving game...");
      window.localStorage.setItem("7dos-today", JSON.stringify(gameObj));
    }
  } else {
    window.localStorage.setItem("7dos-today", JSON.stringify(gameObj));
  }
};
