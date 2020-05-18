import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import cogoToast from "cogo-toast";
import Modal from 'react-bootstrap/Modal'
import ModalComponent from "../../components/modal";

export default function BlockedUsers() {

  const [getUserId, setUserId] = useState<number>(0);
  const [userProfile, setUserProfile] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [save, setSave] = useState(false);

  //Get users from database
   useEffect(() => {
    axios.get('http://localhost:8081/allBlockedUsers').then(
      response => {
        const setData = response.data;
        setUserProfile(setData);
      }
    )
  }, [setUserProfile]);

  //Approve user
  function updateUserRole(){
    axios.put(`http://localhost:8081/unblockUser/${getUserId}`).then(
      response => {
      },
      error => {
        console.log(error);
      }
    );
    
  }

  //Unblock request function
  function unblockRequest() {
    toggle();
    updateUserRole();
  }

  function declineRequest(){
    return true;
  }

  //Show modal
  function toggle() {
    setModal(!modal);
}

  return (
    <div className="banned_users_page">
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
                            {userProfile.map(({ userId, userName, firstName, lastName, email}) => (
                            <tr>
                                <td>{userId}</td>
                                <td>{userName}</td>
                                <td>{firstName}</td>
                                <td>{lastName}</td>
                                <td>{email}</td>
                                <td>
                                <Button type="button" className="btn btn-success btn-table" onClick={() => 
                                   {toggle(); setUserId(userId);setModalMessage("Are you sure you want to unblock this user?"); setSave(true); }}>Unblock</Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
      <ModalComponent modal={modal} toggle={toggle} modalM={modalMessage} approveRequest={unblockRequest} declineRequest={declineRequest} save={save}/>
    </div>
    </div>
  )
}
