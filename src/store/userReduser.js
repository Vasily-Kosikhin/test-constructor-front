const defaultState = {
  user: {
    email: null,
    password: '',
    isActivated: false,
    activationLink: '',
    passwordRecoveryLink: null
  },
  accessToken: '',
  refreshToken: '',
  isAuth: false
};

const SET_AUTH = 'SET_AUTH';
const SET_USER = 'SET_USER';

export const userReduser = (state = defaultState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: { ...action.payload.user },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    default:
      return state;
  }
};

export const setAuthAction = (payload) => ({
  type: SET_AUTH,
  payload
});

export const setUserAction = (payload) => ({
  type: SET_USER,
  payload
});
