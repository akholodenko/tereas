import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { auth } from './../firebase'

import { TaskListsContext } from '../Contexts/TaskListsContext'
import { Grid } from '@mui/material'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import NewTaskListModal from './NewTaskListModal'

const Dashboard = () => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [taskLists, setTaskLists] = useState([])
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false)

  const [selectedTaskList, setSelectedTaskList] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTaskList(newValue)
  }

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('/')
  }, [user, loading, navigate])

  const onNewTaskModalOpen = () => {
    setIsNewTaskModalOpen(true)
  }

  const onNewTaskModalClosed = () => {
    setIsNewTaskModalOpen(false)
    if (taskLists && taskLists.length) {
      console.log('go', taskLists.length)
      setSelectedTaskList(taskLists.length)
    }
  }

  const taskListTabProps = (index: number) => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    }
  }

  return (
    <div className="dashboard">
      <TaskListsContext.Provider value={{ taskLists, setTaskLists }}>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {taskLists && taskLists.length ? (
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={selectedTaskList}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                  {taskLists.map((taskList, index) => (
                    <Tab
                      key={index}
                      label={taskList.name}
                      {...taskListTabProps(index)}
                    />
                  ))}
                </Tabs>
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
              list task items
            </Grid>
          </Grid>
        </Container>
      </TaskListsContext.Provider>
    </div>
  )
}
export default Dashboard
