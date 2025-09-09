<template>
  <div class="container py-3">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/about">About</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/booking">Booking</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/programs">Programs</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAuth } from '../auth'
import { useRouter } from 'vue-router'

const { isAuthenticated, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push({ name: 'login' })
}
</script>
