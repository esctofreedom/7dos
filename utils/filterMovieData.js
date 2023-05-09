export const filterMovieData = (movie) => {
  const obj = {
    type: "movie",
    item: {
      id: movie.id,
      poster_path: movie.poster_path,
      title: movie.title,
      release_date: movie.release_date,
      popularity: movie.popularity,
    },
    data: movie.credits.cast.map((actor) => {
      return {
        id: actor.id,
        name: actor.name,
        image: actor.image,
        birthday: actor.birthday,
        profile_path: actor.profile_path,
      };
    }),
  };

  return obj;
};
