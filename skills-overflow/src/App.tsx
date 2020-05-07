import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./pages/not-found-page";
import LoginPage from "./pages/login-page";
import PasswordRecPage from './pages/password-rec-page';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        
        <Route exact path="/recovery">
        <PasswordRecPage/>  
        </Route> 

        <Route path="">
          <NotFoundPage />
        </Route> 
      </Switch>
    </Router>
  );
}

export default App;
