import React from 'react';
import { postLogin } from '../../asyncActions/user';
import { useNavigate } from 'react-router-dom';
import AuthInputForm from '../../components/AuthInputForm/AuthInputForm';

function Login() {
  const navigate = useNavigate();
  const buttonSetting = {
    loginRequest: {
      action: postLogin,
      text: 'Войти'
    },
    registration: {
      action: function () {
        return navigate('/registration');
      },
      text: 'Регистрация'
    },
    recover: {
      action: function () {
        return navigate('/recover');
      },
      text: 'Забыли пароль?'
    }
  };
  const formSettings = {
    loginInput: true,
    passwordInput: true,
    firstButton: true,
    secondButton: true
  };

  return (
    <div>
      <AuthInputForm
        formSettings={formSettings}
        mainButton={buttonSetting.loginRequest}
        firstButton={buttonSetting.registration}
        secondButton={buttonSetting.recover}
      ></AuthInputForm>
    </div>
  );
}
export default Login;
