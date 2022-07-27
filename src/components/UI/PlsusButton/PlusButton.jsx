import React from 'react';
import { Button } from 'react-bootstrap';
import cl from './PlusButton.module.css';

function PlusButton(props) {
  return (
    <Button
      variant="success"
      className={cl.button}
      onClick={() => props.action()}
    >
      <span className={cl.button_text}>+</span>
    </Button>
  );
}
export default PlusButton;
