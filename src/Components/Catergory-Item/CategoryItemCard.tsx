import React from 'react';
import styles from './CategoryItems.module.css';
import { type ListItem, deleteCategoryItemThunk, setEditingItem } from '../../Redux/Reducers/CategoryItemsSlice';
import { useAppDispatch } from '../../store';

interface CategoryItemsProp {
  categoryItems: ListItem;
  onOpenModal: () => void; 
}

const CategoryItemCard: React.FC<CategoryItemsProp> = ({ categoryItems, onOpenModal }) => {
  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    dispatch(setEditingItem(categoryItems)); // Hydrate form variables into global state
    onOpenModal();
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete ${categoryItems.name}?`)) {
      dispatch(deleteCategoryItemThunk(categoryItems.id));
    }
  };

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemCardLeft}>
        {categoryItems.picture && (
          <div className={styles.imageWrapper}>
            <img src={categoryItems.picture} alt={categoryItems.name} className={styles.itemImage} />
          </div>
        )}
        <div className={styles.itemDetails}>
          <h2 className={styles.itemName}>{categoryItems.name}</h2>
          <span className={styles.itemQuantity}>Qty: {categoryItems.quantity}</span>
          {categoryItems.notes && <p className={styles.itemNotes}>{categoryItems.notes}</p>}
        </div>
      </div>
      
      <div className={styles.itemActions}>
        <button className={styles.btnCardEdit} onClick={handleEditClick}>Edit</button>
        <button className={styles.btnCardDelete} onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default CategoryItemCard;
