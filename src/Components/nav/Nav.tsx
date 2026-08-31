import Logo from "../Logo/Logo"

import styles from './Nav.module.css'
import Profile from '../../assets/profile.avif'
import { useNavigate } from 'react-router-dom'

const Nav = () => {

  const navigate = useNavigate();
  const navigateToProfile = () =>{
        navigate ("/profile")
    }
  return (
    <div className={styles.navContainer}>
     <div className={styles.navContent}>
         < Logo />
         
         <div className={styles.profile}>
            <img src={Profile} alt="profile" onClick={navigateToProfile} />
         </div>
     </div>
    </div>
  )
}

export default Nav
