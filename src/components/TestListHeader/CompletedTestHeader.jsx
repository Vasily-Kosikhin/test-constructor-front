import React from 'react';
import cl from './CompletedTestHeader.module.css';

function CompletedTestHeader({ name, date, action }) {
  return (
    <div className={cl.test_header}>
      <div className={cl.test_heder_name}>{name}</div>
      <div className={cl.test_heder_date}>{date}</div>
      <div className={cl.test_header_aciton}>{action}</div>
    </div>
  );
}
export default CompletedTestHeader;
