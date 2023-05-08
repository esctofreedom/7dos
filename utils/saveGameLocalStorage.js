import dayjs from "dayjs";

export const saveGameLocalStorage = (movesTaken) => {
  const gameObj = {
    date: dayjs().format("MM/DD/YYYY"),
    hasWon: true,
    movesTaken,
  };

  const gameHistory = JSON.parse(localStorage.getItem("7dos"));

  if (gameHistory) {
    gameHistory.push(gameObj);
    localStorage.setItem("7dos", JSON.stringify(gameHistory));
  } else {
    localStorage.setItem("7dos", JSON.stringify([gameObj]));
  }
};
