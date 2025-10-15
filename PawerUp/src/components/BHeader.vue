<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuth } from '../auth'
import { useRouter } from 'vue-router'

const { isAuthenticated, userRole, logout } = useAuth()
const router = useRouter()

const showPrograms = ref(false)
const showAccountMenu = ref(false)
const showMobileMenu = ref(false)

const programsBtnRef = ref(null)
const programsMenuRef = ref(null)
const accountBtnRef = ref(null)
const accountMenuRef = ref(null)
const mobileMenuRef = ref(null)

const handleLogout = () => {
  logout()
  showMobileMenu.value = false
  showPrograms.value = false
  showAccountMenu.value = false
  router.push('/')
}

const togglePrograms = () => {
  showPrograms.value = !showPrograms.value
}

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value
}

const closeAllMenus = () => {
  showPrograms.value = false
  showAccountMenu.value = false
  showMobileMenu.value = false
}

const onDocClick = (e) => {
  const inPrograms =
    programsBtnRef.value?.contains(e.target) || programsMenuRef.value?.contains(e.target)
  const inAccount =
    accountBtnRef.value?.contains(e.target) || accountMenuRef.value?.contains(e.target)
  const inMobile = mobileMenuRef.value?.contains(e.target)
  if (!inPrograms && !inAccount && !inMobile) closeAllMenus()
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMenus()
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
})
</script>

