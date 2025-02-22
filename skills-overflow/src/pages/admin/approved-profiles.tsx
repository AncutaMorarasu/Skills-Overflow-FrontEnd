import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalComponent from "../../components/modal";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import SidenavAdmin from '../../components/side-nav-admin'
//import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

export default function ExistingProfiles() {
  const [getUserId, setGetUserId] = useState<number>(0);
  const [userProfile, setUserProfile] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [save, setSave] = useState(false);
  let token = localStorage.getItem("user");
  let tokenCheck: any;
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  
 
  function handleChange(event: any){
    setSearchTerm(event.target.value);
  }

  function localData() {
    if (typeof token === "string") {
      tokenCheck = JSON.parse(token);
    }
  }

  // Get users from database
  useEffect(() => {
    localData();
    axios.get('http://localhost:8081/allApprovedUsers', { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
      .then(response => {
        const setData = response.data;
        setUserProfile(setData);
      }).catch(function (error) {
        if (error.request.status === 403) {
          history.push("/forbidden-page")
        }
      })
  }, [searchTerm]);

  //Post user to database
  function updateUserRole() {
    localData();
    axios.put(`http://localhost:8081/admin/promoteToAdmin/${getUserId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
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

  function updateBlockUser() {
    localData()
    axios.put(`http://localhost:8081/admin/blockUser/${getUserId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
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

  // Display pending users
  function getUsers() {
    localData();
    axios.get('http://localhost:8081/allApprovedUsers', { headers: { Authorization: 'Bearer ' + tokenCheck.token } }).then(
      response => {
        const setData = response.data;
        setUserProfile(setData);
        console.log(save);
      }
    )
  }

  //Upgrade user to admin
  function upgradeUser() {
    toggle();
    updateUserRole();
  }

  //Ban existing user
  function blockUser() {
    toggle();
    updateBlockUser();
  }

  //Open modal
  function toggle() {
    setModal(!modal);
  }

  //Filter input
  const filteredUsers = userProfile.filter((user: any) => {
    return user.email.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="requests_page">
      <SidenavAdmin />
      <div className="tables">
        <h1 className="request_header">
          Approved profiles
      </h1>
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
              {filteredUsers.map(({userId, userName, firstName, lastName, email}) => (
                <tr key={userId}>
                  <td>{userId}</td>
                  <td>{userName}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td> 
                  <td>
                    <Button type="button" className="btn btn-success btn-table-update" onClick={() => { toggle();  setGetUserId(userId) ; setModalMessage("Are you sure you want to promote this user to admin?"); setSave(false) }}>Upgrade to admin</Button>
                    <Button type="button" className="btn btn-danger btn-table-update" onClick={() => { toggle();  setGetUserId(userId); setModalMessage("Are you sure you want to block this user?"); setSave(true); }}>Block user</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalComponent modal={modal} toggle={toggle} modalM={modalMessage} approveRequest={upgradeUser} declineRequest={blockUser} save={save} />
    </div>
  )
}