import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function NotificationPage(){

    const [notification, setNotification] = useState([]);
    let token = localStorage.getItem("user");
    let tokenCheck: any;
    const history = useHistory();


    function localData(){
        if (typeof token === "string") {
          tokenCheck = JSON.parse(token);
        }
      }

    useEffect(() => {
        localData();
        axios.get('http://localhost:8081/notifications',{headers:{Authorization: 'Bearer ' + tokenCheck.token}})
        .then(response => {
            const setData = response.data;
            setNotification(setData);
          },
          error => {
              console.log(error);
          }
          )
      }, []);



    return(

        <div className="notification-container">
            <div className="container mt-5">
                <div className="title not-title">
                    <h1>Notifications center</h1>
                </div>
            </div>
        {notification.map(({notificationString, postName, postURL, postDate}) => (
            
            <div className="alert alert-info">
                <div className="container not">
                    <i className="material-icons">{notificationString}</i>
                    <p className="material-icons">{postName}</p>
                    <p className="material-icons">{postDate}</p>
                </div>
        </div>
        ))}
            
        </div>
    );
}