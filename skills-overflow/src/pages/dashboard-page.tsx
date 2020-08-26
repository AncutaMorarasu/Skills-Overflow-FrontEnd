import React, { useEffect, useState } from "react";
import SidenavAdmin from "../components/side-nav-admin";
import SidenavStudent from "../components/side-nav-student";
import { useHistory, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import JobCard from "../components/job cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import cogoToast from "cogo-toast";


function Dashboard(props: any) {
  const [modal, setModal] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationId, setNotificationId] = useState<number>(0);
  const [notificationString, setNotificationString] = useState('');
  let [userToken, setUserToken] = useState<number>(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchParam, setParam] = useState("");
  const [toChild, setToChild] = useState("");
  const [effects, setEffects] = useState(true);
  let history = useHistory();
  let userlogged = localStorage.getItem("user");
  let currentUser: any;
  const [url, setUrl] = useState('');
  const { isAuthenticated, setUserHasAuthenticated } = props;

  function userVsAdmin() {

    if (typeof userlogged === "string") {
      currentUser = JSON.parse(userlogged);
      setUserToken(currentUser.token)
      console.log(currentUser);
      if (currentUser.role === "[admin]") {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
      }
    }
  }

  //Get users from database
  useEffect(() => {
    userVsAdmin();
  }, []);

  const signOut = () => {
    localStorage.clear();
    setUserHasAuthenticated(false);
    history.push("/");
  };

  const changeParams = (event: any) => {
    const param = event.target.value;
    setParam(param);

  }

  const sendToChild = () => {
    setToChild(searchParam);
    //console.log("this is what the child is getting, just on the second click... --> ", toChild);

    setParam("");
    history.push({ pathname: "/dashboard" });
    changeFlag();
  }

  const changeFlag = () => {
    if (effects) setEffects(false);
    else {
      setEffects(true);
    }
  };

  function toggle() {
    setModal(!modal);
  }








  return (
    <div className="dashboard">
      <div className="d-flex justify-content-end">
        <Button onClick={signOut} variant="light" className="accountBtn">
          Log Out
        </Button>
      </div>
      <div className="d-flex justify-content-around custom-dash">
        <form action="" className="searchForm" >
          <div className="input-group mb-4 border rounded-pill p-1 searchInput">
            <input
              type="text"
              placeholder="What are you searching for?"
              aria-describedby="button-addon3"
              className="form-control bg-none border-0 searchInput"
              value={searchParam}
              onChange={changeParams}
            />
            <div className="input-group-append border-0">
              <button
                id="button-addon3"
                type="button"
                className="btn btn-link text-success"
              >
                <FontAwesomeIcon icon={faSearch} onClick={sendToChild} />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>{showAdmin ? <SidenavAdmin /> : <SidenavStudent />}</div>

      <JobCard
      effects={effects}></JobCard>



    </div>
  );
}

export default Dashboard;
