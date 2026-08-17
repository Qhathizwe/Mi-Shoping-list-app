import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path='register' element={<Register />}/>
      </Routes>
    </>
  )
}

export default App
