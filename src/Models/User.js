import { query, collection, getDocs, where } from 'firebase/firestore'
import { db } from './../firebase'

export const fetchUserBasicInfo = async userUid => {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', userUid))
    const doc = await getDocs(q)
    const data = doc.docs[0].data()

    return data
  } catch (err) {
    console.error(err)
    alert('An error occured while fetching user data')
  }
}
