import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Onboarding/Login";
import Signup from "./screens/Onboarding/Signup";
import Landing from "./screens/Landing";
import Schedular from "./screens/Schedular";
import { UserProvider } from "./context/userProvider";
import Profile from "./screens/Profile";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Landing />
                </PrivateRoute>
              }
            />
            <Route
              path="/schedular"
              element={
                <PrivateRoute>
                  <Schedular />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
