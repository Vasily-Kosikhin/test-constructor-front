import React from 'react';
import { Spinner } from 'react-bootstrap';
import cl from './Loader.module.css';
function Loader() {
  return (
    <div className={cl.loading_container}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
export default Loader;
