import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import profileImg from '../../assets/profile.avif';
import back from '../../assets/back.webp';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logOut } from '../../Redux/Reducers/LoginSlice'; 
import { fetchProfileData, updateProfileData, clearProfileStore } from '../../Redux/Reducers/ProfileSlice';
import { clearCategories } from '../../Redux/Reducers/CategorySlice';
import { clearItems } from '../../Redux/Reducers/CategoryItemsSlice';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const profileState = useAppSelector((state) => state.profile);
  const userSession = useAppSelector((state) => state.auth.user);

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cellNumber, setCellNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (userSession) {
      dispatch(fetchProfileData());
    }
  }, [dispatch, userSession]);

  useEffect(() => {
    setName(profileState.name);
    setSurname(profileState.surname);
    setEmail(profileState.email);
    setCellNumber(profileState.cellNumber);
    setPassword(profileState.password);
  }, [profileState]);

  const handleSaveOrEditToggle = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEditable) {
      setIsEditable(true);
      return;
    }

    dispatch(updateProfileData({
      name,
      surname,
      email,
      cellNumber,
      password
    }))
      .unwrap()
      .then(() => setIsEditable(false));
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logOut());
      dispatch(clearProfileStore());
      dispatch(clearCategories());
      dispatch(clearItems());
      navigate("/");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <form className={styles.profileContent} onSubmit={handleSaveOrEditToggle}>
        
        {/* UPDATED HEADER BAR: Back arrow on the left, profile title and avatar combined together */}
        <div className={styles.profileHeaderBar}>
          <img src={back} alt="back btn" onClick={() => navigate('/home')} className={styles.backButtonIcon} />
          
          <div className={styles.titleWithIcon}>
            <img src={profileImg} alt="profile avatar icon" className={styles.headerAvatarIcon} />
            <h2 className={styles.profileTitle}>Profile Details</h2>
          </div>
          
          <div className={styles.headerSpacer}></div> {/* Balances structural layout width metrics */}
        </div>
        
        <div className={styles.profileInputs}>
          <div className={styles.nameSurname}>
            <input 
              type="text" 
              placeholder="Name" 
              className={styles.inputHalf} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditable || profileState.isLoading}
              required
            />
            <input 
              type="text" 
              placeholder="Surname" 
              className={styles.inputHalf} 
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              disabled={!isEditable || profileState.isLoading}
              required
            />
          </div>
          
          <input 
            type="email" 
            placeholder="Email" 
            className={styles.inputFull} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditable || profileState.isLoading}
            required
          />
          <input 
            type="text" 
            placeholder="Phone Number" 
            className={styles.inputFull} 
            value={cellNumber}
            onChange={(e) => setCellNumber(e.target.value)}
            disabled={!isEditable || profileState.isLoading}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className={styles.inputFull} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isEditable || profileState.isLoading}
            required
          />
        </div>
        
        <div className={styles.buttons}>
          <button type="submit" className={isEditable ? styles.btnSaveActive : styles.btnEdit} disabled={profileState.isLoading}>
            {profileState.isLoading ? 'Processing...' : isEditable ? 'Save Details' : 'Edit Profile'}
          </button>
          <button type="button" className={styles.btnLogOut} onClick={logout} disabled={profileState.isLoading}>Log Out</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
