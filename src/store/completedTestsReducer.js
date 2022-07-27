import { findElemByIdAndDelete } from '../utils/functions';

const defaultState = {
  completedTests: []
};

const SET_COMPLETED = 'SET_COMPLETED';
const DELETE_COMPLETED = 'DELETE_COMPLETED';

export const completedTestsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_COMPLETED:
      return {
        ...state,
        completedTests: action.payload
      };
    case DELETE_COMPLETED: {
      return {
        ...state,
        completedTests: findElemByIdAndDelete(
          state.completedTests,
          action.payload
        )
      };
    }
    default:
      return {
        ...state
      };
  }
};

export const setCompletedTestsAction = (payload) => ({
  type: SET_COMPLETED,
  payload
});

export const deleteCompletedTestByIdAction = (payload) => ({
  type: DELETE_COMPLETED,
  payload
});
