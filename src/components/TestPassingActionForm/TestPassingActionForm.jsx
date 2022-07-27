import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  chekQuetion,
  deleteCurrentPassingById
} from '../../asyncActions/passing';
import { appPaths } from '../../utils/constants';
import { validateAnswer } from '../../utils/functions';
import cl from './TestPassingActionForm.module.css';

function TestPassingActionForm({
  user,
  testId,
  passingTest,
  question,
  answer,
  currentQuestion,
  setShowError,
  setErrorMessage
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function cancelPassing() {
    deleteCurrentPassingById(passingTest._id, dispatch);
    localStorage.removeItem('passing_test');
    navigate(`/${appPaths.created}`, { replace: true });
  }

  function nextQuestion() {
    let answer_id;
    if (question[currentQuestion].inputType) {
      answer_id = answer[0]._id;
    } else {
      answer_id = answer
        .filter((el) => {
          if (el?.selected) {
            return true;
          }
          return false;
        })
        .map((e) => e._id)
        .join(',');
    }

    chekQuetion(
      user.email,
      testId,
      question[currentQuestion]._id,
      answer_id,
      answer[0].value,
      dispatch,
      navigate
    );
  }
  return (
    <div className={cl.complete_container}>
      <Button
        variant="secondary"
        className={cl.complete_cancel}
        onClick={cancelPassing}
      >
        Закончить
      </Button>
      <Button
        variant="success"
        className={cl.complete_save}
        onClick={() => {
          if (
            !validateAnswer(
              answer,
              question,
              currentQuestion,
              setShowError,
              setErrorMessage
            )
          ) {
            return;
          }
          nextQuestion();
        }}
      >
        {currentQuestion === question.length - 1
          ? 'Результаты'
          : 'Следующий вопрос'}
      </Button>
    </div>
  );
}
export default TestPassingActionForm;
