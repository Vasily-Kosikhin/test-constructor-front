import React from 'react';
import cl from './Activation.module.css';

function Activation() {
  return (
    <div className={cl.main}>
      <div className={cl.body}>
        <h1>
          Для завершения регистрации перейдите по ссылке отправленной на Ваш
          почтовый адресс
        </h1>
      </div>
    </div>
  );
}
export default Activation;
