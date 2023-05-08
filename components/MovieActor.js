import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { AgeComponent } from "./AgeComponent";

export const MovieActor = ({ movie, actor }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const backdropUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;

  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="card flex flex-col   animate transition-all ease-in-out hover:scale-105 cursor-pointer overflow-hidden">
        <Image src={posterUrl} alt={movie.title} height={750} width={500} />
        <div className="flex flex-col w-full items-start justify-start p-2 text-clip">
          <h6 className="font-semibold text-sm  truncate">{movie.title}</h6>

          <div className="flex w-full flex-row gap-2">
            <label>{dayjs(movie.release_date).format("YYYY")}</label>
            <div className="flex-grow"></div>

            <AgeComponent
              birthday={actor.birthday}
              deathDate={actor.deathday}
              movieDate={movie.release_date}
              size="small"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
