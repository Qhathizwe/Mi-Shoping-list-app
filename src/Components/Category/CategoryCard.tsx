import React from 'react';
import styles from './CategoryCard.module.css';
import type { Category } from '../../Redux/Reducers/CategorySlice';
import { useAppSelector } from '../../store';

interface CategoryCardProps {
  category: Category;
  onClick: (action: 'view' | 'share' | 'edit' | 'delete', categoryId: string) => void; 
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  // Assessment sub-item counter logic
  const allSavedItems = useAppSelector((state) => state.categoryItemsSlice.listItem);
  const categorySpecificItems = allSavedItems.filter(item => item.categoryId === category.id);
  const totalCountUnits = categorySpecificItems.reduce((acc, curr) => acc + curr.quantity, 0);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick('view', category.id);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, action: 'share' | 'edit' | 'delete') => {
    e.stopPropagation(); // Explicit event bubble stop blocks view interception clicks
    onClick(action, category.id);
  };

  return (
    <div 
      className={styles.card}
      onClick={() => onClick('view', category.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div>
        <h4 className={styles.cardTitle}>{category.name}</h4>
        <div style={{ color: '#06df06', fontSize: '0.85rem', marginTop: '4px', fontWeight: 'bold' }}>
          {totalCountUnits} Products Listed
        </div>
      </div>
      
      <div className={styles.btns}>
        <button className={styles.btnShare} onClick={(e) => handleButtonClick(e, 'share')}>Share</button>
        <button className={styles.btnEdit} onClick={(e) => handleButtonClick(e, 'edit')}>Edit</button>
        <button className={styles.btnDelete} onClick={(e) => handleButtonClick(e, 'delete')}>Delete</button>
      </div>
    </div>
  );
};

export default CategoryCard;
 