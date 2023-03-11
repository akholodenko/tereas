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
import {
  fetchUserTasklists,
  fetchTasklistTasks,
  deleteTaskList,
} from '../Models/Tasklist'

const Dashboard = () => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [taskLists, setTaskLists] = useState([])
  const [tasks, setTasks] = useState({})
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

        if (data && data.length) {
          let fetchedTasks = {}

          data.forEach(tasklist => {
            fetchTasklistTasks(tasklist.id).then(data => {
              fetchedTasks[tasklist.id] = data
              // console.log(data, fetchedTasks)

              setTasks(fetchedTasks)
            })
          })
        }
      })
    }
  }, [user, loading, navigate])

  useEffect(() => {
    if (taskLists.length) {
      setSelectedTaskListIndex(taskLists.length - 1)
    }
  }, [taskLists])

  const onNewTaskModalOpen = () => {
    setIsNewTaskModalOpen(true)
  }

  const onNewTaskModalClosed = () => {
    setIsNewTaskModalOpen(false)
  }

  const onCreateNewTask = newTaskName => {
    let tempTasks = { ...tasks }
    if (
      tempTasks[selectedTaskList().id] &&
      tempTasks[selectedTaskList().id].length
    ) {
      tempTasks[selectedTaskList().id].push({ name: newTaskName })
    } else {
      tempTasks[selectedTaskList().id] = [{ name: newTaskName }]
    }

    console.log(
      'TODO: call DB to store new task for tasklist',
      selectedTaskList().id,
      newTaskName
    )

    setTasks({ ...tempTasks })
  }

  const onDeleteSelectedTaskist = () => {
    deleteTaskList(selectedTaskList().id).then(() => {
      let tempTaskLists = taskLists
      tempTaskLists.splice(selectedTaskListIndex, 1)
      setTaskLists([...tempTaskLists])
      setSelectedTaskListIndex(taskLists.length - 1)
    })
  }

  const selectedTaskList = () =>
    taskLists && taskLists.length
      ? taskLists[selectedTaskListIndex]
      : { id: null }

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
                  tasks={tasks}
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
              <Tasks
                selectedTaskListIndex={selectedTaskListIndex}
                selectedTaskListTasks={tasks[selectedTaskList()?.id]}
                onCreateNewTask={onCreateNewTask}
                onDeleteSelectedTaskist={onDeleteSelectedTaskist}
              />
            </Grid>
          </Grid>
        </Container>
      </TaskListsContext.Provider>
    </div>
  )
}
export default Dashboard
