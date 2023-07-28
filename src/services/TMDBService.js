import Api from "../api/manager";

const getMovieList = (params) => {
  return Api(
    {
      method: "GET",
      url: "discover/movie",
      params: params,
    },
    false
  );
};
const getMovieGenreList = (params) => {
  return Api(
    {
      method: "GET",
      url: "genre/movie/list",
    },
    false
  );
};
const searchPeople = (search) => {
  return Api(
    {
      method: "GET",
      url: "search/person",
      params: { query: search },
    },
    false
  );
};
export const TMDBService = { getMovieList, getMovieGenreList, searchPeople };
