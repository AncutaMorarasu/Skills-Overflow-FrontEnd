import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";



export default function IndividualPost(props: any) {
    const { effects } = props;
  const history = useHistory();
  const location = useLocation<{ topics: string[] }>();
  let { criteria, pageNo } = useParams();
  //aici trebuie sa iei postarile
  const [job, setJob] = useState({
      index:"",
      jobTitle:"",
      description:"",
      createDate: "",
      field: "",
      salary:"",


  });

  let jobId = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));


  let userlogged = localStorage.getItem("user");
  let currentUser;
  let token = localStorage.getItem("user");
  let tokenCheck: any;



  function getJobs() {
    localData();

    axios.get("http://localhost:8080/job/" + jobId, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
    .then(response => {
        console.log(response.data);
     setJob(response.data)
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
  console.log(job);
      return (
      <Card className="cardText">
        <Card.Body>
          <Card.Title>
              {job.jobTitle}
          </Card.Title>
          <Card.Text>{job.description}</Card.Text>

          <Card.Text> <span className="font-weight-bold">Created on: </span>
            {job.createDate}
          </Card.Text>
          <Card.Text> <span className="font-weight-bold">Field: </span>  {job.field}</Card.Text>
          <Card.Text> <span className="font-weight-bold">Salary: </span> {job.salary}</Card.Text>
          <Card.Text> <span className="font-weight-bold">Posted by: </span> {job.salary}</Card.Text>
        </Card.Body>
      </Card >
      );
}