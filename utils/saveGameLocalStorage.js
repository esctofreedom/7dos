import dayjs from "dayjs";

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

      console.log("day 1", gameSave.date);
      console.log("day 2", dayjs().format("MM/DD/YYYY"));

      console.log("TODAYY");

      console.log("movesLeft", movesLeft);
      console.log("gameSave.movesLeft", gameSave.movesLeft);
      if (movesLeft < gameSave.movesLeft || !gameSave.movesLeft) {
        console.log("SAVE MEEE PLEASE!");
        window.localStorage.setItem("7dos-today", JSON.stringify(gameObj));
      }
    } else {
      console.log("NOT TODAY");

      // delete
      window.localStorage.removeItem("7dos-today");
      window.localStorage.setItem("7dos-today", JSON.stringify(gameObj));
    }
  } else {
    console.log("NO LOCAL STORAGE. CREATING SAVE GAME");
    window.localStorage.setItem("7dos-today", JSON.stringify(gameObj));
  }
};
