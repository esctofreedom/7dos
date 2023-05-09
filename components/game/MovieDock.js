import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { GameCard } from "./GameCard";
import { filterMovieData } from "../../utils/filterMovieData";

export function MovieDock({
  type,
  items,
  setGameState,
  gameState,
  setDrawerOpen,
  movesLeft,
  setMovesLeft,
}) {
  let mouseX = useMotionValue(Infinity);
  var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
  dayjs.extend(isSameOrBefore);

  // if type is movie, order by date
  // if type is actor, order by popularity
  const [numberDisplayed, setNumberDisplayed] = useState(200);
  let sortedItems;

  if (type === "movie") {
    sortedItems = items
      .sort((a, b) => {
        return b.popularity - a.popularity;
      })
      .slice(0, numberDisplayed);
  } else if (type === "actor") {
    sortedItems = items
      .sort((a, b) => {
        // use isSameOrBefore to sort by date
        return dayjs(a.release_date).isSameOrBefore(dayjs(b.release_date))
          ? 1
          : -1;
      })
      .slice(0, numberDisplayed);
  }

  // remove any items that are already in the game state
  sortedItems = sortedItems.filter((item) => {
    const isInGameState = gameState.find((gameItem) => {
      return gameItem.item.id === item.id;
    });
    return !isInGameState;
  });

  // function that adds movie to game state
  const onMovieClick = async (movie) => {
    const url = `
        
    https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=credits`;

    // console.log("url", url);
    await axios // get movie credits
      .get(url)
      .then((response) => {
        const newData = response.data;

        // const newItem = {
        //   type: "movie",
        //   item: movie,
        //   data: newData,
        // };

        const newItem = filterMovieData(newData);
        const newGameState = [...gameState, newItem];
        setGameState(newGameState);
      });
    // setGameState(newGameState);
    setMovesLeft(movesLeft - 1);
    setDrawerOpen(false);
  };

  const onActorClick = async (actor) => {
    const url = `https://api.themoviedb.org/3/person/${actor.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=credits`;

    // console.log("url", url);
    await axios // get movie credits
      .get(url)
      .then((response) => {
        const newData = response.data.credits.cast;
        const newItem = {
          type: "actor",
          item: actor,
          data: newData,
        };
        const newGameState = [...gameState, newItem];
        setGameState(newGameState);
      });
    // setGameState(newGameState);
    setMovesLeft(movesLeft - 1);
    setDrawerOpen(false);
  };
  // function that orders items by descending year and trims to numberDisplayed

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-4  w-full px-2 lg:px-8 pb-3"
    >
      {type === "actor"
        ? sortedItems?.map((movie) => (
            <GameCard
              type="movie"
              item={movie}
              key={movie.id}
              onClick={() => onMovieClick(movie)}
              isClickable={movesLeft > 0}
              isDocked={true}
            />
          ))
        : sortedItems?.map((actor) => (
            <GameCard
              type="actor"
              item={actor}
              key={actor.id}
              onClick={() => onActorClick(actor)}
              isClickable={movesLeft > 0}
              isDocked={true}
            />
          ))}
    </motion.div>
  );
}

function AppIcon(mouseX) {
  let ref = useRef(null);

  const x = useMotionValue(0);

  const backgroundColor = useTransform(x, [0, 100], ["#f00", "#00f"]);
  //   let distance = useTransform(mouseX, (val) => {
  //     let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

  //     return val - bounds.x - bounds.width / 2;
  //   });

  //   let distance = 80;

  //   let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  //   let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const width = 40;
  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square w-10 rounded-full bg-gray-400"
    />
  );
}
