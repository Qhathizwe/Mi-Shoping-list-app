
import styles from './Register.module.css'
import { Button } from '../Button/Button'
import { NavLink } from 'react-router-dom'


const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>

        <div className={styles.nameSurname}>
            <input type="text" className={styles.name} placeholder='Name'/>
            <input type="text" className={styles.surname} placeholder='Surname'/>
        </div>

            <div>
                <input type="email" className={styles.email} placeholder='Email'/>
                <input type="text" className={styles.Phone} placeholder='Phone Number'/>
                <input type="password" className={styles.password} placeholder='Password'/>
            </div>
            <button className={styles.btnRegister}>Register</button>


            <p>Already a member? <NavLink to='/' className={styles.linkLogin} >
            Login</NavLink>
            </p>
      </div>
    </div>
  )
}

export default Register
