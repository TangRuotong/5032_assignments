<script setup>
import { ref } from 'vue'

const isLogin = ref(true) // toggle between login and register

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
  loginErrors.value.email = validateEmail(loginForm.value.email) ? '' : 'Invalid email address'
}
const checkLoginPassword = () => {
  loginErrors.value.password = validatePassword(loginForm.value.password)
    ? ''
    : 'Password must be 8+ characters, with uppercase, lowercase, and special character'
}
const checkRegisterEmail = () => {
  registerErrors.value.email = validateEmail(registerForm.value.email)
    ? ''
    : 'Invalid email address'
}
const checkRegisterPassword = () => {
  registerErrors.value.password = validatePassword(registerForm.value.password)
    ? ''
    : 'Password must be 8+ characters, with uppercase, lowercase, and special character'
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
    // Save user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push({ ...registerForm.value })
    localStorage.setItem('users', JSON.stringify(users))
    alert(
      `Registration successful for ${registerForm.value.firstName} ${registerForm.value.lastName}`,
    )
    // Clear form
    registerForm.value = { firstName: '', lastName: '', email: '', password: '', role: 'user' }
    isLogin.value = true
  }
}

const handleLogin = () => {
  loginErrors.value = {}
  checkLoginEmail()
  checkLoginPassword()

  if (Object.values(loginErrors.value).every((v) => !v)) {
    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(
      (u) => u.email === loginForm.value.email && u.password === loginForm.value.password,
    )
    if (user) {
      alert(`Login successful as ${user.email}`)
      // Optionally, save current user
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

      <form @submit.prevent="isLogin ? handleLogin() : handleRegister()">
        <!-- Toggle Login/Register -->
        <div class="toggle-container">
          <button type="button" :class="{ active: isLogin }" @click="isLogin = true">Login</button>
          <button type="button" :class="{ active: !isLogin }" @click="isLogin = false">
            Register
          </button>
        </div>

        <!-- Registration fields -->
        <template v-if="!isLogin">
          <div class="form-group">
            <label>First Name *</label>
            <input
              type="text"
              v-model="registerForm.firstName"
              @blur="
                registerErrors.firstName = validateNotEmpty(registerForm.firstName)
                  ? ''
                  : 'First name is required'
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
                registerErrors.lastName = validateNotEmpty(registerForm.lastName)
                  ? ''
                  : 'Last name is required'
              "
            />
            <p class="error-msg" v-if="registerErrors.lastName">{{ registerErrors.lastName }}</p>
          </div>
        </template>

        <!-- Email -->
        <div class="form-group">
          <label>Email *</label>
          <input v-if="isLogin" type="email" v-model="loginForm.email" @blur="checkLoginEmail()" />
          <input v-else type="email" v-model="registerForm.email" @blur="checkRegisterEmail()" />
          <p class="error-msg" v-if="isLogin && loginErrors.email">{{ loginErrors.email }}</p>
          <p class="error-msg" v-if="!isLogin && registerErrors.email">
            {{ registerErrors.email }}
          </p>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label>Password *</label>
          <input
            v-if="isLogin"
            type="password"
            v-model="loginForm.password"
            @blur="checkLoginPassword()"
          />
          <input
            v-else
            type="password"
            v-model="registerForm.password"
            @blur="checkRegisterPassword()"
          />
          <p class="error-msg" v-if="isLogin && loginErrors.password">{{ loginErrors.password }}</p>
          <p class="error-msg" v-if="!isLogin && registerErrors.password">
            {{ registerErrors.password }}
          </p>
        </div>

        <!-- Role selection for registration -->
        <div class="form-group" v-if="!isLogin">
          <label>Role *</label>
          <select v-model="registerForm.role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

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
  background: linear-gradient(180deg, #fafcf8 0%, #b1c4d9 100%); /* soft gradient top to bottom */
  font-family: 'Segoe UI', sans-serif;
  padding: 20px;
}

.form-wrapper {
  background-color: #fafcf8; /* card base color */
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #212615; /* deep text */
}

.toggle-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 8px;
}

.toggle-container button {
  padding: 8px 16px;
  border: none;
  background: #b5dcc6; /* soft green */
  cursor: pointer;
  font-weight: 600;
  transition:
    background 0.3s,
    color 0.3s;
  border-radius: 10px;
  color: #212615; /* deep text */
}

.toggle-container button.active {
  background: #fbcda1; /* soft peach highlight */
  color: #212615;
}

.toggle-container button:not(.active) {
  border-radius: 10px;
  color: #212615;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #212615;
}

input,
select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #d0e7e4; /* subtle border */
  font-size: 14px;
  transition:
    border 0.3s,
    box-shadow 0.3s;
}

input:focus,
select:focus {
  border-color: #89b8a3; /* soft green focus */
  outline: none;
  box-shadow: 0 0 6px rgba(137, 184, 163, 0.3);
}

button[type='submit'] {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background-color: #fbcda1; /* soft warm accent */
  color: #212615; /* deep text */
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type='submit']:hover {
  background-color: #fbcda1; /* hover soft contrast */
}

.error-msg {
  color: #e53935;
  font-size: 13px;
  margin-top: 5px;
}
</style>
