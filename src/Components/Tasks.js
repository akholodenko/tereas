import { Fragment, useState, useContext } from 'react'
import TextField from '@mui/material/TextField'
import { ENTER_KEY_NUMBER } from '../Constants'
import { TaskListsContext } from '../Contexts/TaskListsContext'

const Tasks = ({ selectedTaskListIndex }) => {
  const { taskLists, setTaskLists } = useContext(TaskListsContext)
  const [newTaskName, setNewTaskName] = useState('')
  const handleEnterKey = e => {
    if (e.keyCode === ENTER_KEY_NUMBER) {
      handleCreate()
    }
  }

  const handleCreate = () => {
    let tempTaskLists = [...taskLists]
    tempTaskLists[selectedTaskListIndex].tasks.push({ name: newTaskName })
    setTaskLists([...tempTaskLists])
    setNewTaskName('')
  }

  const handleNewTaskNameChange = e => {
    setNewTaskName(e.target.value)
  }

  return (
    <Fragment>
      {taskLists[selectedTaskListIndex] ? (
        <div>
          <div>
            {taskLists[selectedTaskListIndex]?.name} (
            {taskLists[selectedTaskListIndex]?.tasks?.length})
          </div>
          <div>
            {taskLists[selectedTaskListIndex]?.tasks.map((task, index) => (
              <div key={index}>{task.name}</div>
            ))}
            <TextField
              value={newTaskName}
              onKeyUp={handleEnterKey}
              onChange={handleNewTaskNameChange}
              id="new-task-field"
              label="Enter task"
              variant="standard"
            />
          </div>
        </div>
      ) : (
        <div>select/create a new task list</div>
      )}
    </Fragment>
  )
}

export default Tasks
