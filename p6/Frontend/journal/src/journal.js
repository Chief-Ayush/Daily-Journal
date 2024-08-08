import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Recents from "./components/recents";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";

function Journal() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <body>
      <div className="homepage">
        <BrowserRouter>
          <header>
            <div className="AppName">
              <h1>Daily Journal</h1>
              <p>Your Dearest Listener</p>
            </div>

            <nav>
              {user && (
                <div>
                  <span>{user.email}</span>
                  <button onClick={handleClick}>Log Out</button>
                </div>
              )}
              {!user && (
                <div className="login-signup">
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </div>
              )}
            </nav>
          </header>
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={user ? <Recents /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </body>
  );
}

export default Journal;
