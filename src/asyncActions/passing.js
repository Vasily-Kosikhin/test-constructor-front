import { useDispatch, useSelector } from 'react-redux';
import $api, { API_URL } from '../http';

import { apiAnswerLinks, apiCurrentLinks, appPaths } from '../utils/constants';
import axios from 'axios';

import {
  addOneAnswerAction,
  deleteAnswerAction,
  setAnswerAction
} from '../store/answerReducer';
import {
  deletePassingTest,
  setPassingTestAction
} from '../store/passingTestReducer';
import { setCurrentTestLoadAction } from '../store/currentTestReducer';

export async function createPassingTest(
  test_id,
  email,
  dispatch,
  setErrorMessage
) {
  try {
    const response = await $api.post(apiCurrentLinks.create, {
      test_id,
      email
    });
    await dispatch(setPassingTestAction(response.data));

    return;
  } catch (error) {
    return false;
  }
}

export async function deleteCurrentPassingById(
  current_id,
  dispatch,
  setErrorMessage
) {
  try {
    const response = await $api.delete(
      `${apiCurrentLinks.delete}/${current_id}`
    );
    dispatch(deletePassingTest());

    return;
  } catch (error) {}
}

export async function chekQuetion(
  email,
  test_id,
  question_id,
  answer_id,
  asnwer_value,
  dispatch,
  navigate,
  setErrorMessage
) {
  try {
    const response = await $api.post(apiCurrentLinks.check, {
      email,
      test_id,
      question_id,
      answer_id,
      asnwer_value
    });
    if (response.data.finish) {
      localStorage.removeItem('passing_test');
      navigate(`/${appPaths.passed}`, { replace: true });
      return;
    }

    await dispatch(setPassingTestAction(response.data.checkResult));
    return;
  } catch (error) {}
}

export async function getPassing(
  id,
  email,
  dispatch,
  setTotalPages,
  setErrorMessage
) {
  try {
    const response = await axios.get(
      `${API_URL + apiCurrentLinks.get}?id=${id}&email=${email}`,
      {
        withCredentials: true
      }
    );
    dispatch(setPassingTestAction(response.data));
    return true;
  } catch (error) {
    return false;
  }
}
