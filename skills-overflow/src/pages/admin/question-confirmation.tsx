import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalComponent from "../../components/modal";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import SidenavAdmin from '../../components/side-nav-admin'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

export default function PendingQuestions(){
  const [postId, setPostId] = useState<number>(0);
  const [questions, setQuestions] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
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

  useEffect(() => {
    localData();
      axios.get('http://localhost:8081/admin/allUnapprovedPosts', { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
        .then(response => {
          const setData = response.data;
          setQuestions(setData);
          console.log(setData);
        }).catch(function (error) {
            if (error.request.status === 403) {
              history.push("/forbidden-page")
            }
        })
  }, []);

  function acceptPost() {
    localData();
    console.log(postId)
    axios.put(`http://localhost:8081/admin/approvePost/${postId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
      response => {
        if (response.status === 200) {
          getQuestions();
          cogoToast.success("The changes have been made", { hideAfter: 5 })
        }
      console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  function declinePost() {
    localData();
    axios.delete(`http://localhost:8081/admin/deletePost/${postId}`, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
      response => {
        if (response.status === 200) {
          getQuestions();
          cogoToast.success("The changes have been made", { hideAfter: 5 })
        }
        console.log(response);
        },
        error => {
          console.log(error);
      }
    );
  }

  function getQuestions(){
    localData();
      axios.get('http://localhost:8081/admin/allUnapprovedPosts', { headers: { Authorization: 'Bearer ' + tokenCheck.token } }).then(
        response => {
          const setData = response.data;
          setQuestions(setData);
          console.log(save);
        }
      )
    }

  function submitAccept(){
    toggle();
    acceptPost();
  }

  function submitDecline(){
    toggle();
    declinePost()
  }
  
  //Open modal
  function toggle() {
    setModal(!modal);
  }

  //Filter input
  const filteredQuestions = questions.filter((user: any) => {
    return user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  })

  
    return(

        <div className="requests_page">
      <SidenavAdmin />
      <div className="tables">
        <h1 className="request_header">
          Questions requests
      </h1>
      <input type="text" className="form-control table-search" placeholder="Search by email"  value={searchTerm} onChange={handleChange}/>
      </div>
      <div className="table_container">
        <div className="table__container q-container">
          <table className="table table-bordered table-q-request">
            <thead className="table_head">
              <tr className="q-request-data" >
                <th scope="col">Title</th>
                <th scope="col">Question</th>
                <th scope="col">User Name</th>
                <th scope="col">Topics</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map(({id, title, body, userName, topics, createDate}) => (
                <tr >
                  <td >{title}</td>
                  <td className="scrol-table">{body}</td>
                  <td>{userName}</td>
                  <td>{topics}</td>
                  <td>{createDate}</td>
                  <td className="question-update">
                    <Button type="button" className="btn btn-success btn-table-update" onClick={() => {toggle(); setPostId(id); setModalMessage("Are you sure you want to accept this post?"); setSave(false); }}>Post question</Button>
                    <Button type="button" className="btn btn-danger btn-table-update" onClick={() => {toggle(); setPostId(id); setModalMessage("Are you sure you want to decline this post"); setSave(true); }}>Decline question</Button>
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