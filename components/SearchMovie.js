import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";

export const SearchMovie = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    // wait until user has not typed for 2 seconds
    const baseUrl = "https://api.themoviedb.org/3/";
    const key = "b00fb54297384d5eaa45556b05fbb775";
    const url = baseUrl + "search/movie?api_key=" + key + "&query=" + search;

    const response = await axios.get(url);
    const data = response.data;
    const movies = data.results;
    setMovies(movies.slice(0, 12));
  };

  return (
    <div className="relative">
      <input
        className="py-4 px-4 w-auto lg:w-[500px] rounded-md bg-slate-200 dark:bg-denim-600 text-denim-100 border-2 border-slate-300 dark:border-denim-500"
        type="text"
        placeholder="Search for a movie"
        onChange={(e) => {
          setSearch(e.target.value);

          fetchData();
        }}
      />

      {movies && (
        <div className="absolute top-11 flex flex-col z-50 bg-slate-200 dark:bg-denim-700 max-w-[500px] overflow-clip">
          {movies.map((movie) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <div className="flex gap-3 p-2 hover:bg-denim-600 cursor-pointer">
                <h4 className="truncate font-semibold text-lg">
                  {movie.title}
                </h4>
                <p className="truncate">
                  {dayjs(movie.release_date).format("YYYY")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
