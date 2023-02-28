import { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { TaskListsContext } from '../Contexts/TaskListsContext'

const NewTaskListModal = () => {
  const [open, setOpen] = useState(false)
  const [taskListName, setTaskListName] = useState('')
  const { taskLists, setTaskLists } = useContext(TaskListsContext)

  const handleClickOpen = () => {
    setTaskListName('')
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setTaskListName('')
  }

  const handleCreate = () => {
    console.log('create task list', taskListName)
    setTaskLists([...taskLists, { name: taskListName, tasks: [] }])
    handleClose()
  }

  const handleTaskListNameChange = e => {
    setTaskListName(e.target.value)
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create new list
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new task list</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new task list.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task list name"
            type="text"
            fullWidth
            variant="standard"
            value={taskListName}
            onChange={handleTaskListNameChange}
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
