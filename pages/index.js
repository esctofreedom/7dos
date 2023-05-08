import React, { useEffect, useState } from "react";

import axios from "axios";
import { GameState } from "../components/game/GameState";
import { MovesLeft } from "../components/game/MovesLeft";
import { MovieDrawer } from "../components/game/MovieDrawer";
import { checkWin } from "../utils/checkWin";
import { WinState } from "../components/game/WinState";
import ConfettiExplosion from "react-confetti-explosion";
import { testTopData, testBottomData } from "../utils/testData";
import dayjs from "dayjs";
import { saveGameLocalStorage } from "../utils/saveGameLocalStorage";

export async function getServerSideProps({ query }) {
  const { starting, ending } = query;

  console.log("starting", starting);
  console.log("ending", ending);
  const dateToday = dayjs().format("YYYY-MM-DD");
  // find file inside of puzzls folder that matches today's date
  const puzzleData = require(`../puzzles/${dateToday}.json`);

  let startingActorId, endingActorId;
  if (starting !== undefined && ending !== undefined) {
    startingActorId = starting; //puzzleData.source_tvdb_id; //10980;
    endingActorId = ending; //puzzleData.target_tvdb_id; //521;
  } else {
    startingActorId = puzzleData.source_tvdb_id; //10980;
    endingActorId = puzzleData.target_tvdb_id; //521;
  }

  const baseUrl = "https://api.themoviedb.org/3/";

  const getActorData = async (actorId) => {
    const url = `${baseUrl}person/${actorId}?api_key=${process.env.API_KEY}&append_to_response=credits,images`;

    const response = await axios.get(url);
    const actor = response.data;

    return actor;
  };

  const startingActor = await getActorData(startingActorId);
  const endingActor = await getActorData(endingActorId);

  return {
    props: {
      startingActor,
      endingActor,
    },
  };
}

const Game = ({ startingActor, endingActor }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isTesting = false;
  const [topGameState, setTopGameState] = useState(
    isTesting
      ? testTopData
      : [
          {
            type: "actor",
            item: startingActor,
            data: startingActor.credits.cast,
          },
        ]
  );

  const [bottomGameState, setBottomGameState] = useState(
    isTesting
      ? testBottomData
      : [
          {
            type: "actor",
            item: endingActor,
            data: endingActor.credits.cast,
          },
        ]
  );

  const allowedMoves = 7;
  const [movesLeft, setMovesLeft] = useState(allowedMoves);

  // function that checks if the actor is in the game state matches starting or ending actor

  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const win = checkWin(
      bottomGameState,
      topGameState,
      startingActor,
      endingActor
    );

    if (win) {
      saveGameLocalStorage(7 - movesLeft);
      setHasWon(true);
    }

    // if (movesLeft === 0 && !win) {
    //   alert("You Lose!");
    // }
  }, [bottomGameState, topGameState]);

  // get localstporage with key "7dos"

  // wait until
  if (typeof window !== "undefined") {
    const history = JSON.parse(localStorage.getItem("7dos"));
    console.log("history", history);
  }

  return (
    <div className="flex flex-col items-center justify-center   flex-grow ">
      {/* Drawer for Actor's Movies */}
      {hasWon && (
        <ConfettiExplosion
          force={0.8}
          duration={3000}
          width={1600}
          particleCount={500}
        />
      )}
      {selectedItem != null && (
        <MovieDrawer
          type={selectedItem.type}
          selectedItem={selectedItem}
          topGameState={topGameState}
          bottomGameState={bottomGameState}
          setTopGameState={setTopGameState}
          setBottomGameState={setBottomGameState}
          movesLeft={movesLeft}
          setMovesLeft={setMovesLeft}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      )}
      {!hasWon && (
        <>
          <MovesLeft allowedMoves={allowedMoves} movesLeft={movesLeft} />
          {/* <button
            className="px-2 py-1 h-min bg-blue-500 hover:bg-blue-400 text-white rounded-md text-xs"
            onClick={() => {
              setHasWon(true);
            }}
          >
            Win It
          </button> */}
        </>
      )}
      {/* Top game State */}
      {!hasWon && (
        <GameState
          topState={topGameState}
          bottomState={bottomGameState}
          setTopState={setTopGameState}
          setBottomState={setBottomGameState}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          setSelectedItem={setSelectedItem}
        />
      )}

      {hasWon && (
        <WinState
          topGameState={topGameState}
          bottomGameState={bottomGameState}
          allowedMoves={allowedMoves}
          movesLeft={movesLeft}
        />
      )}
    </div>
  );
};

export default Game;
