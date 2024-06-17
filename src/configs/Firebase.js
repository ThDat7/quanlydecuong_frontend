import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'course-outline-managemnt.firebaseapp.com',
  projectId: 'course-outline-managemnt',
  storageBucket: 'course-outline-managemnt.appspot.com',
  messagingSenderId: '1033932562819',
  appId: '1:1033932562819:web:e8832d59007c51f0c596b6',
  measurementId: 'G-1VB0E81RWV',
}

const app = initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth()
export const FirebaseDb = getFirestore()
