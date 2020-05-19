import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import ModalComponent from '../../components/modal';

export default function PendingUsers() {
  const [getUserId, setGetUserId] = useState<number>(0);
  const [userProfile, setUserProfile] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [save, setSave] = useState(false);

  //Get users from database for table
  useEffect(() => {
    axios.get('http://localhost:8081/allPendingUsers').then(
      response => {
        const setData = response.data;
        setUserProfile(setData);
      },
      error => {
        console.log(error);
      }
    )
  }, [setUserProfile]);

  // Approve user
  function updateUser(){
    axios.put(`http://localhost:8081/approveRequest/${getUserId}`).then((response) => {
      console.log(response)
    },
    error => {
      console.log(error);
    }
    )
  }

  function declineUser(){
    axios.put(`http://localhost:8081/declineRequest/${getUserId}`).then((response) => {
      console.log(response)
    },
    error => {
      console.log(error);
    }
    )
  }

  // Display pending users
  function getUsers(){
    axios.get('http://localhost:8081/allPendingUsers').then(
      response => {
        const setData = response.data;
        setUserProfile(setData);
      }
    )
  }

  //Approve request
  function approveRequest() {
    toggle();
    updateUser();
    getUsers();
    console.log(save);
}

  //Decline request function
  function declineRequest() {
    toggle();
    updateUser();
    declineUser();
    getUsers();
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
        <h1 className="request_header">
          Register requests
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
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{userProfile.map(({ userId, userName, firstName, lastName, email}) => (
                  <tr key= {userId}>
                  <td>{userId}</td>
                  <td>{userName}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                  <td>
                    <button type="button" className="btn btn-success btn-table" onClick={() => 
                      {toggle(); setGetUserId(userId);setModalMessage("Are you sure you want to accept this users request?"); setSave(true)}}>Approve</button>
                    <button type="button" className="btn btn-danger btn-table" onClick={()=> 
                      {toggle(); setGetUserId(userId);setModalMessage("Are you sure you want to decline this users request?"); setSave(false)}}>Decline</button>
                  </td>
                  </tr>
                   ))}
                  </tbody>
          </table>
        </div>
      </div>     
        <ModalComponent modal={modal} toggle={toggle} modalM={modalMessage} approveRequest={approveRequest} declineRequest={declineRequest} save={save}/>
    </div>
  )
}
