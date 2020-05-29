import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalComponent from "../../components/modal";
import { useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";
import SidenavAdmin from '../../components/side-nav-admin'

export default function PendingUsers() {

  const [getUserId, setGetUserId] = useState<number>(0);
  const [userProfile, setUserProfile] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [save, setSave] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  let token = localStorage.getItem("user");
  let tokenCheck: any;
  const history = useHistory();

  function localData() {
    if (typeof token === "string") {
      tokenCheck = JSON.parse(token);
    }
  }

  function handleChange(event: any){
    setSearchTerm(event.target.value);
  }

  //Get users from database for table
  useEffect(() => {
    localData();
    axios.get('http://localhost:8081/allPendingUsers', { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
      .then(response => {
        const setData = response.data;
        setUserProfile(setData);
      }).catch(function (error) {
        if (error.request.status === 403) {
          history.push("/forbidden-page")
        }
      })
  }, []);

  // Approve user
  function updateUserRole() {
    localData();
    axios.put(`http://localhost:8081/admin/approveRequest/${getUserId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
      response => {
        if (response.status === 200) {
          getUsers();
          cogoToast.success("The changes have been made", { hideAfter: 5 })
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  function declineUser() {
    localData()
    axios.put(`http://localhost:8081/admin/declineRequest/${getUserId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
      .then(response => {
        if (response.status === 200) {
          getUsers();
          cogoToast.success("The changes have been made", { hideAfter: 5 })
        }
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
    axios.get('http://localhost:8081/allPendingUsers', { headers: { Authorization: 'Bearer ' + tokenCheck.token } }).then(
      response => {
        const setData = response.data;
        setUserProfile(setData);
      });
  }

  //Approve request
  function approveRequest() {
    toggle();
    updateUserRole();
  }

  //Decline request function
  function declineRequest() {
    toggle();
    declineUser();
  }

  //Show modal
  function toggle() {
    setModal(!modal);
  }

  //Filter input
  const filteredUsers = userProfile.filter((user: any) => {
    return user.email.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="pending_requests_page">
      <SidenavAdmin />
      <div className="tables">
        {/* Register requests table */}
        <h1 className="request_header">Account requests</h1>
        <input type="text" className="form-control table-search" placeholder="Search by email"  value={searchTerm} onChange={handleChange}/>
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
              {filteredUsers.map(
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
                            "Are you sure you want to accept this user's request?"
                          );
                          setSave(false);
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
                            "Are you sure you want to decline this user's request?"
                          );
                          setSave(true);
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
