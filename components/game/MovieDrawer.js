import React from "react";
import { Drawer } from "../ui/Drawer";
import { MovieDock } from "./MovieDock";

export const MovieDrawer = ({
  type,
  selectedItem,
  topGameState,
  bottomGameState,
  setTopGameState,
  setBottomGameState,
  movesLeft,
  setMovesLeft,
  drawerOpen,
  setDrawerOpen,
}) => {
  const isTopState = topGameState.find(
    (actor) => actor.item.id === selectedItem.item.id
  );

  const gameState = isTopState ? topGameState : bottomGameState;
  const setGameState = isTopState ? setTopGameState : setBottomGameState;

  return (
    <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
      <div className="flex flex-col items-center justify-start">
        {/* Actor or Movie Image */}
        <div>
          {type === "actor" ? (
            <div className="h-[100px]  rounded-xl overflow-clip  bg-gray-200 border-emerald-500 border-2">
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedItem.item.profile_path}`}
                alt={selectedItem.item.name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-[100px]  rounded-xl overflow-clip  bg-gray-200 border-emerald-500 border-2">
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedItem.item.poster_path}`}
                alt={selectedItem.item.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="min-h-[30px] border-r-2 w-2/4 border-emerald-500 border-dashed "></div>
        </div>
        <MovieDock
          type={type}
          items={selectedItem.data}
          setDrawerOpen={setDrawerOpen}
          gameState={gameState}
          setGameState={setGameState}
          movesLeft={movesLeft}
          setMovesLeft={setMovesLeft}
        />
      </div>
    </Drawer>
  );
};
