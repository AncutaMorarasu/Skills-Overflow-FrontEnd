import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

function QuestionModal() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewQuestion({ questionTitle: "", questionBody: "", questionTags: [] });
  };
  const handleShowModal = () => setShowModal(true);

  const [newQuestion, setNewQuestion] = useState<{
    questionTags: string[];
    questionTitle: string;
    questionBody: string;
  }>({
    questionTitle: "",
    questionBody: "",
    questionTags: []
  });

  function handleChange(event: any) {
    const { name, value } = event.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value
    });
  }

  const handleCheckbox = (event: any) => {
    let topicValue = event.target.value;
    let array = newQuestion.questionTags;

    for (let i = 0; i < array.length; i++) {
      if (array[i] === topicValue) {
        array.splice(i, 1);
        setNewQuestion({ ...newQuestion, questionTags: array });

        console.log(array);
        return;
      }
    }
    array.push(topicValue);
    setNewQuestion({ ...newQuestion, questionTags: array });

    console.log(array);
  };
  function handleSubmit(event: any) {
    event.preventDefault();
  }
  function submit() {
    console.log(newQuestion);
    postQuestion();
    handleCloseModal();
  }
  let token = localStorage.getItem("user");
  let tokenCkecked: any;

  function postQuestion() {
    if (typeof token === "string") {
      tokenCkecked = JSON.parse(token);
    }
    axios
      .post("http://localhost:8081/createPost", newQuestion, {
        headers: { Authorization: "Bearer" + tokenCkecked.token }
      })
      .then(response => {
        console.log(response.data);
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
              name="questionTitle"
              onChange={handleChange}
              value={newQuestion.questionTitle}
            />
            <Form.Label>Add a question text</Form.Label>
            <textarea
              className="d-block rounded-2"
              rows={5}
              cols={55}
              name="questionBody"
              onChange={handleChange}
              value={newQuestion.questionBody}
            ></textarea>
            <Form.Group id="questionTags" onChange={handleCheckbox}>
              <div className="row">
                <div className="column col-md-4">
                  <Form.Check
                    type="checkbox"
                    label="Java"
                    name="questionTags"
                    value="Java"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Springboot"
                    name="questionTags"
                    value="Springboot"
                    // onChange={handleCheckbox}
                  />
                  <Form.Check
                    type="checkbox"
                    label="SQL"
                    name="questionTags"
                    value="SQL"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Tomcat"
                    name="questionTags"
                    value="Tomcat"
                  />
                  <Form.Check
                    type="checkbox"
                    label="JPA"
                    name="questionTags"
                    value="JPA"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Google Cloud"
                    name="questionTags"
                    value="Google Cloud"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Hibernate"
                    name="questionTags"
                    value="Hibernate"
                  />
                </div>
                <div className="column col-md-4 ml-auto">
                  <Form.Check
                    type="checkbox"
                    label="HTML"
                    name="questionTags"
                    value="HTML"
                  />
                  <Form.Check
                    type="checkbox"
                    label="CSS"
                    name="questionTags"
                    value="CSS"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Javascript"
                    name="questionTags"
                    value="Javascript"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Bootstrap"
                    name="questionTags"
                    value="Bootstrap"
                  />
                  <Form.Check
                    type="checkbox"
                    label="React"
                    name="questionTags"
                    value="React"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Angular"
                    name="questionTags"
                    value="Angular"
                  />
                  <Form.Check
                    type="checkbox"
                    label="JQuery"
                    name="questionTags"
                    value="Jquery"
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
