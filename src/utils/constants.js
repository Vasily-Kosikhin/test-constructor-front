import { v4 as uuidv4 } from 'uuid';
import Activation from '../pages/Activation/Activation';
import Login from '../pages/Login/Login.jsx';
import RecoverPassword from '../pages/RecoverPassword/RecoverPassword.jsx';
import CreatedTests from '../pages/CreatedTests/CreatedTests.jsx';
import PassedTests from '../pages/PassedTests/PassedTests.jsx';
import Registration from '../pages/Registration/Registration.jsx';
import TestMaking from '../pages/TestMaking/TestMaking.jsx';
import TestPassing from '../pages/TestPassing/TestPassing.jsx';
import { Navigate } from 'react-router-dom';

export const appPaths = {
  activation: 'activation',
  created: 'created',
  login: 'login',
  passed: 'passed',
  recover: 'recover',
  registration: 'registration',
  make: 'make',
  pass: 'pass',
  profile: 'profile'
};

export const authRoutes = [
  {
    path: appPaths.created,
    element: <CreatedTests />,
    id: uuidv4()
  },
  {
    path: appPaths.passed,
    element: <PassedTests />,
    id: uuidv4()
  },
  {
    path: appPaths.recover,
    element: <RecoverPassword />,
    id: uuidv4()
  },
  {
    path: appPaths.make,
    element: <TestMaking />,
    id: uuidv4()
  },
  {
    path: appPaths.pass,
    element: <TestPassing />,
    id: uuidv4()
  }
  // {
  //   path: '*',
  //   element: <Navigate to="/created" replace />,
  //   id: uuidv4()
  // }
];

export const publicRoutes = [
  {
    path: appPaths.registration,
    element: <Registration />,
    id: uuidv4()
  },
  {
    path: appPaths.recover,
    element: <RecoverPassword />,
    id: uuidv4()
  },
  {
    path: appPaths.login,
    element: <Login />,
    id: uuidv4()
  },
  {
    path: appPaths.activation,
    element: <Activation />,
    id: uuidv4()
  }
  // {
  //   path: '*',
  //   element: <Navigate to="/login" replace />,
  //   id: uuidv4()
  // }
];

export const authLinks = [
  {
    link: '/' + appPaths.created,
    title: 'Мои тесты',
    id: uuidv4()
  },
  {
    link: '/' + appPaths.passed,
    title: 'Пройденные тесты',
    id: uuidv4()
  },
  {
    link: '/' + appPaths.make,
    title: 'Создание теста',
    id: uuidv4()
  }
  // {
  //   link: '/' + appPaths.pass,
  //   title: 'Прохождение теста',
  //   id: uuidv4()
  // },
];

export const publicLinks = [
  // {
  //   link: '/' + appPaths.registration,
  //   title: 'Регистрация',
  //   id: uuidv4()
  // },
  // {
  //   link: '/' + appPaths.recover,
  //   title: 'Восстановление пароля',
  //   id: uuidv4()
  // },
  {
    link: '/' + appPaths.login,
    title: 'Войти в аккаунт',
    id: uuidv4()
  }
  // {
  //   link: '/' + appPaths.activation,
  //   title: 'Активация',
  //   id: uuidv4()
  // }
];

export const apiUserLinks = {
  login: '/api/users/login',
  registration: '/api/users/registration',
  password: '/api/users/password',
  passwordRecover: '/api/users/password/recover',
  refresh: '/api/users/refresh',
  logout: '/api/users/logout'
};

export const apiTestLinks = {
  create: '/api/test/create',
  get: '/api/test/get',
  update: '/api/test/update',
  delete: '/api/test/delete'
};

export const apiCompletedTestLinks = {
  all: '/api/completed/all',
  create: '/api/completed/create',
  get: '/api/completed/get',
  delete: '/api/completed/delete'
};

export const apiReultLinks = {
  create: '/api/result/create',
  get: '/api/result/get',
  delete: '/api/result/delete'
};

export const apiQuestionLinks = {
  create: '/api/question/create',
  empty: '/api/question/empty',
  get: '/api/question/get',
  refresh: '/api/question/refresh',
  update: '/api/question/update',
  delete: '/api/question/delete',
  clear: '/api/question/clear',
  pagination: '/api/question/pagination'
};

export const apiAnswerLinks = {
  create: '/api/answer/create',
  empty: '/api/answer/empty',
  get: '/api/answer/get',
  all: '/api/answer/all',
  update: '/api/answer/update',
  delete: '/api/answer/delete'
};

export const apiCurrentLinks = {
  create: '/api/current/create',
  get: '/api/current/get',
  delete: '/api/current/delete',
  check: '/api/current/check'
};
