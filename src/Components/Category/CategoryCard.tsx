import React from 'react';
import styles from './CategoryCard.module.css';
import type { Category } from '../../Redux/Reducers/CategorySlice';

interface CategoryCardProps {
  category: Category;
  // Changed onClick to pass the specific action or category ID back to the parent
  onClick: (action: 'view' | 'share' | 'edit' | 'delete', categoryId: string) => void; 
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  
  // Handles accessibility keyboard presses (Enter or Space) on the card
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick('view', category.id);
    }
  };

  // Handles individual button clicks cleanly
  const handleButtonClick = (e: React.MouseEvent, action: 'share' | 'edit' | 'delete') => {
    e.stopPropagation(); // Stops the main card's onClick from triggering
    onClick(action, category.id);
  };

  return (
    <div 
      className={styles.card}
      onClick={() => onClick('view', category.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      style={{
        padding: '20px',
        border: '1px solid green',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px #008000',
        marginBottom: '10px' 
      }}
    >
      <h4>{category.name}</h4>
      <div className={styles.btns}>
        <button className={styles.btnShare} onClick={(e) => handleButtonClick(e, 'share')}>Share</button>
        <button className={styles.btnEdit} onClick={(e) => handleButtonClick(e, 'edit')}>Edit</button>
        <button className={styles.btnDelete} onClick={(e) => handleButtonClick(e, 'delete')}>Delete</button>
      </div>
    </div>
  );
};

export default CategoryCard;
