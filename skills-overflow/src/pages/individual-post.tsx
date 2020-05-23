import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-user";
import Button from 'react-bootstrap/Button';
import axios from "axios";

export default function IndividualPost() {
    const [showAdmin, setShowAdmin] = useState(false);
    const [showComm, setShowComm] = useState(false);
    let { id } = useParams();
    const [post, setPost] = useState<{
        id: string;
        topics: string[];
        title: string;
        body: string;
        numberOfComments: string;
        createDate: []
    }>({
        id: "",
        topics: [],
        title: "",
        body: "",
        numberOfComments: "",
        createDate: []
    });
    const [voteText, setVoteText] = useState(true);

    let userlogged = localStorage.getItem("user");
    let currentUser;
    function getPostData() {
        axios.get(`http://localhost:8081/singlePost/${id}`)
            .then(response => {
                const postInd = response.data;
                console.log(response.data)
                setPost(postInd)

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
        getPostData();

    }
        , [userlogged]
    );

    return (
        <div>
            <div>{showAdmin ? <SidenavAdmin /> : <SidenavUser />}</div>
            <div className='comm-container'>
                <div className='question-container d-flex flex-column align-items-start border-bottom'>
                    <h1>{post.title}</h1>
                    <p className=''>{post.body}</p>
                    <span>Number of comments: {post.numberOfComments}</span>
                    <span> Create date: {post.createDate}</span>
                    <span>Question topics: {post.topics}</span>
                </div>
                <Button variant='warning' onClick={() => setVoteText(!voteText)}>
                    {voteText ? 'Vote Answer' : 'Unvote Answer'} </Button>

                <div className='d-flex flex-column  align-items-start'>
                    <button className='add-comm-btn' onClick={() => setShowComm(!showComm)}>Add an answer</button>
                    {showComm && <div >
                        <textarea name="" id="" cols={50} rows={5}></textarea>
                        <div className='d-flex flex-row'>
                            <Button variant='secondary' className="post-btn" onClick={() => { setShowComm(!showComm); console.log(showComm) }}> Cancel</Button>
                            <Button variant='success' className="post-btn">Post</Button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}