export const checkWin = (
  bottomGameState,
  topGameState,
  startingActor,
  endingActor
) => {
  // console log all
  console.log("WIIIIIIIIIN");
  console.log("bottomGameState", bottomGameState);
  console.log("topGameState", topGameState);
  console.log("startingActor", startingActor.name);
  console.log("endingActor", endingActor.name);

  // exclude first item in both arrays
  const bottomGameStateWithoutFirstItem = bottomGameState.slice(1);
  const topGameStateWithoutFirstItem = topGameState.slice(1);
  // merge
  const mergedGameState = [
    ...bottomGameStateWithoutFirstItem,
    ...topGameStateWithoutFirstItem,
  ];

  // check if starting actor  or ending actor is in merged game state
  const startingActorInGameState = mergedGameState.some(
    (actor) => actor.item.id === startingActor.id
  );
  const endingActorInGameState = mergedGameState.some(
    (actor) => actor.item.id === endingActor.id
  );

  // get all items from last item in bottom game state
  const lastBottom = bottomGameState[bottomGameState.length - 1];
  const lastTop = topGameState[topGameState.length - 1];

  // check if lastBottom and lastTop are the same type
  const sameType = lastBottom.type === lastTop.type;

  console.log("sameType", sameType);

  console.log("lastBottom", lastBottom);
  console.log("lastTop", lastTop);

  if (!sameType) {
    // check if lastBottom data include lastTop item
    const lastBottomDataIncludesLastTopItem = lastBottom.data.some(
      (item) => item.id === lastTop.item.id
    );

    // check if lastTop data include lastBottom item
    const lastTopDataIncludesLastBottomItem = lastTop.data.some(
      (item) => item.id === lastBottom.item.id
    );

    console.log(
      "lastBottomDataIncludesLastTopItem",
      lastBottomDataIncludesLastTopItem
    );
    console.log(
      "lastTopDataIncludesLastBottomItem",
      lastTopDataIncludesLastBottomItem
    );

    if (
      lastBottomDataIncludesLastTopItem ||
      lastTopDataIncludesLastBottomItem
    ) {
      return true;
    }
  }

  // if starting actor and ending actor are in game state, then win
  if (startingActorInGameState || endingActorInGameState) {
    return true;
  } else {
    return false;
  }
};
