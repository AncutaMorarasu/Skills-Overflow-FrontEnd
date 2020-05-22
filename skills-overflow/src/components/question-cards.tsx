import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import QuestionModal from "./add-question";
import FilterSort from "./filter-sort";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import DownPagination from "./pagination";
import { cpus } from "os";

function QuestionCard(props:any) {
  const {searchParam, changeFlag1, effects} = props;
  const history = useHistory();
  const location = useLocation<{ topics: string[] }>();
  let { criteria, pageNo } = useParams();
  //aici trebuie sa iei postarile
  const [questions, setQuestions] = useState({
    posts: [],
    totalPosts: 78
  });
  //nu folosesc niciodata setTopics, sunt hard-coded
  const [topics, setTopics] = useState({
    topics: [
      "Java",
      "Springboot",
      "SQL",
      "Tomcat",
      "JPA",
      "Google Cloud",
      "Hibernate",
      "HTML",
      "CSS",
      "Javascript",
      "Bootstrap",
      "React",
      "Angular",
      "JQuery"
    ]
  }); 
  const [filter, setFilters] = useState<{ filterTopics: string[] }>({
    filterTopics: []
  });
  //const [effects, setEffects] = useState({ ef: true });

  //const [pageNumberz, setPageNumber] = useState<number[]>([]);
  let [actualPageNo, setActualPageNo] = useState(0);

  // const changeFlag = () => {
  //   if (effects.ef) setEffects({ ef: false });
  //   else {
  //     setEffects({ ef: true });
  //   }
  // };

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
    let actualPageNo = pageNo ? pageNo - 1: 0;
    setActualPageNo(actualPageNo);
    let children = location.state ? location.state.topics : filter.filterTopics;

    let path = (searchParam != undefined && searchParam != "")  
    ?`http://localhost:8081/allSearchedPosts/${actualPageNo}/${searchParam}`
    : `http://localhost:8081/allPosts/${actualPageNo}/${criteria}`;

    console.log("this is the object passed to the backend --> ", children)
    console.log("and this is the path-->", path)
    axios
      .post(
        path,
        { topics: children },
        { headers: { Authorization: "Bearer " + tokenCheck.token } }
      )
      .then(
        response => {
          const object = response.data;
          setQuestions({ totalPosts:object[0], posts: object[1]});
          //setFilters({filterTopics:[]}) -- comentata, deci userul trebuie sa deselecteze
        },
        error => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    getPosts();
    console.log("the search param is --> ", searchParam);

    // let p = calculatePageNos();
    // setPageNumber(p); acum nu mai e nevoie, se intampla totul in copil!!!
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
              <a
                href="#"
                key={index}
                onClick={() => history.push(`singlePost/${id}/0`)}
              >
                {" "}
                {title}
              </a>
            </Card.Title>
            <Card.Text>{body}</Card.Text>

            <Card.Text>
              Created on: {createDate}
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

  //logica specifica acestei clase
  function handleSelect(e: any) {
    const text = e.target.text;
    if (criteria) {
      history.push({
      pathname:`/posts/${text}/${criteria}`,
      state: { topics: filter.filterTopics }})
      changeFlag1();
      return; 
      }
    history.push({
    pathname:`/posts/${text}`,
    state: { topics: filter.filterTopics }})
    changeFlag1(); 
    } 

  return (
    <div>
    <div className="questions">
      <QuestionModal />
      <FilterSort
        topics={topics.topics}
        filterTopics={filter.filterTopics}
        onClick={handleTopicClick}
        handleFlag={changeFlag1}
      />
      {renderPosts}
    </div>

    <DownPagination 
    pageNo= {actualPageNo} 
    total= {questions.totalPosts} 
    handleSelect = {handleSelect}
    //pageNumberz={pageNumberz}
    //handleFlag={changeFlag}
    />
    </div>  
  );
  }

export default QuestionCard;
  
