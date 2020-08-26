import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalComponent from "../../components/modal";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import SidenavAdmin from '../../components/side-nav-admin'
//import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

export default function ExistingProfiles(props: any) {
  const [getUserId, setUserId] = useState<number>(0);
  const [userProfile, setUserProfile] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [save, setSave] = useState(false);
  let token = localStorage.getItem("user");
  let tokenCheck: any;
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, setUserHasAuthenticated } = props;
  
 
  function handleChange(event: any){
    setSearchTerm(event.target.value);
  }

  function localData() {
    if (typeof token === "string") {
      tokenCheck = JSON.parse(token);
    }
  }
  const signOut = () => {
    localStorage.clear();
    setUserHasAuthenticated(false);
    history.push("/");
  };

  // Get users from database
  useEffect(() => {
    localData();
    axios.get('http://localhost:8080/allStudents', { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
      .then(response => {
        const setData = response.data;
        setUserProfile(setData);
      }).catch(function (error) {
        if (error.request.status === 403) {
          history.push("/forbidden-page")
        }
      })
  }, [searchTerm]);

    //Delete users from data baste
    function deleteUser() {
      localData();
      axios.delete(`http://localhost:8080/student/remove/${getUserId}`, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
        response => {
          console.log(save);
  
          if (response.status === 200) {
            getUsers();
            cogoToast.success("The changes have been made", { hideAfter: 5 })
          }
          console.log(response)
        },
        error => {
          console.log(save);
          console.log(error);
        }
      );
    }


  // Display pending users
  function getUsers() {
    localData();
    axios.get('http://localhost:8080/allStudents', { headers: { Authorization: 'Bearer ' + tokenCheck.token } }).then(
      response => {
        const setData = response.data;
        setUserProfile(setData);
        console.log(save);
      }
    )
  }


  function deleteRequest() {
    toggle();
    deleteUser();
  }
  function approveRequest() {
    toggle();
    //updateUserRole();
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
          <div className="d-flex justify-content-end">
        <Button onClick={signOut} variant="light" className="accountBtn">
          Log Out
        </Button>
      </div>
      <SidenavAdmin />
      <div className="tables">
        <h1 className="request_header">
          Students
      </h1>
      <input type="text" className="form-control table-search" placeholder="Search by email"
        value={searchTerm} onChange={handleChange}/>
      </div>
      <div className="table_container">
        <div className="table__container">
          <table className="table table-bordered">
            <thead className="table_head">
              <tr>
                <th scope="col">Student id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(({studentId, firstName, lastName, email, phoneNumber}) => (
                <tr key={studentId}>
                  <td>{studentId}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td> 
                  <td>{phoneNumber}</td>
                  <td>
                  <Button type="button" className="btn btn-danger btn-table" onClick={() => { toggle(); setUserId(studentId); setModalMessage("Are you sure you want to delete this user's request?"); setSave(true) }}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalComponent modal={modal} toggle={toggle} modalM={modalMessage} approveRequest={approveRequest} declineRequest={deleteRequest} save={save} />
    </div>
  )
}