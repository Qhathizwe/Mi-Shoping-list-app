import styles from './Login.module.css'

const Login = () => {
  return (
    <div className={styles.LoginContainer}>
        <div className={styles.LoginContent}>
            <h1 className={styles.title}>Please <span className={styles.tGreen}>Login</span> Your Account</h1>
        </div>
        <div className={styles.email}>
            <input type="text" placeholder='Enter Your email' />
        </div>
         <div className={styles.password}>
            <input type="text" placeholder='Enter Your email' />
        </div>
        <button className={styles.btnLogin}>Login</button>
        <div className={styles.register}>
            <p>Don't have an account?</p>
        </div>
    </div>
  )
}
export default Login 