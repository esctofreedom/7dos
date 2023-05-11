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
import { gameEndedLocalStorage } from "../utils/gameEndedLocalStorage";
import { checkLost } from "../utils/checkLost";
import { LostState } from "../components/game/LostState";
import { saveGameLocalStorage } from "../utils/saveGameLocalStorage";
import { checkGameSave } from "../utils/checkGameSave";
import { filterActorData } from "../utils/filterActorData";

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
    const url = `${baseUrl}person/${actorId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=credits,images`;

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
  const [topGameState, setTopGameState] = useState([]);

  const [bottomGameState, setBottomGameState] = useState([]);

  // const [topGameState, setTopGameState] = useState([
  //   filterActorData(startingActor),
  // ]);

  // const [bottomGameState, setBottomGameState] = useState([
  //   filterActorData(endingActor),
  // ]);

  // check if game save for today exists
  // if it does, load it

  const allowedMoves = 7;
  const [movesLeft, setMovesLeft] = useState(allowedMoves);

  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  // CHECK WIN
  useEffect(() => {
    // Returns boolean
    const win = checkWin(
      bottomGameState,
      topGameState,
      startingActor,
      endingActor
    );

    let lost;
    if (win) {
      gameEndedLocalStorage(true, 7 - movesLeft);
      setHasWon(true);
      // lost = checkLost(true, movesLeft);
    } else {
      lost = checkLost(false, movesLeft);
      if (lost) {
        gameEndedLocalStorage(false, 0);
        setHasLost(true);
      }
    }

    saveGameLocalStorage(topGameState, bottomGameState, movesLeft);

    // console.log("STATES CHANGED!!!", topGameState, bottomGameState, movesLeft);

    // if (movesLeft === 0 && !win) {
    //   alert("You Lose!");
    // }
  }, [bottomGameState, topGameState]);

  useEffect(() => {
    checkGameSave(
      setTopGameState,
      setBottomGameState,
      setMovesLeft,
      startingActor,
      endingActor
    );
  }, []);

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
      {!hasWon && !hasLost && (
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
      {hasWon && (
        <WinState
          topGameState={topGameState}
          bottomGameState={bottomGameState}
          allowedMoves={allowedMoves}
          movesLeft={movesLeft}
        />
      )}

      {hasLost && (
        <LostState
          topGameState={topGameState}
          bottomGameState={bottomGameState}
        />
      )}
      <GameState
        topState={topGameState}
        bottomState={bottomGameState}
        setTopState={setTopGameState}
        setBottomState={setBottomGameState}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        setSelectedItem={setSelectedItem}
        movesLeft={movesLeft}
        setMovesLeft={setMovesLeft}
        hasWon={hasWon}
        hasLost={hasLost}
      />
    </div>
  );
};

export default Game;
