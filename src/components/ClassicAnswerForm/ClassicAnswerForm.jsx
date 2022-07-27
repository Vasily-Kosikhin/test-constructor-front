import React, { useState } from 'react';
import cl from './ClassicAnswerForm.module.css';

import Answer from '../Answer/Answer';

function ClassicAnswerForm({ answer }) {
  const [answerQuantity, setAnswerQuantity] = useState(0);

  return (
    <div className={cl.classic_answer_main_container}>
      {answer.map((answer, index) => (
        <Answer
          answer={answer}
          key={answer._id}
          answerQuantity={answerQuantity}
          setAnswerQuantity={setAnswerQuantity}
        ></Answer>
      ))}
    </div>
  );
}
export default ClassicAnswerForm;
