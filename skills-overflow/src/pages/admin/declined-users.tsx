import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalComponent from "../../components/modal";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";

export default function DeclinedUsers() {
  const [getUserId, setUserId] = useState<number>(0);
  const [userProfile, setUserProfile] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [save, setSave] = useState(false);
  let token = localStorage.getItem("user");
  let tokenCheck: any;
  const history = useHistory();


  function localData(){
    if (typeof token === "string") {
      tokenCheck = JSON.parse(token);
    }
  }

  //Get users from database
  useEffect(() => {
    localData();
    axios.get('http://localhost:8081/allDeclinedUsers',{headers:{Authorization: 'Bearer ' + tokenCheck.token}})
    .then(
      response => {
        const setData = response.data;
        setUserProfile(setData);
      }
    ).catch(function(error) {
      if(error.request.status === 403){
        history.push("/forbidden-page")
      }
    })
  }, []);


  //Approve user
  function updateUserRole(){
    localData();
    axios.put(`http://localhost:8081/admin/approveRequest/${getUserId}`,{},{headers: {Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json"}})
    .then(response => {
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

  //Delete users from data baste
  function deleteUser(){
    localData();
    axios.delete(`http://localhost:8081/admin/remove/${getUserId}`, {headers: {Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json"}}).then(
      response => {
        if (response.status === 200) {
          getUsers();
          cogoToast.success("The changes have been made", { hideAfter: 5 })
        }
      console.log(response)
    },
    error => {
      console.log(error);
    }
  );
}   

  //Display declined requests
  function getUsers(){
    localData();
    axios.get('http://localhost:8081/allDeclinedUsers',{headers:{Authorization: 'Bearer ' + tokenCheck.token}}).then(
      response => {
        const setData = response.data;
        setUserProfile(setData);
      }
    )
  }

  //Approve request function
  function approveRequest(){
    toggle();
    updateUserRole();
  }

  //Decline request function
  function deleteRequest(){
    toggle();
    deleteUser();
  }

  //Show modal
  function toggle() {
    setModal(!modal);
}

  return (
    <div className="declined_requests_page">
      <div className="tables">

{/*Requests declined  table */}
      <div className="tables_declined_users">
        <h1 className="declined_header">
          Declined requests
      </h1>
      </div>
      <div className="table_container_declined_users">
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
              {userProfile.map(({ userId, userName, firstName, lastName, email}) => (
                <tr>
                  <td>{userId}</td>
                  <td>{userName}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                  <td>
                    <Button type="button" className="btn btn-success btn-table" onClick={() => 
                      {toggle(); setUserId(userId);setModalMessage("Are you sure you want to accept this user's request?"); setSave(true)}}>Approve</Button>
                    <Button type="button" className="btn btn-danger btn-table" onClick={() => 
                      {toggle(); setUserId(userId);setModalMessage("Are you sure you want to delete this user's request?"); setSave(false)}}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>



      </div>
      <ModalComponent modal={modal} toggle={toggle} modalM={modalMessage} approveRequest={approveRequest} declineRequest={deleteRequest} save={save}/>
    </div>
  )
}
 