import styles from './Register.module.css';

import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store'

import { registerStart,registerSuccess, registerFailure, } from '../../Redux/Reducers/RegisterSlice';
import { useState} from 'react';

const Register = () => {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {isLoading, error} = useAppSelector((state) => state.register);

  const registerUser = async (e: React.FormEvent) =>{
    e.preventDefault();
    dispatch(registerStart());

    try {
      // Send a POST request to your local database
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          phone,
          password
        }),
      });

      if (!response.ok){
        throw new Error('Aku Registe(kanga). inkinga ikwi Server.');
      }

      const newUserProfile = await response.json();

      dispatch(registerSuccess(newUserProfile));

      navigate('/');
    }catch (err: unknown){
      if (err instanceof Error){
        dispatch(registerFailure(err.message))
      }else{
        dispatch(registerFailure('Bheka umsamu.'));
      }
    }
  };
    const errorStyle = error? {border: '1px solid red', boxShadow: '0 0 5px red'}: {};
  return (
    <div className={styles.container}>
      <form className={styles.content} onSubmit={registerUser}>
        <h1 className={styles.title}>
          Please <span className={styles.titleGreen}>Register</span> Your Account
        </h1>

         {error && <p style={{ color: 'red', margin: '0 0 10px 0', fontSize: '14px' }}>{error}</p>}

        <div className={styles.nameSurname}>
          <input type="text"
           placeholder="Name" 
           className={styles.inputHalf}
           value={name}
          onChange={(e) => setName(e.target.value)}
          style={errorStyle}
          required />

          <input type="text" 
          placeholder="Surname" 
          className={styles.inputHalf} 
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          style={errorStyle}
          required/>
        </div>
        
        <input type="email" 
        placeholder="Email" 
        className={styles.inputFull} 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={errorStyle}
        required/>

        <input type="text" 
        placeholder="Phone Number" 
        className={styles.inputFull}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={errorStyle}
        required />
        <input type="password" 
        placeholder="Password" 
        className={styles.inputFull} 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={errorStyle}
        required/>
        
        <button
        className={styles.btnRegister}
        disabled={isLoading}>
        {isLoading? 'Registering...': 'Register'}
        </button>
        
        <p className={styles.loginText}>
          Already a member? <NavLink to="/" className={styles.linkLogin}>Login</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
