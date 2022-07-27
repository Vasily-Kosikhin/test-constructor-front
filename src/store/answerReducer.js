import { findElemByIdAndDelete } from '../utils/functions';

const defaultState = {
  answer: []
};

const SET_ANSWER = 'SET_ANSWER';
const ADD_ONE_ANSWER = 'ADD_ONE_ANSWER';
const CHANGE_ANSWER_CORRECT = 'CHANGE_ANSWER_CORRECT';
const CHANGE_ANSWER_VALUE = 'CHANGE_ANSWER_VALUE';
const DELETE_ANSWER = 'DELETE_ANSWER';
const DELETE_ALL_ANSWERS = 'DELETE_ALL_ANSWERS';
const SET_SELECTED = 'SET_SELECTED';

function changeAnswerCorrect(element, payload) {
  if (element._id === payload.id) {
    return { ...element, correct: payload.correct };
  } else {
    return element;
  }
}

function setAnswerSelected(element, payload) {
  if (element._id === payload.id) {
    return { ...element, selected: payload.selected };
  } else {
    return element;
  }
}

function changeAnswerValue(element, payload) {
  if (element._id === payload.id) {
    return { ...element, value: payload.value };
  } else {
    return element;
  }
}

export const answerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ANSWER:
      return {
        ...state,
        answer: [...action.payload]
      };
    case ADD_ONE_ANSWER:
      return {
        ...state,
        answer: [...state.answer, action.payload]
      };
    case CHANGE_ANSWER_CORRECT:
      return {
        ...state,
        answer: state.answer.map((e) => changeAnswerCorrect(e, action.payload))
      };
    case CHANGE_ANSWER_VALUE:
      return {
        ...state,
        answer: state.answer.map((e) => changeAnswerValue(e, action.payload))
      };
    case DELETE_ANSWER:
      return {
        ...state,
        answer: findElemByIdAndDelete(state.answer, action.payload)
      };
    case DELETE_ALL_ANSWERS:
      return {
        ...state,
        answer: []
      };
    case SET_SELECTED:
      return {
        ...state,
        answer: state.answer.map((e) => setAnswerSelected(e, action.payload))
      };

    default:
      return { ...state };
  }
};

export const setAnswerAction = (payload) => ({
  type: SET_ANSWER,
  payload
});

export const addOneAnswerAction = (payload) => ({
  type: ADD_ONE_ANSWER,
  payload
});

export const changeAnswerCorrectAction = (payload) => ({
  type: CHANGE_ANSWER_CORRECT,
  payload
});

export const changeAnswerValueAction = (payload) => ({
  type: CHANGE_ANSWER_VALUE,
  payload
});

export const deleteAnswerAction = (payload) => ({
  type: DELETE_ANSWER,
  payload
});

export const deletAllAnswersAction = (payload) => ({
  type: DELETE_ALL_ANSWERS,
  payload
});

export const setAnswerSelectedAction = (payload) => ({
  type: SET_SELECTED,
  payload
});
