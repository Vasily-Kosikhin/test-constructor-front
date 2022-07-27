import { API_URL } from '../http';
import { apiReultLinks } from '../utils/constants';
import axios from 'axios';
import { deleteResultAction, setResultAction } from '../store/resultReducer';

export async function getResult(completed_id, dispatch) {
  try {
    const response = await axios.get(
      `${API_URL + apiReultLinks.get}/${completed_id}`,
      {
        withCredentials: true
      }
    );
    await dispatch(setResultAction(response.data));

    return;
  } catch (error) {
    return;
  }
}

export async function deleteResult(completed_id, dispatch) {
  try {
    await axios.delete(`${API_URL + apiReultLinks.delete}/${completed_id}`, {
      withCredentials: true
    });
    await dispatch(deleteResultAction());

    return;
  } catch (error) {
    return;
  }
}
