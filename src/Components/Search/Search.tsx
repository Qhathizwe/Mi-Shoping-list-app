import React from 'react';
import styles from './Search.module.css';

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchContent}>
        <input 
          type="text" 
          placeholder='Search items by name...' 
          className={styles.searchInput} 
          value={value}
          onChange={onChange}
        />
        <button type="button" className={styles.btnSearch}>Search</button>
      </div>
    </div>
  );
};

export default Search;
