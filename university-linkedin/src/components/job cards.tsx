import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import QuestionModal from "./add-question";
import FilterSort from "./filter-sort";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import DownPagination from "./pagination";


function JobCard(props: any) {
  const { searchParam, changeFlag1, effects } = props;
  const history = useHistory();
  const location = useLocation<{ topics: string[] }>();
  let { criteria, pageNo } = useParams();
  //aici trebuie sa iei postarile
  const [jobs, setJobs] = useState([]);




  let userlogged = localStorage.getItem("user");
  let currentUser;
  let token = localStorage.getItem("user");
  let tokenCheck: any;



  function getJobs() {
    localData();

    axios.get("http://localhost:8080/allApprovedJobs", { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
    .then(response => {
        console.log(response.data);
     setJobs(response.data)
    })

  }

  function localData() {
    if (typeof token === "string") {
      tokenCheck = JSON.parse(token);
    }
  }

 
  useEffect(() => {
    console.log("SOCRA TA");
    getJobs();
    console.log("Done Jobs");

  }, [effects]);

  
  console.log("PACALEALE FRAIERRIOLOR");
  console.log(jobs);
  const renderPosts = jobs.map(
    (
      { jobId, jobTitle, description, createDate, field, salary,company },
      index
    ) => {
      return (
      <Card className="cardText">
        <Card.Body>
          <Card.Title>
            <Link
              to={`/singlePost/${jobId}`}
              key={jobId} replace={true}
            >
              {jobTitle}
            </Link>
          </Card.Title>
          <Card.Text>{description}</Card.Text>

          <Card.Text> <span className="font-weight-bold">Created on: </span>
            {createDate}
          </Card.Text>
          <Card.Text> <span className="font-weight-bold">Field: </span>  {field}</Card.Text>
          <Card.Text> <span className="font-weight-bold">Salary: </span> {salary}</Card.Text>
          <Card.Text> <span className="font-weight-bold">Posted by: </span> {company}</Card.Text>
        </Card.Body>
      </Card >
      );
    }
  );
     console.log(renderPosts);
  return (<div>{renderPosts}</div>);
}
export default JobCard;
    
  





