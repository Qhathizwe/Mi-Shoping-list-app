import styles from './Profile.module.css';
import profile from '../../assets/profile.avif';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store'; // 1. Import your custom dispatch hook
import { logOut } from '../../Redux/Reducers/LoginSlice'; 
import back from '../../assets/back.webp'

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 

  const logout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <div className={styles.profile}>
          <img src={back} alt="back btn" />
          <img src={profile} alt="profile" />
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
          <button className={styles.btnLogOut} onClick={logout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
