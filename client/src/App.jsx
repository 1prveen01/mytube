
import './App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup.jsx'
import {Routes , Route} from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import Profile from './pages/dashboard/Profile.jsx'

function App() {

  return (
    <>

      <Routes>
        //root router
        <Route path= "/" element = {<h1 className='text-white text-2xl'>hello world home page</h1>} />
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
