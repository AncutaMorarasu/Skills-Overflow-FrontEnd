import React, { useEffect, useState } from 'react';
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-user";
import { Link } from "react-router-dom";
import UsernameChange from '../components/username-change';
import NameChange from '../components/name-change';
import PasswordChange from '../components/password-change';

function ProfilePage() {
    const [showAdmin, setShowAdmin] = useState(false);

    let userlogged = localStorage.getItem("user");
    let currentUser;
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
    }, []
    );
    return (
        <div>
            <div>{showAdmin ? <SidenavAdmin /> : <SidenavUser />}</div>
            <div>
                <h1 className='text-center'>Hello, username</h1>
            </div>
            <div className="profile">
                <div className="d-flex flex-column align-items-start border-bottom">
                    <h2>Profile</h2>
                    <p>Username: username</p>
                    <p>User lever: user level</p>
                </div>
                <div className="d-flex flex-column align-items-start border-bottom">
                    <h2>Questions</h2>
                    <Link to="/singlePost/1">Question 1 title </Link>
                    <Link to="/singlePost/1">Question 2 title </Link>
                </div>
                <div className="d-flex flex-column align-items-start border-bottom">
                    <h2>Answers</h2>
                    <Link to="/singlePost/1"> Question 3 title</Link>
                    <Link to="/singlePost/1"> Question 4 title</Link>
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