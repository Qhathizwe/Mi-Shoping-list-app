import Logo from "../Logo/Logo"
import Search from "../Search/Search"
import styles from './Nav.module.css'
import Profile from '../../assets/profile.avif'

const Nav = () => {
  return (
    <div className={styles.navContainer}>
     <div className={styles.navContent}>
         < Logo />
         < Search />
         <div className={styles.profile}>
            <img src={Profile} alt="profile" />
         </div>
     </div>
    </div>
  )
}

export default Nav
