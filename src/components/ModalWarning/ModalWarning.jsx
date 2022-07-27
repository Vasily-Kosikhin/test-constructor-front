import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalWarning({
  errorMessage,
  showWarning,
  setShowWarning,
  action,
  refresh,
  setRefresh
}) {
  const handleCloseWarning = () => setShowWarning(false);

  return (
    <>
      <Modal show={showWarning} onHide={handleCloseWarning} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Предупреждение</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWarning}>
            Нет
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              action();
              if (setRefresh) {
                setRefresh(!refresh);
              }

              handleCloseWarning();
            }}
          >
            Да
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWarning;
