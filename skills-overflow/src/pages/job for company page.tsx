import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import cogoToast from "cogo-toast";
 



export default function IndividualPost(props: any) {
    const { effects } = props;
    let tokenCheck: any;
  const history = useHistory();
  let [userToken, setUserToken] = useState<number>(0);
  const location = useLocation<{ topics: string[] }>();
  const { isAuthenticated, setUserHasAuthenticated } = props;
  let { criteria, pageNo } = useParams();
  const [role, setRole] = useState("");
  //aici trebuie sa iei postarile
  const [job, setJob] = useState({
      index:"",
      jobTitle:"",
      description:"",
      createDate: "",
      field: "",
      salary:"",


  });

  const [values, setValues] = useState({
    declined:"already applied",
    accepted:"applyed succesfully",
  });
  let { id } = useParams();

  let jobId = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
  function userVsAdmin() {

    if (typeof userlogged === "string") {
      currentUser = JSON.parse(userlogged);
      setUserToken(currentUser.token)
      console.log(currentUser);
      if (currentUser.role === "[admin]") {
        setRole("ADMIN");
      } else if(currentUser.role === "[company]") {
        setRole("COMPANY");
      } else if(currentUser.role === "[student]") {
        setRole("STUDENT");
      } 
    }
  }

  function localData() {
    if (typeof token === "string") {
        tokenCheck = JSON.parse(token);
    }
}

  function submit() {
    localData();
    axios.post('http://localhost:8080/add/student/'+ jobId, tokenCheck.token, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
    .then(response => {
      console.log(response)
      if (JSON.stringify(values.declined) === JSON.stringify(response.data)) {
        cogoToast.error("You already applied to this job.", { hideAfter: 5 });
        return;

      } else if (JSON.stringify(values.accepted) === JSON.stringify(response.data) ) {
        cogoToast.success(" Conngrats! ", { hideAfter: 5 });
        history.push("/");
      }
    }, error => {
      console.log(error);
    }
    );
};

  let userlogged = localStorage.getItem("user");
  let currentUser;
  let token = localStorage.getItem("user");




  function getJobs() {
    localData();

    axios.get("http://localhost:8080/job/" + jobId, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
    .then(response => {
        console.log(response.data);
     setJob(response.data)
     userVsAdmin()
    })

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
          
          <div>{role === "ADMIN" ? null : (role === "STUDENT" ? <Button type="button" className="btn btn-success btn-table" onClick={() => {  console.log(jobId); submit() }}>Apply</Button> : null)}</div>
          
          
        </Card.Body>
      </Card >
      );
}