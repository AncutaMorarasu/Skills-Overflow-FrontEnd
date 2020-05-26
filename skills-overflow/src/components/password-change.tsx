import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function PasswordChange() {
    const [showModalPassword, setShowModalPassword] = useState(false);
    const handleCloseModalPassword = () => setShowModalPassword(false);
    const handleShowModalPassword = () => setShowModalPassword(true);
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
                    <Form className="account-form">
                        <Form.Group controlId="current-password">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter your current password" className='account-input' />
                        </Form.Group>
                        <Form.Group controlId="new-password">
                            <Form.Label>New password</Form.Label>
                            <Form.Control type="text" placeholder="Enter your new password" className='account-input' />
                        </Form.Group>
                        <Form.Group controlId="confirm-password">
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control type="text" placeholder="Enter your new password again" className='account-input' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalPassword}>
                        Close
                                     </Button>
                    <Button variant="primary" type="submit" onClick={handleCloseModalPassword}>
                        Save Changes
                                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}