import React from 'react';
import {
  postRecoverPasswordAction,
  postRecoverPasswordRequest
} from '../../asyncActions/user.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthInputForm from '../../components/AuthInputForm/AuthInputForm.jsx';

function RecoverPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const flag = searchParams.get('link') ? true : false;
  let navigate = useNavigate();

  const buttonSetting = {
    login: {
      action: function () {
        return navigate('/login');
      },
      text: 'Войти в аккаунт'
    },
    recoverRequest: {
      action: postRecoverPasswordRequest,
      text: 'Сбросить пароль'
    },
    recoverRequestAсtion: {
      action: postRecoverPasswordAction,
      text: 'Установить новый пароль'
    }
  };

  const formSettings = {
    loginInput: !flag,
    passwordInput: flag,
    firstButton: true,
    secondButton: false
  };

  return (
    <div>
      {!flag ? (
        <AuthInputForm
          formSettings={formSettings}
          mainButton={buttonSetting.recoverRequest}
          firstButton={buttonSetting.login}
        ></AuthInputForm>
      ) : (
        <AuthInputForm
          formSettings={formSettings}
          mainButton={buttonSetting.recoverRequestAсtion}
          firstButton={buttonSetting.login}
        ></AuthInputForm>
      )}
    </div>
  );
}
export default RecoverPassword;
