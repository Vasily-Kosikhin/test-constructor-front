export function findElemByIdAndDelete(arr, id) {
  arr.splice(arr.indexOf(arr.find((item) => item._id === id)), 1);
  return arr;
}

export function findElemByIdAndUpdate(arr, payload) {
  arr.map((elem) => {
    if (elem._id === payload.id) {
      return payload.question;
    }
    return elem;
  });
  return arr;
}

export function findElemByIndexAndDelete(arr, index) {
  arr.splice(arr.indexOf(arr.find((item, idx) => index === idx)), 1);
  return arr;
}

export function validateQuestion(
  question,
  answer,
  currentPage,
  setErrorMessage,
  setShowError
) {
  if (!question[currentPage]?.description) {
    setShowError(true);
    setErrorMessage('Нельзя сохранить пустой вопрос!');
    return false;
  }

  let sum = 0;
  for (let answ of answer) {
    if (answ.value) {
      sum += 1;
    }
  }
  if (sum !== answer.length) {
    setShowError(true);
    setErrorMessage('Невозможно сохранить вопрос c пустым вариантом ответа');
    return false;
  }

  let trueAns = 0;

  for (let answ of answer) {
    if (answ.correct) {
      trueAns += 1;
    }
  }

  if (trueAns === 0) {
    setShowError(true);
    setErrorMessage('Для создания вопроса необходим хотя бы 1 верный ответ');
    return false;
  }

  return true;
}

export function validateAnswer(
  answer,
  question,
  currentQuestion,
  setShowError,
  setErrorMessage
) {
  if (question[currentQuestion].inputType) {
    if (answer[0].value) {
      return true;
    }
    setShowError(true);
    setErrorMessage('Нельзя отправить пустой ответ');
    return false;
  }
  if (
    answer.filter((el) => {
      if (el?.selected) {
        return true;
      }
      return false;
    }).length
  ) {
    return true;
  }
  setShowError(true);
  setErrorMessage('Необходимо выбрать хотя бы 1 вариант ответа');
  return false;
}
