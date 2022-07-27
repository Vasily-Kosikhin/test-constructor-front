import React, { useState } from 'react';
import cl from './AuthInputForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import { Button } from 'react-bootstrap';

function AuthInputForm({
  formSettings,
  mainButton,
  firstButton,
  secondButton
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const link = searchParams.get('link');

  function validateRequest(email, password) {
    if (formSettings.loginInput && formSettings.passwordInput) {
      if (isEmail(email)) {
        if (password.length > 4) {
          return true;
        } else {
          setErrorMessage('Пароль должен быть больше 5 символов');
          return false;
        }
      } else {
        setErrorMessage('Введите существующий email адресс');
        return false;
      }
    }
    if (formSettings.loginInput) {
      if (isEmail(email)) {
        return true;
      }
      setErrorMessage('Введите существующий email адресс');
      return false;
    }
    if (formSettings.passwordInput) {
      if (password.length > 4) {
        return true;
      } else {
        setErrorMessage('Пароль должен быть больше 5 символов');
        return false;
      }
    }
  }

  function sendRequest(email, password, navigate, setErrorMessage) {
    if (validateRequest(email, password)) {
      dispatch(
        mainButton.action(email, password, navigate, setErrorMessage, link)
      );
    }
    return;
  }
  return (
    <div className={cl.main_container}>
      <div className={cl.inputs_container}>
        <div className={cl.message_container}>
          <h3>{errorMessage}</h3>
        </div>
        <div className={cl.inputs_body}>
          {formSettings.loginInput && (
            <div className={cl.input_container}>
              <input
                className={cl.input}
                value={email}
                placeholder="Введите электронную почту"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
          )}
          {formSettings.passwordInput && (
            <div className={cl.input_container}>
              <input
                type="password"
                className={cl.input}
                value={password}
                placeholder="Введите пароль"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          )}
          <Button
            className={cl.main_button}
            onClick={() =>
              sendRequest(email, password, navigate, setErrorMessage)
            }
          >
            {mainButton.text}
          </Button>
        </div>
        <div className={cl.navigaton_container}>
          {formSettings.firstButton && (
            <Button
              variant="success"
              className={cl.minor_button}
              onClick={() => firstButton.action()}
            >
              {firstButton.text}
            </Button>
          )}
          {formSettings.secondButton && (
            <span
              className={cl.minor_button_ref}
              onClick={() => secondButton.action()}
            >
              {secondButton.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
export default AuthInputForm;
