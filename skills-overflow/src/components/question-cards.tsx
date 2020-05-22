import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import QuestionModal from "./add-question";
import FilterSort from "./filter-sort";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";


function QuestionCard() {
  const history = useHistory();
  const location = useLocation<{ topics: string[] }>();
  const { criteria, pageNo } = useParams();

  //aici trebuie sa iei postarile
  const [questions, setQuestions] = useState({
    posts: [],
    totalPosts: 0
  });
  const [topics, setTopics] = useState({
    topics: [
      "Java ",
      "Springboot ",
      "SQL ",
      "Tomcat ",
      "JPA ",
      "Google Cloud ",
      "Hibernate ",
      "MongoDB ",
      "HTML ",
      "CSS ",
      "Javascript ",
      "Bootstrap ",
      "React ",
      "Angular ",
      "JQuery ",
      "Other "
    ]
  }); //nu folosesc niciodata setTopics, sunt hard-coded
  const [filter, setFilters] = useState<{ filterTopics: string[] }>({
    filterTopics: []
  });
  const [effects, setEffects] = useState({ ef: true });

  const changeFlag = () => {
    if (effects.ef) setEffects({ ef: false });
    else {
      setEffects({ ef: true });
    }
  };

  let token = localStorage.getItem("user");
  let tokenCheck: any;
  function localData() {
    if (typeof token === "string") {
      tokenCheck = JSON.parse(token);
    }
  }

  function getPosts() {
    localData();
    let actualPageNo = pageNo ? pageNo : 0;
    let children = location.state ? location.state.topics : filter.filterTopics;

    axios
      .post(
        `http://localhost:8081/allPosts/${actualPageNo}/${criteria}`,
        { topics: children },
        { headers: { Authorization: "Bearer " + tokenCheck.token } }
      )
      .then(
        response => {
          const object = response.data;

          setQuestions({ totalPosts: object[0], posts: object[1] });
          //  setFilters({ filterTopics: [] });
        },
        error => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    getPosts();
  }, [effects]);

  const renderPosts = questions.posts.map(
    (
      { id, topics, title, body, numberOfComments, createDate, comments },
      index
    ) => {
      return (
        <Card className="cardText">
          <Card.Body>
            <Card.Title>
              <Link
                to={`singlePost/${id}`}
                key={index}
              //onClick={() => history.push(`singlePost/${id}/0`)}
              >
                {" "}
                {title}
              </Link>
            </Card.Title>
            <Card.Text>{body}</Card.Text>

            <Card.Text>
              Created on: {createDate}
              {console.log(Array.from(createDate))}
            </Card.Text>

            <Card.Text> Number of comments: {numberOfComments}</Card.Text>
            <Card.Text> Topic: {topics}</Card.Text>
          </Card.Body>
        </Card>
      );
    }
  );

  const handleTopicClick = (event: any) => {
    let topicValue = event.target.value;
    let array = filter.filterTopics;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === topicValue) {
        array.splice(i, 1);
        setFilters({ filterTopics: array });
        return;
      }
    }
    array.push(topicValue);
    setFilters({ filterTopics: array });
  };

  return (
    <div className="questions">
      <QuestionModal />
      <FilterSort
        topics={topics.topics}
        filterTopics={filter.filterTopics}
        onClick={handleTopicClick}
        handleFlag={changeFlag}
      />
      {renderPosts}
    </div>
  );
}

export default QuestionCard;
