import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ReusableState } from "./ReusableState";
import { GameCard } from "./GameCard";

//

// This component displays game state, with actors and movies
export const GameState = ({
  topState,
  bottomState,
  setTopState,
  setBottomState,
  optimalSolution,
  drawerOpen,
  setDrawerOpen,
  setSelectedItem,
  movesLeft,
  setMovesLeft,
  hasWon,
  hasLost,
}) => {
  // calculate length of both states
  const lengthAllStates = topState.length + bottomState.length;

  const [widthPixels, setWidthPixels] = useState(150);
  const [showSolution, setShowSolution] = useState(false);
  const maxGameWidth = 900;

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

  console.log("optimalSolution", optimalSolution);

  return (
    <div className="flex lg:flex-row flex-col max-w-7xl mx-auto  w-full flex-grow ">
      {!hasWon && !hasLost && (
        <>
          <ReusableState
            origin="top"
            widthPixels={widthPixels}
            state={topState}
            setState={setTopState}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            setSelectedItem={setSelectedItem}
            isMobile={isMobile}
            movesLeft={movesLeft}
            setMovesLeft={setMovesLeft}
            hasWon={hasWon}
            hasLost={hasLost}
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
            movesLeft={movesLeft}
            setMovesLeft={setMovesLeft}
            hasWon={hasWon}
            hasLost={hasLost}
          />
        </>
      )}

      {/* WIN STATE */}
      {hasWon || hasLost ? (
        <div className="flex flex-col flex-grow items-center">
          {" "}
          <button
            className={`my-4  text-sm
            
            ${
              showSolution
                ? "bg-slate-600"
                : "bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-600"
            } text-white px-3 py-2 rounded-md`}
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? "Hide Solution" : "Reveal Optimal Solution"}
          </button>
          {showSolution && (
            <div className="flex lg:flex-row flex-col mx-auto items-center flex-grow">
              <AnimatePresence mode="wait">
                {/* flex lg:flex-row flex-col max-w-7xl mx-auto  w-full flex-grow  */}
                {optimalSolution &&
                  optimalSolution.map((item, index) => {
                    console.log("optimal item", item);
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 1 }}
                        key={index}
                        className="flex lg:flex-row flex-col mx-auto items-center flex-grow"
                      >
                        {index !== 0 && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              x: isMobile ? 0 : 100,
                              y: isMobile ? 100 : 0,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              y: 0,
                            }}
                            transition={{ duration: 1.5, delay: index * 1 }}
                            className={`border-l-2 lg:border-t-2 lg:border-l-0 w-0 lg:h-0  lg:min-w-[30px] min-h-[20px] 
                    border-emerald-500
                    `}
                          />
                        )}
                        <GameCard
                          type={item.type}
                          item={item.item}
                          widthPixels={widthPixels}
                          isMobile={isMobile}
                          hasWon={true}
                        />
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </div>
          )}
          {/* NORMAL END STATE */}
          {!showSolution && (
            <div className="flex lg:flex-row flex-col mx-auto items-center flex-grow">
              {/* flex lg:flex-row flex-col max-w-7xl mx-auto  w-full flex-grow  */}
              <ReusableState
                origin="top"
                widthPixels={widthPixels}
                state={topState}
                setState={setBottomState}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                setSelectedItem={setSelectedItem}
                isMobile={isMobile}
                movesLeft={movesLeft}
                setMovesLeft={setMovesLeft}
                hasWon={hasWon}
                hasLost={hasLost}
              />
              {hasWon && (
                <div
                  className={`border-l-2 lg:border-t-2 lg:border-l-0 w-0 lg:h-0  lg:min-w-[30px] min-h-[20px] 
              border-emerald-500
              `}
                />
              )}
              {hasLost && (
                <div
                  className={`border-l-2 lg:border-t-2 lg:border-l-0 w-0 lg:h-0  lg:min-w-[30px] min-h-[20px] 
            border-red-500
            `}
                />
              )}
              <ReusableState
                origin="bottom"
                widthPixels={widthPixels}
                state={bottomState}
                setState={setBottomState}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                setSelectedItem={setSelectedItem}
                isMobile={isMobile}
                movesLeft={movesLeft}
                setMovesLeft={setMovesLeft}
                hasWon={hasWon}
                hasLost={hasLost}
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
