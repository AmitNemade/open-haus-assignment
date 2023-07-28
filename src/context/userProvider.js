import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [shortListedMovies, setShortListedMovies] = useState([]);
  const [genrePreference, setGenrePreference] = useState([{}, {}, {}]);
  const [actorPreference, setActorPreference] = useState([{}, {}, {}]);
  const [directorPreference, setDirectorPreference] = useState([{}, {}, {}]);

  const loginUser = () => {
    setUser(true);
  };

  const logoutUser = () => {
    setUser(false);
  };

  const updatePreference = (type, index, selectedOption) => {
    if (type === "genre") {
      let prevPref = [...genrePreference];
      prevPref[index] = { ...selectedOption };
      setGenrePreference(prevPref);
    }
    if (type === "director") {
      let prevPref = [...directorPreference];
      prevPref[index] = { ...selectedOption };
      setDirectorPreference(prevPref);
    }
    if (type === "actor") {
      let prevPref = [...actorPreference];
      prevPref[index] = { ...selectedOption };
      setActorPreference(prevPref);
    }
  };

  const updateTimeSlotByMovieId = (id, time) => {
    const tempMovies = [...shortListedMovies];
    const movieIndex = tempMovies.findIndex((m) => m.id === id);
    tempMovies[movieIndex]["time_slot"] = time;
    setShortListedMovies(tempMovies);
  };

  const addShortListedMovie = (movie) => {
    setShortListedMovies((prevMovies) => [...prevMovies, movie]);
  };
  const removeShortlistedMovieById = (id) => {
    const tempMovies = [...shortListedMovies];
    const movieIndex = tempMovies.findIndex((m) => m.id === id);
    if (movieIndex === -1) {
      return false;
    }
    tempMovies.splice(movieIndex, 1);
    setShortListedMovies(tempMovies);
    return true;
  };
  const replaceMovieByIndex = (id, movie) => {
    const tempMovies = [...shortListedMovies];
    const movieIndex = tempMovies.findIndex((m) => m.id === id);
    if (movieIndex === -1) {
      return false;
    }
    tempMovies.splice(movieIndex, 1, movie);
    setShortListedMovies(tempMovies);
    return true;
  };

  const value = {
    shortListedMovies,
    addShortListedMovie,
    updateTimeSlotByMovieId,
    removeShortlistedMovieById,
    replaceMovieByIndex,
    loginUser,
    logoutUser,
    user,
    genrePreference,
    actorPreference,
    directorPreference,
    updatePreference,
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
};
