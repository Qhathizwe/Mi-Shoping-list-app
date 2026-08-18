import styles from './Search.module.css'

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchContent}>
      <input type="text" placeholder='Search here' className={styles.searchInput} />
      <button className={styles.btnSearch}>Search</button>
      </div>
    </div>
  )
}

export default Search
