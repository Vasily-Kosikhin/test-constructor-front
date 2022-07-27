import React, { useEffect, useState } from 'react';
import cl from './QuestionFrom.module.css';

import { useDispatch } from 'react-redux';
import { changeQuestionDescriptionAction } from '../../store/questionReducer';

import QuestionTypeButtonForm from '../QuestionTypeButtonForm/QuestionTypeButtonForm.jsx';

function QuestionFrom({
  testInputType,
  setTestIpuntType,
  question,
  currentPage,
  addTrueAnswer,
  answer
}) {
  const [questionValue, setQuestionValue] = useState(
    question[currentPage]?.description
  );

  useEffect(
    () => setQuestionValue(question[currentPage]?.description),
    [currentPage, question, answer]
  );

  const dispatch = useDispatch();

  return (
    <div className={cl.question_container}>
      <div className={cl.question_body_block}>
        <div className={cl.value_number_container}>
          <div className={cl.question_type_block}>
            <div className={cl.question_number}>
              {`Вопрос: ${currentPage + 1}`}
            </div>
          </div>
          <div className={cl.question_text_block}>
            <textarea
              placeholder="Напишите здесь вопрос"
              className={cl.question_body}
              value={questionValue}
              onChange={(e) => {
                setQuestionValue(e.target.value);
                dispatch(
                  changeQuestionDescriptionAction({
                    id: question[currentPage]._id,
                    description: e.target.value
                  })
                );
              }}
            ></textarea>
          </div>
        </div>
      </div>
      <QuestionTypeButtonForm
        question={question}
        currentPage={currentPage}
        testInputType={testInputType}
        setTestIpuntType={setTestIpuntType}
        addTrueAnswer={addTrueAnswer}
      ></QuestionTypeButtonForm>
    </div>
  );
}
export default QuestionFrom;
