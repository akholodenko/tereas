import { useContext, useState, useEffect, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './../firebase'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { TaskListsContext } from '../Contexts/TaskListsContext'
import { ENTER_KEY_NUMBER } from '../Constants'
import { createTaskList } from '../Models/Tasklist'

const NewTaskListModal = ({ isOpen, onNewTaskModalClosed }) => {
  const [user, loading] = useAuthState(auth)
  const [taskListName, setTaskListName] = useState('')
  const { taskLists, setTaskLists } = useContext(TaskListsContext)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 300)
    }
  }, [isOpen])

  const handleClose = () => {
    onNewTaskModalClosed(false)
    setTaskListName('')
  }

  const handleEnterKey = e => {
    if (e.keyCode === ENTER_KEY_NUMBER) {
      handleCreate()
    }
  }

  const handleCreate = () => {
    createTaskList({ name: taskListName, uid: user.uid }).then(
      newTasklistId => {
        setTaskLists([
          ...taskLists,
          { name: taskListName, uid: user.uid, id: newTasklistId },
        ])
      }
    )

    handleClose()
  }

  const handleTaskListNameChange = e => {
    setTaskListName(e.target.value)
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Create new task list</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new task list.
          </DialogContentText>
          <TextField
            inputRef={inputRef}
            autoFocus
            margin="dense"
            id="newTaskName"
            label="Task list name"
            type="text"
            fullWidth
            variant="standard"
            value={taskListName}
            onChange={handleTaskListNameChange}
            onKeyUp={handleEnterKey}
            inputProps={{ maxLength: 25 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewTaskListModal
