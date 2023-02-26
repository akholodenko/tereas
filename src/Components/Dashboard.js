import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { auth, logout } from './../firebase'
import { fetchUserBasicInfo } from './../Models/User'

const Dashboard = () => {
  const [user, loading] = useAuthState(auth)
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('/')

    if (user?.uid) {
      fetchUserBasicInfo(user.uid).then(data => {
        setName(data.name)
      })
    }
  }, [user, loading, navigate])

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}
export default Dashboard
