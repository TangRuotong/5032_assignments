<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'

const db = getFirestore()
const router = useRouter()
const auth = getAuth()

const email = ref('')
const password = ref('')
const isRegister = ref(true)
const role = ref('user')

const toggleMode = () => {
  isRegister.value = !isRegister.value
}

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    await setDoc(doc(db, 'users', user.uid), {
      email: email.value,
      role: role.value,
      createdAt: new Date(),
    })

    console.log('User registered successfully!')

    isRegister.value = false
    email.value = ''
    password.value = ''
    role.value = 'user'
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('This email is already registered. Please sign in instead.')
      isRegister.value = false
    } else {
      console.error(error)
    }
  }
}

const signin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userData = docSnap.data()
      console.log('User role:', userData.role)

      if (userData.role === 'admin') {
        router.push('/')
      } else {
        router.push('/booking')
      }
    } else {
      console.warn('User document not found in Firestore!')
    }
    // signInWithEmailAndPassword(auth, email.value, password.value).then(() => {
    //   console.log('Firebase Sign In Successful!')
    //   router.push('/booking')
    // })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h1 v-if="isRegister">Create an Account</h1>
        <h1 v-else>Sign in to Your Account</h1>

        <p><input type="text" placeholder="Email" v-model="email" class="form-control" /></p>

        <p>
          <input type="password" placeholder="Password" v-model="password" class="form-control" />
        </p>

        <p v-if="isRegister">
          <label> <input type="radio" name="role" value="user" v-model="role" /> User </label>
          <label class="ms-3">
            <input type="radio" name="role" value="admin" v-model="role" /> Admin
          </label>
        </p>

        <p>
          <button v-if="isRegister" type="button" class="btn btn-primary w-100" @click="register">
            Save to Firebase
          </button>
          <button v-else type="button" class="btn btn-success w-100" @click="signin">
            Sign in via Firebase
          </button>
        </p>

        <p>
          <button type="button" class="btn btn-link" @click="toggleMode">
            <span v-if="isRegister">Already have an account? Sign in</span>
            <span v-else>Don't have an account? Create one</span>
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 80vw;
  background: #fafcf8;
  padding: 30px;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  color: #212615;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

label {
  font-weight: 500;
  color: #212615;
}

textarea {
  min-height: 100px;
}
</style>
