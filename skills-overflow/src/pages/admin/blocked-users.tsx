import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalComponent from "../../components/modal";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import SidenavAdmin from '../../components/side-nav-admin'

export default function BlockedUsers() {

  const [getUserId, setUserId] = useState<number>(0);
  const [userProfile, setUserProfile] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [save, setSave] = useState(false);
  let token = localStorage.getItem("user");
  let tokenCheck: any;

  const history = useHistory();


  function localData() {
    if (typeof token === "string") {
      tokenCheck = JSON.parse(token);
    }
  }

  //Get users from database
  useEffect(() => {
    localData();
    axios.get('http://localhost:8081/allBlockedUsers', { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
      .then(response => {
        const setData = response.data;
        setUserProfile(setData);
      })
      .catch(function (error) {
        if (error.request.status === 403) {
          history.push("/forbidden-page")
        }
        console.log(error)
      })
  }, []);

  //Approve user
  function updateUserRole() {
    localData();
    axios.put(`http://localhost:8081/admin/unblockUser/${getUserId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
      response => {
        if (response.status === 200) {
          getUsers();
          cogoToast.success("The changes have been made", { hideAfter: 5 })
        }
      },
      error => {
        console.log(error);
      }
    );

  }

  function getUsers() {
    localData();
    axios.get('http://localhost:8081/allBlockedUsers', { headers: { Authorization: 'Bearer ' + tokenCheck.token } }).then(
      response => {
        if (response.status === 200) {
          getUsers();
        }
        const setData = response.data;
        setUserProfile(setData);
      }
    )
  }

  //Unblock request function
  function unblockRequest() {
    toggle();
    updateUserRole();
  }

  function declineRequest() {
    return true;
  }

  //Show modal
  function toggle() {
    setModal(!modal);
  }

  return (
    <div className="banned_users_page">
      <SidenavAdmin />
      <div className="tables">

        {/* Banned table */}
        <h1 className="banned_header">
          Blocked users
            </h1>
        <div className="table_container_banned_users">
          <div className="table__container">
            <table className="table table-bordered">
              <thead className="table_head">
                <tr>
                  <th scope="col">User name</th>
                  <th scope="col">First Name</th>
                  <th scope="col">User id</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userProfile.map(({ userId, userName, firstName, lastName, email }) => (
                  <tr>
                    <td>{userId}</td>
                    <td>{userName}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>
                      <Button type="button" className="btn btn-success btn-table" onClick={() => { toggle(); setUserId(userId); setModalMessage("Are you sure you want to unblock this user?"); setSave(true); }}>Unblock</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
        <ModalComponent modal={modal} toggle={toggle} modalM={modalMessage} approveRequest={unblockRequest} declineRequest={declineRequest} save={save} />
      </div>
    </div>
  )
}
