import { BarChart2, Info } from "lucide-react";
import { useState } from "react";
import { ModalFM } from "./ui/ModalFM";
import { getLocalStorage } from "../utils/getLocalStorage";
import dayjs from "dayjs";

export const GameHistory = () => {
  // get localstorage
  const [isOpen, setIsOpen] = useState(false);

  const gameHistory = getLocalStorage();

  const gamesPlayed = gameHistory?.length;

  const gamesWon = gameHistory?.filter((game) => game.hasWon).length;

  const winPct = (gamesWon / gamesPlayed) * 100;

  // calculate consecutive games won
  let consecutiveGamesWon = 0;
  let currentGameWon = false;

  gameHistory?.forEach((game) => {
    if (game.hasWon) {
      currentGameWon = true;
      consecutiveGamesWon++;
    } else {
      currentGameWon = false;
    }
  });

  console.log("gameHistory", gameHistory);
  return (
    <div
      className="flex gap-1 items-center
    "
    >
      <ModalFM isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="py-6 px-8">
          <h2 className="mb-3"> Statistics</h2>

          <div className="grid grid-cols-4 gap-4">
            {/* played */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-sm text-slate-300">Played</span>
              <span className="text-2xl text-white font-extrabold">
                {gamesPlayed}
              </span>
            </div>

            {/* Win % */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-sm text-slate-300">Win %</span>
              <span className="text-2xl text-white font-extrabold">
                {winPct.toFixed(0)}%
              </span>
            </div>

            {/* Streak */}
            <div className="flex flex-col justify-center items-center">
              <span className="text-sm text-slate-300">Streak</span>
              <span className="text-2xl text-white font-extrabold">
                {consecutiveGamesWon}
              </span>
            </div>
          </div>

          {gameHistory && <Histogram data={gameHistory} wins={gamesWon} />}

          <NewGameTimer />
        </div>
      </ModalFM>
      {/* <span className="text-sm">How to Play</span> */}
      <BarChart2
        className="h-7 w-7 text-slate-400  hover:scale-110 cursor-pointer hover:text-white transition ease-in-out "
        onClick={() => setIsOpen(true)}
      />
    </div>
  );
};

const Histogram = ({ data, wins }) => {
  const onlyWins = data.filter((game) => game.hasWon);
  const inOne = onlyWins.filter((game) => game.movesTaken === 1).length;
  const inThree = onlyWins.filter((game) => game.movesTaken === 3).length;
  const inFive = onlyWins.filter((game) => game.movesTaken === 5).length;
  const inSeven = onlyWins.filter((game) => game.movesTaken === 7).length;

  console.log("inOne", inOne);
  console.log("inThree", inThree);
  console.log("inFive", inFive);
  console.log("inSeven", inSeven);

  console.log("wins", wins);
  return (
    <div className="flex flex-col gap-6 w-full justify-start items-start my-8">
      <span>Moves Taken:</span>
      {/* <span className="text-sm text-slate-300">1</span>
        <span className="text-2xl text-white font-extrabold">{inOne}</span> */}
      <Bar number={1} inNumber={inOne} wins={wins} />
      <Bar number={3} inNumber={inThree} wins={wins} />
      <Bar number={5} inNumber={inFive} wins={wins} />
      <Bar number={7} inNumber={inSeven} wins={wins} />
    </div>
  );
};

const Bar = ({ number, inNumber, wins }) => {
  if (inNumber === 0) {
    return (
      <div className="flex gap-4 w-full">
        <span>{number}</span>
        <div
          className="flex h-6 items-center justify-center  rounded-sm bg-slate-500/90"
          style={{ width: `${2}%` }}
        ></div>
      </div>
    );
  }
  return (
    <div className="flex gap-4 w-full">
      <span>{number}</span>
      <div
        className="flex h-6 items-center justify-center  rounded-sm bg-emerald-500/90"
        style={{ width: `${(inNumber / wins) * 100}%` }}
      >
        <span className="text-white"> {inNumber}</span>
      </div>
    </div>
  );
};

const NewGameTimer = () => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  // calculate time until midnight using dayjs
  const timeUntilMidnight = dayjs().endOf("day").fromNow();

  return (
    <span className="text-sm text-slate-300 mt-4">
      New game {timeUntilMidnight}
    </span>
  );
};
