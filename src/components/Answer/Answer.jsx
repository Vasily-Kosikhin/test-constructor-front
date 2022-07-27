import React, { useEffect, useState } from 'react';
import cl from './Answer.module.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useDispatch } from 'react-redux';
import {
  changeAnswerCorrectAction,
  changeAnswerValueAction
} from '../../store/answerReducer';
import { deleteAnswerById } from '../../asyncActions/answer';

function AnswerForm({ answerQuantity, setAnswerQuantity, answer }) {
  const answerOptions1 = [
    { name: 'Неверный', value: false },
    { name: 'Верный', value: true }
  ];
  const [answerValue, setAnswerValue] = useState(answer.value);
  const [radioValue, setRadioValue] = useState(answer.correct);

  useEffect(() => setAnswerValue(answer.value), [answer]);
  const rootClasses = [cl.answer_text_container];
  const textRooteClasses = [cl.answer_text_body];
  const dispatch = useDispatch();

  if (radioValue === false) {
    rootClasses.push(cl.answer_text_false);
    textRooteClasses.push(cl.answer_text_false_light);
  } else {
    rootClasses.push(cl.answer_text_true);
    textRooteClasses.push(cl.answer_text_true_light);
  }

  function removeAnswer() {
    deleteAnswerById(answer._id, dispatch, answerQuantityCallback);
  }

  function answerQuantityCallback() {
    setAnswerQuantity(answerQuantity - 1);
  }

  return (
    <div className={rootClasses.join(' ')}>
      <textarea
        className={textRooteClasses.join(' ')}
        placeholder="Напишите здесь вариант ответа"
        value={answerValue}
        onChange={(e) => {
          dispatch(
            changeAnswerValueAction({ id: answer._id, value: e.target.value })
          );
          setAnswerValue(e.target.value);
        }}
      ></textarea>
      <div className={cl.answer_type_container}>
        <ButtonGroup>
          {answerOptions1.map((radio, idx) => {
            return (
              <ToggleButton
                key={idx}
                type="radio"
                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                checked={radioValue === radio.value}
                onClick={(e) => {
                  setRadioValue(radio.value);
                  dispatch(
                    changeAnswerCorrectAction({
                      id: answer._id,
                      correct: radio.value
                    })
                  );
                }}
                className={cl.answer_type_false}
              >
                {radio.name}
              </ToggleButton>
            );
          })}
        </ButtonGroup>
        <button
          type="button"
          className={cl.delete_answer_button}
          onClick={removeAnswer}
        >
          X
        </button>
      </div>
    </div>
  );
}
export default AnswerForm;
