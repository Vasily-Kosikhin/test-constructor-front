import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeTestTitle } from '../../asyncActions/currentTest';
import { changeCurrentTestTitle } from '../../store/currentTestReducer';
import cl from './TestTitleForm.module.css';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TestTitleForm({
  currentTest,
  setErrorMessage,
  testName,
  setTestName
}) {
  const [edit, setEdit] = useState(false);

  const dispacth = useDispatch();

  function changeTitle() {
    setEdit(false);
    changeTestTitle(currentTest._id, testName, setErrorMessage);
  }

  return (
    <div>
      {edit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changeTitle();
          }}
          onBlur={() => changeTitle()}
        >
          <input
            autoFocus
            value={testName}
            className={cl.title_text}
            onChange={(e) => {
              e.target.value = e.target.value.substring(0, 20);
              setTestName(e.target.value);
              dispacth(changeCurrentTestTitle(e.target.value));
            }}
          ></input>
        </form>
      ) : (
        <div className={cl.title_body}>
          <div className={cl.title_text}>{currentTest?.title}</div>
          <div className={cl.title_action}>
            <FontAwesomeIcon
              icon={faPen}
              className={cl.test_action_icon}
              color="rgb(60, 63, 255)"
              onClick={() => setEdit(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default TestTitleForm;
