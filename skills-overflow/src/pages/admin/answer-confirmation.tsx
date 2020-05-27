import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalComponent from "../../components/modal";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import SidenavAdmin from '../../components/side-nav-admin'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

export default function PendingAnswers(){
    const [getAnswerId, setGetAnswerId] = useState<number>(0);
    const [answers, setAnswers] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [save, setSave] = useState(false);
    let token = localStorage.getItem("user");
    const [searchTerm, setSearchTerm] = useState("");
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
    
    useEffect(() => {
      localData();
      axios.get('http://localhost:8081/admin/allUnapprovedComments', { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
        .then(response => {
          const setData = response.data;
          setAnswers(setData);
          console.log(setData);
        }).catch(function (error) {
          if (error.request.status === 403) {
            history.push("/forbidden-page")
          }
        })
  }, []);

  function acceptAnswer() {
    localData();
    axios.put(`http://localhost:8081/admin/approveComment/${getAnswerId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
      response => {
        if (response.status === 200) {
          getAnswers();
          cogoToast.success("The changes have been made", { hideAfter: 5 })
        }
        console.log(response);
        },
        error => {
          console.log(error);
      }
    );
  }

  function declineAnswer() {
    localData();
    axios.delete(`http://localhost:8081/admin/deleteComment/${getAnswerId}`, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
      response => {
        if (response.status === 200) {
          getAnswers();
          cogoToast.success("The changes have been made", { hideAfter: 5 })
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  function getAnswers(){
    localData();
    axios.get('http://localhost:8081/admin/allUnapprovedComments', { headers: { Authorization: 'Bearer ' + tokenCheck.token } }).then(
      response => {
        const setData = response.data;
        setAnswers(setData);
        console.log(save);
      }
    )
  }

  function submitAccept(){
    toggle();
    acceptAnswer();
  }
    
  function submitDecline(){
    toggle();
    declineAnswer()
  }
    

  //Open modal
  function toggle() {
    setModal(!modal);
  }
  
   //Filter input
   const filteredAnswers = answers.filter((user: any) => {
    return user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  })

    return(

      <div className="requests_page">
      <SidenavAdmin />
      <div className="tables">
        <h1 className="request_header">
          Answers request
      </h1>
      <input type="text" className="form-control table-search" placeholder="Search by user name" value={searchTerm} onChange={handleChange}/>
      </div>
      <div className="table_container">
        <div className="table__container">
          <table className="table table-bordered">
            <thead className="table_head">
              <tr>
                <th scope="col">Answer</th>
                <th scope="col">User Name</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnswers.map(({ commentId, title, body, userName, technology, createDate}) => (
                <tr key={commentId}>
                  <td className="scrol-table-answer">{body}</td>
                  <td>{userName}</td>
                  <td>{createDate}</td>
                  <td className="answer-update">
                    <Button type="button" className="btn btn-success btn-table-update ans-btn" onClick={() => { toggle(); setGetAnswerId(commentId); setModalMessage("Are you sure you want to approve this answer?"); setSave(false) }}>Post answer</Button>
                    <Button type="button" className="btn btn-danger btn-table-update ans-btn" onClick={() => { toggle(); setGetAnswerId(commentId); setModalMessage("Are you sure you want to decline this answer?"); setSave(true); }}>Decline answer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalComponent modal={modal} toggle={toggle} modalM={modalMessage} approveRequest={submitAccept} declineRequest={submitDecline} save={save} />
    </div>

    )


}