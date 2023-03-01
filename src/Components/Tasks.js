import { Fragment } from 'react'

const Tasks = ({ taskList }) => {
  return (
    <Fragment>
      {taskList?.name} ({taskList?.tasks?.length})
    </Fragment>
  )
}

export default Tasks
