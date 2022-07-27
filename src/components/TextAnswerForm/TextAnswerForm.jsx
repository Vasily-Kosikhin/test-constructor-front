import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeAnswerValueAction } from '../../store/answerReducer';
import cl from './TextAnswerForm.module.css';

function TextAnswerForm({ answer }) {
  const [answerValue, setAnswerValue] = useState(answer[0]?.value);

  useEffect(() => setAnswerValue(answer[0]?.value), [answer]);

  const dispatch = useDispatch();

  return (
    <div className={cl.test_answer_main_container}>
      <textarea
        className={cl.test_answer_input}
        placeholder="Напишите здесь ответ"
        value={answerValue}
        onChange={(e) => {
          setAnswerValue(e.target.vale);
          dispatch(
            changeAnswerValueAction({
              id: answer[0]._id,
              value: e.target.value
            })
          );
        }}
      ></textarea>
    </div>
  );
}
export default TextAnswerForm;
