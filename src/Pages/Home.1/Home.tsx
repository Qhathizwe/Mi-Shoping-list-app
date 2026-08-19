import styles from './Home.module.css'
import Nav from "../../Components/nav/Nav"


const Home = () => {
  return (
    <div>
      < Nav />
      <div className={styles.helloContainer}>
        <div className={styles.helloUser}>
          <h3>Hello User</h3>
          <p>Welcome To Your Shopping Pal.</p>
        </div>
      </div>
   </div>
  )
}

export default Home
