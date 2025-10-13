<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase/init.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc, doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore'
import eyeOpen from '@/assets/icons/eyeOpen.svg?url'
import eyeClose from '@/assets/icons/eyeClose.svg?url'
import loginBG from '@/assets/icons/loginBG.jpg?url'

const router = useRouter()

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const isRegister = ref(false)
const role = ref('user')
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const hoverPassword = ref(false)
const hoverPasswordConfirm = ref(false)
const focusPassword = ref(false)
const focusPasswordConfirm = ref(false)
const errors = ref({
  password: '',
  email: '',
  confirm: '',
})
const isRegistering = ref(false)

const validateEmail = () => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.value.email = re.test(email.value) ? '' : 'Please enter a valid email address.'
  return !errors.value.email
}

const validatePassword = (pwd) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
  return regex.test(pwd)
}

const validateRegister = () => {
  if (!validateEmail()) {
    alert(errors.value.email)
    return false
  }
  if (!validatePassword(password.value)) {
    errors.value.password =
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    alert(errors.value.password)
    return false
  } else {
    errors.value.password = ''
  }
  if (password.value !== passwordConfirm.value) {
    errors.value.confirm = 'Passwords do not match.'
    alert(errors.value.confirm)
    return false
  } else {
    errors.value.confirm = ''
  }
  return true
}

const toggleMode = () => {
  isRegister.value = !isRegister.value
  email.value = ''
  password.value = ''
  passwordConfirm.value = ''
  errors.value = { password: '', email: '', confirm: '' }
}

const register = async () => {
  if (!validateRegister()) return
  if (isRegistering.value) return
  isRegistering.value = true
  try {
    window.__ignoreAuthChange = true
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    await setDoc(doc(db, 'users', user.uid), {
      email: email.value,
      role: 'user',
      createdAt: new Date(),
    })
    await signOut(auth)
    alert('User registered successfully! Please sign in with your new account.')
    isRegister.value = false
    email.value = ''
    password.value = ''
    passwordConfirm.value = ''
    role.value = 'user'
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('This email is already registered. Please sign in.')
      isRegister.value = false
    } else if (error.code === 'auth/weak-password') {
      alert('Password is too weak. Please use at least 8 characters & include required complexity.')
    } else if (error.code === 'auth/invalid-email') {
      alert('The email address is not valid.')
    } else {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    }
  } finally {
    try {
      await new Promise((res) => setTimeout(res, 300))
      window.__ignoreAuthChange = false
    } catch (e) {
      window.__ignoreAuthChange = false
    }
    isRegistering.value = false
  }
}

const signin = async () => {
  if (!validateEmail()) {
    alert(errors.value.email)
    return
  }
  if (!password.value) {
    alert('Please enter your password.')
    return
  }
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
      console.warn('No user document found for uid:', user.uid)
      router.push('/booking')
    }
  } catch (error) {
    console.error('Signin error:', error)
    const code = error?.code || ''
    if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
      alert('Password incorrect. Please try again.')
      return
    }
    if (code === 'auth/user-not-found') {
      alert('Email not found. Please check the email address or register first.')
      return
    }
    if (code === 'auth/invalid-email') {
      alert('Invalid email format. Please check and try again.')
      return
    }
    try {
      const q = query(collection(db, 'users'), where('email', '==', email.value))
      const querySnap = await getDocs(q)
      if (!querySnap.empty) {
        alert('Password incorrect. Please try again.')
      } else {
        alert('Email not found. Please check your email or register.')
      }
    } catch (qerr) {
      console.warn('Could not query users collection to check existence:', qerr)
      alert('Login failed. Please check your email or password.')
    }
  }
}
</script>

