import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getResult } from '../../asyncActions/result';
import { deleteResultAction } from '../../store/resultReducer';
import cl from './ModalResult.module.css';

function ModalResult({ errorMessage, showResult, setShowResult, id, action }) {
  const handleCloseResult = () => {
    setShowResult(false);
    dispatch(deleteResultAction());
  };
  const handleShowResult = () => setShowResult(true);

  const dispatch = useDispatch();

  useEffect(() => {
    getResult(id, dispatch);
  }, [showResult]);
  const result = useSelector((store) => store.result.result);

  function resultColor(result) {
    const rootClass = [cl.body];

    if (result.result) {
      rootClass.push(cl.right);
      return rootClass.join(' ');
    }
    rootClass.push(cl.wrong);
    return rootClass.join(' ');
  }
  return (
    <>
      <Modal show={showResult} onHide={handleCloseResult} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Вопросы:</Modal.Title>
        </Modal.Header>
        <div className={cl.container}>
          {result.map((result, idx) => (
            <div key={result._id} className={resultColor(result)}>
              {idx + 1}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
export default ModalResult;
