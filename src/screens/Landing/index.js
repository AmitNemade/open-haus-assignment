import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { TMDBService } from "../../services/TMDBService";
import { useUser } from "../../context/userProvider";
import MovieSelectionFormAndList from "./MovieSelectionFormAndList";

const Landing = () => {
  const navigate = useNavigate();
  const [genreList, setGenreList] = useState([]);

  const { shortListedMovies, addShortListedMovie, removeShortlistedMovieById } =
    useUser();
  const shortListFullModalRef = useRef();

  const fetchGenreList = async () => {
    const response = await TMDBService.getMovieGenreList();
    setGenreList(response.genres);
  };

  useEffect(() => {
    fetchGenreList();
    shortListFullModalRef.current = new window.bootstrap.Modal(
      "#shortListFullModal",
      {
        keyboard: false,
      }
    );
  }, []);

  const closeShortListModal = () => {
    shortListFullModalRef.current.hide();
  };

  const onMovieClick = (movie, isSelected) => {
    if (isSelected) {
      removeShortlistedMovieById(movie.id);
      return;
    }
    if (shortListedMovies.length === 8) {
      shortListFullModalRef.current.show();
      return;
    }
    addShortListedMovie(movie);
  };

  return (
    <div
      className="w-100 d-flex flex-column h-100 relative"
      style={{ minHeight: "100vh" }}
    >
      <Navbar />
      <div className="text-white container px-0 mt-4">
        Select 8 movies here and create a schedule for you next week
      </div>
      <MovieSelectionFormAndList
        genreList={genreList}
        onMovieClick={onMovieClick}
        shortListedMovies={shortListedMovies}
        showShortlistedMovies
      />
      <div style={{ height: "56px" }} />
      {shortListedMovies.length > 0 && (
        <button
          className="fixed-bottom btn pointer-event fw-medium text-uppercase bg-primary text-white p-2 w-100 fs-5 text-center"
          style={{ letterSpacing: "1px" }}
          onClick={() => {
            navigate("/schedular");
          }}
        >
          Create schedule
        </button>
      )}

      <div
        className="modal fade"
        id="shortListFullModal"
        tabIndex="-1"
        aria-labelledby="shortListFullModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="shortListFullModalLabel">
                Maximum movies shortlisted !!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeShortListModal}
              ></button>
            </div>
            <div className="modal-body">
              You have selected all 8 movies.
              <div className="mt-2 flex ">
                Click{" "}
                <span
                  className="bg-primary text-white py-1 me-1 px-2 rounded-2"
                  style={{ fontSize: 12 }}
                >
                  Create Schedule
                </span>{" "}
                button to create a schedule for you.
              </div>
              <div className="mt-2">
                Click{" "}
                <span
                  className="bg-secondary mt-1 me-1 text-white py-1 px-2 rounded-2"
                  style={{ fontSize: 12 }}
                >
                  Cancel
                </span>
                button to close the popup.
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/schedular");
                  closeShortListModal();
                }}
              >
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
