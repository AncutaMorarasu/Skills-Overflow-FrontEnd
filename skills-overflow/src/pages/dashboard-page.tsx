import React, { useEffect, useState } from "react";
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-user";
import { useHistory, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import QuestionCard from "../components/question-cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import cogoToast from "cogo-toast";


function Dashboard() {
  const [modal, setModal] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationId, setNotificationId] = useState<number>(0);
  const [notificationString, setNotificationString] = useState('');
  let [userToken, setUserToken] = useState<number>(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchParam, setParam] = useState("");
  const [toChild, setToChild] = useState("");
  const [effects, setEffects] = useState(true);
  let history = useHistory();
  let userlogged = localStorage.getItem("user");
  let currentUser: any;
  const[url, setUrl] = useState('');


  function userVsAdmin(){
    
    if (typeof userlogged === "string") {
      currentUser = JSON.parse(userlogged);
      setUserToken(currentUser.token)
      console.log(currentUser);
      if (currentUser.role === "[admin]") {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
      }
    }
  }
      
  //Get users from database
  useEffect(() => {
    userVsAdmin(); 
    getNotification();
  }, []);

  const signOut = () => {
    localStorage.clear();
    history.push("/");
  };


  const changeParams = (event: any) => {
    const param = event.target.value;
    setParam(param);

  }

  const sendToChild = () => {
    setToChild(searchParam);
    //console.log("this is what the child is getting, just on the second click... --> ", toChild);

    setParam("");
    history.push({ pathname: "/dashboard" });
    changeFlag();
  }

  const changeFlag = () => {
    if (effects) setEffects(false);
    else {
      setEffects(true);
    }
  };

  function toggle() {
    setModal(!modal);
  }

  function deleteNotification(notificationId: any) {
    userVsAdmin();
    axios.put(`http://localhost:8081/deleteNotif/${notificationId}`,{}, { headers: { Authorization: 'Bearer ' + currentUser.token, "Content-type": "application/json" } }).then(
      response => {
        if (response.status === 200) {
          console.log(notificationId)
          getNotification();
          cogoToast.success("Notification was cleared.", { hideAfter: 5 })
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  
  function getNotification(){
    axios.get('http://localhost:8081/notifications', { headers: { Authorization: 'Bearer ' + currentUser.token } })
      .then(
        response => {
          const setData = response.data;
          setNotification(setData);
        }
      ).catch(function (error) {
        if (error.request.status === 403) {
          history.push("/forbidden-page")
        }
      })
  }

  function showNotifications(){
    
    if(notification.length === 0){
        
      return(<h3>There is no notification at this moment</h3>);

      }else{
        return(
          notification.map(({ notificationString, postName, postURL, postDate, notificationType, notificationId}) => (
            <tr key={notificationId}>
              <th scope="row"></th>
              <td className="not-rows">{notificationString}</td>
              <td className="not-rows"><Link to={postURL}  style={{ textDecoration: 'none', color: 'inherit' }}  >{postName}</Link></td>
              <td className="not-rows">{postDate}</td>
              <td>
              <Button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {deleteNotification(notificationId);setNotificationId(notificationId);}}>
                <span aria-hidden="true">&times;</span>
              </Button>
              </td>
            </tr>
          ))
        )
      }
}
  


  return (
    <div className="dashboard">
      <div className="d-flex justify-content-end">
        <Button onClick={toggle} variant="light" className="accountBtn">
          Notification
        </Button>
        <Button onClick={signOut} variant="light" className="accountBtn">
          Log Out
        </Button>

      </div>
      <div className="d-flex justify-content-around custom-dash">
        <form action="" className="searchForm" >
          <div className="input-group mb-4 border rounded-pill p-1 searchInput">
            <input
              type="text"
              placeholder="What are you searching for?"
              aria-describedby="button-addon3"
              className="form-control bg-none border-0 searchInput"
              value={searchParam}
              onChange={changeParams}
            />
            <div className="input-group-append border-0">
              <button
                id="button-addon3"
                type="button"
                className="btn btn-link text-success"
              >
                <FontAwesomeIcon icon={faSearch} onClick={sendToChild} />
              </button>
            </div>
          </div>
        </form>
      </div> 
      <div>{showAdmin ? <SidenavAdmin /> : <SidenavUser />}</div>

      <QuestionCard
        searchParam={toChild}
        changeFlag1={changeFlag}
        effects={effects}
      />
  
      <Modal show={modal} className="modal notif-modal" size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton onClick={toggle}>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <table className="table table-hover">
              <tbody>
                {showNotifications()}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default Dashboard;
