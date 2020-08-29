import React, { useEffect, useState } from 'react';
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-student";
import SidenavCompany from "../components/side-nav-company"
import { Link } from "react-router-dom";
import PhoneNumberChange from '../components/phoneNumber-change';
import NameChange from '../components/name-change';
import PasswordChange from '../components/password-change';
import axios from "axios";

function ProfilePage() {
    const [showAdmin, setShowAdmin] = useState(false);
    const [showStudent, setShowStudent] = useState(false);
    const [Info, setUserProfile] = useState({
        newsId: "",
        email: "",
        firstName: "",
        lastName: "",
        description:"",
        phoneNumber:"",
        workExperience:"",
        education:"",
        skills:"",
        
    })
    const [news, setUserPosts] = useState([{
        newsId: "",
        title: ""
    }]);

    let userlogged = localStorage.getItem("user");
    let currentUser;
    let token = localStorage.getItem("user");
    let tokenCheck: any;
    function localData() {
        if (typeof token === "string") {
            tokenCheck = JSON.parse(token);
        }
    }
    
    function getUserDetails() {
        axios.get("http://localhost:8080/userProfile/info", { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
            .then(response => {

                setUserProfile(response.data)
            })
        axios.get("http://localhost:8080/allNews", { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
            .then(response => {
                setUserPosts(response.data);
                console.log(response.data)
            })
            
    }
    useEffect(() => {
        if (typeof userlogged === "string") {
            currentUser = JSON.parse(userlogged);
            console.log(currentUser);
            if (currentUser.role === "[admin]") {
                setShowAdmin(true);
            } else if (currentUser.role === "[student]"){
                setShowAdmin(false);
                setShowStudent(true);
            }
        }
        localData();
        getUserDetails();
    }, []
    );
    //  const renderPostsList= 
    return (
        <div>
            <div>{showAdmin ? <SidenavAdmin /> : showStudent?<SidenavUser /> : <SidenavCompany></SidenavCompany>}</div>
            <div>
                <h1 className='text-center'>Here are some news from University </h1>
            </div>

            <div className="profile">
                
                <div className="d-flex flex-column align-items-start border-bottom">
                    <h1>News</h1>
                    {news.length === 0 ? <h4>No news yet</h4> : ""}
                    
                    
                    {news.map(({ newsId: newsId, title: title }) => {
                        return (<h2><Link to={`/info/${newsId}`} >{title} </Link> </h2> 
                        )
                    })}
                    
                </div>
               

            </div>

            </div>

    )
}

export default ProfilePage;