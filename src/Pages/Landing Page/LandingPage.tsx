import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'
import Logo from '../../Components/Logo/Logo'
import ShopingPicture from '../../assets/shoping picture.png'

const LandingPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Logo />
          <Link to="/register" className={styles.navButton}>
            Sign Up
          </Link>
        </nav>

        
        <main className={styles.heroSection}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Smart shopping, <span className={styles.highlight}>made simple.</span>
            </h1>
            <p className={styles.description}>
              Never forget an item again. Create, organize, and share your grocery 
              lists effortlessly. Track your budget in real-time and streamline 
              your shopping trips.
            </p>
            <Link to="/login" className={styles.ctaButton}>
              Get Started Free
            </Link>
          </div>

          <div className={styles.imageContainer}>
            <img 
              src={ShopingPicture} 
              alt="Person organized shopping with a list" 
              className={styles.heroImage} 
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default LandingPage
