import React, { useEffect, useState } from 'react';
import cl from './TestPassing.module.css';
import { ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadTest } from '../../asyncActions/loadTest';
import TestPassingClassicAnswer from '../../components/TestPassingAnswer/TestPassingAnswer';
import TestPassingTextAnswer from '../../components/TestPassingTextAnswer/TestPassingTextAnswer';
import { createPassingTest } from '../../asyncActions/passing';
import TestPassingActionForm from '../../components/TestPassingActionForm/TestPassingActionForm';
import ModalErrors from '../../components/ModalErrors/ModalErrors';
import { getAnswerByQuestionId } from '../../asyncActions/answer';

function TestPassing() {
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const testId = localStorage.getItem('passing_test');
  const test = useSelector((store) => store.currentTest.currentTest);
  const user = useSelector((store) => store.user.user);
  const question = useSelector((store) => store.question.question);
  const answer = useSelector((store) => store.answer.answer);
  const passingTest = useSelector((store) => store.passingTest.passingTest);

  useEffect(() => {
    if (testId) {
      createPassingTest(testId, user.email, dispatch);
      loadTest(testId, dispatch, currentQuestion);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (passingTest) {
      if (question[currentQuestion]?._id) {
        getAnswerByQuestionId(question[currentQuestion]._id);
      }
      setcurrentQuestion(passingTest.question_number);
    }
  }, [passingTest]);

  const left = (currentQuestion / question.length) * 100;
  const right = ((question.length - currentQuestion) / question.length) * 100;

  return (
    <div className={cl.main}>
      <ModalErrors
        errorMessage={errorMessage}
        showError={showError}
        setShowError={setShowError}
      ></ModalErrors>
      <div className={cl.body}>
        <div className={cl.title_body}>
          <div className={cl.title_text}>{test?.title}</div>
        </div>
        <div className={cl.progess_container}>
          <span
            className={cl.progess_text}
          >{`Прогресс: ${currentQuestion}/${question.length}`}</span>
          <ProgressBar className={cl.progess_body}>
            <ProgressBar variant="success" now={left} key={1} />
            <ProgressBar variant="warning" now={right} key={2} />
          </ProgressBar>
        </div>
        <div className={cl.queston_container}>
          {question[currentQuestion]?.description}
        </div>
        {question[currentQuestion]?.inputType ? (
          <div className={cl.answer_container}>
            <TestPassingTextAnswer
              answer={answer}
              currentQuestion={currentQuestion}
            ></TestPassingTextAnswer>
          </div>
        ) : (
          <div className={cl.answer_container}>
            {answer.map((elem) => (
              <TestPassingClassicAnswer
                elem={elem}
                key={elem._id}
              ></TestPassingClassicAnswer>
            ))}
          </div>
        )}
        <TestPassingActionForm
          user={user}
          testId={testId}
          passingTest={passingTest}
          question={question}
          answer={answer}
          currentQuestion={currentQuestion}
          setShowError={setShowError}
          setErrorMessage={setErrorMessage}
        ></TestPassingActionForm>
      </div>
    </div>
  );
}
export default TestPassing;
