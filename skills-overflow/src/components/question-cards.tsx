import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import QuestionModal from "./add-question";
import FilterSort from "./filter-sort";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function QuestionCard() {
  const history = useHistory();
  const { topic, criteria, pageNo } = useParams();
  const [questions, setQuestions] = useState({
    topics: ["spring", "java"],
    posts: [],
    totalPosts: 0
  });
  const [post, setPost] = useState({
    title: "",
    body: "",
    topic: ""
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8081/allPosts/${pageNo}/${topic}/${criteria}`)
      .then(
        response => {
          const posts = response.data;
          setQuestions({ ...questions, posts: posts });
        },
        error => {
          console.log(error);
        }
      );
  });
  const renderPosts = questions.posts.map(
    (
      { id, topic, title, body, numberOfComments, createDate, comments },
      index
    ) => {
      //aș putea folosi to= pentru liste
      return (
        <Card className="cardText">
          <Card.Body>
            <Card.Title>
              <a
                href="#"
                key={index}
                onClick={() => history.push(`singlePost/${id}/0`)}
              >
                {" "}
                {title}
              </a>
            </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  );
  return (
    <div className="questions">
      <QuestionModal />
      <FilterSort />
      {renderPosts}
    </div>
  );
}

export default QuestionCard;
