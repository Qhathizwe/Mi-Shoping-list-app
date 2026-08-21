import styles from './Register.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { useState, useEffect } from 'react';
import { registerUserThunk, resetRegisterState, type RegisteredUserForm } from '../../Redux/Reducers/RegisterSlice';

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Note: Ensure your store root state uses the exact name (e.g., state.register or state.auth)
  const { isLoading, error, isSuccess, user } = useAppSelector((state) => state.register); 

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
    }
  }, [isSuccess, user, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk(formData));
    

    navigate('/');
  };

  const errorStyle = error ? { border: '1px solid red', boxHex: '0 0 5px red' } : {};

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
            name="name"
            placeholder="Name" 
            className={styles.inputHalf}
            value={formData.name}
            onChange={handleChange}
            style={errorStyle}
            required 
          />

          <input 
            type="text" 
            name="surname"
            placeholder="Surname" 
            className={styles.inputHalf} 
            value={formData.surname}
            onChange={handleChange}
            style={errorStyle}
            required
          />
        </div>
        
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          className={styles.inputFull} 
          value={formData.email}
          onChange={handleChange}
          style={errorStyle}
          required
        />

        <input 
          type="text" 
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
        </button>
        
        <p className={styles.loginText}>
          Already a member? <NavLink to="/" className={styles.linkLogin}>Login</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
