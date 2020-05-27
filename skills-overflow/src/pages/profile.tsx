import React, { useEffect, useState } from 'react';
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-user";
import { Link } from "react-router-dom";
import UsernameChange from '../components/username-change';
import NameChange from '../components/name-change';
import PasswordChange from '../components/password-change';
import axios from "axios";

function ProfilePage() {
    const [showAdmin, setShowAdmin] = useState(false);
    const [userProfile, setUserProfile] = useState({
        userId: "",
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
        role: ""
    })
    const [userPosts, setUserPosts] = useState([{
        postId: "",
        title: ""
    }]);
    const [userAnswers, setUserAnswers] = useState([{
        postId: "",
        title: ""
    }])
    let userlogged = localStorage.getItem("user");
    let currentUser;
    let token = localStorage.getItem("user");
    let tokenCheck: any;
    function localData() {
        if (typeof token === "string") {
            tokenCheck = JSON.parse(token);
        }
    }
    useEffect(() => {
        if (typeof userlogged === "string") {
            currentUser = JSON.parse(userlogged);
            console.log(currentUser);
            if (currentUser.role === "[admin]") {
                setShowAdmin(true);
            } else {
                setShowAdmin(false);
            }
        }
        localData();
        axios.get("http://localhost:8081/userProfile/getUserBySessionToken", { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
            .then(response => {

                setUserProfile(response.data)
            })
        axios.get("http://localhost:8081/userProfile/getUserPosts", { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
            .then(response => {
                setUserPosts(response.data);
                console.log(response.data)
            })
        axios.get("http://localhost:8081/userProfile/getPostsWhereUserPostedComment", { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
            .then(response => {
                setUserAnswers(response.data);
                console.log(response.data)
            })
    }, []
    );
    return (
        <div>
            <div>{showAdmin ? <SidenavAdmin /> : <SidenavUser />}</div>
            <div>
                <h1 className='text-center'>Hello, {userProfile.userName}</h1>
            </div>
            <div className="profile">
                <div className="d-flex flex-column align-items-start border-bottom">
                    <h2>Your Profile</h2>
                    <p> <span className="font-weight-bold" >Username:</span>  {userProfile.userName}</p>
                    <p> <span className="font-weight-bold"> Name:</span> {userProfile.firstName} {userProfile.lastName}</p>
                    <p> <span className="font-weight-bold">Email:</span> {userProfile.email} </p>
                    <p> <span className="font-weight-bold">Account type: </span> {userProfile.role}</p>
                </div>
                <div className="d-flex flex-column align-items-start border-bottom">
                    <h2>Questions</h2>
                    {userPosts.map(({ postId, title }) => {
                        return (<Link to={`/singlePost/${postId}`} >{title} </Link>
                        )
                    })}
                </div>
                <div className="d-flex flex-column align-items-start border-bottom">
                    <h2>Answers</h2>
                    {userAnswers.map(({ postId, title }) => {
                        return (<Link to={`/singlePost/${postId}`} >{title} </Link>
                        )
                    })}
                </div>
                <div className="account-settings">
                    <h2>Account settings</h2>
                    <UsernameChange />
                    <NameChange />
                    < PasswordChange />
                </div>
            </div>

        </div>

    )
}

export default ProfilePage;