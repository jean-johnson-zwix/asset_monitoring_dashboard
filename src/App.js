import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Configuration from "./pages/Configuration";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const [user, setUser] = useState({ userName: null, auth: null });

  const loginUser = (userName, auth) => {
    setUser({ userName: userName, auth: auth });
  };

  const logoutUser = () => {
    setUser({ userName: null, auth: null });
  };

  const display = () => {
    if (user.userName === null) {
      return <LoginPage loginUser={loginUser} />;
    } else {
      return <LandingPage user={user} logout={logoutUser} />;
    }
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <LoginPage loginUser={loginUser} />}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <LandingPage
                user={user}
                logout={logoutUser}
                component={<Dashboard />}
              />
            )}
          />
          <Route
            exact
            path="/admin"
            render={(props) => (
              <LandingPage
                user={user}
                logout={logoutUser}
                component={<Configuration user={user} />}
              />
            )}
          />
          <Route
            exact
            path="/error"
            render={(props) => (
              <LandingPage
                user={user}
                logout={logoutUser}
                component={<ErrorPage />}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
