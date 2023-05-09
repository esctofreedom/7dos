import React from "react";
import { GameCard } from "./GameCard";

export const LostState = ({ topGameState, bottomGameState }) => {
  // merge both states, remove any duplicates

  const sortedBottomState = bottomGameState.slice().reverse();
  const mergedGameState = [...topGameState, ...sortedBottomState].filter(
    (actor, index, self) =>
      index === self.findIndex((t) => t.item.id === actor.item.id)
  );

  return (
    <div className=" flex flex-col gap-2 items-center justify-center max-w-7xl mx-auto w-full">
      <span className="text-5xl text-rose-500 font-bold">😭 You Lost...</span>
      <span className="text-white/80">{`You have used up all your moves`}</span>
    </div>
  );
};
