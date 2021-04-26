import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ConfirmEmail from "./ConfirmEmail/ConfirmEmail";
import Dashboard from "./Dashboard/Dashboard";
import LogIn from "./LogIn/LogIn";
import PasswordRecovery from "./PasswordRecovery/PasswordRecovery";
import Register from "./Register/Register";

function App() {
  let [token, setToken] = useState(null);
  let [loggedUser, setLoggedUser] = useState(null);

  const getToken = () => {
    if (localStorage.getItem("token")) return localStorage.getItem("token");
    else return token;
  };

  const handleTokenRetrieval = (t, user) => {
    setLoggedUser(user);
    setToken(t);
  };

  const handleLogOut = () => {
    setLoggedUser(null);
    setToken(null);
    localStorage.clear("token");
  };

  const getHome = () => {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route path="/:id/confirm">
          <ConfirmEmail />
        </Route>
        <Route path="/dashboard">
          <Dashboard
            token={getToken()}
            onLogout={handleLogOut}
            loggedUser={loggedUser}
          ></Dashboard>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/passwordRecovery">
          <PasswordRecovery />
        </Route>
        <Route path="/login">
          <LogIn
            token={getToken()}
            onTokenRetrieval={handleTokenRetrieval}
            loggedUser={loggedUser}
            onLogout={() => handleLogOut()}
          ></LogIn>
        </Route>
        <Route path="/">
          {getHome()}
          <div>
            <h1>404 ---- Not Found!</h1>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
