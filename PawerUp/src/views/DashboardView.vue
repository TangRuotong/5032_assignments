<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase/init.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'

const router = useRouter()
const email = ref('')
const password = ref('')
const isRegister = ref(false)
const role = ref('user')

const errors = ref({
  password: '',
  email: '',
})

const validateEmail = () => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.value.email = re.test(email.value) ? '' : 'Please enter a valid email address.'
  return !errors.value.email
}

const validatePassword = () => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/
  errors.value.password = regex.test(password.value)
    ? ''
    : 'Password must be at least 6 characters and include uppercase, lowercase, number, and special character.'
  return !errors.value.password
}

const toggleMode = () => {
  isRegister.value = !isRegister.value
}

const register = async () => {
  if (!validateEmail()) {
    alert(errors.value.email)
    return
  }
  if (!validatePassword()) {
    alert(errors.value.password)
    return
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    await setDoc(doc(db, 'users', user.uid), {
      email: email.value,
      role: 'user',
      createdAt: new Date(),
    })

    alert('User registered successfully! Please login.')

    isRegister.value = false
    email.value = ''
    password.value = ''
    role.value = 'user'
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('This email is already registered. Please sign in.')
      isRegister.value = false
    } else if (error.code === 'auth/weak-password') {
      alert('Password is too weak. Please use at least 6 characters.')
    } else {
      console.error(error)
      alert('Registration failed. Please try again.')
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
        router.push('/admin')
      } else {
        router.push('/booking')
      }
    } else {
      alert('No user data found. Please check your account.')
    }
  } catch (error) {
    console.error(error)
    alert('Login failed. Please check your email or password.')
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

        <p>
          <button v-if="isRegister" type="button" class="btn btn-primary w-100" @click="register">
            Register
          </button>
          <button v-else type="button" class="btn btn-success w-100" @click="signin">
            Sign In
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
