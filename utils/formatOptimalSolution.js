export const formatOptimalSolution = (optimalSolution) => {
  // {
  //   "imdb_id": "nm0000124",
  //   "type": "Actor",
  //   "name": "Jennifer Connelly",
  //   "tvdb_id": 6161
  // },
  // {
  //   "type": "Film",
  //   "imdb_id": "tt0404203",
  //   "votes": 113446,
  //   "rating": 7.5,
  //   "name": "Little Children",
  //   "tvdb_id": 1440
  // },
  return optimalSolution?.map((item) => {
    if (item.type === "Film") {
      return {
        type: "movie",
        item: {
          id: item.tvdb_id,
          title: item.name,
          poster_path: null,
        },
        data: [],
      };
    } else {
      return {
        type: "actor",
        item: {
          id: item.tvdb_id,
          name: item.name,
          profile_path: null,
        },
        data: [],
      };
    }
  });
};
