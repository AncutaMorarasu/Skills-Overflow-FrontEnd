import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'


export default function UsernameChange() {
    const [showModalUser, setShowModalUser] = useState(false);

    const handleShowModalUser = () => setShowModalUser(true);
    const handleCloseModalUser = () => setShowModalUser(false);

    return (
        <div className='border-bottom'>
            <button className='add-comm-btn' onClick={handleShowModalUser}>Update your username</button>
            <Modal show={showModalUser} className=" d-flex align-items-center justify-content-center" onHide={handleCloseModalUser} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>How should we call you?
                                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="account-form">
                        <Form.Group controlId="username">
                            <Form.Control type="text" placeholder="Enter your new username" className='account-input' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalUser}>
                        Close
                                     </Button>
                    <Button variant="primary" type="submit" onClick={handleCloseModalUser}>
                        Save Changes
                                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}