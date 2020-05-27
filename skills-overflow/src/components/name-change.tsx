import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import cogoToast from "cogo-toast";
import axios from "axios";


export default function NameChange() {
    const [showModalName, setShowModalName] = useState(false);
    const [nameDetails, setNameDetails] = useState<{
        firstName: string;
        lastName: string
    }>({
        firstName: "",
        lastName: ""
    });

    const handleCloseModalName = () => setShowModalName(false);
    const handleShowModalName = () => setShowModalName(true);
    let token = localStorage.getItem("user");
    let tokenCheck: any;

    function localData() {
        if (typeof token === "string") {
            tokenCheck = JSON.parse(token);
        }
    }


    function handleChange(event: any) {
        const { name, value } = event.target;
        setNameDetails({
            ...nameDetails,
            [name]: value
        });
        console.log(nameDetails)
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(nameDetails);
        setNameDetails({ firstName: "", lastName: "" });

    }
    function submit() {
        localData();
        if (nameDetails.firstName.length === 0 || nameDetails.lastName.length === 0) {
            cogoToast.error("Please fill in both fields.", { hideAfter: 5 });
            return;
        } else {
            axios
                .put("http://localhost:8081/userProfile/changeName", nameDetails, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
                .then(() => {
                    cogoToast.success(" You have successfully changed your details");
                    handleCloseModalName();
                },
                    error => {
                        console.log(nameDetails);
                        cogoToast.error("Something went wrong, please try again.")
                    });
        }
    }

    return (
        <div className='border-bottom'>
            <button className='add-comm-btn' onClick={handleShowModalName}>Update your first and last name</button>
            <Modal show={showModalName} className=" d-flex align-items-center justify-content-center" onHide={handleCloseModalName} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update your personal details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="account-form" onSubmit={handleSubmit}>
                        <Form.Group controlId="firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your first name" className='account-input' onChange={handleChange} value={nameDetails.firstName} name="firstName" />
                        </Form.Group>
                        <Form.Group controlId="lastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your last name" className='account-input' onChange={handleChange} value={nameDetails.lastName} name="lastName" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalName}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={submit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
