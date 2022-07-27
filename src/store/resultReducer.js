const defaultState = {
  result: []
};

const SET_RESULT = 'SET_RESULT';
const DELETE_RESULT = 'DELETE_RESULT';

export const resultReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_RESULT:
      return {
        ...state,
        result: action.payload
      };
    case DELETE_RESULT: {
      return {
        ...state,
        result: []
      };
    }
    default:
      return {
        ...state
      };
  }
};

export const setResultAction = (payload) => ({
  type: SET_RESULT,
  payload
});

export const deleteResultAction = (payload) => ({
  type: DELETE_RESULT,
  payload
});
