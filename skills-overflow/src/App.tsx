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
import RegisterConfirm from "./pages/register-confirmation";

function App() {
  return (
    <div>
      <Router>
        <Header />
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
          <Route path="/changePassword/:token">
            <ChangePasswordPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/register-confirmation">
            <RegisterConfirm />
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
