import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalComponent from "../components/modal";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import SidenavAdmin from '../components/side-nav-company'
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

  // Get users from database
  useEffect(() => {
    localData();
    axios.get('http://localhost:8080/company/myJobs', { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
      .then(response => {
        const setData = response.data;
        setUserProfile(setData);
        console.log(tokenCheck.token)
      }).catch(function (error) {
        if (error.request.status === 403) {
          history.push("/forbidden-page")
        }
      })
  }, [searchTerm]);

    //Delete users from data baste
    function deleteUser() {
      localData();
      axios.delete(`http://localhost:8080/job/remove/${getUserId}`, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
        response => {
          console.log(tokenCheck.token)
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

    
  function acceptAnswer() {
    localData();
    axios.put(`http://localhost:8080/approveJob/${getUserId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
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
    axios.get('http://localhost:8080/company/myJobs', { headers: { Authorization: 'Bearer ' + tokenCheck.token } }).then(
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
    acceptAnswer();
    //updateUserRole();
  }

  const signOut = () => {
    localStorage.clear();
    setUserHasAuthenticated(false);
    history.push("/");
  };

  //Open modal
  function toggle() {
    setModal(!modal);
  }

  function redirect( id:any ) {
  
     history.push(`/singlePost/${id}`)
     //return <Redirect to='/dashboard' />  
   
 }

  //Filter input
  const filteredUsers = userProfile.filter((job: any) => {
    return job.field.toLowerCase().includes(searchTerm.toLowerCase())
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
          My jobs
      </h1>
      <input type="text" className="form-control table-search" placeholder="Search by field"  value={searchTerm} onChange={handleChange}/>
      </div>
      <div className="table_container">
        <div className="table__container">
          <table className="table table-bordered">
            <thead className="table_head">
              <tr>
                <th scope="col">Job id</th>
                <th scope="col">Title</th>
                <th scope="col">Field</th>
                <th scope="col">Create Date</th>
                <th scope="col">Salary</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(({jobId, jobTitle, field, createDate, salary}) => (
                <tr key={jobId}>
                  <td>{jobId}</td>
                  <td>{jobTitle}</td>
                  <td>{field}</td>
                  <td>{createDate}</td> 
                  <td>{salary}</td>
                  <td>
                  <Button type="button" className="btn btn-success btn-table" onClick={() => { redirect(jobId); console.log(jobId); setUserId(jobId); setModalMessage("Are you sure you want to approve this Job?"); setSave(false); }}>Candidats  </Button>
                  <Button type="button" className="btn btn-danger btn-table" onClick={() => { toggle(); setUserId(jobId); setModalMessage("Are you sure you want to delete this job?"); setSave(true) }}>Delete</Button>
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