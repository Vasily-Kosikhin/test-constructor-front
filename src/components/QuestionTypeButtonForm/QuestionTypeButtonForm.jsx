import React, { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { clearQuestionById } from '../../asyncActions/question';
import { changeQuestionTypeAction } from '../../store/questionReducer';
import cl from './QuestionTypeButtonForm.module.css';

function QuestionTypeButtonForm({
  question,
  currentPage,
  testInputType,
  setTestIpuntType,
  addTrueAnswer
}) {
  const [radioValue, setRadioValue] = useState(true);
  const dispatch = useDispatch();
  const answerOptions1 = [
    { name: 'Несколько вариантов ответа', value: false },
    { name: 'Один письменный ответ', value: true }
  ];

  return (
    <div className={cl.answer_option_buttons_container}>
      <ButtonGroup size="sm" className={cl.answer_option_buttons}>
        {answerOptions1.map((radio, idx) => {
          return (
            <ToggleButton
              size="sm"
              key={idx}
              type="radio"
              variant={idx % 2 ? 'outline-primary' : 'outline-success'}
              checked={question[currentPage]?.inputType === radio.value}
              onClick={(e) => {
                if (radio.name === 'Несколько вариантов ответа') {
                  setTestIpuntType(false);
                  dispatch(
                    changeQuestionTypeAction({
                      id: question[currentPage]._id,
                      type: false
                    })
                  );
                  clearQuestionById(
                    question,
                    dispatch,
                    currentPage,
                    addTrueAnswer
                  );
                } else {
                  setTestIpuntType(true);
                  dispatch(
                    changeQuestionTypeAction({
                      id: question[currentPage]._id,
                      type: true
                    })
                  );
                  clearQuestionById(
                    question,
                    dispatch,
                    currentPage,
                    addTrueAnswer
                  );
                }
                setRadioValue(radio.value);
              }}
              className={cl.answer_type_false}
            >
              {radio.name}
            </ToggleButton>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
export default QuestionTypeButtonForm;
