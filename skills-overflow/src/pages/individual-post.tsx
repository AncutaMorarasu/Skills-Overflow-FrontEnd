import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-user";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import cogoToast from "cogo-toast";

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
        createDate: [];
        userName: string
    }>({
        id: "",
        topics: [],
        title: "",
        body: "",
        numberOfComments: "",
        createDate: [],
        userName: ""
    });
    const [newAnswer, setNewAnswer] = useState({
        body: ""
    });
    const [comments, setComments] = useState([]);
    const [userIsAuthor, setUserIsAutor] = useState();
    let token = localStorage.getItem("user");
    let tokenCheck: any;
    function localData() {
        if (typeof token === "string") {
            tokenCheck = JSON.parse(token);
        }
    }

    let userlogged = localStorage.getItem("user");
    let currentUser;
    function getPostData() {
        axios.get(`http://localhost:8081/singlePost/${id}`, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
            .then(response => {
                const postInd = response.data[0];
                console.log(postInd)
                const postComments = response.data[1];
                const author = response.data[2];
                setPost(postInd);
                setComments(postComments);
                setUserIsAutor(author);
            })
    }

    useEffect(() => {
        localData();
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
    }, []
    );

    const onAnswerChangeHandler = (event: any) => {
        setNewAnswer({ body: event.target.value });
    };

    function postAnswer() {
        localData();
        if (newAnswer.body.length === 0) {
            setShowComm(showComm);
            cogoToast.error("Please fill in your answer.")
        } else {
            axios.post(`http://localhost:8081/addComment/${id}`, newAnswer, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
                .then(() => {
                    cogoToast.info("Your comment has been submitted for review.")
                })
            setShowComm(!showComm)
        }
        setNewAnswer({ body: "" })
    }

    const renderComments = comments.map((
        { body, createDate, commentId, isMostRelevantComment, userName }
    ) => {
        function toggleVoteComment() {
            localData()
            axios.put(`http://localhost:8081/toggleVoteComment/${commentId}`, {}, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
                .then(response => {
                    console.log(response.data)
                    getPostData();
                })
        }
        return (
            <div className='d-flex flex-column align-items-start border-top answer-container'>
                <div className=" d-flex flex-column align-items-start ">
                    <p key={id}>{body}</p>
                    <span>
                        Answered on: {createDate}
                    </span>
                    <span>
                        Posted by: {userName}
                    </span>
                </div>
                <div className='vote-btn d-flex flex-column'>
                    {userIsAuthor && <Button variant='warning' onClick={() => { toggleVoteComment() }} >
                        {isMostRelevantComment ? ' Unvote Answer' : 'Vote Answer '}
                    </Button>}
                </div>
            </div>
        );
    })
    return (
        <div>
            <div>{showAdmin ? <SidenavAdmin /> : <SidenavUser />}</div>
            <div className='comm-container'>
                <div className='question-container d-flex flex-column align-items-start border-bottom '>
                    <h1>{post.title}</h1>
                    <p className=''>{post.body}</p>
                    <span>Number of comments: {post.numberOfComments}</span>
                    <span> Create date: {post.createDate}</span>
                    <span>Question topics: {post.topics}</span>
                    <span>Posted by: {post.userName}</span>
                </div>
                {comments.length === 0 ? <h2 className="answers-count">No answers yet.</h2> : <h2 className="answers-count">{comments.length} Answer(s):</h2>}
                {renderComments}
                <div className='d-flex flex-column  align-items-start add-comm-container answer-container border-top'>
                    <button className='add-comm-btn' onClick={() => setShowComm(!showComm)}>Add an answer</button>
                    {showComm && <div >
                        <textarea name="" id="" cols={70} rows={5} onChange={onAnswerChangeHandler}></textarea>
                        <div className='d-flex flex-row'>
                            <Button variant='secondary' className="post-btn" onClick={() => { setShowComm(!showComm) }}> Cancel</Button>
                            <Button variant='success' className="post-btn" onClick={postAnswer}>Post</Button>
                        </div>
                    </div>}
                </div>
            </div>
        </div >
    )
}
