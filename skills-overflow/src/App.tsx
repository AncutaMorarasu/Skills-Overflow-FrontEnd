import React, { useState } from "react";
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
import RegistrationInvalidToken from "./pages/registration-check";
import RegistrationExpiredToken from "./pages/registration-expired-token";
import NoPosts from "./pages/no-posts-page";
import NoSearchResult from "./pages/no-search-result-page";
import PendingQuestions from "./pages/admin/question-confirmation";
import PendingAnswers from "./pages/admin/answer-confirmation";
import ProfilePage from "./pages/profile"
import PrivateRoute from "./components/private-auth";
import useAuth from "./components/useAuth";

function App() {
  const bol = useAuth();
  const [isAuthenticated, setUserHasAuthenticated] = useState<boolean>(bol);

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" >
            <LoginPage appProps={{ isAuthenticated, setUserHasAuthenticated }} />
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
          <PrivateRoute
            path={["/posts/:pageNo/:criteria?", "/dashboard"]}
            component={Dashboard}
            appProps={{ isAuthenticated, setUserHasAuthenticated }}
          />
          {/* <Route path={["/posts/:pageNo/:criteria?", "/dashboard"]}>
            <Dashboard />
          </Route> */}
          <PrivateRoute
            path="/singlePost/:id"
            component={IndividualPost}
            appProps={{ isAuthenticated, setUserHasAuthenticated }}
          />
          {/* <Route path="/singlePost/:id">
            <IndividualPost />
          </Route> */}
          <PrivateRoute
            path="/no-posts"
            component={NoPosts}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          {/* <Route path="/no-posts">
            <NoPosts />
          </Route> */}
          <PrivateRoute
            path="/no-search-result"
            component={NoSearchResult}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          {/* <Route path="/no-search-result">
            <NoSearchResult />
          </Route> */}
          <PrivateRoute
            path="/account-requests"
            component={PendingUsers}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          {/* <Route path="/account-requests">
            <PendingUsers />
          </Route> */}
          <PrivateRoute
            path="/declined-users"
            component={DeclinedUsers}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          {/* <Route path="/declined-users">
            <DeclinedUsers />
          </Route> */}
          <PrivateRoute
            path="/blocked-users"
            component={BlockedUsers}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          {/* <Route path="/blocked-users">
            <BlockedUsers />
          </Route> */}
          <PrivateRoute
            path="/approved-profiles"
            component={ApprovedProfiles}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          {/* <Route path="/approved-profiles">
            <ApprovedProfiles />
          </Route> */}
          <PrivateRoute
            path="/pending-questions"
            component={PendingQuestions}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          {/* <Route path="/pending-questions">
            <PendingQuestions />
          </Route> */}
          <PrivateRoute
            path="/pending-answers"
            component={PendingAnswers}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          {/* <Route path="/pending-answers">
            <PendingAnswers />
          </Route> */}
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
          <PrivateRoute
            path="/profile"
            component={ProfilePage}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          {/* <Route path="/profile">
            <ProfilePage />
          </Route> */}
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
