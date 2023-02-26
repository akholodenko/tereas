import './App.css'

import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Reset from './Components/Reset'
import Dashboard from './Components/Dashboard'
import NavBar from './Components/AppBar'

import { useAuthState } from 'react-firebase-hooks/auth'
import { UserContext } from './Contexts/UserContext'
import { auth } from './firebase'
import { fetchUserBasicInfo } from './Models/User'

function App() {
  const [user, loading] = useAuthState(auth)
  const [userInfo, setUserInfo] = useState('')

  useEffect(() => {
    if (loading) return

    if (user?.uid) {
      fetchUserBasicInfo(user.uid).then((data) => {
        setUserInfo(data)
      })
    }
  }, [user, loading])

  return (
    <div className="App">
      <UserContext.Provider value={userInfo}>
        <NavBar></NavBar>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App
