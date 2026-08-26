import React from 'react';
import styles from './CategoryItems.module.css'
import {type CategoryItems } from '../../Redux/Reducers/CategoryItemsSlice';

interface CategoryItemsProp{
    categoryItems: CategoryItems;
    id?: string; 
}

const CategoryItemCard: React.FC<CategoryItemsProp> = ({categoryItems}) => {

  return (
    <div>
      <h2>{categoryItems.name}</h2>
       <input type="number"  />{categoryItems.quantity}
      <h4>{categoryItems.notes}</h4>
      
       <button className={styles.btnEdit} >Edit</button>
       <button className={styles.btnDelete} >Delete</button>
    </div>
  )
}

export default CategoryItemCard;
