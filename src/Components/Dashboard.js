import React, { useEffect, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { auth } from './../firebase'

import { UserContext } from '../Contexts/UserContext'

const Dashboard = () => {
  const { userInfo } = useContext(UserContext)
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('/')
  }, [user, loading, navigate])

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{userInfo.name}</div>
        <div>{userInfo.email}</div>
      </div>
    </div>
  )
}
export default Dashboard
