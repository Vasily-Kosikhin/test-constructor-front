import $api, { API_URL } from '../http';
import { apiAnswerLinks } from '../utils/constants';
import axios from 'axios';

import {
  addOneAnswerAction,
  deleteAnswerAction,
  setAnswerAction
} from '../store/answerReducer';

export async function getAnswerByQuestionId(
  id,
  dispatch,
  setTotalPages,
  setErrorMessage
) {
  try {
    const response = await axios.get(`${API_URL + apiAnswerLinks.all}/${id}`, {
      withCredentials: true
    });
    dispatch(setAnswerAction(response.data));

    return response.data;
  } catch (error) {
    return false;
  }
}

export async function deleteAnswerById(
  id,
  dispatch,
  callback,
  setErrorMessage
) {
  try {
    const response = await axios.delete(
      `${API_URL + apiAnswerLinks.delete}/${id}`,
      {
        withCredentials: true
      }
    );
    dispatch(deleteAnswerAction(id));

    if (callback) {
      callback();
    }

    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      setTimeout(() => setErrorMessage(''), 1000);
    }
  }
}

export async function createAnswerByQuestionId(
  value,
  correct,
  question_id,
  dispatch,
  answerQuantityCallback,
  setErrorMessage
) {
  try {
    const response = await $api.post(apiAnswerLinks.create, {
      value,
      correct,
      question_id
    });
    await dispatch(addOneAnswerAction(response.data));
    answerQuantityCallback();
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      setTimeout(() => setErrorMessage(''), 1000);
    }

    return false;
  }
}

export async function createEmptyAnswerByQuestionId(
  correct,
  question_id,
  dispatch,
  setErrorMessage
) {
  try {
    const response = await $api.post(apiAnswerLinks.empty, {
      correct,
      question_id
    });
    if (dispatch) {
      await dispatch(addOneAnswerAction(response.data));
    }

    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      setTimeout(() => setErrorMessage(''), 1000);
    }

    return false;
  }
}
