import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyCmfS_VaBN7Nz9MXlJHCwCxVeZipo4XxkA',
  authDomain: 'pawerup-92f54.firebaseapp.com',
  projectId: 'pawerup-92f54',
  storageBucket: 'pawerup-92f54.firebasestorage.app',
  messagingSenderId: '117236558919',
  appId: '1:117236558919:web:3e764f6ff99231608f9562',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const functions = getFunctions(app)

export { db, auth, functions }
