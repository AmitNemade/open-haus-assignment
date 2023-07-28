import React from "react";

const MovieCard = ({ imageSrc, title, genres, isSelected, onMovieClick }) => {
  return (
    <div
      className="card shadow-none p-0 movie-card col"
      style={{
        width: "200px",
        minWidth: "200px",
        maxWidth: "200px",
        background: "#ffffff00",
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w440_and_h660_face${imageSrc}`}
        className="card-img-top object-fit-cover"
        style={{ maxHeight: "300px", width: "auto" }}
        alt="Movie Poster"
      />
      <div className="card-body row  justify-content-between">
        <div
          style={{ fontSize: "16px", color: "#01b4e4" }}
          className="fw-medium mb-0 col-12 px-0"
        >
          {title}
        </div>
        <div className="movie-meta-data-label px-0 mt-0 text-white">
          {genres.join(", ")}
        </div>
        <div className="card-footer p-0 border-0">
          {isSelected ? (
            <button
              className="btn w-100 mt-2 text-white justify-content-center gap-2 d-flex align-items-center"
              style={{ backgroundColor: "#0d253f" }}
              onClick={() => onMovieClick(isSelected)}
            >
              <i className="bi bi-check2 fs-5 my-auto"></i> Selected
            </button>
          ) : (
            <button
              className="btn w-100 mt-2 text-white"
              style={{ backgroundColor: "#0d253f" }}
              onClick={() => onMovieClick(isSelected)}
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
