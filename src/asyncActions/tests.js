import { API_URL } from '../http';
import { apiTestLinks } from '../utils/constants';
import axios from 'axios';
import { setTestsAction } from '../store/testsReducer';

export async function getAllTests(dispatch) {
  try {
    const response = await axios.get(`${API_URL + apiTestLinks.get}`, {
      withCredentials: true
    });
    await dispatch(setTestsAction(response.data));
    return;
  } catch (error) {
    return;
  }
}
