import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import cogoToast from "cogo-toast";

function QuestionModal() {
  const [showModal, setShowModal] = useState(false);

  const [newInfoPost, setNewInfoPost] = useState<{

    title: string;
    description: string;
  }>({
    title: "",
    description: "",

  });


  //functiile pe modala
  const handleCloseModal = () => {
    setShowModal(false);
    setNewInfoPost({ title: "", description: "" });
  };
  const handleShowModal = () => setShowModal(true);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setNewInfoPost({
      ...newInfoPost,
      [name]: value
    });
  }



  function handleSubmit(event: any) {
    event.preventDefault();
  }

  function submit() {
    console.log(newInfoPost);
    if (
      newInfoPost.title.length === 0 
    ) {
      cogoToast.error(
        "Make sure you fill in the question title, body."
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
      .post("http://localhost:8080/create/info", newInfoPost, {
        headers: { Authorization: "Bearer " + tokenCkecked.token }
      })
      .then(() => {
        console.log(newInfoPost)
        cogoToast.info("Your post is live");

      }, error => { cogoToast.error("Something went wrong, please try again.") });
  }

  return (
    <div className="d-flex justify-content-between quest-cont">

      <Button
        variant="success"
        onClick={handleShowModal}
        className="add-quest-btn"
      >
        Add News
      </Button>
      <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton className="justify-content-center">
          <Modal.Title>Add a info post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="modal-form" onSubmit={handleSubmit}>
            <Form.Label>Add a title</Form.Label>

            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={newInfoPost.title}
            />
            <Form.Label>Add a description </Form.Label>
            <textarea
              className="d-block rounded-2"
              rows={5}
              cols={55}
              name="description"
              onChange={handleChange}
              
              
            >{newInfoPost.description}</textarea>
            

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
