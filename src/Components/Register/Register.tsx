import styles from './Register.module.css';
import { NavLink } from 'react-router-dom';

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Please <span className={styles.titleGreen}>Register</span> Your Account
        </h1>
        
        <div className={styles.nameSurname}>
          <input type="text" placeholder="Name" className={styles.inputHalf} />
          <input type="text" placeholder="Surname" className={styles.inputHalf} />
        </div>
        
        <input type="email" placeholder="Email" className={styles.inputFull} />
        <input type="text" placeholder="Phone Number" className={styles.inputFull} />
        <input type="password" placeholder="Password" className={styles.inputFull} />
        
        <button className={styles.btnRegister}>Register</button>
        
        <p className={styles.loginText}>
          Already a member? <NavLink to="/" className={styles.linkLogin}>Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
