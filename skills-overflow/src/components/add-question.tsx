import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import cogoToast from "cogo-toast";

function QuestionModal() {
  const [showModal, setShowModal] = useState(false);

  const [newQuestion, setNewQuestion] = useState<{
    topics: string[];
    title: string;
    body: string;
  }>({
    title: "",
    body: "",
    topics: []
  });

  //functiile pe modala
  const handleCloseModal = () => {
    setShowModal(false);
    setNewQuestion({ title: "", body: "", topics: [] });
  };
  const handleShowModal = () => setShowModal(true);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value
    });
  }

  //pentru topic-uri
  const handleCheckbox = (event: any) => {
    let topicValue = event.target.value;
    let array = newQuestion.topics;

    for (let i = 0; i < array.length; i++) {
      if (array[i] === topicValue) {
        array.splice(i, 1);
        setNewQuestion({ ...newQuestion, topics: array });
        return;
      }
    }
    array.push(topicValue);
    setNewQuestion({ ...newQuestion, topics: array });
  };

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  function submit() {
    console.log(newQuestion);
    if (
      newQuestion.title.length === 0 ||
      newQuestion.body.length === 0 ||
      newQuestion.topics.length === 0
    ) {
      cogoToast.error(
        "Make sure you fill in the question title, body and choose at least one topic."
      );
      return;
    } else {
      postQuestion();
    }
    handleCloseModal();
  }
  let token = localStorage.getItem("user");
  let tokenCkecked: any;

  function postQuestion() {
    if (typeof token === "string") {
      tokenCkecked = JSON.parse(token);
    }
    console.log(tokenCkecked.token);
    axios
      .post("http://localhost:8081/createPost", newQuestion, {
        headers: { Authorization: "Bearer " + tokenCkecked.token }
      })
      .then(() => {
        cogoToast.info("Your question has bee submitted for review.");;

      });
  }

  return (
    <div className="d-flex justify-content-between quest-cont">
      <span className="all-questions">All Questions</span>
      <Button
        variant="success"
        onClick={handleShowModal}
        className="add-quest-btn"
      >
        Ask a question
      </Button>
      <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton className="justify-content-center">
          <Modal.Title>Ask a question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="modal-form" onSubmit={handleSubmit}>
            <Form.Label>Add a question title</Form.Label>

            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={newQuestion.title}
            />
            <Form.Label>Add a question text</Form.Label>
            <textarea
              className="d-block rounded-2"
              rows={5}
              cols={55}
              name="body"
              onChange={handleChange}
              value={newQuestion.body}
            ></textarea>
            <Form.Group id="topics" onChange={handleCheckbox}>
              <div className="row">
                <div className="column col-md-4">
                  <Form.Check
                    type="checkbox"
                    label="Java "
                    name="topics"
                    value="Java "
                  />
                  <Form.Check
                    type="checkbox"
                    label="Springboot "
                    name="topics"
                    value="Springboot "
                  />
                  <Form.Check
                    type="checkbox"
                    label="SQL "
                    name="topics"
                    value="SQL "
                  />
                  <Form.Check
                    type="checkbox"
                    label="Tomcat "
                    name="topics"
                    value="Tomcat "
                  />
                  <Form.Check
                    type="checkbox"
                    label="JPA "
                    name="topics"
                    value="JPA "
                  />
                  <Form.Check
                    type="checkbox"
                    label="Google Cloud "
                    name="topics"
                    value="Google Cloud "
                  />
                  <Form.Check
                    type="checkbox"
                    label="Hibernate "
                    name="topics"
                    value="Hibernate "
                  />
                  <Form.Check
                    type="checkbox"
                    label="MongoDB "
                    name="topics"
                    value="MongoDB "
                  />
                </div>
                <div className="column col-md-4 ml-auto">
                  <Form.Check
                    type="checkbox"
                    label="HTML "
                    name="topics"
                    value="HTML "
                  />
                  <Form.Check
                    type="checkbox"
                    label="CSS "
                    name="topics"
                    value="CSS "
                  />
                  <Form.Check
                    type="checkbox"
                    label="Javascript "
                    name="topics"
                    value="Javascript "
                  />
                  <Form.Check
                    type="checkbox"
                    label="Bootstrap "
                    name="topics"
                    value="Bootstrap "
                  />
                  <Form.Check
                    type="checkbox"
                    label="React "
                    name="topics"
                    value="React "
                  />
                  <Form.Check
                    type="checkbox"
                    label="Angular "
                    name="topics"
                    value="Angular "
                  />
                  <Form.Check
                    type="checkbox"
                    label="JQuery "
                    name="topics"
                    value="Jquery "
                  />
                  <Form.Check
                    type="checkbox"
                    label="Other "
                    name="topics"
                    value="Other "
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={submit}>
            Post question
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuestionModal;
