import React from 'react';
import styles from './Login.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateLoginField, loginUserThunk } from '../../Redux/Reducers/LoginSlice';
import type{ RootState }  from '../../store';

import { type Dispatch, type SetStateAction, type FormEvent } from 'react';

interface LoginChildProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setIsLoggedIn }: LoginChildProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  setIsLoggedIn(true); 


  const { form, isLoading, error } = useAppSelector((state) => state.auth);

  const handleChange = (field: keyof typeof form, value: string) => {
    dispatch(updateLoginField({ field, value }));
  };

  let user = useAppSelector ((state: RootState) => state.auth.user);

  if (!user){
    user = JSON.parse(localStorage.getItem("User")!)
  }

  const loginToHome = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loggedInUser = await dispatch(loginUserThunk(form)).unwrap();
      alert(`Welcome back, ${loggedInUser.name}! Login successful.`);
      navigate('/home');
    } catch (err) {
      console.error("Login pipeline execution error handled: ", err);
    }
  };

  const errorStyle = error ? { border: '1px solid red', boxShadow: '0 0 5px red' } : {};

  return (
    <form className={styles.LoginContainer} onSubmit={loginToHome}>
      <div className={styles.LoginContent}>
        <h1 className={styles.title}>
          Please <span className={styles.tGreen}>Login</span> Your Account
        </h1>
        
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        
        <input 
          type="email" 
          placeholder="Enter Your email" 
          className={styles.loginInput} 
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          style={errorStyle}
          required
        />

        <input 
          type="password" 
          placeholder="Enter Your Password" 
          className={styles.loginInput}
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          style={errorStyle}
          required 
        />
        
        <button 
          type="submit"
          className={styles.btnLogin} 
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
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