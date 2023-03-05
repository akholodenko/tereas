import { query, collection, getDocs, where, doc } from 'firebase/firestore'
import { db } from './../firebase'

export const fetchUserTasklists = async userUid => {
  try {
    const q = query(collection(db, 'tasklists'), where('uid', '==', userUid))
    const doc = await getDocs(q)

    let processedTasklists = []
    if (doc.docs && doc.docs.length) {
      processedTasklists = doc.docs.map(obj => {
        return { ...obj.data(), id: obj.id, tasks: [] }
      })
    }

    return processedTasklists
  } catch (err) {
    console.error(err)
    alert('An error occured while fetching user task list data')
  }
}

export const fetchTasklistTasks = async tasklistId => {
  try {
    const tasklistRef = doc(db, 'tasklists', tasklistId)

    const q = query(
      collection(db, 'tasks'),
      where('tasklistId', '==', tasklistRef)
    )

    const files = await getDocs(q)

    let processedTasks = []
    if (files.docs && files.docs.length) {
      processedTasks = files.docs.map(obj => {
        return { ...obj.data(), id: obj.id }
      })
    }

    return processedTasks
  } catch (err) {
    console.error(err)
    alert('An error occured while fetching user tasks data')
  }
}
