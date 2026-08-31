import { Route, Routes } from 'react-router-dom'
import './App.css'

import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Home from './Pages/Home.1/Home'
import  Profile  from './Pages/Profile/Profile'
import CategoryItems from './Pages/CategoryItems/CategoryItems'

import LandingPage from './Pages/Landing Page/LandingPage'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={< LandingPage />}/>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/categoryItems' element={<CategoryItems />} />
      </Routes>
    </>
  )
}

export default App
