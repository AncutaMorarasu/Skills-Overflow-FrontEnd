import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface ModalProps {
  modal: any;
  toggle: any;
  modalM: any;
  save: any;
  approveRequest: any;
  declineRequest: any;
}

const ModalComponent: React.SFC<ModalProps> = ({
  modal,
  toggle,
  modalM,
  approveRequest,
  declineRequest,
  save
}) => {
  return (
    <Modal show={modal} onHide={toggle} className="modal">
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalM}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={!save ? approveRequest : declineRequest}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
