import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SidenavAdmin from "../components/side-nav-admin";
import SidenavUser from "../components/side-nav-user";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import cogoToast from "cogo-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function IndividualPost() {
    const [showAdmin, setShowAdmin] = useState(false);
    const [showComm, setShowComm] = useState(false);
    let { id } = useParams();
    const [post, setPost] = useState<{
        postDTO: {
            id: string;
            topics: string[];
            title: string;
            body: string;
            numberOfComments: number;
            createDate: [];
            userName: string
        },
        commentDTOList: [{
            body: string;
            commentId: string;
            createDate: string;
            userName: string;
            isMostRelevant: boolean;
        }],
        principalOwnerOfPost: boolean;
    }>({
        postDTO: {
            id: "",
            topics: [],
            title: "",
            body: "",
            numberOfComments: 0,
            createDate: [],
            userName: "",
        }, commentDTOList: [{
            body: "",
            commentId: "",
            createDate: "",
            userName: "",
            isMostRelevant: false
        }],
        principalOwnerOfPost: false

    }
    );
    const [newAnswer, setNewAnswer] = useState({
        body: ""
    });
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
                const postInd = response.data;
                console.log(response.data)
                setPost(postInd);
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

    const renderComments = post.commentDTOList.map((
        { body, createDate, commentId, isMostRelevant, userName }
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
                    {isMostRelevant && <span className="star-icon"><FontAwesomeIcon icon={faStar} /> Voted as most relevant</span>}
                    <p key={id}>{body}</p>
                    <span>
                        Answered on: {createDate}
                    </span>
                    <span>
                        Posted by: {userName}
                    </span>
                </div>
                <div className='vote-btn d-flex flex-column'>
                    {post.principalOwnerOfPost && <Button variant='warning' onClick={() => { toggleVoteComment() }} >
                        {isMostRelevant ? ' Unvote Answer' : 'Vote Answer '}
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
                    <h1>{post.postDTO.title}</h1>
                    <p className=''>{post.postDTO.body}</p>
                    <p>  <span className="font-weight-bold">Number of comments:</span> {post.postDTO.numberOfComments} </p>
                    <p>  <span className="font-weight-bold">Create date: </span> {post.postDTO.createDate}</p>
                    <p> <span className="font-weight-bold">Question topics: </span>{post.postDTO.topics}</p>
                    <p> <span className="font-weight-bold">Posted by: </span>  {post.postDTO.userName}</p>

                </div>
                {post.postDTO.numberOfComments === 0 ? <h2 className="answers-count">No answers yet.</h2>
                    : <h2 className="answers-count">{post.postDTO.numberOfComments} Answer(s):</h2>}
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
