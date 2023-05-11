import dayjs from "dayjs";
import { filterActorData } from "./filterActorData";

export const checkGameSave = (
  setTopGameState,
  setBottomGameState,
  setMovesLeft,
  startingActor,
  endingActor
) => {
  if (typeof window !== "undefined") {
    // check if game save exists in local storage
    const save = JSON.parse(localStorage.getItem("7dos-today"));

    // check if date is today

    if (save && save.date === dayjs().format("MM/DD/YYYY")) {
      console.log("found saved game from today");

      console.log("save moves left", save.movesLeft);
      if (save.topGameState.length === 0) {
        setTopGameState([filterActorData(startingActor)]);
      } else {
        setTopGameState(save.topGameState);
      }
      if (save.bottomGameState.length === 0) {
        setBottomGameState([filterActorData(endingActor)]);
      } else {
        setBottomGameState(save.bottomGameState);
      }
      
      setMovesLeft(save.movesLeft);
    } else {
      console.log("no saved game found. saving today's starting and ending");

      setTopGameState([filterActorData(startingActor)]);
      setBottomGameState([filterActorData(endingActor)]);
    }
  }
};
