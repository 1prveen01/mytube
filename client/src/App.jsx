
import './App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup.jsx'
import {Routes , Route} from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import Profile from './pages/dashboard/Profile.jsx'
import Home from './pages/home/Home.jsx'

function App() {

  return (
    <>

      <Routes>
        //root router
        <Route path= "/" element = {<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/dashboard/profile" element = {
            <Profile />
        } />
        
      </Routes>

    </>
  )
}

export default App
