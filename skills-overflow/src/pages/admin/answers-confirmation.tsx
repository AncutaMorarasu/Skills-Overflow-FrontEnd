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
    let tokenCheck: any;
    const history = useHistory();

    function localData() {
        if (typeof token === "string") {
          tokenCheck = JSON.parse(token);
        }
      }
    
    useEffect(() => {
        localData();
        axios.get('http://localhost:8081/', { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
          .then(response => {
            const setData = response.data;
            setAnswers(setData);
          }).catch(function (error) {
            if (error.request.status === 403) {
              history.push("/forbidden-page")
            }
          })
      }, []);

      function acceptAnswer() {
        localData();
        axios.put(`http://localhost:8081/admin//${getAnswerId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
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
        axios.put(`http://localhost:8081/admin//${getAnswerId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token, "Content-type": "application/json" } }).then(
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
        axios.get('http://localhost:8081/', { headers: { Authorization: 'Bearer ' + tokenCheck.token } }).then(
          response => {
            const setData = response.data;
            setAnswers(setData);
            console.log(save);
          }
        )
      }
    

      //Open modal
  function toggle() {
    setModal(!modal);
  }
  
    return(

        <div className="requests_page">
      <SidenavAdmin />
      <div className="tables">
        <h1 className="request_header">
          Pending Questions
      </h1>
      {/* <input 
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleChange}/> */}
      </div>
      <div className="table_container">
        <div className="table__container">
          <table className="table table-bordered">
            <thead className="table_head">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Question</th>
                <th scope="col">User Name</th>
                <th scope="col">Topics</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {answers.map(({ answerId, title, body, userName, technology}) => (
                <tr key={answerId}>
                  <td>{title}</td>
                  <td>{body}</td>
                  <td>{userName}</td>
                  <td>{technology}</td>
                  <td></td>
                  <td>
                    <Button type="button" className="btn btn-success btn-table-update" onClick={() => { toggle(); setGetAnswerId(answerId); setModalMessage("Are you sure you want to approve this answer?"); setSave(false) }}>Post answer</Button>
                    <Button type="button" className="btn btn-danger btn-table-update" onClick={() => { toggle(); setGetAnswerId(answerId); setModalMessage("Are you sure you want to decline this answer?"); setSave(true); }}>Decline answer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalComponent modal={modal} toggle={toggle} modalM={modalMessage} approveRequest={acceptAnswer} declineRequest={declineAnswer} save={save} />
    </div>

    )


}