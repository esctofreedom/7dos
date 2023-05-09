export const checkLost = (hasWon, movesLeft) => {
  if (hasWon) {
    return false;
  }

  if (movesLeft === 0) {
    return true;
  }

  return false;
};
