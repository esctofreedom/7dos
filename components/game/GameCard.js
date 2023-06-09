import dayjs from "dayjs";

export const GameCard = ({
  type,
  isMobile,
  item,
  widthPixels,
  isStarting,
  onClick,
  isClickable,
  isDocked,
  hasWon,
  hasLost,
}) => {
  let url;
  if (type === "movie") {
    url = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
  } else if (type === "actor") {
    url = `https://image.tmdb.org/t/p/w500/${item.profile_path}`;
  }

  //🎂

  let width, height;

  if (isMobile) {
    // widthPixels actually represents height
    height = widthPixels;
    width = widthPixels * 0.6;
  } else {
    height = widthPixels * 1.7;
    width = widthPixels;
  }

  let styles, imageStyles;
  if (hasWon) {
    styles = "border-green-500 shadow-green-600/50 shadow-lg";
  } else if (hasLost) {
    styles = "border-red-500 shadow-red-600/50 shadow-lg";
  } else {
    if (isClickable && !isDocked && !hasWon && !hasLost) {
      styles =
        "border-blue-500 shadow-blue-600/50 shadow-lg hover:scale-105 cursor-pointer";
    } else if (isDocked) {
      styles = "border-slate-700 shadow-xl hover:scale-105 cursor-pointer";
    } else {
      styles = "border-slate-700 shadow-xl ";
      imageStyles = "opacity-70";
    }
  }

  const content = (
    <div
      className={`flex  flex-col relative group bg-black/80 text-white/90 font-bold border-2 ${styles} 

   

    rounded-lg overflow-clip animate transition-all ease-in-out`}
      style={{
        width: width,
        height: height,
      }}
      onClick={onClick}
    >
      {type === "movie" && isDocked && (
        <div className="p-4 flex-col group-hover:opacity-100 z-20 opacity-0 transition ease-in-out duration-150 absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/70">
          <span className="text-slate-200 text-xs mb-4">
            {item.release_date
              ? dayjs(item.release_date).format("YYYY")
              : "N/A"}
          </span>

          <span className="text-sm text-center">{item.title}</span>
        </div>
      )}
      <div className={`relative h-[87%] `}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${url}`}
          className={`h-full w-full object-cover
          ${imageStyles}
          `}
          // height={height}
          // width={height * 0.7}
          // width={width}
          onError={(e) => {
            fallbackImage(e);
          }}
        />
      </div>
      <div className="flex items-center flex-grow  justify-center truncate text-ellipsis p-2 text-xs ">
        <span className="text-ellipsis overflow-hidden">
          {type === "movie" ? item.title : item.name}
        </span>
      </div>
    </div>
  );

  return content;
};

const fallbackImage = (e) => {
  e.preventDefault();
  e.target.onerror = null;
  e.target.style.display = "none"; // hide the broken image
  // create gradient background from black to blue
  e.target.parentNode.style.backgroundImage =
    "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0, 10, 97,0.5) 100%)";
  e.target.parentNode.style.backgroundSize = "cover";
  e.target.parentNode.style.backgroundPosition = "center";
  e.target.parentNode.style.backgroundRepeat = "no-repeat";
};
