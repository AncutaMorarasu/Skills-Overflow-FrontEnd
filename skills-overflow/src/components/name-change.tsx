import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function NameChange() {
    const [showModalName, setShowModalName] = useState(false);

    const handleCloseModalName = () => setShowModalName(false);
    const handleShowModalName = () => setShowModalName(true);
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
                    <Form className="account-form">
                        <Form.Group controlId="firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your first name" className='account-input' />
                        </Form.Group>
                        <Form.Group controlId="lastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your last name" className='account-input' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalName}>
                        Close
                                     </Button>
                    <Button variant="primary" type="submit" onClick={handleCloseModalName}>
                        Save Changes
                                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
