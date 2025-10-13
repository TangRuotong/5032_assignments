<template>
  <nav class="navbar">
    <div class="container-fluid align-items-center">
      <router-link to="/" class="navbar-brand">
        <img src="/logo.png" alt="Logo" class="nav-logo" />
      </router-link>

      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/programs">Programs</router-link>
        </li>
      </ul>

      <div class="navbar-text ms-auto d-flex align-items-center">
        <template v-if="!isAuthenticated">
          <router-link class="nav-link" to="/dashboard">Login</router-link>
        </template>
        <template v-else>
          <router-link v-if="userRole === 'user'" class="nav-link me-2" to="/userboard"
            >Dashboard</router-link
          >
          <router-link v-if="userRole === 'user'" class="nav-link me-2" to="/booking"
            >Booking</router-link
          >
          <router-link v-if="userRole === 'user'" class="nav-link me-2" to="/sendemail"
            >Email</router-link
          >
          <router-link v-if="userRole === 'admin'" class="nav-link me-2" to="/admin"
            >Admin Page</router-link
          >
          <button class="btn btn-danger btn-sm" @click="handleLogout">Logout</button>
        </template>
      </div>
    </div>
  </nav>
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

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.container-fluid {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: nowrap;
}

.navbar-brand {
  display: flex;
  align-items: center;
}
.nav-logo {
  height: 30px;
  width: auto;
  object-fit: contain;
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.nav-item {
  display: flex;
  align-items: center;
}

.nav-link {
  color: #333;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #ff7f50;
}

.navbar-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .navbar-nav {
    display: none;
  }
  .navbar-text {
    gap: 0.25rem;
  }
}
</style>
