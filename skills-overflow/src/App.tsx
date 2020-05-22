import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./pages/not-found-page";
import LoginPage from "./pages/login-page";
import PasswordRecPage from "./pages/password-rec-page";
import RegisterPage from "./pages/register-page";
import Header from "./components/header";
import Footer from "./components/footer";
import Dashboard from "./pages/dashboard-page";
import ChangePasswordPage from "./pages/change-password-page";
import RegisterConfirm from "./pages/register-confirmation";
import ApprovedProfiles from "./pages/admin/approved-profiles";
import DeclinedUsers from "./pages/admin/declined-users";
import PendingUsers from "./pages/admin/pending-users";
import BlockedUsers from "./pages/admin/blocked-users";
import IndividualPost from './pages/individual-post'
import ForbiddenPage from "./pages/forbidden-page";
<<<<<<< HEAD
import DownPagination from "./components/pagination";
=======
import RegistrationInvalidToken from "./pages/registration-check";
import RegistrationExpiredToken from "./pages/registration-expired-token";
import NotificationPage from "./pages/notification-page";
>>>>>>> development

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

          <Route path={["/posts/:pageNo/:criteria?", "/dashboard"]}>
            <Dashboard />
          </Route>
          <Route path="/singlePost/:id">
            <IndividualPost />
          </Route>

          <Route path="/account-requests">
            <PendingUsers />
          </Route>
          <Route path="/declined-users">
            <DeclinedUsers />
          </Route>
          <Route path="/blocked-users">
            <BlockedUsers />
          </Route>
          <Route path="/approved-profiles">
            <ApprovedProfiles />
          </Route>
          <Route path="/registration-invalid-token">
            <RegistrationInvalidToken />
          </Route>
          <Route path="/registration-expired-token">
            <RegistrationExpiredToken />
          </Route>
          <Route path="/register-confirmation">
            <RegisterConfirm />
          </Route>
          <Route path="/forbidden-page">
            <ForbiddenPage />
          </Route>
          <Route path="/notification-page">
            <NotificationPage />
          </Route>
          <Route path="">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
