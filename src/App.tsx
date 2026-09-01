import { useState } from 'react' // 1. Import useState
import { Route, Routes } from 'react-router-dom'
import './App.css'

import LoginPage from './Pages/Login Page/LoginPage'
import Register from './Pages/register page/RegisterPage'
import Home from './Pages/Home.1/Home'
import Profile from './Pages/Profile/Profile'
import CategoryItems from './Pages/CategoryItems/CategoryItems'
import LandingPage from './Pages/Landing Page/LandingPage'

import { ProtectedRoutes } from './Components/Protected Routes/ProtectedRoutes'

function App() {
  // 2. Track real login state (change to true when user successfully logs in)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false) 

  return (
    <>
      <Routes>
        {/* 🔓 Public Routes */} 
        <Route path='/' element={<LandingPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/register' element={<Register />} />

        {/* 🔒 Protected Routes */}
        <Route element={<ProtectedRoutes isAuthenticated={isLoggedIn} />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/categoryItems' element={<CategoryItems />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
