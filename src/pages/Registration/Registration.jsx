import React from 'react';
import { postRegistration } from '../../asyncActions/user.js';
import { useNavigate } from 'react-router-dom';
import AuthInputForm from '../../components/AuthInputForm/AuthInputForm.jsx';

function Registration() {
  let navigate = useNavigate();
  const buttonSetting = {
    registrationRequest: {
      action: postRegistration,
      text: 'Зарегестрироваться'
    },
    login: {
      action: function () {
        return navigate('/login');
      },
      text: 'Войти в аккаунт'
    }
  };

  const formSettings = {
    loginInput: true,
    passwordInput: true,
    firstButton: true,
    secondButton: false
  };

  return (
    <div>
      <AuthInputForm
        formSettings={formSettings}
        mainButton={buttonSetting.registrationRequest}
        firstButton={buttonSetting.login}
      ></AuthInputForm>
    </div>
  );
}
export default Registration;
