import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalComponent from "../../components/modal";

export default function PendingUsers() {

  const [getUserId, setGetUserId] = useState<number>(0);
  const [userProfile, setUserProfile] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [save, setSave] = useState(false);
  let token = localStorage.getItem("user");
  let tokenCheck: any;

  function localData(){
    if (typeof token === "string") {
      tokenCheck = JSON.parse(token);
    }
  }

  //Get users from database for table
  useEffect(() => {
    localData();
    axios.get('http://localhost:8081/allPendingUsers',{headers:{Authorization: 'Bearer ' + tokenCheck.token}}).then(
      response => {
        const setData = response.data;
        setUserProfile(setData);
      },
      error => {
        console.log(error);
      }
    );
  }, []);

  // Approve user
  function updateUserRole() {
    localData();
    axios.put(`http://localhost:8081/admin/approveRequest/${getUserId}`,{},{headers: {Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json"}}).then(
      response => {
        getUsers()
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  function declineUser() {
    localData()
    axios.put(`http://localhost:8081/admin/declineRequest/${getUserId}`, {} ,{headers:{Authorization: 'Bearer ' + tokenCheck.token}}).then(
      response => {
        getUsers()
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  // Display pending users
  function getUsers() {
    localData();
    axios.get('http://localhost:8081/allPendingUsers',{headers:{Authorization: 'Bearer ' + tokenCheck.token}}).then(response => {
      const setData = response.data;
      setUserProfile(setData);
    });
  }

  //Approve request
  function approveRequest() {
    toggle();
    updateUserRole();
    console.log(save);
  }

  //Decline request function
  function declineRequest() {
    toggle();
    updateUserRole();
    declineUser();
    console.log(save);
  }

  //Show modal
  function toggle() {
    setModal(!modal);
  }

  return (
    <div className="pending_requests_page">
      <div className="tables">
        {/* Register requests table */}
        <h1 className="request_header">Register requests</h1>
      </div>
      <div className="table_container">
        <div className="table__container">
          <table className="table table-bordered">
            <thead className="table_head">
              <tr>
                <th scope="col">User id</th>
                <th scope="col">User name</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userProfile.map(
                ({ userId, userName, firstName, lastName, email }) => (
                  <tr key={userId}>
                    <td>{userId}</td>
                    <td>{userName}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>
                      <Button
                        type="button"
                        className="btn btn-success btn-table"
                        onClick={() => {
                          toggle();
                          setGetUserId(userId);
                          setModalMessage(
                            "Are you sure you want to accept this users request?"
                          );
                          setSave(true);
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        type="button"
                        className="btn btn-danger btn-table"
                        onClick={() => {
                          toggle();
                          setGetUserId(userId);
                          setModalMessage(
                            "Are you sure you want to decline this users request?"
                          );
                          setSave(false);
                        }}
                      >
                        Decline
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalComponent
        modal={modal}
        toggle={toggle}
        modalM={modalMessage}
        approveRequest={approveRequest}
        declineRequest={declineRequest}
        save={save}
      />
    </div>
  );
}
