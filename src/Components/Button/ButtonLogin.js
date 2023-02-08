import React from 'react';
import './ButtonLogin.css';

const ButtonLogin = ({ text, type }) => (
  <button className={`ButtonLogin ButtonLogin-${type}`}>{text}</button>
);

export default ButtonLogin;
