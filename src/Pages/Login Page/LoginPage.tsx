import {type Dispatch, type SetStateAction } from 'react';
import Login from '../../Components/Login/Login';

interface LoginProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function LoginPage({ setIsLoggedIn }: LoginProps) {
  
  return (
      <div>
         <Login setIsLoggedIn={setIsLoggedIn} />
      </div>  
  );
}
