import { useEffect, useState } from "react";
import { GameCard } from "./GameCard";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

//
const ReusableState = ({
  origin,
  widthPixels,
  state,
  setState,
  drawerOpen,
  setDrawerOpen,
  setSelectedItem,
  isMobile,
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
  };

  return (
    <div
      className={`flex lg:flex-row flex-col flex-grow  mx-auto
      ${origin === "top" ? "justify-start" : "justify-end"}
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
              <div className="border-l-2 lg:border-t-2 lg:border-l-0 w-0 lg:h-0 border-white/50 lg:min-w-[30px] min-h-[20px] border-dashed"></div>
            )}

            <div className="relative group">
              {/* If is not starting, show delete circle */}
              {/* only show if it is last item */}
              {isLast && !isStarting && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item);
                  }}
                  className=" items-center z-40 justify-center opacity-0 cursor-pointer group-hover:opacity-100
                absolute right-2 top-2 bg-white rounded-full p-0  hover:scale-125 transition-all shadow-sm ease-in-out"
                >
                  <XCircle className="h-7 w-7 text-red-500 " />
                </div>
              )}

              {item.type === "actor" ? (
                <GameCard
                  type="actor"
                  item={item.item}
                  isMobile={isMobile}
                  widthPixels={widthPixels}
                  // isClickable={isLast ? true : false}
                  onClick={(e) => {
                    isLast && setSelectedItem(item);
                    isLast && setDrawerOpen(!drawerOpen);
                  }}
                  isClickable={isLast ? true : false}
                  isStarting={isStarting}
                />
              ) : (
                <GameCard
                  type="movie"
                  item={item.item}
                  isMobile={isMobile}
                  widthPixels={widthPixels}
                  // isClickable={isLast ? true : false}
                  onClick={(e) => {
                    isLast && setSelectedItem(item);
                    isLast && setDrawerOpen(!drawerOpen);
                  }}
                  isClickable={isLast ? true : false}
                  isStarting={false}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// This component displays game state, with actors and movies
export const GameState = ({
  topState,
  bottomState,
  setTopState,
  setBottomState,
  drawerOpen,
  setDrawerOpen,
  setSelectedItem,
}) => {
  // calculate length of both states
  const lengthAllStates = topState.length + bottomState.length;

  const [widthPixels, setWidthPixels] = useState(150);
  const maxGameWidth = 800;

  // detect if mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    }

    // run this on mount and when window is resized
  }, []);

  // wait until window exists
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }

  // function that counts number of items in state, then divides 1000px by that number and sets widthPixels to that value
  const calculateWidth = (lengthAllStates) => {
    const newWidth = maxGameWidth / lengthAllStates;

    const maxWidth = 200;
    const minWidth = 100;

    if (newWidth > maxWidth) {
      setWidthPixels(maxWidth);
    } else if (newWidth < minWidth) {
      setWidthPixels(minWidth);
    } else {
      setWidthPixels(newWidth);
    }
  };

  // run calculateWidth on mount
  useEffect(() => {
    calculateWidth(lengthAllStates);
  }, []);

  // run calculateWidth on state change
  useEffect(() => {
    calculateWidth(lengthAllStates);
  }, [lengthAllStates]);

  return (
    <div className="flex lg:flex-row flex-col max-w-7xl mx-auto  w-full flex-grow ">
      <ReusableState
        origin="top"
        widthPixels={widthPixels}
        state={topState}
        setState={setTopState}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        setSelectedItem={setSelectedItem}
        isMobile={isMobile}
      />
      <div className="min-h-[50px] "></div>

      <ReusableState
        origin="bottom"
        widthPixels={widthPixels}
        state={bottomState}
        setState={setBottomState}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        setSelectedItem={setSelectedItem}
        isMobile={isMobile}
      />
    </div>
  );
};