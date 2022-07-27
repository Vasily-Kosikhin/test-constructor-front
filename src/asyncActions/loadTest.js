import { API_URL } from '../http';
import {
  apiAnswerLinks,
  apiQuestionLinks,
  apiTestLinks
} from '../utils/constants';
import axios from 'axios';
import { setQuestionAction } from '../store/questionReducer';
import { setAnswerAction } from '../store/answerReducer';
import { setCurrentTestLoadAction } from '../store/currentTestReducer';

export async function loadTest(id, dispatch, currentPage) {
  try {
    console.log(`loadTest started`);
    const response1 = await axios.get(`${API_URL + apiTestLinks.get}/${id}`, {
      withCredentials: true
    });
    await dispatch(setCurrentTestLoadAction(response1.data));
    const response2 = await axios.get(
      `${API_URL + apiQuestionLinks.get}/${id}`,
      {
        withCredentials: true
      }
    );
    const question = response2.data;
    await dispatch(setQuestionAction(response2.data));
    const response3 = await axios.get(
      `${API_URL + apiAnswerLinks.all}/${question[currentPage || 0]._id}`,
      {
        withCredentials: true
      }
    );
    await dispatch(setAnswerAction(response3.data));
    const answer = response3.data;
    console.log(`loadTest ended`);
    return { question, answer };
  } catch (error) {
    return false;
  }
}
