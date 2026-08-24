import styles from './Home.module.css'
import Nav from "../../Components/nav/Nav"

import add from '../../assets/add.jpg'
import sortBy from '../../assets/sort by.png'

import Modal from '../../Components/Modal/Modal'
import { useState } from 'react'


const Home = () => {

const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  return (
    <div>
      < Nav />
      <div className={styles.helloContainer}>
        <div className={styles.helloUser}>
          <h3>Hello User</h3>
          <p>Welcome To Your Shopping Pal.</p>
        </div>

        <div className={styles.storedAdd}>
          <img src={add} alt="add button" className={styles.addIcon} onClick={() => setIsModalOpen(true)}/>
          <h3> Stored Lists</h3>
          <img src={sortBy} alt="sort by" className={styles.sortBy} />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <input 
          type="text" 
          placeholder='Enter the name of Category' 
          className={styles.Category} />

          <div className={styles.btns}>
            <button className={styles.btnAdd}>Add</button>
            <button className={styles.btnDelete}>Delete</button>
          </div>

        </Modal>
      </div>
   </div>
  )
}

export default Home
