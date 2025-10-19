<template>
  <nav class="navbar">
    <div class="container-fluid align-items-center">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/icons/logo.png" alt="PawerUp logo" class="nav-logo" />
      </router-link>

      <label for="hamburger-menu" class="visually-hidden">Toggle mobile menu</label>
      <button
        id="hamburger-menu"
        name="hamburger-menu"
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
          <label for="programs-button" class="visually-hidden">Toggle Programs Menu</label>
          <button
            id="programs-button"
            name="programs-button"
            ref="programsBtnRef"
            class="nav-link nav-button has-caret"
            @click.stop="togglePrograms"
            :aria-expanded="showPrograms ? 'true' : 'false'"
          >
            Programs
          </button>
          <div v-show="showPrograms" ref="programsMenuRef" class="dropdown">
            <router-link class="dropdown-item" to="/programs" @click="showPrograms = false">
              Overview
            </router-link>
            <router-link class="dropdown-item" to="/puevent" @click="showPrograms = false">
              Public Events
            </router-link>
            <router-link class="dropdown-item" to="/prisession" @click="showPrograms = false">
              Private Sessions
            </router-link>
            <router-link class="dropdown-item" to="/courses" @click="showPrograms = false">
              Courses
            </router-link>
            <router-link class="dropdown-item" to="/dogs" @click="showPrograms = false">
              Registered Dogs
            </router-link>
          </div>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/contactus">Contact Us</router-link>
        </li>

        <li v-if="isAuthenticated" class="nav-item nav-has-dropdown">
          <label for="account-button" class="visually-hidden">Toggle Account Menu</label>
          <button
            id="account-button"
            name="account-button"
            ref="accountBtnRef"
            class="nav-link nav-button has-caret"
            @click.stop="toggleAccountMenu"
            :aria-expanded="showAccountMenu ? 'true' : 'false'"
          >
            Account
          </button>
          <div v-show="showAccountMenu" ref="accountMenuRef" class="dropdown">
            <router-link
              v-if="userRole === 'user'"
              class="dropdown-item"
              to="/userboard"
              @click="showAccountMenu = false"
            >
              Dashboard
            </router-link>
            <router-link
              v-if="userRole === 'user'"
              class="dropdown-item"
              to="/booking"
              @click="showAccountMenu = false"
            >
              Booking
            </router-link>
            <router-link
              v-if="userRole === 'admin'"
              class="dropdown-item"
              to="/admin"
              @click="showAccountMenu = false"
            >
              Admin Page
            </router-link>
            <button
              id="logout-button"
              name="logout-button"
              class="dropdown-item btn btn-danger btn-sm"
              @click="handleLogout"
            >
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
              >
                Dashboard
              </router-link>
              <router-link v-if="userRole === 'user'" to="/booking" @click="showMobileMenu = false">
                Booking
              </router-link>
              <router-link v-if="userRole === 'admin'" to="/admin" @click="showMobileMenu = false">
                Admin Page
              </router-link>
              <button
                id="logout-mobile"
                name="logout-mobile"
                class="btn btn-danger btn-sm"
                @click="handleLogout"
              >
                Logout
              </button>
            </div>
          </details>
        </li>
        <li v-if="!isAuthenticated">
          <router-link class="nav-link" to="/dashboard" @click="showMobileMenu = false">
            Login
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

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
  font-family: 'Poppins', sans-serif;
}
.container-fluid {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  padding: 0.5rem 1rem;
  gap: 1rem;
}
.navbar-brand {
  display: flex;
  align-items: center;
}
.nav-logo {
  height: 36px;
  width: auto;
  object-fit: contain;
}
.navbar-nav {
  display: flex;
  flex-direction: row;
  gap: clamp(1rem, 2vw, 2.5rem);
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
  transition: color 0.2s ease;
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
.has-caret::after {
  content: '⌄';
  display: inline-block;
  margin-left: 6px;
  transition: transform 0.25s ease;
}
.nav-button[aria-expanded='true']::after {
  transform: rotate(180deg);
}
.nav-has-dropdown .dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
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
  font-weight: 500;
}
.dropdown-item:hover {
  background: #f7f7f7;
  color: #ff7f50;
}
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
.visually-hidden {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
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
@media (min-width: 992px) {
  .desktop-nav {
    display: flex;
  }
  .hamburger,
  .mobile-menu {
    display: none;
  }
}
@media (max-width: 991.98px) {
  .desktop-nav {
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
    background: #fff;
    border-top: 1px solid #eee;
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
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
    margin: 0;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .mobile-nav-list a {
    color: #333;
    font-weight: 600;
    font-size: 1.05rem;
    text-decoration: none;
    transition: color 0.2s;
  }
  .mobile-nav-list a:hover {
    color: #ff7f50;
  }
  details {
    border-radius: 8px;
    transition: background 0.2s;
  }
  details[open] {
    background: #fdfdfd;
  }
  summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    list-style: none;
    font-size: 1.05rem;
  }
  summary::after {
    content: '⌄';
    font-size: 1rem;
    margin-left: 6px;
    transition: transform 0.3s ease;
  }
  details[open] summary::after {
    transform: rotate(180deg);
  }
  .mobile-submenu {
    margin-top: 0.5rem;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  #logout-mobile {
    width: 100%;
    background: #dc3545;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px;
    font-weight: 600;
    margin-top: 8px;
    transition: background 0.2s;
  }
  #logout-mobile:hover {
    background: #b82c38;
  }
}
</style>
