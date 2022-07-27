import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTest, saveTest } from '../../asyncActions/currentTest.js';
import { appPaths } from '../../utils/constants';
import { validateQuestion } from '../../utils/functions';
import ModalWarning from '../ModalWarning/ModalWarning';
import cl from './TestSaveFrom.module.css';
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';

function TestSaveFrom({ testId, currentPage, setErrorMessage, setShowError }) {
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const question = useSelector((store) => store.question.question);
  const answer = useSelector((store) => store.answer.answer);

  const handleShowWarning = () => setShowWarning(true);

  function cancelTestCreation() {
    localStorage.removeItem('current_test');
    deleteTest(testId, dispatch);
    navigate(`/${appPaths.created}`);
  }

  return (
    <div className={cl.complete_container}>
      <ModalWarning
        errorMessage="Это действие отменит создание теста и все данные будут удалены. Вы
        уверены, что хотите продолжить без сохранения?"
        showWarning={showWarning}
        setShowWarning={setShowWarning}
        action={cancelTestCreation}
      ></ModalWarning>
      <FontAwesomeIcon
        icon={faFloppyDisk}
        className={cl.test_action_icon}
        color="rgb(46, 173, 63)"
        onClick={() => {
          if (
            !validateQuestion(
              question,
              answer,
              currentPage,
              setErrorMessage,
              setShowError
            )
          ) {
            return;
          }
          if (saveTest(answer, question, currentPage, dispatch)) {
            localStorage.removeItem('current_test');
            navigate(`/${appPaths.created}`);
          }
        }}
      />
      <FontAwesomeIcon
        icon={faXmark}
        className={cl.test_action_icon}
        color="rgb(141, 141, 141)"
        onClick={() => handleShowWarning()}
      />
    </div>
  );
}
export default TestSaveFrom;
