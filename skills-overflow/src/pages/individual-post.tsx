import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-user";
import Button from 'react-bootstrap/Button';

export default function IndividualPost() {
    const [showAdmin, setShowAdmin] = useState(false);
    let history = useHistory();
    const [showComm, setShowComm] = useState(false);
    const openComment = () => setShowComm(true);

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
    }, [userlogged]);


    return (
        <div>
            <div>{showAdmin ? <SidenavAdmin /> : <SidenavUser />}</div>
            <div className='comm-container'>
                <button className='add-comm-btn' onClick={() => setShowComm(!showComm)}>Add an answer</button>
                {showComm && <div className='d-flex flex-column'>
                    <textarea name="" id="" cols={50} rows={5}></textarea>
                    <div className='d-flex flex-row'>
                        <Button variant='secondary' onClick={() => setShowComm(!showComm)}> Cancel</Button>
                        <Button variant='success'>Post</Button>
                    </div>
                </div>}
            </div>
        </div>
    )
}