const defaultState = {
  currentTest: null
};

const SET_CURRENT_TEST = 'SET_CURRENT_TEST';
const DELETE_CURRENT_TEST = 'DELETE_CURRENT_TEST';
const CHAGE_CURRENT_TEST_TITLE = 'CHAGE_CURRENT_TEST_TITLE';

export const currentTestReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_TEST:
      return {
        ...state,
        currentTest: action.payload
      };
    case DELETE_CURRENT_TEST:
      return {
        ...state,
        currentTest: null
      };
    case CHAGE_CURRENT_TEST_TITLE:
      return {
        ...state,
        currentTest: { ...state.currentTest, title: action.payload }
      };
    default:
      return { ...state };
  }
};

export const setCurrentTestLoadAction = (payload) => ({
  type: SET_CURRENT_TEST,
  payload
});

export const deleteCurrentTestAction = (payload) => ({
  type: DELETE_CURRENT_TEST,
  payload
});

export const changeCurrentTestTitle = (payload) => ({
  type: CHAGE_CURRENT_TEST_TITLE,
  payload
});
