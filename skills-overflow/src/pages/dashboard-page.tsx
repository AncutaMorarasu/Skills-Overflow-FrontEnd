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
  const [userToken, setUserToken] = useState<number>(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState([]);
  let history = useHistory();

  let userlogged = localStorage.getItem("user");
  let currentUser: any;

  useEffect(() => {
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
    axios.get('http://localhost:8081/notifications', { headers: { Authorization: 'Bearer ' + currentUser.token } })
         .then(response => {
            const setData = response.data;
            setNotification(setData);
            },
              error => {
              console.log(error);
        }
  )
  }, []);

  const signOut = () => {
    localStorage.clear();
    history.push("/");
  };

  function displayModal(){
    setShowModal(true);
  }

  return (
    <div className="dashboard">
      <div className="d-flex justify-content-end">
        <Button onClick={() => {displayModal(); }} variant="light" className="accountBtn">
          Notification
        </Button>
        <Button onClick={signOut} variant="light" className="accountBtn">
          My Profile
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

        <Modal show={showModal} onHide={showModal} className="modal">
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
            <Modal.Body><div className="modal-body">
      <table className="table table-hover">
        <tbody>
        {notification.map(({ notificationString, postName, postUrl, postDate }) => (
        <tr>
          <th scope="row"></th>
          <td>{notificationString}</td>
          <td>{postName}</td>
          <td>{postUrl}</td>
          <td>{postDate}</td>
        </tr>
))}
        </tbody>
      </table>
    </div></Modal.Body>     
        </Modal>

</div>

  );
}

export default Dashboard;
