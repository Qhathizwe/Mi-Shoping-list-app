import styles from './Profile.module.css'
import profile from '../../assets/profile.avif'


const Profile = () => {

  return (
    <div className={styles.profileContainer}>
         <div className={styles.profile}>
            <h3 className={styles.profileTitle}>Profile</h3>
            <img src={profile} alt="profile"  />
         </div>
         <div className={styles.profileInputs}>
        <div className={styles.nameSurname}>
          <input type="text" placeholder="Name" className={styles.inputHalf} />
          <input type="text" placeholder="Surname" className={styles.inputHalf} />
        </div>
        
        <input type="email" placeholder="Email" className={styles.inputFull} />
        <input type="text" placeholder="Phone Number" className={styles.inputFull} />
        <input type="password" placeholder="Password" className={styles.inputFull} />
         </div>

         <div className={styles.buttons}>
            <button className={styles.btnEdit}>Edit</button>
            <button className={styles.btnLogOut}>LogOut</button> 
         </div>
    </div>
  )
}

export default Profile;