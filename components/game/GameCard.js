export const GameCard = ({
  type,
  isMobile,
  item,
  widthPixels,
  isStarting,
  onClick,
  isClickable,
  isDocked,
}) => {
  let url;
  if (type === "movie") {
    url = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
  } else if (type === "actor") {
    url = `https://image.tmdb.org/t/p/w500/${item.profile_path}`;
  }

  let width, height;

  if (isMobile) {
    // widthPixels actually represents height
    height = widthPixels;
    width = widthPixels * 0.6;
  } else {
    height = widthPixels * 1.7;
    width = widthPixels;
  }

  const content = (
    <div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      className={`flex  flex-col bg-black/80 text-white/90 font-bold border-2 ${
        isClickable && !isDocked
          ? "border-blue-500 shadow-blue-600/50 shadow-lg"
          : " shadow-xl border-slate-700"
      } 

    ${isClickable ? "hover:scale-105 cursor-pointer " : ""}

    rounded-lg overflow-clip animate transition-all ease-in-out`}
      style={{
        width: width,
        height: height,
      }}
      onClick={onClick}
    >
      <div className={` max-h-[87%]`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${url}`}
          alt={""}
          className={`h-full w-full object-cover
          ${!isClickable && "opacity-70"}
          `}
          // height={height}
          // width={height * 0.7}
          // width={width}
        />
      </div>
      <div className="flex items-center flex-grow  justify-center truncate text-ellipsis p-2 text-xs ">
        {type === "movie" ? item.title : item.name}
      </div>
    </div>
  );

  return content;
};
