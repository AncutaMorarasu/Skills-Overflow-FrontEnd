import React, { useEffect, useState } from "react";
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-user";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import QuestionCard from "../components/question-cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [showAdmin, setShowAdmin] = useState(false);
  let history = useHistory();

  let userlogged = localStorage.getItem("user");
  let currentUser;

  useEffect(() => {

    if (typeof userlogged === "string") {
      currentUser = JSON.parse(userlogged);
      console.log(currentUser);
      if (currentUser.role === "[admin]") {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
      }
    }
  }
    // , [userlogged]
  );


  const signOut = () => {
    localStorage.clear();
    history.push("/");
  };


  return (
    <div className="dashboard">
      <div className="d-flex justify-content-end">
        <Button onClick={signOut} variant="light" className="accountBtn">
          Log Out
        </Button>
      </div>
      <div className="d-flex justify-content-around custom-dash">
        <form action="" className="searchForm">
          <div className="input-group mb-4 border rounded-pill p-1 searchInput">
            <input
              type="text"
              placeholder="What are you searching for?"
              aria-describedby="button-addon3"
              className="form-control bg-none border-0 searchInput"
            />
            <div className="input-group-append border-0">
              <button
                id="button-addon3"
                type="button"
                className="btn btn-link text-success"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>{showAdmin ? <SidenavAdmin /> : <SidenavUser />}</div>
      <QuestionCard />
    </div>
  );
}

export default Dashboard;
