import React, { useState } from 'react';
import cl from './PassedTestActionForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

import ModalWarning from '../ModalWarning/ModalWarning';
import { useDispatch } from 'react-redux';
import { deleteTestByIdAction } from '../../store/testsReducer';
import { ProgressBar } from 'react-bootstrap';
import { deleteCompletedTestById } from '../../asyncActions/completed';
import ModalResult from '../ModalResult/ModalResult';
import { deleteResultAction } from '../../store/resultReducer';

function PassedTestActionForm({ test, refresh, setRefresh }) {
  const [errorMessage, setErrorMessage] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const dispatch = useDispatch();

  const handleShowWarning = () => setShowWarning(true);
  const handleShowResult = () => setShowResult(true);

  function deleteCompleted(testId) {
    deleteCompletedTestById(testId, dispatch);
    dispatch(deleteTestByIdAction(testId));
    dispatch(deleteResultAction());
    setErrorMessage(!errorMessage);
  }

  function setProgress() {
    const x = test.right / test.total;
    if (x === 0) {
      return { variant: 'danger', value: 100 };
    }
    if (x < 0.3) {
      return { variant: 'danger', value: x * 100 };
    }
    if (x < 0.7) {
      return { variant: 'warning', value: x * 100 };
    }
    return { variant: 'success', value: x * 100 };
  }

  return (
    <div className={cl.test_container}>
      <div className={cl.test_name}>{test.title}</div>
      <div className={cl.test_date}>{test.passed_at}</div>
      <div className={cl.test_aciton_container}>
        <div className={cl.test_aciton_body}>
          <div>{`${test.right}/${test.total}`}</div>
          <ProgressBar
            variant={setProgress().variant}
            now={setProgress().value}
            className={cl.progess}
          ></ProgressBar>
          <FontAwesomeIcon
            icon={faEye}
            className={cl.test_action_icon}
            color="rgb(60, 63, 255)"
            onClick={() => handleShowResult()}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className={cl.test_action_icon}
            color="rgb(141, 141, 141)"
            onClick={() => handleShowWarning()}
          />
          <ModalWarning
            errorMessage="Вы уверены что хотие удалить резульаты?"
            showWarning={showWarning}
            setShowWarning={setShowWarning}
            action={() => deleteCompleted(test._id)}
            refresh={refresh}
            setRefresh={setRefresh}
          ></ModalWarning>
          <ModalResult
            errorMessage="Вы уверены что хотие удалить резульаты?"
            showResult={showResult}
            setShowResult={setShowResult}
            id={test._id}
            action={() => deleteCompleted(test._id)}
          ></ModalResult>
        </div>
      </div>
    </div>
  );
}
export default PassedTestActionForm;
