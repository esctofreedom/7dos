import React from "react";

export const MovesLeft = ({ allowedMoves, movesLeft }) => {
  // reder an array of circles based on moves left
  const circles = Array(allowedMoves)
    .fill()
    .map((_, i) => {
      return (
        <div
          key={i}
          className={`h-4 w-4 rounded-full ${
            i < movesLeft ? "bg-emerald-500" : "bg-slate-400/50"
          }`}
        />
      );
    })
    .reverse();
  return (
    <div className="flex flex-col justify-center items-center gap-1 my-2">
      <div className="flex flex-row gap-1 justify-center items-center ">
        {circles}
      </div>
      <span className="font-semibold">{movesLeft} moves left</span>
    </div>
  );
};
