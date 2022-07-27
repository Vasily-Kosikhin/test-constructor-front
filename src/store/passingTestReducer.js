const defaultState = {
  passingTest: null
};

const SET_PASSING_TEST = `SET_PASSING_TEST`;
const DELETE_PASSING_TEST = 'DELETE_PASSING_TEST';

export const passingTestReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PASSING_TEST:
      return {
        ...state,
        passingTest: action.payload
      };
    case DELETE_PASSING_TEST:
      return {
        ...state,
        passingTest: null
      };
    default:
      return {
        ...state
      };
  }
};

export const setPassingTestAction = (payload) => ({
  type: SET_PASSING_TEST,
  payload
});

export const deletePassingTest = (payload) => ({
  type: DELETE_PASSING_TEST,
  payload
});
