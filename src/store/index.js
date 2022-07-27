import { combineReducers, createStore, applyMiddleware } from 'redux';
import { userReduser } from './userReduser';
import thunk from 'redux-thunk';
import { loadingReducer } from './loadingReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { questionReducer } from './questionReducer';
import { answerReducer } from './answerReducer';
import { currentTestReducer } from './currentTestReducer.js';
import { testsReducer } from './testsReducer';
import { passingTestReducer } from './passingTestReducer';
import { completedTestsReducer } from './completedTestsReducer';
import { resultReducer } from './resultReducer';

const rootReducer = combineReducers({
  user: userReduser,
  loading: loadingReducer,
  currentTest: currentTestReducer,
  question: questionReducer,
  answer: answerReducer,
  tests: testsReducer,
  passingTest: passingTestReducer,
  completedTests: completedTestsReducer,
  result: resultReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
