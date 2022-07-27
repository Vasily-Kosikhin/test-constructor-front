import React, { useState } from 'react';
import cl from './CreatedTestsActionForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import { appPaths } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import ModalWarning from '../ModalWarning/ModalWarning';
import { deleteTest } from '../../asyncActions/currentTest';
import { useDispatch } from 'react-redux';
import { deleteTestByIdAction } from '../../store/testsReducer';

function CreatedTestsActionForm({ test }) {
  const [errorMessage, setErrorMessage] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowWarning = () => setShowWarning(true);

  function startPassingTest(testId) {
    localStorage.setItem('passing_test', testId);
    navigate(`/${appPaths.pass}`, { replace: true });
  }

  function cancelTestCreation(testId) {
    if (testId === localStorage.getItem('current_test')) {
      localStorage.removeItem('current_test');
    }
    deleteTest(testId, dispatch);
    dispatch(deleteTestByIdAction(testId));
    setErrorMessage(!errorMessage);
  }

  return (
    <div className={cl.test_container}>
      <div className={cl.test_name}>{test.title}</div>
      <div className={cl.test_date}>{test.created_at}</div>
      <div className={cl.test_aciton_container}>
        <div className={cl.test_aciton_body}>
          <FontAwesomeIcon
            icon={faClipboardList}
            className={cl.test_action_icon}
            color="rgb(46, 173, 63)"
            onClick={() => startPassingTest(test._id)}
          />
          <FontAwesomeIcon
            icon={faPen}
            className={cl.test_action_icon}
            color="rgb(60, 63, 255)"
            onClick={() => {
              localStorage.setItem('current_test', test._id);
              navigate(`/${appPaths.make}`, { replace: true });
            }}
          />

          <FontAwesomeIcon
            icon={faTrash}
            className={cl.test_action_icon}
            color="rgb(141, 141, 141)"
            onClick={() => handleShowWarning()}
          />
          <ModalWarning
            errorMessage="Вы уверены что хотие удалить тест?"
            showWarning={showWarning}
            setShowWarning={setShowWarning}
            action={() => cancelTestCreation(test._id, dispatch)}
          ></ModalWarning>
        </div>
      </div>
    </div>
  );
}
export default CreatedTestsActionForm;
