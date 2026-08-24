import React from 'react';
import styles from './Register.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
<<<<<<< HEAD
import { updateFormField, registerUserThunk, resetRegisterState } from '../../Redux/Reducers/RegisterSlice';

const Register = () => {
  const navigate = useNavigate();
=======
import { useState, useEffect } from 'react';
import { registerUserThunk, resetRegisterState, type RegisteredUserForm } from '../../Redux/Reducers/RegisterSlice';

export const Register: React.FC = () => {
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Note: Ensure your store root state uses the exact name (e.g., state.register or state.auth)
  const { isLoading, error, isSuccess, user } = useAppSelector((state) => state.register); 

<<<<<<< HEAD
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
=======
  const [formData, setFormData] = useState<RegisteredUserForm>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
  });

  // Handle side effects like success alerts and cleanup inside useEffect
  useEffect(() => {
    if (isSuccess && user) {
       alert(`Registered Successfully! Welcome ${user.name}`);
     
      dispatch(resetRegisterState());
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
    }
  }, [isSuccess, user, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

<<<<<<< HEAD
  const errorStyle = error ? { border: '1px solid red', boxShadow: '0 0 5px red' } : {};
=======
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk(formData));
    

    navigate('/');
  };

  const errorStyle = error ? { border: '1px solid red', boxHex: '0 0 5px red' } : {};
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2

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
<<<<<<< HEAD
            placeholder="Name" 
            className={styles.inputHalf}
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
=======
            name="name"
            placeholder="Name" 
            className={styles.inputHalf}
            value={formData.name}
            onChange={handleChange}
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
            style={errorStyle}
            required 
          />

          <input 
            type="text" 
<<<<<<< HEAD
            placeholder="Surname" 
            className={styles.inputHalf} 
            value={form.surname}
            onChange={(e) => handleChange('surname', e.target.value)}
=======
            name="surname"
            placeholder="Surname" 
            className={styles.inputHalf} 
            value={formData.surname}
            onChange={handleChange}
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
            style={errorStyle}
            required
          />
        </div>
        
        <input 
          type="email" 
<<<<<<< HEAD
          placeholder="Email" 
          className={styles.inputFull} 
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
=======
          name="email"
          placeholder="Email" 
          className={styles.inputFull} 
          value={formData.email}
          onChange={handleChange}
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
          style={errorStyle}
          required
        />

        <input 
          type="text" 
<<<<<<< HEAD
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
=======
          name="phone"
          placeholder="Phone Number" 
          className={styles.inputFull}
          value={formData.phone}
          onChange={handleChange}
          style={errorStyle}
          required 
        />
        
        <input 
          type="password" 
          name="password"
          placeholder="Password" 
          className={styles.inputFull} 
          value={formData.password}
          onChange={handleChange}
          style={errorStyle}
          required
        />
        
        <button
          type="submit"
          className={styles.btnRegister}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
>>>>>>> 91353dc2bced69ebb93ee203eefa815737d9a4a2
        </button>
        
        <p className={styles.loginText}>
          Already a member? <NavLink to="/" className={styles.linkLogin}>Login</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
