import { ref, watchEffect } from 'vue'
import { auth, db } from '@/firebase/init.js'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const isAuthenticated = ref(false)
const userRole = ref(null)

onAuthStateChanged(auth, async (user) => {
  if (user) {
    isAuthenticated.value = true
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      userRole.value = docSnap.data().role
    } else {
      userRole.value = null
    }
  } else {
    isAuthenticated.value = false
    userRole.value = null
  }
})

export function useAuth() {
  const logout = async () => {
    await signOut(auth)
    isAuthenticated.value = false
    userRole.value = null
  }

  return { isAuthenticated, userRole, logout }
}
