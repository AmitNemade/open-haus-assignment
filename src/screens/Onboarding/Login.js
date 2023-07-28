import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userProvider";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useUser();

  return (
    <div className="row w-100 justify-content-center login-form-container">
      <div className="col-lg-4 col-md-6 col-10">
        <div className="card mt-5">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Login</h3>
            <form
              onSubmit={() => {
                loginUser();
                navigate("/");
              }}
            >
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address or Username
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email or username"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
