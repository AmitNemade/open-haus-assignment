import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/userProvider";
import MovieSelectionFormAndList from "../Landing/MovieSelectionFormAndList";
import { TMDBService } from "../../services/TMDBService";

const Schedular = () => {
  const {
    shortListedMovies,
    removeShortlistedMovieById,
    replaceMovieByIndex,
    updateTimeSlotByMovieId,
  } = useUser();

  const [genreList, setGenreList] = useState([]);
  const [replaceMovieId, setReplaceMovieId] = useState(-1);
  const replaceMovieModalRef = useRef();

  const fetchGenreList = async () => {
    const response = await TMDBService.getMovieGenreList();
    setGenreList(response.genres);
  };

  useEffect(() => {
    fetchGenreList();
    replaceMovieModalRef.current = new window.bootstrap.Modal(
      "#replaceMovieModal",
      {
        keyboard: false,
      }
    );
  }, []);

  const onReplaceMovieClick = (movie) => {
    replaceMovieByIndex(replaceMovieId, movie);
    setReplaceMovieId(-1);
    replaceMovieModalRef.current.hide();
  };

  const exportJSON = async () => {
    const json = shortListedMovies.map((movie) => ({
      title: movie.title,
      genre: movie.genre_ids.map(
        (id) => genreList.find((g) => g.id === id)?.name || ""
      ),
      release_date: movie.release_date,
      overview: movie.overview,
    }));
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(json))
    );
    element.setAttribute("download", "movie_schedule.json");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };
  const exportCSV = async () => {
    const json = shortListedMovies.map((movie) => ({
      title: movie.title,
      genre: movie.genre_ids.map(
        (id) => genreList.find((g) => g.id === id)?.name || ""
      ),
      release_date: movie.release_date,
      overview: movie.overview,
    }));
    const header_keys = Object.keys(json[0]);

    let csv = json.map(function (row) {
      return header_keys
        .map(function (fieldName) {
          return JSON.stringify(row[fieldName], (key, value) =>
            !!value ? value : ""
          );
        })
        .join(",");
    });

    csv = header_keys.join(",") + "\r\n" + csv.join("\r\n");

    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
    );
    element.setAttribute("download", "movie_schedule.csv");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <div
      className="relative w-100 d-flex flex-column h-100"
      style={{ minHeight: "100vh" }}
    >
      <Navbar />
      <div className="container my-4 text-white border-white w-100 d-flex justify-content-between border-bottom fs-4">
        <span>Your Schedule</span>
        <div className="gap-1 my-1 d-flex">
          <button className="btn btn-outline-info" onClick={exportJSON}>
            Export JSON
          </button>
          <button className="btn btn-outline-info" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
      </div>
      <div className="container d-flex flex-column">
        {shortListedMovies.map((movie, index) => (
          <div className="mb-3 overflow-hidden card position-relative">
            <img
              src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
              className="bottom-0 z-0 opacity-25 img-fluid rounded-start object-fit-cover position-absolute object-fit-lg-cover"
              alt=""
            />
            <div className="d-flex g-0 z-1">
              <div className="d-flex flex-column">
                <img
                  src={`https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`}
                  className="img-fluid rounded-start object-fit-cover"
                  style={{ maxWidth: "200px", width: "auto" }}
                  alt=""
                />
              </div>
              <div className="d-flex flex-column flex-fill">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.overview}</p>
                  <p className="mb-0 card-text">
                    <small className="text-body-secondary">
                      Released on <b>{movie.release_date}</b>
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      Genre: <b>{movie.genre_ids.join(", ")}</b>
                    </small>
                  </p>
                  <div className="flex-wrap d-flex">
                    <div
                      className="d-flex col-12 text-body-secondary"
                      style={{ fontSize: 14 }}
                    >
                      Select time slot
                    </div>
                    <input
                      type="datetime-local"
                      className="form-control me-3"
                      aria-label="file example"
                      style={{ maxWidth: "200px" }}
                      onChange={(e) =>
                        updateTimeSlotByMovieId(movie.id, e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="flex-wrap gap-2 mt-2 d-flex">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#replaceMovieModal"
                      onClick={() => {
                        setReplaceMovieId(movie.id);
                      }}
                    >
                      <i className="bi bi-arrow-left-right"></i> Replace movie
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeShortlistedMovieById(movie.id)}
                    >
                      <i className="bi bi-trash3"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="replaceMovieModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="replaceMovieModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="replaceMovieModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <MovieSelectionFormAndList
                genreList={genreList}
                onMovieClick={(movie, isSelected) =>
                  onReplaceMovieClick(movie, isSelected)
                }
                shortListedMovies={shortListedMovies}
                showShortlistedMovies={false}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedular;
