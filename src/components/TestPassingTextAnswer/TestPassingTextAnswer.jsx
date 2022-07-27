import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeAnswerValueAction } from '../../store/answerReducer';
import cl from './TestPassingTextAnswer.module.css';

function TestPassingTextAnswer({ answer, currentQuestion }) {
  const [answerValue, setAnswerValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (answer.length) {
      dispatch(
        changeAnswerValueAction({
          id: answer[0]._id,
          value: ''
        })
      );
      setAnswerValue('');
    }
  }, [currentQuestion]);

  return (
    <div className={cl.test_answer_main_container}>
      <input
        autoFocus
        className={cl.test_answer_input}
        placeholder="Напишите здесь ответ"
        value={answerValue}
        onChange={(e) => {
          setAnswerValue(e.target.value);
          dispatch(
            changeAnswerValueAction({
              id: answer[0]._id,
              value: e.target.value
            })
          );
        }}
      ></input>
    </div>
  );
}
export default TestPassingTextAnswer;
