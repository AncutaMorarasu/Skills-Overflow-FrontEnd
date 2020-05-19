import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
function QuestionModal() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [newQuestion, setNewQuestion] = useState({
    questionTitle: "",
    questionBody: "",
    questionTags: ""
  });

  function handleChange(event: any) {
    const { name, value } = event.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value
    });
  }

  function submitQuestion() {
    console.log(newQuestion);
    handleCloseModal();
  }
  function handleSubmit(event: any) {
    event.preventDefault();
    setNewQuestion({
      questionTitle: "",
      questionBody: "",
      questionTags: ""
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
            <Form.Group id="questionTags">
              <div className="row">
                <div className="column col-md-4">
                  <Form.Check type="checkbox" label="Java" />
                  <Form.Check type="checkbox" label="Springboot" />
                  <Form.Check type="checkbox" label="SQL" />
                  <Form.Check type="checkbox" label="Tomcat" />
                  <Form.Check type="checkbox" label="JPA" />
                  <Form.Check type="checkbox" label="Google Cloud" />
                  <Form.Check type="checkbox" label="Hibernate" />
                </div>
                <div className="column col-md-4 ml-auto">
                  <Form.Check type="checkbox" label="HTML" />
                  <Form.Check type="checkbox" label="CSS" />
                  <Form.Check type="checkbox" label="Javascript" />
                  <Form.Check type="checkbox" label="Bootstrap" />
                  <Form.Check type="checkbox" label="React" />
                  <Form.Check type="checkbox" label="Angular" />
                  <Form.Check type="checkbox" label="JQuery" />
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitQuestion}>
            Post question
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuestionModal;
