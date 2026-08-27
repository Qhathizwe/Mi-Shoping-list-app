import styles from './CategoryItems.module.css'
import CategoryItemCard from '../../Components/Catergory-Item/CategoryItemCard'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'



const CategoryItems = () => {
  const categoryItems = useSelector((state: RootState) => state.categoryItemsSlice)
  return (
    <div className={styles.CategoryItemsContainer}>
{
categoryItems.categoryItems.map ((categoryItem) =>(
    <CategoryItemCard key={categoryItem.id} categoryItems={categoryItem} />
    ))
}
    </div>
  )
}

export default CategoryItems
