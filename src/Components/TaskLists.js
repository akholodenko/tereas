import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const TasksLists = ({
  taskLists,
  selectedTaskListIndex,
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
          label={`${taskList.name} (${taskList.tasks.length})`}
          {...taskListTabProps(index)}
        />
      ))}
    </Tabs>
  )
}

export default TasksLists
