import React, { useEffect, useState } from 'react';
import cl from './TestMaking.module.css';
import QuestionFrom from '../../components/QuestionFrom/QuestionFrom.jsx';
import QuestPaginationForm from '../../components/QuestPaginationForm/QuestPaginationForm.jsx';
import ModalTestCreation from '../../components/ModatCreation/ModalTestCreation.jsx';
import { useDispatch, useSelector } from 'react-redux';
import TextAnswerForm from '../../components/TextAnswerForm/TextAnswerForm';
import ClassicAnswerForm from '../../components/ClassicAnswerForm/ClassicAnswerForm.jsx';
import TestSaveFrom from '../../components/TestSaveFrom/TestSaveFrom';
import { loadTest } from '../../asyncActions/loadTest';
import { createEmptyAnswerByQuestionId } from '../../asyncActions/answer';
import PlusButton from '../../components/UI/PlsusButton/PlusButton';
import ModalErrors from '../../components/ModalErrors/ModalErrors';
import TestTitleForm from '../../components/TestTitleForm/TestTitleForm';
import QuestionActionButton from '../../components/QuestionActionButton/QuestionActionButton';

function TestCreationFrom() {
  const [testInputType, setTestIpuntType] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const [testName, setTestName] = useState('');

  const dispacth = useDispatch();

  const testId = localStorage.getItem('current_test');
  useEffect(() => {
    if (testId) {
      loadTest(testId, dispacth);
    }
  }, []);

  const question = useSelector((store) => store.question.question);
  const answer = useSelector((store) => store.answer.answer);
  const currentTest = useSelector((store) => store.currentTest.currentTest);

  useEffect(() => {
    if (currentTest) {
      setTestName(currentTest.title);
    }
  }, [currentTest]);

  function setCurrentPageCallback(number) {
    setCurrentPage(number);
  }

  function addFalseAnswer() {
    createEmptyAnswerByQuestionId(false, question[currentPage]._id, dispacth);
  }

  function addTrueAnswer() {
    createEmptyAnswerByQuestionId(true, question[currentPage]._id, dispacth);
  }

  if (!testId) {
    return <ModalTestCreation></ModalTestCreation>;
  }

  return (
    <div className={cl.main}>
      <div className={cl.body}>
        <ModalErrors
          errorMessage={errorMessage}
          showError={showError}
          setShowError={setShowError}
        ></ModalErrors>
        <div>
          <div className={cl.title_container}>
            <div className={cl.title_left}></div>
            <div className={cl.title_center}>
              <TestTitleForm
                currentTest={currentTest}
                setErrorMessage={setErrorMessage}
                testName={testName}
                setTestName={setTestName}
              ></TestTitleForm>
            </div>
            <div className={cl.title_right}>
              <TestSaveFrom
                testId={testId}
                currentPage={currentPage}
                setErrorMessage={setErrorMessage}
                setShowError={setShowError}
                className={cl.save}
              ></TestSaveFrom>
            </div>
          </div>
          <QuestPaginationForm
            question={question}
            currentPage={currentPage}
            answer={answer}
            setCurrentPageCallback={setCurrentPageCallback}
            setErrorMessage={setErrorMessage}
            setShowError={setShowError}
          ></QuestPaginationForm>
          <QuestionFrom
            answer={answer}
            testInputType={testInputType}
            setTestIpuntType={setTestIpuntType}
            question={question}
            currentPage={currentPage}
            addTrueAnswer={addTrueAnswer}
          ></QuestionFrom>
          {question[currentPage]?.inputType ? (
            <TextAnswerForm answer={answer}></TextAnswerForm>
          ) : (
            <ClassicAnswerForm answer={answer}></ClassicAnswerForm>
          )}
          {question[currentPage]?.inputType ? (
            <div></div>
          ) : (
            <div className={cl.add_button}>
              <PlusButton action={addFalseAnswer}></PlusButton>
            </div>
          )}
        </div>
        <QuestionActionButton
          testId={testId}
          question={question}
          answer={answer}
          currentPage={currentPage}
          setErrorMessage={setErrorMessage}
          setShowError={setShowError}
          setCurrentPageCallback={setCurrentPageCallback}
        ></QuestionActionButton>
      </div>
    </div>
  );
}
export default TestCreationFrom;
