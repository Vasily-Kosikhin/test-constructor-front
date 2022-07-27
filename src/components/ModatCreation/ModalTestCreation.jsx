import cl from './ModalTestCreation.module.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateTest } from '../../asyncActions/currentTest.js';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-bootstrap';

function ModalCreation({ props }) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const [showToggle, setShowToggle] = useState(false);
  const toggleShow = () => setShowToggle(!showToggle);

  const rootClass = [cl.modal_input];

  if (errorMessage) {
    rootClass.push(cl.error);
  }

  async function createTest() {
    if (!title) {
      toggleShow(true);
      setErrorMessage('Невозможно создать тест без названия');
    }
    const result = await postCreateTest(
      title,
      user.email,
      dispatch,
      setErrorMessage
    );

    if (result) {
      handleClose();
    } else {
      toggleShow(!showToggle);
    }
  }

  return (
    <div className={cl.main}>
      <>
        <Button
          variant="primary"
          onClick={handleShow}
          className={cl.start_button}
        >
          Создать тест
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          centered={true}
          className={cl.modal_body}
        >
          <Modal.Header closeButton className={cl.modal_header}>
            <Modal.Title className={cl.modal_title}>
              Придумайте название вашего теста
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cl.modal_error}>
              <Toast show={showToggle} onClose={toggleShow}>
                <Toast.Header>
                  <strong className="me-auto">Проблема:</strong>
                </Toast.Header>
                <Toast.Body>{errorMessage}</Toast.Body>
              </Toast>
            </div>
            <input
              autoFocus
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setShowToggle(false);
              }}
              placeholder="название"
              className={rootClass.join(' ')}
            ></input>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Отмена
            </Button>
            <Button variant="primary" onClick={() => createTest()}>
              Создать
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
export default ModalCreation;
