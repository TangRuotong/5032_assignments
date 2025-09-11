// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCmfS_VaBN7Nz9MXlJHCwCxVeZipo4XxkA',
  authDomain: 'pawerup-92f54.firebaseapp.com',
  projectId: 'pawerup-92f54',
  storageBucket: 'pawerup-92f54.firebasestorage.app',
  messagingSenderId: '117236558919',
  appId: '1:117236558919:web:3e764f6ff99231608f9562',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// const db = getFirestore()

// export default db

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
