import { findElemByIdAndDelete } from '../utils/functions';

const defaultState = {
  tests: null
};

const SET_TESTS = 'SET_TESTS';
const DELETE_TEST_BY_ID = 'DELETE_TEST_BY_ID';

export const testsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TESTS:
      return {
        ...state,
        tests: action.payload
      };
    case DELETE_TEST_BY_ID: {
      return {
        ...state,
        tests: findElemByIdAndDelete(state.tests, action.payload)
      };
    }
    default:
      return {
        ...state
      };
  }
};

export const setTestsAction = (payload) => ({
  type: SET_TESTS,
  payload
});

export const deleteTestByIdAction = (payload) => ({
  type: DELETE_TEST_BY_ID,
  payload
});
