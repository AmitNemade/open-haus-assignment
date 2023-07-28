/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useUser } from "../context/userProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useUser();

  return (
    <>
      <nav
        className="px-3 navbar navbar-expand-lg w-100 fixed-top"
        style={{ background: "#0d253f" }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold link-underline link-underline-opacity-0"
            href="/"
            style={{ color: "#01b4e4" }}
          >
            <i className="bi bi-film"></i> Movie Schedular
          </Link>
          {user ? (
            <div className="gap-3 d-flex align-items-center">
              <Link
                to="/profile"
                className="gap-2 text-white link-underline link-underline-opacity-0 d-flex align-items-center"
              >
                <div className="p-3 bg-white rounded-circle"></div>
                Hello User
              </Link>
              <div
                role="button"
                style={{ color: "#01b4e4" }}
                onClick={() => logoutUser()}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="gap-3 d-flex">
              <Link
                to="/login"
                className="text-white link-underline-opacity-0 link-underline"
                role="button"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white link-underline-opacity-0 link-underline"
                role="button"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div style={{ height: "56px" }}></div>
    </>
  );
};

export default Navbar;
