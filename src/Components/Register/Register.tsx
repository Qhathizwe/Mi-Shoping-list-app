import React from 'react';
import styles from './Register.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateFormField, registerUserThunk, resetRegisterState } from '../../Redux/Reducers/RegisterSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { form, error } = useAppSelector((state) => state.register);

  const handleChange = (field: keyof typeof form, value: string) => {
    dispatch(updateFormField({ field, value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // .unwrap() extracts the payload directly or throws an error if the thunk rejects
      const result = await dispatch(registerUserThunk(form)).unwrap();
      
     
      alert(`User ${result.name} added successfully!`);
      
      dispatch(resetRegisterState()); 
      navigate('/');                  
    } catch (err) {
    
      console.error("Registration failed:", err);
    }
  };

  const errorStyle = error ? { border: '1px solid red', boxShadow: '0 0 5px red' } : {};

  return (
    <div className={styles.container}>
      <form className={styles.content} onSubmit={handleSubmit}>
        <h1 className={styles.title}>
          Please <span className={styles.titleGreen}>Register</span> Your Account
        </h1>

        {error && <p style={{ color: 'red', margin: '0 0 10px 0', fontSize: '14px' }}>{error}</p>}

        <div className={styles.nameSurname}>
          <input 
            type="text"
            placeholder="Name" 
            className={styles.inputHalf}
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            style={errorStyle}
            required 
          />

          <input 
            type="text" 
            placeholder="Surname" 
            className={styles.inputHalf} 
            value={form.surname}
            onChange={(e) => handleChange('surname', e.target.value)}
            style={errorStyle}
            required
          />
        </div>
        
        <input 
          type="email" 
          placeholder="Email" 
          className={styles.inputFull} 
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          style={errorStyle}
          required
        />

        <input 
          type="text" 
          placeholder="Phone Number" 
          className={styles.inputFull}
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          style={errorStyle}
          required 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          className={styles.inputFull} 
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          style={errorStyle}
          required
        />
        
        <button className={styles.btnRegister}>
          Register
        </button>
        
        <p className={styles.loginText}>
          Already a member? <NavLink to="/" className={styles.linkLogin}>Login</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
