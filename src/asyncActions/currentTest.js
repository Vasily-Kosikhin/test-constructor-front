import $api from '../http';
import { apiQuestionLinks, apiTestLinks } from '../utils/constants';
import {
  deleteCurrentTestAction,
  setCurrentTestLoadAction
} from '../store/currentTestReducer.js';
import { createEmptyAnswerByQuestionId } from './answer';
import {
  addOneQuestionAction,
  deletAllQuestionsAction
} from '../store/questionReducer';
import {
  addOneAnswerAction,
  deletAllAnswersAction
} from '../store/answerReducer';
import { saveQuestion } from './saveQuestion';

export async function postCreateTest(title, email, dispatch, setErrorMessage) {
  try {
    const response = await $api.post(apiTestLinks.create, {
      title,
      email
    });
    await dispatch(setCurrentTestLoadAction(response.data));
    localStorage.setItem('current_test', response.data._id);

    const resQuestion = await $api.post(apiQuestionLinks.empty, {
      inputType: false,
      answerQuantity: 1,
      test_id: response.data._id
    });
    await dispatch(addOneQuestionAction(resQuestion.data));
    const res2 = await createEmptyAnswerByQuestionId(
      true,
      resQuestion.data._id
    );
    dispatch(addOneAnswerAction(res2));
    const res3 = await createEmptyAnswerByQuestionId(
      false,
      resQuestion.data._id
    );
    dispatch(addOneAnswerAction(res3));
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      setErrorMessage(error.response.data.message);
    }
    console.log(error);
    return false;
  }
}

export async function deleteTest(id, dispatch) {
  try {
    await $api.delete(`${apiTestLinks.delete}/${id}`);
    dispatch(deleteCurrentTestAction());
    dispatch(deletAllQuestionsAction());
    dispatch(deletAllAnswersAction());
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function saveTest(answer, question, currentPage, dispatch) {
  try {
    await saveQuestion(answer, question, currentPage);
    dispatch(deleteCurrentTestAction());
    dispatch(deletAllQuestionsAction());
    dispatch(deletAllAnswersAction());
    return true;
  } catch (error) {
    return false;
  }
}

export async function changeTestTitle(id, title, setErrorMessage, showError) {
  try {
    await $api.put(`${apiTestLinks.update}`, {
      title,
      id
    });
  } catch (error) {
    if (error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      // showError(true);
    }
  }
}
