import React from "react";
import { GameCard } from "./GameCard";

export const WinState = ({
  topGameState,
  bottomGameState,
  allowedMoves,
  movesLeft,
}) => {
  // merge both states, remove any duplicates

  const sortedBottomState = bottomGameState.slice().reverse();
  const mergedGameState = [...topGameState, ...sortedBottomState].filter(
    (actor, index, self) =>
      index === self.findIndex((t) => t.item.id === actor.item.id)
  );

  console.log("mergedGameState", mergedGameState);

  return (
    <div className="flex-grow flex flex-col gap-2 items-center justify-center max-w-7xl mx-auto w-full">
      <span className="text-5xl text-emerald-500 font-bold">🥳 You Win!</span>
      <span className="text-white/80">{`You used ${
        allowedMoves - movesLeft
      } of the allowed ${allowedMoves} moves`}</span>

      <div className="flex   mx-auto my-12">
        {mergedGameState?.map((item, index) => {
          let isLast;
          if (origin === "top") {
            isLast = index === sortedState.length - 1;
          } else {
            isLast = index === 0;
          }

          return (
            <div className="flex items-center " key={index}>
              {/* if index is not 0, add  line */}
              {index !== 0 && (
                <div className="border-t-2 h-0 border-emerald-500/90 min-w-[30px] "></div>
              )}

              <div className="relative group">
                {item.type === "actor" ? (
                  <GameCard
                    type="actor"
                    item={item.item}
                    isClickable={false}
                    isStarting={
                      // true if it's first or last
                      index === mergedGameState.length - 1 || index === 0
                        ? true
                        : false
                    }
                  />
                ) : (
                  <GameCard
                    type="movie"
                    item={item.item}
                    isClickable={isLast ? true : false}
                    isStarting={false}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
