import { useState } from 'react'
import {BrowserRouter as Router,Navigate, Route,Routes} from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import Signup from './pages/signup'
import Login from './pages/login'
import Home from './pages/home'
import RefrshHandler from './RefrshHandler'
function App() {
  const [IsAuthenticated, setIsAuthenticated] = useState(false)
  const PrivateRoute=({element})=>{
    return IsAuthenticated?element:<Navigate to="/login"/>
  }

  return (
     
    <Router>
    <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
    <Route path="/" element={<Login />}/> 
    <Route path="/signup" element={<Signup />}/> 
    <Route path="/login" element={<Login />}/>
    <Route path="/home" element={<PrivateRoute element={<Home/>}/>}/>
    </Routes>
    </Router>
  )
}

export default App
