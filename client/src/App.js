import './App.css';
import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard/Dasboard'
import Landing from './components/Landing';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  const isAuth = async() => {
      try {
        const response = await fetch('http://localhost:3002/auth/is-verify',{
          method:'GET',
          headers:{token:localStorage.token}
        })

        const parseRes = await response.json()

        parseRes === true? setIsAuthenticated(true) : setIsAuthenticated(false)


      } catch (error) {
        console.error(error.message)
      }

  
  }
  useEffect(() => {
    isAuth()
  })
  return (
    <>
    <Router>
      <div className = "container">
        <Routes>
        <Route exact path="/" element={!isAuthenticated ? <Landing/> : <Navigate to='/dashboard'/>}/>
        <Route exact path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to='/dashboard'/>}/>
        <Route exact path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to='/dashboard'/>}/>
        <Route exact path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to='/login'/>}/>
        </Routes>
      </div>
    </Router>
  </>
  );
}

export default App;
