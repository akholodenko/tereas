import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { tasksCount } from '../utils'

const TasksLists = ({
  taskLists,
  selectedTaskListIndex,
  tasks,
  handleSelectedTaskListChange,
}) => {
  const taskListTabProps = index => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    }
  }

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={selectedTaskListIndex}
      onChange={handleSelectedTaskListChange}
      aria-label="Vertical tabs example"
      sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      {taskLists.map((taskList, index) => (
        <Tab
          key={index}
          label={`${taskList.name} (${tasksCount(tasks[taskList.id])})`}
          {...taskListTabProps(index)}
        />
      ))}
    </Tabs>
  )
}

export default TasksLists
