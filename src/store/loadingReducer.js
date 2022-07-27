const defaultState = {
  isLoading: false,
  isFetching: true
};

const SET_LOADIN = 'SET_LOADING';
const SET_FETCHING = 'SET_FETCHING';

export const loadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOADIN:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      };
    default:
      return { ...state };
  }
};

export const setLoadingAction = (payload) => ({
  type: SET_LOADIN,
  payload
});

export const setFetchingAction = (payload) => ({
  type: SET_FETCHING,
  payload
});
