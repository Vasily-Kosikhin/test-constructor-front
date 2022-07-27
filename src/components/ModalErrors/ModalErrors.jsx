import React from 'react';
import Modal from 'react-bootstrap/Modal';

function ModalErrors({ errorMessage, showError, setShowError }) {
  const handleClose = () => setShowError(false);

  return (
    <>
      <Modal show={showError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Возникла проблема</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalErrors;
