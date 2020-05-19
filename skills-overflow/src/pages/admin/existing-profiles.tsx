import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import ModalComponent from "../../components/modal";

export default function ExistingProfiles() {
  const [getUserId, setUserId] = useState<number>(0);
  const [userProfile, setUserProfile] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [save, setSave] = useState(false);


  // Get users from database
  useEffect(() => {
    axios.get('http://localhost:8081/users').then(
      response => {
        const setData = response.data;
        setUserProfile(setData);
      }
    )
  });

//Post user to database
  function updateUserRole(){
    axios.put(`http://localhost:8081/promoteToAdmin/${getUserId}`).then(
      response => {
      console.log(response);
      },
      error => {
        console.log(error);
    }
  );
}

function updateBlockUser(){
  axios.put(`http://localhost:8081/blockUser/${getUserId}`).then(
    response => {
    console.log(response);
    },
    error => {
      console.log(error);
  }
);
}

  //Upgrade user to admin
  function upgradeUser(){
    toggle();
    updateUserRole();
  }

  //Ban existing user
  function blockUser(){
    toggle();
    updateBlockUser();
  }  

    //Open modal
    function toggle() {
      setModal(!modal);
  }
  
  return (
    <div className="requests_page">
      <div className="tables">
        <h1 className="request_header">
          Existing profiles
      </h1>
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
                <th scope="col">Roles</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userProfile.map(({ userId, userName, firstName, lastName, email, role }) => (
                <tr key= {userId}>
                  <td>{userId}</td>
                  <td>{userName}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td>
                    <Button type="button" className="btn btn-success btn-table-update" onClick={() => 
                      {toggle(); setModalMessage("Are you sure you want to promote this user to admin?");}}>Upgrade to admin</Button>
                    <Button type="button" className="btn btn-danger btn-table-update"onClick={() => 
                      {toggle(); setModalMessage("Are you sure you want to block this user?")}}>Block user</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalComponent modal={modal} toggle={toggle} modalM={modalMessage} approveRequest={upgradeUser} declineRequest={blockUser} save={save}/>
      </div>
  )
}