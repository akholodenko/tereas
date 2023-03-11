import {
  query,
  collection,
  getDocs,
  where,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'
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
    if (tasklistId) {
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
    } else {
      return []
    }
  } catch (err) {
    console.error(err)
    alert('An error occured while fetching user tasks data')
  }
}

export const createTaskList = async tasklist => {
  if (isValidTasklist(tasklist)) {
    const docRef = await addDoc(collection(db, 'tasklists'), {
      name: tasklist.name,
      uid: tasklist.uid,
    })
    console.log('Document written with ID: ', docRef.id)

    return docRef.id
  } else {
    return null
  }
}

export const deleteTaskList = async tasklistId => {
  if (tasklistId) {
    await deleteDoc(doc(db, 'tasklists', tasklistId))
  }
}

const isValidTasklist = tasklist => tasklist && tasklist.name && tasklist.uid
