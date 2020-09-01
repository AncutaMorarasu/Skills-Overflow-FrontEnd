import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import cogoToast from "cogo-toast";

function QuestionModal() {
  let tokenCheck: any;
  const [showModal, setShowModal] = useState(false);

  const [newJob, setNewInfoPost] = useState<{

    jobTitle: string;
    description: string;
    salary: string;
    field: string;
    token:String;
    
  }>({
    jobTitle: "",
    description: "",
    salary: "",
    field:"",
    token:"",
    

  });


  //functiile pe modala
  const handleCloseModal = () => {
    setShowModal(false);
    setNewInfoPost({ jobTitle: "", description: "", salary:"",field:"", token:""});
  };
  const handleShowModal = () => setShowModal(true);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setNewInfoPost({
      ...newJob,
      [name]: value
    });
  }

  function localData() {
    if (typeof token === "string") {
        tokenCheck = JSON.parse(token);
    }
}


  function handleSubmit(event: any) {
    event.preventDefault();
  }

  function submit() {
    console.log(newJob);
    if (
      newJob.jobTitle.length === 0 
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
    localData();
    newJob.token=tokenCkecked.token;
    axios
      
      .post("http://localhost:8080/create/job", newJob,  {
        headers: { Authorization: "Bearer " + tokenCkecked.token }
      })
      .then(() => {
        console.log(newJob)
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
        Add Job
      </Button>
      <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton className="justify-content-center">
          <Modal.Title>Add a job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="modal-form" onSubmit={handleSubmit}>
            <Form.Label>Add a title</Form.Label>

            <Form.Control
              type="text"
              name="jobTitle"
              onChange={handleChange}
              value={newJob.jobTitle}
            />
            <Form.Label>Add a description </Form.Label>
            <textarea
              className="d-block rounded-2"
              rows={5}
              cols={55}
              name="description"
              onChange={handleChange}
            >{newJob.description}</textarea>

            <Form.Label>Add a salary</Form.Label>

            <Form.Control
              type="text"
              name="salary"
              onChange={handleChange}
              value={newJob.salary}
            />
            <Form.Label>Add a field</Form.Label>
               <Form.Control
                type="text"
                name="field"
                onChange={handleChange}
                value={newJob.field}
              />            
            
            

          </Form>
        </Modal.Body> 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={submit}>
            Post job
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuestionModal;
