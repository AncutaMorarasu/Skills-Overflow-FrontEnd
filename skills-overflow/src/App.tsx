import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./pages/not-found-page";
import LoginPage from "./pages/login-page";
import PasswordRecPage from "./pages/password-rec-page";
import StudentRegisterPage from "./pages/student-register-page";
import CompnayRegisterPage from "./pages/company-register-page";
import ChooseRegistration from "./pages/choose-registration";
import Header from "./components/header";
import Footer from "./components/footer";
import Dashboard from "./pages/dashboard-page";

import Students from "./pages/admin/students";
import Companies from "./pages/admin/companies";
import DeclinedUsers from "./pages/admin/unapproved-jobs";
import PendingUsers from "./pages/admin/companies";

import IndividualPost from './pages/individual-post'
import ForbiddenPage from "./pages/forbidden-page";

import NoPosts from "./pages/no-posts-page";

import PendingQuestions from "./pages/admin/approved-jobs";

import ProfilePage from "./pages/profile"
import PrivateRoute from "./components/private-auth";
import useAuth from "./components/useAuth";
import ApprovedJobs from "./pages/admin/approved-jobs"
import UnapprovedJobs from "./pages/admin/unapproved-jobs"
import NewsAdmin from "./pages/admin/news"
import News from "./pages/news"
import StudentProfile from "./pages/profile-student"

import IndividualInfo from "./pages/individual-info-news"

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
          <Route path="/student/register">
            <StudentRegisterPage />
          </Route>
          <Route path="/company/register">
            <CompnayRegisterPage />
          </Route>
          <Route path="/choose/register">
            <ChooseRegistration />
          </Route>

          <Route path="/myprofile">
            <StudentProfile />
          </Route>

          <Route path="/news">
            <News />
          </Route>
          


          <PrivateRoute
            path={["/posts/:pageNo/:criteria?", "/dashboard"]}
            component={Dashboard}
            appProps={{ isAuthenticated, setUserHasAuthenticated }}
          />
          
          <PrivateRoute
            path="/singlePost/:id"
            component={IndividualPost}
            appProps={{ isAuthenticated, setUserHasAuthenticated }}
          />

          <PrivateRoute
            path="/info/:id"
            component={IndividualInfo}
            appProps={{ isAuthenticated, setUserHasAuthenticated }}
          />
          
          <PrivateRoute
            path="/no-posts"
            component={NoPosts}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          
 
          
          <PrivateRoute
            path="/account-requests"
            component={PendingUsers}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          
          <PrivateRoute
            path="/declined-users"
            component={DeclinedUsers}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          

          <PrivateRoute
            path="/admin/students"
            component={Students}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />

          <PrivateRoute
            path="/admin/approvedjobs"
            component={ApprovedJobs}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />

          <PrivateRoute
            path="/admin/unapprovedJobs"
            component={UnapprovedJobs}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />

          <PrivateRoute
            path="/admin/news"
            component={NewsAdmin}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />

          <PrivateRoute
            path="/admin/companies"
            component={Companies}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          
          <PrivateRoute
            path="/pending-questions"
            component={PendingQuestions}
            appProps={{ isAuthenticated, setUserHasAuthenticated }} // or whatever method you use for checking auth
          />
          
          

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