<template>
  <nav class="navbar">
    <div class="container-fluid align-items-center">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/icons/logo.png" alt="PawerUp logo" class="nav-logo" />
      </router-link>

      <button
        class="hamburger"
        @click.stop="showMobileMenu = !showMobileMenu"
        :aria-expanded="showMobileMenu ? 'true' : 'false'"
      >
        ☰
      </button>

      <ul class="navbar-nav desktop-nav">
        <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>

        <li class="nav-item nav-has-dropdown">
          <button
            ref="programsBtnRef"
            class="nav-link nav-button"
            @click.stop="togglePrograms"
            :aria-expanded="showPrograms ? 'true' : 'false'"
          >
            Programs ⌵
          </button>
          <div v-show="showPrograms" ref="programsMenuRef" class="dropdown">
            <router-link class="dropdown-item" to="/programs" @click="showPrograms = false"
              >Overview</router-link
            >
            <router-link class="dropdown-item" to="/puevent" @click="showPrograms = false"
              >Public Events</router-link
            >
            <router-link class="dropdown-item" to="/prisession" @click="showPrograms = false"
              >Private Sessions</router-link
            >
            <router-link class="dropdown-item" to="/courses" @click="showPrograms = false"
              >Courses</router-link
            >
            <router-link class="dropdown-item" to="/dogs" @click="showPrograms = false"
              >Registered Dogs</router-link
            >
          </div>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/contactus">Contact Us</router-link>
        </li>

        <li v-if="isAuthenticated" class="nav-item nav-has-dropdown">
          <button
            ref="accountBtnRef"
            class="nav-link nav-button"
            @click.stop="toggleAccountMenu"
            :aria-expanded="showAccountMenu ? 'true' : 'false'"
          >
            Account ⌵
          </button>
          <div v-show="showAccountMenu" ref="accountMenuRef" class="dropdown">
            <router-link
              v-if="userRole === 'user'"
              class="dropdown-item"
              to="/userboard"
              @click="showAccountMenu = false"
              >Dashboard</router-link
            >
            <router-link
              v-if="userRole === 'user'"
              class="dropdown-item"
              to="/booking"
              @click="showAccountMenu = false"
              >Booking</router-link
            >
            <router-link
              v-if="userRole === 'admin'"
              class="dropdown-item"
              to="/admin"
              @click="showAccountMenu = false"
              >Admin Page</router-link
            >
            <button class="dropdown-item btn btn-danger btn-sm" @click="handleLogout">
              Logout
            </button>
          </div>
        </li>

        <li v-if="!isAuthenticated" class="nav-item">
          <router-link class="nav-link" to="/dashboard">Login</router-link>
        </li>
      </ul>
    </div>

    <div ref="mobileMenuRef" class="mobile-menu" :class="{ open: showMobileMenu }">
      <ul class="mobile-nav-list">
        <li><router-link to="/" @click="showMobileMenu = false">Home</router-link></li>
        <li><router-link to="/about" @click="showMobileMenu = false">About</router-link></li>
        <li>
          <details>
            <summary>Programs</summary>
            <div class="mobile-submenu">
              <router-link to="/programs" @click="showMobileMenu = false">Overview</router-link>
              <router-link to="/courses" @click="showMobileMenu = false">Courses</router-link>
              <router-link to="/dogs" @click="showMobileMenu = false">Registered Dogs</router-link>
            </div>
          </details>
        </li>
        <li>
          <router-link to="/contactus" @click="showMobileMenu = false">Contact Us</router-link>
        </li>
        <li v-if="isAuthenticated">
          <details>
            <summary>Account</summary>
            <div class="mobile-submenu">
              <router-link
                v-if="userRole === 'user'"
                to="/userboard"
                @click="showMobileMenu = false"
                >Dashboard</router-link
              >
              <router-link v-if="userRole === 'user'" to="/booking" @click="showMobileMenu = false"
                >Booking</router-link
              >
              <router-link v-if="userRole === 'admin'" to="/admin" @click="showMobileMenu = false"
                >Admin Page</router-link
              >
              <button class="btn btn-danger btn-sm" @click="handleLogout">Logout</button>
            </div>
          </details>
        </li>
        <li v-if="!isAuthenticated">
          <router-link class="nav-link" to="/dashboard" @click="showMobileMenu = false"
            >Login</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.container-fluid {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  padding: 0.1rem 0.2rem;
  gap: 1rem;
}
.navbar-brand {
  display: flex;
  align-items: center;
}
.nav-logo {
  height: 35px;
  width: auto;
  object-fit: contain;
}
.hamburger {
  font-size: 24px;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
}
.hamburger:hover {
  color: #ff7f50;
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
  position: relative;
  display: flex;
  align-items: center;
}
.nav-link,
.nav-button {
  color: #333;
  font-weight: 500;
  transition: color 0.2s;
  text-decoration: none;
}
.nav-link:hover,
.nav-button:hover {
  color: #ff7f50;
}
.nav-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
.nav-has-dropdown .dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  padding: 8px;
  min-width: 220px;
  z-index: 1001;
}
.dropdown-item {
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
}
.dropdown-item:hover {
  background: #f7f7f7;
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
@media (min-width: 992px) {
  .desktop-nav {
    display: flex;
  }
  .desktop-auth {
    display: flex;
  }
  .hamburger {
    display: none;
  }
  .mobile-menu {
    display: none;
  }
}
@media (max-width: 991.98px) {
  .desktop-nav {
    display: none;
  }
  .desktop-auth {
    display: none;
  }
  .hamburger {
    display: inline-flex;
    margin-left: auto;
  }
  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    border-top: 1px solid #eee;
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    z-index: 1001;
  }
  .mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .mobile-nav-list {
    list-style: none;
    padding: 12px 16px;
    margin: 0;
    display: grid;
    gap: 6px;
  }
  .mobile-nav-list a {
    display: block;
    padding: 10px 12px;
    border-radius: 10px;
    color: #333;
    text-decoration: none;
  }
  .mobile-nav-list a:hover {
    background: #f7f7f7;
    color: #ff7f50;
  }
  .mobile-submenu {
    padding: 6px 8px 10px 18px;
    display: grid;
    gap: 6px;
  }
  .mobile-auth {
    padding: 10px 16px 16px;
    display: grid;
    gap: 8px;
    border-top: 1px solid #eee;
  }
}
.nav-link:focus,
.nav-button:focus,
.dropdown-item:focus,
.hamburger:focus,
.mobile-nav-list a:focus {
  outline: none;
  box-shadow: none;
  border-radius: 6px;
}
</style>
