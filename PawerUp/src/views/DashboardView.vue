<script setup>
import { ref } from 'vue'

const isLogin = ref(true) // toggle login/register

// Form state
const loginForm = ref({
  email: '',
  password: '',
})

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'user', // 'user' or 'admin'
})

// Errors
const loginErrors = ref({})
const registerErrors = ref({})

// Validators
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)
const validateNotEmpty = (value) => value.trim() !== ''

// Blur handlers
const checkLoginEmail = () => {
  loginErrors.value.email = validateEmail(loginForm.value.email) ? '' : 'Invalid email'
}
const checkLoginPassword = () => {
  loginErrors.value.password = validatePassword(loginForm.value.password)
    ? ''
    : 'Password must be 8+ characters, include uppercase, lowercase, and special character'
}
const checkRegisterEmail = () => {
  registerErrors.value.email = validateEmail(registerForm.value.email) ? '' : 'Invalid email'
}
const checkRegisterPassword = () => {
  registerErrors.value.password = validatePassword(registerForm.value.password)
    ? ''
    : 'Password must be 8+ characters, include uppercase, lowercase, and special character'
}

// Handlers
const handleRegister = () => {
  registerErrors.value = {}
  if (!validateNotEmpty(registerForm.value.firstName))
    registerErrors.value.firstName = 'First name is required'
  if (!validateNotEmpty(registerForm.value.lastName))
    registerErrors.value.lastName = 'Last name is required'
  checkRegisterEmail()
  checkRegisterPassword()

  if (Object.values(registerErrors.value).every((v) => !v)) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push({ ...registerForm.value })
    localStorage.setItem('users', JSON.stringify(users))
    alert(`Registration successful for ${registerForm.value.firstName}`)
    registerForm.value = { firstName: '', lastName: '', email: '', password: '', role: 'user' }
    isLogin.value = true
  }
}

const handleLogin = () => {
  loginErrors.value = {}
  checkLoginEmail()
  checkLoginPassword()

  if (Object.values(loginErrors.value).every((v) => !v)) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(
      (u) => u.email === loginForm.value.email && u.password === loginForm.value.password,
    )
    if (user) {
      alert(`Login successful as ${user.email}`)
      localStorage.setItem('currentUser', JSON.stringify(user))
    } else {
      alert('Login failed: email or password incorrect')
    }
  }
}
</script>

<template>
  <div class="dashboard-container">
    <div class="form-wrapper">
      <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>

      <!-- Toggle -->
      <div class="toggle-container">
        <button :class="isLogin ? 'active' : ''" @click="isLogin = true">Login</button>
        <button :class="!isLogin ? 'active' : ''" @click="isLogin = false">Register</button>
      </div>

      <form @submit.prevent="isLogin ? handleLogin() : handleRegister()">
        <!-- Login Fields -->
        <template v-if="isLogin">
          <div class="form-group">
            <label>Email *</label>
            <input type="email" v-model="loginForm.email" @blur="checkLoginEmail()" />
            <p class="error-msg" v-if="loginErrors.email">{{ loginErrors.email }}</p>
          </div>

          <div class="form-group">
            <label>Password *</label>
            <input type="password" v-model="loginForm.password" @blur="checkLoginPassword()" />
            <p class="error-msg" v-if="loginErrors.password">{{ loginErrors.password }}</p>
          </div>
        </template>

        <!-- Register Fields -->
        <template v-else>
          <div class="form-group">
            <label>First Name *</label>
            <input
              type="text"
              v-model="registerForm.firstName"
              @blur="
                () => {
                  if (!validateNotEmpty(registerForm.firstName))
                    registerErrors.firstName = 'Required'
                  else registerErrors.firstName = ''
                }
              "
            />
            <p class="error-msg" v-if="registerErrors.firstName">{{ registerErrors.firstName }}</p>
          </div>

          <div class="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              v-model="registerForm.lastName"
              @blur="
                () => {
                  if (!validateNotEmpty(registerForm.lastName)) registerErrors.lastName = 'Required'
                  else registerErrors.lastName = ''
                }
              "
            />
            <p class="error-msg" v-if="registerErrors.lastName">{{ registerErrors.lastName }}</p>
          </div>

          <div class="form-group">
            <label>Email *</label>
            <input type="email" v-model="registerForm.email" @blur="checkRegisterEmail()" />
            <p class="error-msg" v-if="registerErrors.email">{{ registerErrors.email }}</p>
          </div>

          <div class="form-group">
            <label>Password *</label>
            <input
              type="password"
              v-model="registerForm.password"
              @blur="checkRegisterPassword()"
            />
            <p class="error-msg" v-if="registerErrors.password">{{ registerErrors.password }}</p>
          </div>

          <div class="form-group">
            <label>Role *</label>
            <select v-model="registerForm.role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </template>

        <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  padding: 20px;
}

.form-wrapper {
  background-color: #fafcf8;
  padding: 20px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
}

.toggle-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 15px;
}

.toggle-container button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
}

.toggle-container .active {
  font-weight: bold;
}

.form-group {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

input,
select,
button[type='submit'] {
  padding: 8px;
  margin-top: 4px;
}

button[type='submit'] {
  width: 100%;
  cursor: pointer;
}

.error-msg {
  color: red;
  font-size: 13px;
}
</style>
