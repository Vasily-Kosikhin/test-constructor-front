import $api, { API_URL } from '../http';
import { setAuthAction, setUserAction } from '../store/userReduser';
import { apiUserLinks, appPaths } from '../utils/constants';
import axios from 'axios';
import { setFetchingAction, setLoadingAction } from '../store/loadingReducer';
import { getAllTests } from './tests';

export async function checkAuth(dispatch, setRun) {
  dispatch(setLoadingAction(true));
  try {
    const response = await axios.get(API_URL + apiUserLinks.refresh, {
      withCredentials: true
    });

    localStorage.setItem('token', response.data.accessToken);
    await dispatch(setAuthAction(true));
    await dispatch(setUserAction(response.data));
    await getAllTests(dispatch);
    await dispatch(setFetchingAction(false));
  } catch (error) {
  } finally {
    dispatch(setLoadingAction(false));
  }
}

export async function postLogout(dispatch) {
  try {
    await $api.post(apiUserLinks.logout);
    localStorage.removeItem('token');
    dispatch(setAuthAction(false));
    dispatch(setUserAction({}));
  } catch (e) {}
}

export const postLogin = (email, password, navigate, setErrorMessage) => {
  return async function (dispatch) {
    try {
      const response = await $api.post(apiUserLinks.login, {
        email,
        password
      });
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setAuthAction(true));
      dispatch(setUserAction(response.data));

      if (response.data.user?.isActivated) {
        navigate(`/${appPaths.created}`, { replace: true });
      } else {
        navigate(`/${appPaths.activation}`, { replace: true });
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
};

export const postRegistration = (
  email,
  password,
  navigate,
  setErrorMessage
) => {
  return async function (dispatch) {
    try {
      const response = await $api.post(apiUserLinks.registration, {
        email,
        password
      });
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setUserAction(response.data));
      if (response.data.user?.isActivated) {
        navigate(`/${appPaths.profile}`, { replace: true });
      } else {
        navigate(`/${appPaths.activation}`, { replace: true });
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
};

export const postRecoverPasswordRequest = (
  email,
  password,
  navigate,
  setErrorMessage
) => {
  return async function (dispatch) {
    try {
      const response = await $api.post(apiUserLinks.password, {
        email
      });
      setErrorMessage(response.data);
    } catch (error) {
      if (error?.response?.status === 400) {
        setErrorMessage(error.response.data);
      }
    }
  };
};

export const postRecoverPasswordAction = (
  email,
  password,
  navigate,
  setErrorMessage,
  link
) => {
  return async function (dispatch) {
    try {
      await $api.post(apiUserLinks.passwordRecover, {
        password,
        link
      });
      navigate(`/${appPaths.login}`, { replace: true });
    } catch (error) {
      if (error?.response.status === 400) {
        setErrorMessage(error.response.data);
      }
    }
  };
};
