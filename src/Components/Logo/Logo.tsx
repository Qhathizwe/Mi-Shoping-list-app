import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.LogoContainer}>
      <h1 className={styles.logoText}>
        LIST<span className={styles.logoSpan}>-PAL</span>
      </h1>
    </div>
  );
};

export default Logo;
