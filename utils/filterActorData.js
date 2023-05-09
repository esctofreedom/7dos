export const filterActorData = (actorData) => {
  const obj = {
    type: "actor",
    item: {
      id: actorData.id,
      name: actorData.name,
      image: actorData.image,
      birthday: actorData.birthday,
      profile_path: actorData.profile_path,
    },
    data: actorData.credits.cast.map((movie) => {
      return {
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        release_date: movie.release_date,
        popularity: movie.popularity,
      };
    }),
  };

  return obj;
};
