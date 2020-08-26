import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import cogoToast from "cogo-toast";
import axios from "axios";


export default function UsernameChange() {
    const [showModalUser, setShowModalUser] = useState(false);
    const [phoneNumber, setUsername] = useState("");

    const handleShowModalUser = () => setShowModalUser(true);
    const handleCloseModalUser = () => setShowModalUser(false);


    function handleChange(event: any) {
        const newUserName = event.target.value;
        setUsername(newUserName);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        setUsername("");
    }
    let token = localStorage.getItem("user");
    let tokenCheck: any;

    function localData() {
        if (typeof token === "string") {
            tokenCheck = JSON.parse(token);
        }
    }
    function submit() {
        localData();
        if (phoneNumber.length === 0) {
            cogoToast.error("Please fill your new phone number.", { hideAfter: 5 });
            return;
        } else {
            console.log(phoneNumber)
            axios
                .put("http://localhost:8080/changePhoneNumber", phoneNumber, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
                .then(() => {
                    cogoToast.success("Successfully changed the username");
                    handleCloseModalUser();
                },
                    error => {
                        cogoToast.error("Something went wrong, please try again.")
                    });
        }
    }
    return (
        <div className='border-bottom'>
            <button className='add-comm-btn' onClick={handleShowModalUser}>Update your phone number</button>
            <Modal show={showModalUser} className=" d-flex align-items-center justify-content-center" onHide={handleCloseModalUser} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>How should we call you?
                                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="account-form" onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Control onChange={handleChange} type="userName" name="userName" placeholder="Enter your new username" className='account-input' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalUser}>
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