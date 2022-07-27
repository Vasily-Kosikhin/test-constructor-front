import $api, { API_URL } from '../http';
import { apiQuestionLinks } from '../utils/constants';
import axios from 'axios';
import {
  addOneQuestionAction,
  deletQuestionAction,
  refreshQuestionByIdAction,
  setQuestionAction
} from '../store/questionReducer';
import { createEmptyAnswerByQuestionId, getAnswerByQuestionId } from './answer';
import { deletAllAnswersAction } from '../store/answerReducer';

export async function getQuestions(
  id,
  dispatch,
  setTotalPages,
  setErrorMessage
) {
  try {
    const response = await axios.get(
      `${API_URL + apiQuestionLinks.get}/${id}`,
      {
        withCredentials: true
      }
    );
    dispatch(setQuestionAction(response.data));

    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      setTimeout(() => setErrorMessage(''), 1000);
    }

    return false;
  }
}

export async function createEmptyQuestionByTestId(
  test_id,
  dispatch,
  question,
  currentPage,
  setErrorMessage
) {
  try {
    const response = await $api.post(apiQuestionLinks.empty, {
      inputType: false,
      answerQuantity: 1,
      test_id
    });

    await createEmptyAnswerByQuestionId(true, response.data._id);

    await getAnswerByQuestionId(response.data._id, dispatch);

    await dispatch(addOneQuestionAction(response.data));
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      setTimeout(() => setErrorMessage(''), 1000);
    }

    return false;
  }
}

export async function deleteQuestionById(
  question,
  dispatch,
  currentPage,
  setCurrentPage,
  setErrorMessage
) {
  try {
    if (question.length === 1) {
      return;
    }

    const response = await $api.delete(
      `${apiQuestionLinks.delete}/${question[currentPage]._id}`
    );

    const totalPages = question.length - 1;

    if (totalPages === currentPage) {
      await dispatch(deletQuestionAction(question[currentPage]._id));
      await getAnswerByQuestionId(question[currentPage - 1]._id, dispatch);
      setCurrentPage(currentPage - 1);
    } else {
      await dispatch(deletQuestionAction(question[currentPage]._id));
      await getAnswerByQuestionId(question[currentPage]._id, dispatch);
      setCurrentPage(currentPage);
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

export async function refreshQuestion(question_id, dispatch) {
  try {
    const response = $api.get(`${apiQuestionLinks.refresh}/${question_id}`);
    dispatch(
      refreshQuestionByIdAction({ id: question_id, question: response.data })
    );
  } catch (error) {}
}

export async function clearQuestionById(
  question,
  dispatch,
  currentPage,
  createEmptyAnswers,
  setCurrentPage,
  setErrorMessage
) {
  try {
    const response = await $api.delete(
      `${apiQuestionLinks.clear}/${question[currentPage]._id}`
    );
    await dispatch(deletAllAnswersAction());
    createEmptyAnswers();

    return response.data;
  } catch (error) {
    return false;
  }
}
