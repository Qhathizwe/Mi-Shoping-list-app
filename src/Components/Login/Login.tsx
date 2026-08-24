import React from 'react';
import styles from './Login.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateLoginField, loginUserThunk } from '../../Redux/Reducers/LoginSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { form, isLoading, error } = useAppSelector((state) => state.auth);

  // 2. Type-safe input change handler using keyof typeof form to update the global store
  const handleChange = (field: keyof typeof form, value: string) => {
    dispatch(updateLoginField({ field, value }));
  };

  // 3. Execution block that triggers on form submission
  const loginToHome = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dispatches form data and unwraps the response object directly upon verification
      const loggedInUser = await dispatch(loginUserThunk(form)).unwrap();

      alert(`Welcome back, ${loggedInUser.name}! Login successful.`);

      navigate('/home');
    } catch (err) {
      // Any rejected errors from loginUserThunk automatically populate state.error
      console.error("Login pipeline execution error handled: ", err);
    }
  };

  const errorStyle = error ? { border: '1px solid red', boxShadow: '0 0 5px red' } : {};

  return (
    /* 
      Running local database command indicator:
      npx json-server --watch db.json --port 5000
    */
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
