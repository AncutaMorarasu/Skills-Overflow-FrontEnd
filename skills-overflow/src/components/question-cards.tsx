import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import QuestionModal from "./add-question";
import FilterSort from "./filter-sort";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import DownPagination from "./pagination";


function QuestionCard(props: any) {
  const { searchParam, changeFlag1, effects } = props;
  const history = useHistory();
  const location = useLocation<{ topics: string[] }>();
  let { criteria, pageNo } = useParams();
  //aici trebuie sa iei postarile
  const [questions, setQuestions] = useState({
    posts: [],
    totalPosts: -1
  });
  //nu folosesc niciodata setTopics, sunt hard-coded
  const [topics, setTopics] = useState({
    topics: [
      "Java ",
      "Spring Boot ",
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
  });
  const [filter, setFilters] = useState<{ filterTopics: string[] }>({
    filterTopics: []
  });

  let [actualPageNo, setActualPageNo] = useState(0);
  let token = localStorage.getItem("user");
  let tokenCheck: any;
  function localData() {
    if (typeof token === "string") {
      tokenCheck = JSON.parse(token);
    }
  }

  function getPosts() {
    localData();
    //0 in caz ca intra direct pe dashboard
    let actualPageNo = pageNo ? pageNo - 1 : 0;
    setActualPageNo(actualPageNo);
    console.log("the actual page no passed to the child is -->" + actualPageNo)
    let children = location.state ? location.state.topics : filter.filterTopics;

    let path = (searchParam != undefined && searchParam != "")
      ? `http://localhost:8081/allSearchedPosts/${actualPageNo}/${searchParam}/${criteria}`
      : `http://localhost:8081/allPosts/${actualPageNo}/${criteria}`;

    console.log("Is the param still available on a second page???")

    console.log("this is the object passed to the backend --> ", children)
    console.log("and this is the path--> ", path)
    axios
      .post(
        path,
        { topics: children },
        { headers: { Authorization: "Bearer " + tokenCheck.token } }
      )
      .then(
        response => {
          const object = response.data;
          setQuestions({ totalPosts: object[0], posts: object[1] });
          console.log(response.data)
          if (object[2] != null) history.push({
            pathname: "/no-search-result",
            state: { par: object[2] }
          });
          else {
            if (object[0] == 0) {
              history.push({
                pathname: '/no-posts'
              })
            }
          };
        },
        error => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    getPosts();
    console.log("the search param is --> ", searchParam);

  }, [effects]);

  const renderPosts = questions.posts.map(
    (
      { id, topics, title, body, numberOfComments, createDate, userName },
      index
    ) => {
      return (
        <Card className="cardText">
          <Card.Body>
            <Card.Title>
              <Link
                to={`/singlePost/${id}`}
                key={index} replace={true}
              >
                {title}
              </Link>
            </Card.Title>
            <Card.Text>{body}</Card.Text>

            <Card.Text> <span className="font-weight-bold">Created on: </span>
              {createDate}
            </Card.Text>
            <Card.Text> <span className="font-weight-bold">Number of comments: </span>  {numberOfComments}</Card.Text>
            <Card.Text> <span className="font-weight-bold">Topic(s): </span> {topics}</Card.Text>
            <Card.Text> <span className="font-weight-bold">Posted by: </span> {userName}</Card.Text>
          </Card.Body>
        </Card >
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

  //logica specifica acestei clase
  function handleSelect(e: any) {
    const key = e.target.getAttribute('data-input-name');
    if (criteria) {
      history.push({
        pathname: `/posts/${key}/${criteria}`,
        state: { topics: filter.filterTopics }
      }) //aici eu de fapt schimb starea parintelui, din copil
      changeFlag1();
      return;
    }
    history.push({
      pathname: `/posts/${key}`,
      state: { topics: filter.filterTopics }
    })
    changeFlag1();
  }

  return (
    <div className="d-flex flex-column align-items-start">
      <div className="questions">
        <QuestionModal />
        <FilterSort
          topics={topics.topics}
          filterTopics={filter.filterTopics}
          onClick={handleTopicClick}
          handleFlag={changeFlag1}
        />
        {renderPosts}
        <DownPagination className="pagination"
          pageNo={actualPageNo}
          total={questions.totalPosts}
          handleSelect={handleSelect}
        />
      </div>


    </div>
  );
}

export default QuestionCard;

