import { StarIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const example = {
  adult: false,
  backdrop_path: "/393mh1AJ0GYWVD7Hsq5KkFaTAoT.jpg",
  genre_ids: [12, 28, 878],
  id: 507086,
  original_language: "en",
  original_title: "Jurassic World Dominion",
  overview:
    "Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures.",
  popularity: 10639.744,
  poster_path: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
  release_date: "2022-06-01",
  title: "Jurassic World Dominion",
  video: false,
  vote_average: 7,
  vote_count: 1850,
};

export const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const backdropUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;

  console.log("posterUrl", backdropUrl);

  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="card flex flex-col   animate transition-all ease-in-out hover:scale-105 cursor-pointer overflow-hidden">
        <Image src={posterUrl} alt={movie.title} height={750} width={500} />
        <div className="flex flex-col w-full items-start justify-start p-2 text-clip">
          <h6 className="font-semibold text-sm  truncate">{movie.title}</h6>

          <div className="flex w-full flex-row gap-2">
            <label>{dayjs(movie.release_date).format("YYYY")}</label>
            <div className="flex-grow"></div>

            <label className="font-bold text-xs flex gap-1 items-center">
              <StarIcon className="h-4 w-4 text-amber-500" />
              {movie.vote_average.toFixed(1)}
            </label>
          </div>
        </div>
      </div>
    </Link>
  );
};
