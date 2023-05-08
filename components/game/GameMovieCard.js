import dayjs from "dayjs";

export const GameMovieCard = ({ movie, height, onClick }) => {
  if (height === undefined) {
    height = 500;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  //   const backdropUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;

  return (
    <div
      className="card bg-gray-700 relative flex flex-col overflow-clip  h-full w-full animate transition-all ease-in-out 
      hover:scale-125 hover:z-50 cursor-pointer"
      onClick={onClick}
    >
      <img
        className="h-full w-full object-cover"
        src={posterUrl}
        alt="."
        height={height}
        width={height * 0.7}
      />

      {/* Hover Title and Year */}
      <div
        className="flex flex-col p-2 opacity-0 transition-all ease-in-out duration-500 hover:opacity-100 absolute   
      bg-black/70 h-full w-full"
      >
        <span className="text-white/70 text-xs font-semibold text-center">
          {dayjs(movie.release_date).format("YYYY")}
        </span>

        <div className="flex flex-col flex-grow h-full items-center justify-center ">
          <span className="text-white text-[12px] font-semibold text-center">
            {movie.title}
          </span>
        </div>
      </div>
    </div>
  );
};
