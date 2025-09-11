<template>
  <div class="container py-3">
    <ul class="nav w-100 d-flex">
      <li class="nav-item me-3">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item me-3">
        <router-link class="nav-link" to="/about">About</router-link>
      </li>
      <li class="nav-item me-3">
        <router-link class="nav-link" to="/programs">Programs</router-link>
      </li>

      <li class="nav-item ms-auto d-flex" v-if="!isAuthenticated">
        <router-link class="nav-link" to="/dashboard">Login</router-link>
      </li>

      <template v-else>
        <li class="nav-item ms-auto d-flex align-items-center">
          <template v-if="userRole === 'user'">
            <router-link class="nav-link me-2" to="/booking">Booking</router-link>
          </template>
          <template v-if="userRole === 'admin'">
            <router-link class="nav-link me-2" to="/admin">Admin Page</router-link>
          </template>
          <button class="btn btn-danger btn-sm" @click="handleLogout">Logout</button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { useAuth } from '../auth'
import { useRouter } from 'vue-router'

const { isAuthenticated, userRole, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>
