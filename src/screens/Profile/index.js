import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { TMDBService } from "../../services/TMDBService";
import { useUser } from "../../context/userProvider";
import AutoCompleteDropDown from "../../components/AutoCompleteDropdown";

const Profile = () => {
  const [isEditable, setIsEditable] = useState("");
  const [genreList, setGenreList] = useState([]);
  const {
    genrePreference,
    actorPreference,
    directorPreference,
    updatePreference,
  } = useUser();

  const fetchGenreList = async () => {
    const response = await TMDBService.getMovieGenreList();
    setGenreList(response.genres);
  };

  const searchPeople = async (search) => {
    if (search === "" || search === undefined || search === null) return [];
    try {
      const response = await TMDBService.searchPeople(search);
      return response.results ?? [];
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  useEffect(() => {
    fetchGenreList();
  }, []);

  return (
    <div
      className="relative w-100 d-flex flex-column h-100"
      style={{ minHeight: "100vh" }}
    >
      <Navbar />
      <div
        className="container gap-3 pb-3 mt-4 text-white border-white d-flex border-bottom align-items-center"
        style={{ fontSize: 20 }}
      >
        <div className="p-3 bg-white rounded-circle"></div>
        User
      </div>
      <form
        onSubmit={() => {}}
        className="container pb-4 my-4 border-white justify-content-between d-flex align-items-start flex-column border-bottom"
      >
        <div className="mb-3 d-flex flex-column">
          <div className="text-white opacity-75">Username</div>
          <div className="text-white ">@amitnemade</div>
        </div>
        {isEditable !== "email" && (
          <div className="mb-3 d-flex flex-column">
            <div className="gap-3 text-white opacity-75 d-flex align-items-center">
              Email{" "}
              <div role="button" onClick={() => setIsEditable("email")}>
                <i className="bi bi-pencil-square"></i>
              </div>
            </div>
            <div className="text-white ">amitnemade@gmail.com</div>
          </div>
        )}
        {isEditable === "email" && (
          <div className="mb-4 w-25">
            <label htmlFor="email" className="text-white form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
            <div className="gap-3 mt-2 d-flex">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setIsEditable("")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setIsEditable("")}
              >
                Update
              </button>
            </div>
          </div>
        )}
        {isEditable !== "password" && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsEditable("password")}
          >
            Change Password
          </button>
        )}

        {isEditable === "password" && (
          <div className="w-25">
            <div className="mb-3">
              <label htmlFor="password" className="text-white form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="text-white form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                placeholder="Enter your password"
              />
              <div className="gap-3 mt-2 d-flex">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setIsEditable("")}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => setIsEditable("")}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
      <div
        className="container gap-3 pb-4 mb-3 text-white border-white d-flex border-bottom align-items-center"
        style={{ fontSize: 20 }}
      >
        <button type="button" className="btn btn-info">
          View Schedule
        </button>
      </div>
      <div className="container text-white fs-4">Preferences</div>
      <div className="container flex-wrap row-gap-5 pt-3 d-flex">
        <div className="gap-3 col-lg-4 col-sm-6 col-12 col d-flex flex-column">
          {genrePreference.map((genre, index) => (
            <AutoCompleteDropDown
              options={genreList}
              idKey="id"
              displayKey="name"
              label={`Genre Preference #${index + 1}`}
              selectedOption={genre}
              onSelect={(selectedOption) => {
                updatePreference("genre", index, selectedOption);
              }}
            />
          ))}
        </div>
        <div className="gap-3 col-lg-4 col-sm-6 col-12 col d-flex flex-column">
          {directorPreference.map((director, index) => (
            <AutoCompleteDropDown
              key={director.id}
              options={[]}
              idKey="id"
              displayKey="name"
              label={`Director Preference #${index + 1}`}
              selectedOption={director}
              onSelect={(selectedOption) => {
                updatePreference("director", index, selectedOption);
              }}
              filterOnSearch={searchPeople}
            />
          ))}
        </div>
        <div className="gap-3 col-lg-4 col-sm-6 col-12 col d-flex flex-column">
          {actorPreference.map((actor, index) => (
            <AutoCompleteDropDown
              key={actor.id}
              options={[]}
              idKey="id"
              displayKey="name"
              label={`Actor Preference #${index + 1}`}
              selectedOption={actor}
              onSelect={(selectedOption) => {
                updatePreference("actor", index, selectedOption);
              }}
              filterOnSearch={searchPeople}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
