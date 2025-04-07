import React from 'react';
import './Button.css'; // Assuming you have a CSS file for button styles

const Button = ({ onClick, children, type = 'button', className = '' }) => {
  return (
    <button className={`custom-button ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;