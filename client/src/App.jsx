import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup.jsx'
import {Routes , Route} from "react-router-dom"

function App() {

  return (
    <>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  )
}

export default App
