import React, { useEffect, useState } from 'react';
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-student";
import { Link } from "react-router-dom";
import PhoneNumberChange from '../components/phoneNumber-change';
import NameChange from '../components/name-change';
import PasswordChange from '../components/password-change';
import axios from "axios";

function ProfilePage() {
    const [showAdmin, setShowAdmin] = useState(false);
    const [studentProfile, setUserProfile] = useState({
        studentId: "",
        email: "",
        firstName: "",
        lastName: "",
        description:"",
        phoneNumber:"",
        workExperience:"",
        education:"",
        skills:"",
        
    })
    const [studentJobs, setUserPosts] = useState([{
        jobId: "",
        jobTitle: ""
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
        axios.get("http://localhost:8080/userProfile/jobs", { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
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
            } else {
                setShowAdmin(false);
            }
        }
        localData();
        getUserDetails();
    }, []
    );
    //  const renderPostsList= 
    return (
        <div>
            <div>{showAdmin ? <SidenavAdmin /> : <SidenavUser />}</div>
            <div>
                <h1 className='text-center'>Hello, {studentProfile.firstName}</h1>
            </div>
            <div className="profile">
                <div className="d-flex flex-column align-items-start border-bottom">
                    <h2>Your Profile</h2>
                    
                    <p> <span className="font-weight-bold">Name:</span> {studentProfile.firstName} {studentProfile.lastName}</p>
                    <p> <span className="font-weight-bold">Email:</span> {studentProfile.email} </p>
                    <p> <span className="font-weight-bold">Phone Number:</span> {studentProfile.phoneNumber} </p>
                    <p> <span className="font-weight-bold">Skills:</span> {studentProfile.skills} </p>
                    <p> <span className="font-weight-bold">Description:</span> {studentProfile.description} </p>
                    <p> <span className="font-weight-bold">Education:</span> {studentProfile.education} </p>
                    <p> <span className="font-weight-bold">Work Experience:</span> {studentProfile.workExperience} </p>
                    
                </div>
                <div className="d-flex flex-column align-items-start border-bottom">
                    <h2>You applied for</h2>
                    {studentJobs.length === 0 ? <h4>No jobs yet</h4> : ""}
                    
                    
                    {studentJobs.map(({ jobId: jobId, jobTitle: title }) => {
                        return (<Link to={`/singleJob/${jobId}`} >{title} </Link>
                        )
                    })}
                </div>
               
                <div className="account-settings">
                    <h2>Account settings</h2>
                    
                    <NameChange />
                    < PasswordChange />

                </div>
            </div>

        </div>

    )
}

export default ProfilePage;