import React, { useEffect, useState } from "react";
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-user";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import QuestionCard from "../components/question-cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "react-bootstrap/Modal";


function Dashboard() {
  const [modal, setModal] = useState(false);
  const [notification, setNotification] = useState([]);
  let [userToken, setUserToken] = useState<number>(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchParam, setParam] = useState("");
  const [toChild, setToChild] = useState("");
  const [effects, setEffects] = useState(true);
  let history = useHistory();
  let userlogged = localStorage.getItem("user");
  let currentUser: any;

  function userVsAdmin(){
    
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
    axios.get('http://localhost:8081/notifications', { headers: { Authorization: 'Bearer ' + currentUser.token } })
      .then(
        response => {
          const setData = response.data;
          setNotification(setData);
        }
      ).catch(function (error) {
        if (error.request.status === 403) {
          history.push("/forbidden-page")
        }
      })
  }, []);

  const signOut = () => {
    localStorage.clear();
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
        <Button onClick={() => { }} variant="light" className="accountBtn">
          Notification
        </Button>
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
      </div> *
      <div>{showAdmin ? <SidenavAdmin /> : <SidenavUser />}</div>

      <QuestionCard
        searchParam={toChild}
        changeFlag1={changeFlag}
        effects={effects}
      />
  
      <Modal show={modal} className="modal notif-modal">
        <Modal.Header closeButton onClick={toggle}>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <table className="table table-hover">
              <tbody>
                {notification.map(({ notificationString, postName, postUrl, postDate, notificationType}) => (
                  <tr>
                    <th scope="row"></th>
                    <td className="not-rows">{notificationString}</td>
                    <td className="not-rows">{postName}</td>
                    <td className="not-rows">{postUrl}</td>
                    <td className="not-rows">{postDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default Dashboard;
