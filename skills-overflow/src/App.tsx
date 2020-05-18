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
import ExistingProfiles from "./pages/admin/existing-profiles";
import DeclinedUsers from "./pages/admin/declined-users";
import PendingUsers from "./pages/admin/pending-users";
import BlockedUsers from "./pages/admin/blocked-users";


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
          <Route path="/pending-users">
            <PendingUsers />
          </Route>
          <Route path="/declined-users">
            <DeclinedUsers />
          </Route>
          <Route path="/blocked-users">
            <BlockedUsers />
          </Route>
          <Route path="/existing-profiles">
            <ExistingProfiles/>
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
