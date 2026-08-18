import styles from './Login.module.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const LoginToHome = () =>{
    navigate ("home")
  }

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.LoginContent}>
        <h1 className={styles.title}>
          Please <span className={styles.tGreen}>Login</span> Your Account
        </h1>
        
        <input type="email" placeholder="Enter Your email" className={styles.loginInput} />
        <input type="password" placeholder="Enter Your Password" className={styles.loginInput} />
        
        <button className={styles.btnLogin} onClick={LoginToHome}>Login</button>
        
        <p className={styles.registerText}>
          Don't have an account?{' '}
          <NavLink to="/register" className={styles.Linkregister}>
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
