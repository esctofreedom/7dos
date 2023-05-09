import dayjs from "dayjs";

export const gameEndedLocalStorage = (hasWon, movesTaken) => {
  const today = dayjs().format("MM/DD/YYYY");
  const gameObj = {
    date: today,
    hasWon: hasWon,
    movesTaken,
  };

  const gameHistory = JSON.parse(localStorage.getItem("7dos"));

  //check if there is already a gameHistory with today as its date
  if (gameHistory && gameHistory.length > 0) {
    const todayGame = gameHistory.find((game) => game.date === today);
    if (todayGame) {
      // if there is, skip
      return;
    }
  }

  if (gameHistory) {
    gameHistory.push(gameObj);
    localStorage.setItem("7dos", JSON.stringify(gameHistory));
  } else {
    localStorage.setItem("7dos", JSON.stringify([gameObj]));
  }
};
