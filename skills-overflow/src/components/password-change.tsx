import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import cogoToast from "cogo-toast";
import axios from "axios";

export default function PasswordChange() {
    const [showModalPassword, setShowModalPassword] = useState(false);
    const handleCloseModalPassword = () => setShowModalPassword(false);
    const handleShowModalPassword = () => setShowModalPassword(true);

    const [changedPassword, setChangedPassword] = useState<{
        oldPassword: string;
        newPassword: string;
        confPassword: string

    }>({
        oldPassword: "",
        newPassword: "",
        confPassword: ""
    });

    function handleChange(event: any) {
        const { name, value } = event.target;
        setChangedPassword({
            ...changedPassword,
            [name]: value
        });
    }

    function handleSubmit(event: any) {
        event.preventDefault();
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
        let passReset = {
            oldPassword: changedPassword.oldPassword,
            newPassword: changedPassword.newPassword
        }
        if (checkPassword()) {
            axios.put("http://localhost:8081/userProfile/resetPasswordInUserProfile", passReset, { headers: { Authorization: 'Bearer ' + tokenCheck.token } })
                .then(response => {
                    if (response.data === "old password doesn't match the input") {
                        cogoToast.error("Incorrect current password.", { hideAfter: 5 });
                        handleShowModalPassword();
                    } else {
                        cogoToast.success("You have successfully changed your password.", { hideAfter: 5 })
                        handleCloseModalPassword();
                    }
                })
        }
        setChangedPassword({ oldPassword: "", newPassword: "", confPassword: "" });
    }

    function checkPassword() {
        if (changedPassword.oldPassword.length === 0 || changedPassword.newPassword.length === 0 || changedPassword.confPassword.length === 0) {
            handleShowModalPassword();
            cogoToast.error("Please fill in all the required fields.", { hideAfter: 5 });

            return false;
        } else if (changedPassword.oldPassword.length < 5 || changedPassword.newPassword.length < 5 || changedPassword.confPassword.length > 20 || changedPassword.newPassword.length > 20) {
            cogoToast.error("Your password should contain at least 5 characters but no more than 20 characters.", { hideAfter: 5 });
            return false;
        } else if (!changedPassword.newPassword.localeCompare(changedPassword.confPassword) === false) {
            cogoToast.error("The new passwords do not match.", { hideAfter: 5 });
            return false;
        } else if (checkForSpaces()) {
            cogoToast.error("Your password must not contain white spaces.", { hideAfter: 5 });
            return false
        } else {
            return true;
        }
    }
    function checkForSpaces() {
        if (/\s/g.test(changedPassword.newPassword) && /\s/g.test(changedPassword.confPassword)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='border-bottom'>
            <button className='add-comm-btn show-modal-btn' onClick={handleShowModalPassword}>Update your password</button>
            <Modal show={showModalPassword} className=" d-flex align-items-center justify-content-center" onHide={handleCloseModalPassword} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Security first, update your password
                                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="account-form" onSubmit={handleSubmit}>
                        <Form.Group controlId="current-password">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your current password" className='account-input' onChange={handleChange} value={changedPassword.oldPassword} name="oldPassword" />
                        </Form.Group>
                        <Form.Group controlId="new-password">
                            <Form.Label>New password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your new password" className='account-input' onChange={handleChange} value={changedPassword.newPassword} name="newPassword" />
                        </Form.Group>
                        <Form.Group controlId="confirm-password">
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your new password again" className='account-input' onChange={handleChange} value={changedPassword.confPassword} name="confPassword" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalPassword}>
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