import Link from "next/link";

export const GameActorCard = ({ actor, height, onClick }) => {
  console.log("actor", actor);

  const firstImage = actor.images?.profiles[0];
  const aspectRatio = firstImage?.aspect_ratio;

  if (height === undefined) {
    height = 500;
  }

  const width = height * aspectRatio;

  const content = (
    <div
      className="card flex flex-col   animate transition-all ease-in-out hover:scale-105 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
        alt={actor.title}
        height={height}
        width={width}
      />
      <div className="flex flex-col w-full items-start justify-start p-2 text-clip">
        <h6 className="font-semibold text-sm  truncate">{actor.name}</h6>

        <div className="flex w-full flex-row gap-2">
          {/* <label>{dayjs(movie.release_date).format("YYYY")}</label> */}
          <div className="flex-grow"></div>
        </div>
      </div>
    </div>
  );

  return content;
};
