import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';

import Nav from "../../Components/nav/Nav";
import add from '../../assets/add.jpg';
import sortByImg from '../../assets/sort by.png';

import Modal from '../../Components/Modal/Modal';

import Search from '../../Components/Search/Search'; 

import { useAppDispatch, useAppSelector, type RootState } from '../../store'; 
import { 
  addCategoryThunk, 
  getCategoryThunk, 
  updateCategoryThunk, 
  deleteCategoryThunk, 
  shareCategoryThunk,
  type Category
} from '../../Redux/Reducers/CategorySlice'; 

import CategoryCard from '../../Components/Category/CategoryCard';
import { useNavigate, useLocation } from 'react-router-dom';


const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Redux state connections
  const { category: categories, isLoading, error } = useAppSelector((state) => state.category);
  let user = useAppSelector ((state: RootState) => state.auth.user);
 
   if (!user){
     user = JSON.parse(localStorage.getItem("User")!)
     console.log(user)
   }

  // --- Assessment URL Integration Engine ---
  const queryParams = new URLSearchParams(location.search);
  const urlSearchKeyword = queryParams.get('search') || '';
  const urlSortKeyword = queryParams.get('sort') || 'name'; 

  // Local state tied directly to active URL parameters
  const [searchInput, setSearchInput] = useState<string>(urlSearchKeyword);

  // Modal UI state controls
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [localCategoryName, setLocalCategoryName] = useState<string>('');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [activeShareCategory, setActiveShareCategory] = useState<Category | null>(null);
  const [shareEmail, setShareEmail] = useState<string>('');

  useEffect(() => {
    if (user?.id) {
       dispatch(getCategoryThunk(user.id));
    }   
  }, [dispatch, user?.id]);

  // Listen to address bar modifications to fulfill sync requirements [INDEX 0.1.2]
  useEffect(() => {
    setSearchInput(urlSearchKeyword);
  }, [urlSearchKeyword]);

  const updateURLParams = (searchVal: string, sortVal: string) => {
    const params = new URLSearchParams();
    if (searchVal) params.set('search', searchVal);
    if (sortVal) params.set('sort', sortVal);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    updateURLParams(val, urlSortKeyword);
  };

  const handleSortCycle = () => {
    const nextSort = urlSortKeyword === 'name' ? 'date' : 'name';
    updateURLParams(urlSearchKeyword, nextSort);
  };

  const processCategories = (): Category[] => {
    if (!categories) return [];

    let filtered = categories.filter(cat => 
      cat.name.toLowerCase().includes(urlSearchKeyword.toLowerCase())
    );

    filtered = [...filtered].sort((a, b) => {
      if (urlSortKeyword === 'date') {
        return a.id.localeCompare(b.id);
      }
      return a.name.localeCompare(b.name);
    });

    return filtered;
  };

  const processedCategories = processCategories();

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
        setShareEmail('');
        setIsShareModalOpen(false);
      });
  };

  const handleCloseMainModal = () => {
    setLocalCategoryName('');
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Nav />
      <div className={styles.helloContainer}>
        <div className={styles.helloUser}>
          <h3>Hello {user?.name}</h3>
          <p>Welcome To Your Shopping Pal.</p>
        </div>

        <div className={styles.storedAdd}>
          <img 
            src={add} 
            alt="add button" 
            className={styles.addIcon} 
            onClick={() => setIsModalOpen(true)}
          />
          
          <Search value={searchInput} onChange={handleSearchChange} />

          <div className={styles.sortIndicatorWrapper} onClick={handleSortCycle}>
            <img src={sortByImg} alt="sort by" className={styles.sortBy} />
            <span className={styles.sortTextLabel}>By: {urlSortKeyword}</span>
          </div>
        </div>

        <div className={styles.listsGridContainer} style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          {processedCategories.length === 0 ? (
            <p style={{ color: 'gray', textAlign: 'center', marginTop: '2rem' }}>No shopping lists match your search.</p>
          ) : (
            processedCategories.map((link) => (
              <CategoryCard 
                key={link.id} 
                category={link} 
                onClick={(action, categoryId) => {
                  if (action === 'view') {
                    navigateToCategoryItems(link.id, link.name);
                  } else if (action === 'edit') {
                    setEditingCategory(link);
                    setLocalCategoryName(link.name);
                    setIsModalOpen(true);
                  } else if (action === 'share') {
                    setActiveShareCategory(link);
                    setIsShareModalOpen(true);
                  } else if (action === 'delete') {
                    if (window.confirm(`Delete the entire list: "${link.name}"?`)) {
                      dispatch(deleteCategoryThunk(link.id));
                    }
                  }
                }} 
              />
            ))
          )}
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseMainModal}>
          <h3>{editingCategory ? `Rename List: ${editingCategory.name}` : 'Create New List'}</h3>
          <form onSubmit={handleAddOrUpdateCategory}>
            <input 
              type="text" 
              placeholder='Enter the name of Category' 
              className={styles.Category}
              value={localCategoryName}
              onChange={(e) => setLocalCategoryName(e.target.value)}
              disabled={isLoading}
              required
            />
            {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}
            <div className={styles.btns}>
              <button type="submit" className={styles.btnAdd} disabled={isLoading}>
                {isLoading ? 'Processing...' : editingCategory ? 'Save' : 'Add'}
              </button>
              <button type="button" className={styles.btnDelete} onClick={handleCloseMainModal}>Cancel</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)}>
          <h3>Collaborate on: {activeShareCategory?.name}</h3>
          <form onSubmit={handleShareSubmit}>
            <input 
              type="email" 
              placeholder="peer.profile@example.com" 
              className={styles.Category}
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
              required 
            />
            <div className={styles.btns} style={{ marginTop: '15px' }}>
              <button type="submit" className={styles.btnAdd}>Grant Access</button>
              <button type="button" className={styles.btnDelete} onClick={() => setIsShareModalOpen(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
