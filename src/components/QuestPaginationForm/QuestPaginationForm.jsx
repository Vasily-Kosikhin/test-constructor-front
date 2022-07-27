import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cl from './QuestPaginationForm.module.css';
import { getAnswerByQuestionId } from '../../asyncActions/answer';
import { saveQuestion } from '../../asyncActions/saveQuestion';
import { validateQuestion } from '../../utils/functions';

function QuestPaginationForm({
  currentPage,
  setCurrentPageCallback,
  question,
  answer,
  setErrorMessage,
  setShowError
}) {
  const dispacth = useDispatch();

  function changePage(elem, index) {
    if (elem._id) {
      saveQuestion(answer, question, currentPage);
      getAnswerByQuestionId(elem._id, dispacth);
    }
    setCurrentPageCallback(index);
  }

  return (
    <div>
      <div className={cl.nav_container}>
        <div className={cl.nav_body}>
          {question.length ? (
            question.map((elem, index) => (
              <div key={elem._id}>
                <div
                  className={
                    index === currentPage
                      ? `${cl.current} ${cl.nav_elem}`
                      : cl.nav_elem
                  }
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
                    changePage(elem, index);
                  }}
                >
                  {index + 1}
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default QuestPaginationForm;
