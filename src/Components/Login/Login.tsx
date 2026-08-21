import styles from './Login.module.css';

import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../store';
import { useAppSelector } from '../../store';


import { loginStart, loginSuccess, loginFailure } from '../../Redux/Reducers/LoginSlice';
import { useState } from 'react';


const Login = () => {
  const[email, setEmail] =useState('');
  const[password, setPassword]= useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {isLoading, error} = useAppSelector((state) => state.auth);

    const LoginToHome = async (e: React.FormEvent) =>{
    e.preventDefault();

    dispatch(loginStart());

    try{
      const response = await fetch(
        `http://localhost:5000/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      if (!response.ok){
        throw new Error ('kukhona inkinga kwi server yakho.');
      }

      const matchingUsers = await response.json();
      if(!matchingUsers){
        throw new Error ('akusiyona yi email noma yi password.')
      }
      if (matchingUsers.length === 0){
        throw new Error ('faka izimfaneko zakhona.')
      }

    
      dispatch(loginSuccess(matchingUsers[0]));
      navigate('/home')
    }catch (err: unknown){
      if (err instanceof Error)
      dispatch(loginFailure(err.message || 'Kukhona Okungahambi kahle lungisa umsamu.'));
    }
    
  }
  return (
    // run server
    // npx json-server --watch db.json --port 5000
    <form className={styles.LoginContainer}>
      <div className={styles.LoginContent}>
        <h1 className={styles.title}>
          Please <span className={styles.tGreen}>Login</span> Your Account
        </h1>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <input 
        type="email" 
        placeholder="Enter Your email" 
        className={styles.loginInput} 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={error ? { border: '1px solid red', boxShadow: '0 0 5px red' } : {}}
        required/>

        <input 
        type="password" 
        placeholder="Enter Your Password" 
        className={styles.loginInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={error ? { border: '1px solid red', boxShadow: '0 0 5px red' } : {}}
        required />
        
        <button 
        className={styles.btnLogin} 
        onClick={LoginToHome}
        disabled={isLoading}>
        {isLoading? 'Logging in...' : 'Login'}
        </button>
        
        <p className={styles.registerText}>
          Don't have an account?{' '}
          <NavLink to="/register" className={styles.Linkregister}>
            Register
          </NavLink>
        </p>
      </div>
    </form>
  );
};

export default Login;
