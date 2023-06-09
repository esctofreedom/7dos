import { X, XCircle } from "lucide-react";
import { GameCard } from "./GameCard";
import { motion } from "framer-motion";

export const ReusableState = ({
  origin,
  widthPixels,
  state,
  setState,
  drawerOpen,
  setDrawerOpen,
  setSelectedItem,
  isMobile,
  movesLeft,
  setMovesLeft,
  hasWon,
  hasLost,
}) => {
  // if origin is botto, then invert sort order
  let sortedState;

  if (origin === "bottom") {
    sortedState = state.slice().reverse();
  } else {
    sortedState = state;
  }

  // create function that removes item from state
  const removeItem = (item) => {
    const newState = state.filter((stateItem) => {
      return stateItem.item.id !== item.item.id;
    });

    setState(newState);

    // If we want deleting a move to count as a move
    setMovesLeft(movesLeft - 1);
  };

  let cardStyles;
  if (hasWon) {
    cardStyles = "border-emerald-500 border-solid";
  } else if (hasLost) {
    cardStyles = "border-red-500 border-solid";
  } else {
    cardStyles = "border-white/50 border-white/50 border-dashed";
  }

  return (
    <div
      className={`flex lg:flex-row flex-col   mx-auto
        ${origin === "top" ? "justify-start" : "justify-end"}
        ${hasWon || hasLost ? "flex-shrink " : "flex-grow"}
      `}
    >
      {sortedState?.map((item, index) => {
        let isLast;
        if (origin === "top") {
          isLast = index === sortedState.length - 1;
        } else {
          isLast = index === 0;
        }
        const isStarting = state[0].item.id === item.item.id ? true : false;

        return (
          <motion.div
            className="flex lg:flex-row flex-col items-center "
            key={item.item.id}
          >
            {/* if index is not 0, add  line */}
            {index !== 0 && (
              <div
                className={`border-l-2 lg:border-t-2 lg:border-l-0 w-0 lg:h-0  lg:min-w-[30px] min-h-[20px] 
                ${cardStyles}
                `}
              ></div>
            )}

            <div className="relative group">
              {/* If is not starting, show delete circle */}
              {/* only show if it is last item */}
              {isLast && !isStarting && !hasLost && !hasWon && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item);
                  }}
                  className="hidden md:block items-center z-40 justify-center opacity-0 cursor-pointer group-hover:opacity-100
                  absolute right-2 top-2 bg-white rounded-full p-0  hover:scale-125 transition-all shadow-sm ease-in-out"
                >
                  <XCircle className="h-7 w-7 text-red-500 " />
                </div>
              )}

              {/* Mobile Delete */}
              {isLast && !isStarting && !hasLost && !hasWon && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item);
                  }}
                  className="md:hidden  items-center z-40 justify-center cursor-pointer group-hover:opacity-100
                  absolute -right-16 top-1/2 -translate-y-[50%] bg-slate-700 hover:bg-slate-700 rounded-full p-2  "
                >
                  <X className="h-6 w-6 text-slate-200  " />
                </div>
              )}

              {item.type === "actor" ? (
                <GameCard
                  type="actor"
                  item={item.item}
                  isMobile={isMobile}
                  widthPixels={widthPixels}
                  isClickable={isLast ? true : false}
                  onClick={(e) => {
                    if (!hasWon && !hasLost && isLast) {
                      setSelectedItem(item);
                      setDrawerOpen(!drawerOpen);
                    }
                  }}
                  // isClickable={false}
                  isStarting={isStarting}
                  hasWon={hasWon}
                  hasLost={hasLost}
                />
              ) : (
                <GameCard
                  type="movie"
                  item={item.item}
                  isMobile={isMobile}
                  widthPixels={widthPixels}
                  isClickable={isLast ? true : false}
                  onClick={(e) => {
                    if (!hasWon && !hasLost && isLast) {
                      setSelectedItem(item);
                      setDrawerOpen(!drawerOpen);
                    }
                  }}
                  // isClickable={false}
                  isStarting={false}
                  hasWon={hasWon}
                  hasLost={hasLost}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
