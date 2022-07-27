import { API_URL } from '../http';

import { apiCompletedTestLinks } from '../utils/constants';
import axios from 'axios';

import {
  deleteCompletedTestByIdAction,
  setCompletedTestsAction
} from '../store/completedTestsReducer';

export async function getAllCompletedTests(dispatch) {
  try {
    const response = await axios.get(`${API_URL + apiCompletedTestLinks.all}`, {
      withCredentials: true
    });
    await dispatch(setCompletedTestsAction(response.data));
    return;
  } catch (error) {
    return;
  }
}

export async function deleteCompletedTestById(completed_id, dispatch) {
  try {
    await axios.delete(
      `${API_URL + apiCompletedTestLinks.delete}/${completed_id}`,
      {
        withCredentials: true
      }
    );
    await dispatch(deleteCompletedTestByIdAction());
    return;
  } catch (error) {
    return;
  }
}
