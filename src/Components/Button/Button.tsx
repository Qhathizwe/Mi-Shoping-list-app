import React from 'react';
import styles from './Button.module.css'; 

type ButtonProps = {
    text?: string; // Made optional since you also accept children
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Fixed type
    type?: 'button' | 'submit' | 'reset'; // Typed for standard button elements
    children?: React.ReactNode; // Explicitly added to fix the children error
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', children }) => {
  return (
    <button type={type} onClick={onClick} >
      {children || text}
    </button>
  );
};

export default Button;
