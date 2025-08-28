<script setup>
import { ref } from 'vue'

const isLogin = ref(true)

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
  role: 'user',
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
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="form-wrapper p-4">
          <h2 class="mb-3 text-center">{{ isLogin ? 'Login' : 'Register' }}</h2>

          <!-- Toggle -->
          <div class="toggle-container mb-3 d-flex justify-content-center">
            <button
              type="button"
              class="btn toggle-btn me-2"
              :class="{ active: isLogin }"
              @click="isLogin = true"
            >
              Login
            </button>
            <button
              type="button"
              class="btn toggle-btn"
              :class="{ active: !isLogin }"
              @click="isLogin = false"
            >
              Register
            </button>
          </div>

          <form @submit.prevent="isLogin ? handleLogin() : handleRegister()">
            <!-- LOGIN: stacked single-column but still inside Bootstrap grid -->
            <template v-if="isLogin">
              <div class="row mb-3">
                <div class="col-12">
                  <label class="form-label">Email *</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="loginForm.email"
                    @blur="checkLoginEmail()"
                  />
                  <div v-if="loginErrors.email" class="text-danger small mt-1">
                    {{ loginErrors.email }}
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-12">
                  <label class="form-label">Password *</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="loginForm.password"
                    @blur="checkLoginPassword()"
                  />
                  <div v-if="loginErrors.password" class="text-danger small mt-1">
                    {{ loginErrors.password }}
                  </div>
                </div>
              </div>
            </template>

            <!-- REGISTE-->
            <template v-else>
              <div class="row mb-3">
                <div class="col-sm-6 col-md-6">
                  <label class="form-label">First Name *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="registerForm.firstName"
                    @blur="
                      () => {
                        if (!validateNotEmpty(registerForm.firstName))
                          registerErrors.firstName = 'Required'
                        else registerErrors.firstName = ''
                      }
                    "
                  />
                  <div v-if="registerErrors.firstName" class="text-danger small mt-1">
                    {{ registerErrors.firstName }}
                  </div>
                </div>

                <div class="col-sm-6 col-md-6">
                  <label class="form-label">Last Name *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="registerForm.lastName"
                    @blur="
                      () => {
                        if (!validateNotEmpty(registerForm.lastName))
                          registerErrors.lastName = 'Required'
                        else registerErrors.lastName = ''
                      }
                    "
                  />
                  <div v-if="registerErrors.lastName" class="text-danger small mt-1">
                    {{ registerErrors.lastName }}
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-6 col-md-6">
                  <label class="form-label">Email *</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="registerForm.email"
                    @blur="checkRegisterEmail()"
                  />
                  <div v-if="registerErrors.email" class="text-danger small mt-1">
                    {{ registerErrors.email }}
                  </div>
                </div>

                <div class="col-sm-6 col-md-6">
                  <label class="form-label">Password *</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="registerForm.password"
                    @blur="checkRegisterPassword()"
                  />
                  <div v-if="registerErrors.password" class="text-danger small mt-1">
                    {{ registerErrors.password }}
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-12 col-sm-6">
                  <label class="form-label">Role *</label>
                  <select class="form-select" v-model="registerForm.role">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </template>

            <div class="d-grid gap-2 mt-3">
              <button type="submit" class="btn btn-primary btn-block">
                {{ isLogin ? 'Login' : 'Register' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  background-color: #fafcf8;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  font-family: 'Poppins', sans-serif;
}

.toggle-btn {
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.18s;
}
.toggle-btn.active {
  background: #fbcda1;
  border-color: rgba(0, 0, 0, 0.08);
  font-weight: 600;
}
.toggle-btn:hover {
  transform: translateY(-2px);
}

.form-label {
  font-weight: 600;
  margin-bottom: 6px;
}

.btn-primary {
  background-color: #89b8a3;
  border-color: #89b8a3;
}
.btn-primary:hover {
  background-color: #5c8b39;
  border-color: #5c8b39;
}
.text-danger {
  color: #c07436 !important;
}
</style>
