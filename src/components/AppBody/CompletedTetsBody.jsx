import React from 'react';
import cl from './CompletedTetsBody.module.css';

function CompletedTetsBody({ children }) {
  return (
    <div className={cl.main}>
      <div className={cl.body}>{children}</div>
    </div>
  );
}
export default CompletedTetsBody;
