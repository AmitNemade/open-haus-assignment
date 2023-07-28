/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable new-cap */
import { useEffect, useState } from "react";
import Api from "../api/manager";

const useMovies = (genre, page, searchQuery) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [lastGenre, setLastGenre] = useState("");
  const [lastSearchQuery, setLastSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (
      lastPage !== page ||
      lastGenre !== genre ||
      lastSearchQuery !== searchQuery
    ) {
      setLastPage(page);
      if (lastGenre !== genre) {
        setLastGenre(genre);
        setMovies([]);
      }
      if (lastSearchQuery !== searchQuery) {
        setLastSearchQuery(searchQuery);
        setMovies([]);
      }
      Api(
        {
          method: "GET",
          url: "discover/movie",
          params: {
            with_genres: genre,
            page: page,
          },
        },
        false
      )
        .then((res) => {
          setMovies((prevPosts) => {
            return [...prevPosts, ...res.results];
          });
          setHasMore(res.total_pages !== res.page);
          setLoading(false);
        })
        .catch((e) => {
          setError(true);
        });
    }
  }, [genre, page, searchQuery]);

  return { loading, error, movies, hasMore };
};
export default useMovies;
