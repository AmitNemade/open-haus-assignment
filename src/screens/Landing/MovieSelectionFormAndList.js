import React, { useState } from "react";
import useMovies from "../../hook/useMovies";
import MovieCard from "../../components/MovieCard";

const MovieSelectionFormAndList = ({
  genreList,
  onMovieClick,
  shortListedMovies,
  showShortlistedMovies,
}) => {
  const [genre, setGenre] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { movies, loading, hasMore } = useMovies(genre.id ?? "", page);

  const observer = React.useRef();
  const lastPostElementRef = React.useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <form className="container px-0 mt-4 d-flex" onSubmit={() => {}}>
        <input
          className="form-control me-2"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          aria-label="Search"
        />
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {genre.name || "All Genre"}
          </button>
          <ul className="dropdown-menu">
            <li onClick={() => setGenre({})} className="dropdown-item">
              No genre
            </li>
            {genreList.map((g, index) => (
              <li
                onClick={() => setGenre(g)}
                key={index}
                className="dropdown-item"
              >
                {g.name}
              </li>
            ))}
          </ul>
        </div>
      </form>
      <div className="container mt-4">
        <div className="gap-3 row align-items-start justify-content-start">
          {movies
            .filter((movie) => {
              if (search === "") return true;
              return movie.title?.toLowerCase().includes(search.toLowerCase());
            })
            .map((movie, index) => {
              if (
                !showShortlistedMovies &&
                shortListedMovies.findIndex((m) => m.id === movie.id) !== -1
              )
                return null;
              if (index + 1 === movies.length)
                return (
                  <div key={index} ref={lastPostElementRef} className="col">
                    <MovieCard
                      imageSrc={movie.poster_path}
                      title={movie.original_title}
                      genres={movie.genre_ids.map(
                        (id) => genreList.find((g) => g.id === id)?.name || ""
                      )}
                      isSelected={
                        shortListedMovies.findIndex(
                          (m) => m.id === movie.id
                        ) !== -1
                      }
                      onMovieClick={(isSelected) =>
                        onMovieClick(movie, isSelected)
                      }
                    />
                  </div>
                );
              return (
                <MovieCard
                  key={index}
                  imageSrc={movie.poster_path}
                  title={movie.original_title}
                  genres={movie.genre_ids.map(
                    (id) => genreList.find((g) => g.id === id)?.name || ""
                  )}
                  isSelected={
                    shortListedMovies.findIndex((m) => m.id === movie.id) !== -1
                  }
                  onMovieClick={(isSelected) => onMovieClick(movie, isSelected)}
                />
              );
            })}
          {loading && (
            <div
              className="m-auto mb-3 text-white spinner-border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieSelectionFormAndList;
