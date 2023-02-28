import React, { useEffect, useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { auth } from './../firebase'

import { TaskListsContext } from '../Contexts/TaskListsContext'
import { Grid } from '@mui/material'
import Container from '@mui/material/Container'
import NewTaskListModal from './NewTaskListModal'

const Dashboard = () => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [taskLists, setTaskLists] = useState([])

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('/')
  }, [user, loading, navigate])

  return (
    <div className="dashboard">
      <TaskListsContext.Provider value={{ taskLists, setTaskLists }}>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {taskLists && taskLists.length ? (
                taskLists.map((taskList, index) => (
                  <div key={index}>{taskList.name}</div>
                ))
              ) : (
                <span>no lists</span>
              )}
              <NewTaskListModal />
            </Grid>
            <Grid item xs={8}>
              list task items
            </Grid>
          </Grid>
        </Container>
      </TaskListsContext.Provider>
    </div>
  )
}
export default Dashboard
