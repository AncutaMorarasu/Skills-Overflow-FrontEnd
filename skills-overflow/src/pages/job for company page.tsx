import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import cogoToast from "cogo-toast";
 



export default function IndividualPost(props: any) {
    const { effects } = props;
    let tokenCheck: any;
    const [userProfile, setUserProfile] = useState([]);
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
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
      company: "",


  });


  function handleChange(event: any){
    setSearchTerm(event.target.value);
  }
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
function getUsers() {
  localData();
  axios.get('http://localhost:8080/allStudents', { headers: { Authorization: 'Bearer ' + tokenCheck.token } }).then(
    response => {
      const setData = response.data;
      setUserProfile(setData);
      //console.log(save);
    }
  )
}
useEffect(() => {
  localData();
  axios.get('http://localhost:8080/students/job/'+ jobId, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
    .then(response => {
      const setData = response.data;
      setUserProfile(setData);
    }).catch(function (error) {
      if (error.request.status === 403) {
        history.push("/forbidden-page")
      }
    })
}, [searchTerm]);


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

  const filteredUsers = userProfile.filter((user: any) => {
    return user.email.toLowerCase().includes(searchTerm.toLowerCase())
  })



 
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
          <Card.Text> <span className="font-weight-bold">Posted by: </span> {job.company}</Card.Text>
          
                <div className="table_container2">
        <div className="table__container">
          <table className="table table-bordered">
            <thead className="table_head">
              <tr>
                <th scope="col">Student id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Skills</th>
                <th scope="col">Education</th>
                <th scope="col">Work Experience</th>


              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(({studentId, firstName, lastName, email, phoneNumber, skills,education,workExperience}) => (
                <tr key={studentId}>
                  <td>{studentId}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td> 
                  <td>{phoneNumber}</td>
                  <td>{skills}</td>
                  <td>{education}</td>
                  <td>{workExperience}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
          
          
        </Card.Body>
      </Card >
      );
}