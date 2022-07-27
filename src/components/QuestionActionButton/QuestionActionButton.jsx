import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  createEmptyQuestionByTestId,
  deleteQuestionById,
  refreshQuestion
} from '../../asyncActions/question';
import { saveQuestion } from '../../asyncActions/saveQuestion';
import { validateQuestion } from '../../utils/functions';
import cl from './QuestionActionButton.module.css';

function QuestionActionButton({
  testId,
  question,
  answer,
  currentPage,
  setErrorMessage,
  setShowError,
  setCurrentPageCallback
}) {
  const dispatch = useDispatch();

  const rootClass = [cl.create_button];

  if (currentPage === 0) {
    rootClass.push(cl.create_button_firstpage);
  }

  function changePage() {
    createEmptyQuestionByTestId(testId, dispatch, question, currentPage);
    saveQuestion(answer, question, currentPage);
    if (currentPage === 0) {
      refreshQuestion(question[currentPage]._id, dispatch);
    } else {
      refreshQuestion(question[currentPage - 1]._id, dispatch);
    }
    setCurrentPageCallback(question.length);
  }
  return (
    <div>
      <div className={cl.delete_button_container}>
        <Button
          variant="secondary"
          size="sm"
          className={cl.delete_button}
          onClick={() => {
            deleteQuestionById(
              question,
              dispatch,
              currentPage,
              setCurrentPageCallback
            );
          }}
        >
          Удалить вопрос
        </Button>
        <Button
          variant="success"
          size="sm"
          className={rootClass.join(' ')}
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
            changePage();
          }}
        >
          Создать вопрос
        </Button>
      </div>
    </div>
  );
}
export default QuestionActionButton;
