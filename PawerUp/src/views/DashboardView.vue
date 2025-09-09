<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, setDoc, doc } from 'firebase/firestore'

const db = getFirestore()
const router = useRouter()
const auth = getAuth()

const email = ref('')
const password = ref('')
const isRegister = ref(true) // true=register, false=login

// switch between register and login
const toggleMode = () => {
  isRegister.value = !isRegister.value
}

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Register Successful!')

      isRegister.value = false
      email.value = ''
      password.value = ''
    })
    .catch((error) => {
      console.error(error.code)
    })
}

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Sign In Successful!')
      router.push('/booking')
    })
    .catch((error) => {
      console.error(error.code)
    })
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
