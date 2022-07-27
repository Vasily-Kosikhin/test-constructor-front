import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAnswerSelectedAction } from '../../store/answerReducer';
import cl from './TestPassingAnswer.module.css';

function TestPassingClassicAnswer({ elem }) {
  const [correct, setCorrect] = useState(false);
  const dispatch = useDispatch();
  return (
    <div key={elem._id} className={cl.answer_container}>
      <div className={cl.answer_test}>{elem.value}</div>
      <div>
        {correct ? (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={cl.answer_true}
            color="rgb(46, 173, 63)"
            onClick={() => {
              setCorrect(!correct);
              dispatch(
                setAnswerSelectedAction({
                  id: elem._id,
                  selected: !correct
                })
              );
            }}
          />
        ) : (
          <div
            className={cl.answer_false}
            onClick={() => {
              setCorrect(!correct);
              dispatch(
                setAnswerSelectedAction({
                  id: elem._id,
                  selected: !correct
                })
              );
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
export default TestPassingClassicAnswer;
