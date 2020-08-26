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
  const [info, setInfo] = useState({
    newsId:"",
    title:"",
      description:"",
      createDate: "",



  });

  let newsId = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));


  let userlogged = localStorage.getItem("user");
  let currentUser;
  let token = localStorage.getItem("user");
  let tokenCheck: any;



  function getJobs() {
    localData();

    axios.get("http://localhost:8080/news/" + newsId, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
    .then(response => {
        console.log(response.data);
     setInfo(response.data)
    })

  }

  function localData() {
    if (typeof token === "string") {
      tokenCheck = JSON.parse(token);
    }
  }

 
  useEffect(() => {
    getJobs();
  }, [effects]);

  
 
  console.log(info);
      return (
      <Card className="cardText">
        <Card.Body>
          <Card.Title>
              {info.title}
          </Card.Title>
          <Card.Text>{info.description}</Card.Text>

          <Card.Text> <span className="font-weight-bold">Created on: </span>
            {info.createDate}
          </Card.Text>

        </Card.Body>
      </Card >
      );
}