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

  if (localStorage) {
    const gameSave = JSON.parse(localStorage);

    if (gameSave.date === dayjs().format("MM/DD/YYYY")) {
      // check if movesLeft is less than gameSave.movesLeft
      // if it is, replace gameSave.movesLeft with movesLeft

      console.log("TODAYY");

      if (movesLeft < gameSave.movesLeft || !gameSave.movesLeft) {
        console.log("SAVE MEEE PLEASE!");
        window.localStorage.setItem("7dos-today", JSON.stringify(gameObj));
      }
    }
  } else {
    console.log("NOT TODAY");

    if (topGameState.length > 0 && bottomGameState.length > 0) {
      window.localStorage.setItem("7dos-today", JSON.stringify(gameObj));
    }
    // window.localStorage.setItem("7dos-today", JSON.stringify(gameObj));
  }
};
