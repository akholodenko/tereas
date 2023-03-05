import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { auth } from './../firebase'

import { TaskListsContext } from '../Contexts/TaskListsContext'
import { Grid } from '@mui/material'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

import NewTaskListModal from './NewTaskListModal'
import Tasks from './Tasks'
import TasksLists from './TaskLists'
import { fetchUserTasklists, fetchTasklistTasks } from '../Models/Tasklist'

const Dashboard = () => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [taskLists, setTaskLists] = useState([])
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false)

  const [selectedTaskListIndex, setSelectedTaskListIndex] = useState(0)

  const handleSelectedTaskListChange = (event, newValue) => {
    setSelectedTaskListIndex(newValue)
  }

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('/')
    else {
      fetchUserTasklists(user.uid).then(data => {
        setTaskLists(data)
      })
    }
  }, [user, loading, navigate])

  useEffect(() => {
    if (taskLists.length) {
      console.log(
        'fetch tasks for tasklist',
        selectedTaskListIndex,
        selectedTaskList()?.id
      )

      fetchTasklistTasks(selectedTaskList().id).then(data => {
        console.log('fetchTasklistTasks', data)
      })
    }
  }, [selectedTaskListIndex, taskLists])

  const onNewTaskModalOpen = () => {
    setIsNewTaskModalOpen(true)
  }

  const onNewTaskModalClosed = () => {
    setIsNewTaskModalOpen(false)
    if (taskLists && taskLists.length) {
      setSelectedTaskListIndex(taskLists.length)
    }
  }

  const selectedTaskList = () =>
    taskLists && taskLists.length ? taskLists[selectedTaskListIndex] : null

  return (
    <div className="dashboard">
      <TaskListsContext.Provider value={{ taskLists, setTaskLists }}>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {taskLists && taskLists.length ? (
                <TasksLists
                  taskLists={taskLists}
                  selectedTaskListIndex={selectedTaskListIndex}
                  handleSelectedTaskListChange={handleSelectedTaskListChange}
                />
              ) : (
                <span></span>
              )}

              <Button variant="contained" onClick={onNewTaskModalOpen}>
                Create new list
              </Button>
              <NewTaskListModal
                isOpen={isNewTaskModalOpen}
                onNewTaskModalClosed={onNewTaskModalClosed}
              />
            </Grid>
            <Grid item xs={8}>
              <Tasks selectedTaskListIndex={selectedTaskListIndex} />
            </Grid>
          </Grid>
        </Container>
      </TaskListsContext.Provider>
    </div>
  )
}
export default Dashboard
