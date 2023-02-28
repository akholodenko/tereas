import { createContext } from 'react'

export const TaskListsContext = createContext({
  taskLists: [],
  setTaskLists: lists => {},
})
