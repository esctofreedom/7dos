export const WinState = ({
  topGameState,
  bottomGameState,
  allowedMoves,
  movesLeft,
}) => {
  // merge both states, remove any duplicates

  // const sortedBottomState = bottomGameState.slice().reverse();
  // const mergedGameState = [...topGameState, ...sortedBottomState].filter(
  //   (actor, index, self) =>
  //     index === self.findIndex((t) => t.item.id === actor.item.id)
  // );

  return (
    <div className=" flex flex-col gap-2 items-center justify-center max-w-7xl mx-auto w-full">
      <span className="text-5xl text-emerald-500 font-bold">🥳 You Win!</span>
      <span className="text-white/80">{`You used ${
        allowedMoves - movesLeft
      } of the allowed ${allowedMoves} moves`}</span>
    </div>
  );
};