<template>
  <div class="page-bg" :style="{ backgroundImage: `url(${loginBG})` }">
    <div class="form-wrap">
      <div class="container form-container">
        <div class="row justify-content-center">
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-8 col-10 text-center">
            <h1 class="page-title" v-if="isRegister">Create an Account</h1>
            <h1 class="page-title" v-else>Sign in to Your Account</h1>

            <div class="field">
              <input
                type="text"
                placeholder="Email"
                v-model="email"
                class="form-control"
                @blur="validateEmail"
              />
            </div>

            <div
              class="input-row"
              @mouseenter="hoverPassword = true"
              @mouseleave="hoverPassword = false"
            >
              <input
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                v-model="password"
                class="form-control"
                @focus="focusPassword = true"
                @blur="focusPassword = false"
              />
              <img
                v-if="hoverPassword || focusPassword"
                :src="showPassword ? eyeOpen : eyeClose"
                alt="toggle"
                class="icon"
                @click="showPassword = !showPassword"
              />
            </div>

            <div
              v-if="isRegister"
              class="input-row"
              @mouseenter="hoverPasswordConfirm = true"
              @mouseleave="hoverPasswordConfirm = false"
            >
              <input
                :type="showPasswordConfirm ? 'text' : 'password'"
                placeholder="Confirm Password"
                v-model="passwordConfirm"
                class="form-control"
                @focus="focusPasswordConfirm = true"
                @blur="focusPasswordConfirm = false"
              />
              <img
                v-if="hoverPasswordConfirm || focusPasswordConfirm"
                :src="showPasswordConfirm ? eyeOpen : eyeClose"
                alt="toggle"
                class="icon"
                @click="showPasswordConfirm = !showPasswordConfirm"
              />
            </div>

            <div class="password-hint" v-if="isRegister">
              Password must be at least 8 characters and include uppercase, lowercase, number, and
              special character.
            </div>

            <div class="action-row">
              <button
                v-if="isRegister"
                type="button"
                class="btn btn-primary w-100"
                @click="register"
                :disabled="isRegistering"
              >
                <span v-if="isRegistering">Registering...</span>
                <span v-else>Register</span>
              </button>
              <button v-else type="button" class="btn btn-success w-100" @click="signin">
                Sign In
              </button>
            </div>

            <div class="link-row">
              <button type="button" class="btn btn-link" @click="toggleMode">
                <span v-if="isRegister">Already have an account? Sign in</span>
                <span v-else>Don't have an account? Create one</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-bg {
  position: fixed;
  inset: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
}
.form-wrap {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 150px;
  padding-bottom: 36px;
}
.form-container {
  width: 100%;
  max-width: 980px;
  margin-top: 12px;
  padding: 28px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  color: #212615;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  z-index: 1;
}
.page-title {
  margin: 0 0 20px 0;
  line-height: 1.4;
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  text-align: center;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
.field {
  margin-bottom: 16px;
}
.input-row {
  display: block;
  position: relative;
  margin-bottom: 12px;
}
.input-row .form-control {
  width: 100%;
  padding-right: 12px;
  box-sizing: border-box;
}
.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
  background: transparent;
  border: none;
  padding: 0;
}
.password-hint {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 48px;
  text-align: left;
}
.action-row {
  margin-top: 48px;
}
.btn-primary,
.btn-success {
  background-color: #808080 !important;
  border-color: #808080 !important;
  color: #fff !important;
}
.link-row {
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 575.98px) {
  .form-container {
    max-width: 95%;
    padding: 20px;
    margin-top: 8px;
  }
  .page-title {
    font-size: 1.25rem;
    white-space: normal;
  }
  .password-hint {
    margin-bottom: 24px;
    font-size: 0.85rem;
  }
  .action-row {
    margin-top: 32px;
  }
}
@media (min-width: 576px) and (max-width: 767.98px) {
  .form-container {
    max-width: 85%;
    padding: 22px;
    margin-top: 10px;
  }
  .page-title {
    font-size: 1.35rem;
    white-space: nowrap;
  }
}
@media (min-width: 768px) and (max-width: 991.98px) {
  .form-container {
    max-width: 75%;
    padding: 24px;
    margin-top: 12px;
  }
  .page-title {
    font-size: 1.5rem;
  }
}
@media (min-width: 992px) and (max-width: 1199.98px) {
  .form-container {
    max-width: 68%;
    padding: 26px;
    margin-top: 14px;
  }
  .page-title {
    font-size: 1.6rem;
  }
}
@media (min-width: 1200px) and (max-width: 1399.98px) {
  .form-container {
    max-width: 62%;
    padding: 28px;
    margin-top: 16px;
  }
}
@media (min-width: 1400px) {
  .form-container {
    max-width: 56%;
    padding: 30px;
    margin-top: 18px;
  }
}
</style>
