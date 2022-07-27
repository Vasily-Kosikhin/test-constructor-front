import {
  findElemByIdAndDelete,
  findElemByIdAndUpdate
} from '../utils/functions';

const defaultState = {
  question: []
};

const SET_QUESTION = 'SET_QUESTION';
const ADD_ONE_QUESTION = 'ADD_ONE_QUESTION';
const CHANGE_QUESTION_TYPE = 'CHANGE_QUESTION_TYPE';
const CHANGE_QUESTION_DESCRIPTION = 'CHANGE_QUESTION_DESCRIPTION';
const DELETE_QUESTION = 'DELETE_QUESTION';
const DELETE_ALL_QUESTIONS = 'DELETE_ALL_QUESTIONS';
const REFRESH_QUESTION = 'REFRESH_QUESTION';

function changeQuestionType(element, payload) {
  if (element._id === payload.id) {
    return { ...element, inputType: payload.type };
  } else {
    return element;
  }
}

function changeQuestionDescription(element, payload) {
  if (element._id === payload.id) {
    return { ...element, description: payload.description };
  } else {
    return element;
  }
}

export const questionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return {
        ...state,
        question: [...action.payload]
      };
    case ADD_ONE_QUESTION:
      return {
        ...state,
        question: [...state.question, action.payload]
      };
    case REFRESH_QUESTION:
      return {
        ...state,
        question: findElemByIdAndUpdate(state.question, action.payload)
      };
    case CHANGE_QUESTION_TYPE:
      return {
        ...state,
        question: state.question.map((e) =>
          changeQuestionType(e, action.payload)
        )
      };
    case CHANGE_QUESTION_DESCRIPTION:
      return {
        ...state,
        question: state.question.map((e) =>
          changeQuestionDescription(e, action.payload)
        )
      };
    case DELETE_QUESTION:
      return {
        ...state,
        question: findElemByIdAndDelete(state.question, action.payload)
      };
    case DELETE_ALL_QUESTIONS:
      return {
        ...state,
        question: []
      };
    default:
      return { ...state };
  }
};

export const setQuestionAction = (payload) => ({
  type: SET_QUESTION,
  payload
});

export const addOneQuestionAction = (payload) => ({
  type: ADD_ONE_QUESTION,
  payload
});
export const changeQuestionTypeAction = (payload) => ({
  type: CHANGE_QUESTION_TYPE,
  payload
});

export const changeQuestionDescriptionAction = (payload) => ({
  type: CHANGE_QUESTION_DESCRIPTION,
  payload
});

export const deletQuestionAction = (payload) => ({
  type: DELETE_QUESTION,
  payload
});

export const deletAllQuestionsAction = (payload) => ({
  type: DELETE_ALL_QUESTIONS,
  payload
});

export const refreshQuestionByIdAction = (payload) => ({
  type: REFRESH_QUESTION,
  payload
});
