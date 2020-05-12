import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./pages/not-found-page";
import LoginPage from "./pages/login-page";
import PasswordRecPage from "./pages/password-rec-page";
import RegisterPage from "./pages/register-page";
import Header from "./components/header";
import Dashboard from "./pages/dashboard-page";
import ChangePasswordPage from "./pages/change-password-page";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>

          <Route path="/recovery">
            <PasswordRecPage />
          </Route>

          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/change-password">
            <ChangePasswordPage/>
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
