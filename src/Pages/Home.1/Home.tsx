// Home.tsx
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Nav from "../../Components/nav/Nav";
import add from '../../assets/add.jpg';
import sortBy from '../../assets/sort by.png';
import Modal from '../../Components/Modal/Modal';

import { useAppDispatch, useAppSelector } from '../../store'; 
import { addCategoryThunk, getCategoryThunk } from '../../Redux/Reducers/CategorySlice'; 
import CategoryCard from '../../Components/Category/CategoryCard';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';



const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.category);
  
  const user = useAppSelector((state) => state.auth.user); 

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');

  const categoryLists = useSelector ((state: RootState) => state.category);
  

  //fetchin all the data 
  useEffect(() =>{dispatch(getCategoryThunk());
    }, []);

  const navigateToCategoryItems = (id: string, name: string) => {
    navigate('/categoryItems', { state: { categoryId: id, categoryName: name } });
  };

  const handleAddOrUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localCategoryName.trim() || !user?.id) return;

    if (editingCategory) {
      dispatch(updateCategoryThunk({ id: editingCategory.id, name: localCategoryName }))
        .unwrap()
        .then(() => handleCloseMainModal());
    } else {
      dispatch(addCategoryThunk({ name: localCategoryName, userId: user.id }))
        .unwrap()
        .then(() => handleCloseMainModal());
    }
  };

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareEmail.trim() || !activeShareCategory) return;

    dispatch(shareCategoryThunk({ category: activeShareCategory, targetEmail: shareEmail }))
      .unwrap()
      .then(() => {
        setCategoryName(''); 
        setIsModalOpen(false); 
      })
      .catch((err) => {
        console.error('Failed to add category:', err);
      });
  };
  return (
    <div>
      <Nav />
      <div className={styles.helloContainer}>
        <div className={styles.helloUser}>
          <h3>Hello User</h3>
          <p>Welcome To Your Shopping Pal.</p>
        </div>

        <div className={styles.storedAdd}>
          <img 
            src={add} 
            alt="add button" 
            className={styles.addIcon} 
            onClick={() => setIsModalOpen(true)}
          />
          <h3> Stored Lists</h3>
          <img src={sortBy} alt="sort by" className={styles.sortBy} />
        
        </div>
          <div>
           {categoryLists.category.map ((link) =>(
              <CategoryCard key={link.id} category={link} onClick={navigateToCategoryItems} />
            ))}
          </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <input 
            type="text" 
            placeholder='Enter the name of Category' 
            className={styles.Category}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            disabled={isLoading}
          />

          {error && <p style={{ color: 'red', fontSize: '0.85rem', margin: '0.5rem 0' }}>{error}</p>}

          <div className={styles.btns}>
            <button 
              className={styles.btnAdd} 
              onClick={handleAddCategory}
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add'}
            </button>
            <button 
              className={styles.btnDelete} 
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
   </div>
  );
};

export default Home;
