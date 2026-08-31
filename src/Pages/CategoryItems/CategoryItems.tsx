import React, { useEffect, useState } from 'react';
import styles from './CategoryItems.module.css';
import CategoryItemCard from '../../Components/Catergory-Item/CategoryItemCard';
import Search from '../../Components/Search/Search'; // Imported custom search component

import { useAppSelector, useAppDispatch } from '../../store';
import { useNavigate, useLocation } from 'react-router-dom';

import Back from '../../assets/back.webp';
import Add from '../../assets/add.jpg';
import sortByImg from '../../assets/sort by.png';
import Modal from '../../Components/Modal/Modal';

import { 
  getCategoryItemThunk, 
  addCategoryItemThunk, 
  updateCategoryItemThunk,
  updateItemFormField, 
  resetItemForm,
  type ListItem
} from '../../Redux/Reducers/CategoryItemsSlice';

const CategoryItems: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { categoryId, categoryName } = (location.state as { categoryId?: string; categoryName?: string }) || {};

  const user = useAppSelector((state) => state.auth.user);
  const { listItem: items, form, editingItem, isLoading, error } = useAppSelector((state) => state.categoryItemsSlice);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // --- Assessment URL Parameter Integration Logic ---
  const queryParams = new URLSearchParams(location.search);
  const urlSearchKeyword = queryParams.get('search') || '';
  const urlSortKeyword = queryParams.get('sort') || 'name'; 

  const [searchInput, setSearchInput] = useState<string>(urlSearchKeyword);

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryItemThunk({ categoryId }));
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    setSearchInput(urlSearchKeyword);
  }, [urlSearchKeyword]);

  const updateURLParams = (searchVal: string, sortVal: string) => {
    const params = new URLSearchParams();
    if (searchVal) params.set('search', searchVal);
    if (sortVal) params.set('sort', sortVal);
    navigate(`${location.pathname}?${params.toString()}`, { state: location.state, replace: true });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    updateURLParams(val, urlSortKeyword);
  };

  const handleSortCycle = () => {
    let nextSort = 'name';
    if (urlSortKeyword === 'name') nextSort = 'category';
    else if (urlSortKeyword === 'category') nextSort = 'date';
    updateURLParams(urlSearchKeyword, nextSort);
  };

  // --- Filtering and Sorting Engine ---
  const processItems = (): ListItem[] => {
    if (!items) return [];

    let processed = items.filter(item => 
      item.name.toLowerCase().includes(urlSearchKeyword.toLowerCase())
    );

    processed = [...processed].sort((a, b) => {
      if (urlSortKeyword === 'category') {
        const catA = categoryName || '';
        const catB = categoryName || '';
        return catA.localeCompare(catB);
      }
      if (urlSortKeyword === 'date') {
        return a.id.localeCompare(b.id);
      }
      return a.name.localeCompare(b.name);
    });

    return processed;
  };

  const displayedItems = processItems();
  const totalItemsCount = displayedItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleFieldChange = (field: 'name' | 'quantity' | 'notes' | 'picture', value: any) => {
    dispatch(updateItemFormField({ field, value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleFieldChange('picture', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.quantity <= 0 || !user?.id || !categoryId) return;

    if (editingItem) {
      dispatch(updateCategoryItemThunk({
        ...editingItem,
        name: form.name,
        quantity: form.quantity,
        notes: form.notes,
        picture: form.picture,
      }))
        .unwrap()
        .then(() => setIsModalOpen(false));
    } else {
      dispatch(addCategoryItemThunk({
        name: form.name,
        quantity: form.quantity,
        notes: form.notes || "",
        picture: form.picture || "", 
        categoryId: categoryId,
        userId: user.id
      }))
        .unwrap()
        .then(() => setIsModalOpen(false));
    }
  };

  const handleCloseModal = () => {
    dispatch(resetItemForm());
    setIsModalOpen(false);
  };

  return (
    <div className={styles.CategoryItemsContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={Back} className={styles.back} onClick={() => navigate('/home')} alt="Back" />
          <h1 className={styles.categoryName}>{categoryName || 'List Items'}</h1>
        </div>
        <div className={styles.headerInfo}>
          <span className={styles.countBadge}>{totalItemsCount} Total Items</span>
        </div>
      </div>
      
      <div className={styles.addSearchSort}>
        <img src={Add} className={styles.Add} onClick={() => setIsModalOpen(true)} alt="Add" />
        

        <Search value={searchInput} onChange={handleSearchInputChange} />

        <div className={styles.sortWrapper} onClick={handleSortCycle}>
          <img src={sortByImg} className={styles.sortBy} alt="Sort" />
          <span className={styles.sortIndicator}>Sort: {urlSortKeyword}</span>
        </div>
      </div>

      <div>
        {displayedItems.length === 0 ? (
          <p style={{ color: 'gray', textAlign: 'center', marginTop: '2rem' }}>No items match your criteria options.</p>
        ) : (
          displayedItems.map((item) => (
            <CategoryItemCard 
              key={item.id} 
              categoryItems={item} 
              onOpenModal={() => setIsModalOpen(true)} 
            />
          ))
        )}
      </div>

      {/* Modal configurations remain intact here... */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3>{editingItem ? 'Edit Item Details' : 'Add New Item'}</h3>
        <form onSubmit={handleAddItemSubmit}>
          <input 
            type="text" 
            placeholder="Enter Item Name"
            className={styles.categoryItemName}
            value={form.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            required
          />
          <input 
            type="number"
            min="1"
            className={styles.categoryItemNumber}
            value={form.quantity}
            onChange={(e) => handleFieldChange('quantity', Number(e.target.value))}
            required
          />
          <textarea 
            placeholder="Optional Notes"
            className={styles.categoryItemNotes}
            value={form.notes}
            onChange={(e) => handleFieldChange('notes', e.target.value)}
          ></textarea>

          <div className={styles.categoryItemAddImage}>
            <label>Item Image Reference (Optional):</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className={styles.btns}>
            <button type="submit" className={styles.btnAdd} disabled={isLoading}>
              {isLoading ? 'Processing...' : editingItem ? 'Save Changes' : 'Add'}
            </button>
            <button type="button" className={styles.btnDelete} onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoryItems;
