<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const isMenuOpen = ref(false)
const openSubmenus = ref({})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleSubmenu = (key) => {
  openSubmenus.value[key] = !openSubmenus.value[key]
}

const screenWidth = ref(window.innerWidth)
const isLargeScreen = computed(() => screenWidth.value > 768)

const updateWidth = () => {
  screenWidth.value = window.innerWidth
}

const handleClickOutside = (event) => {
  const nav = document.querySelector('.navbar')
  if (nav && !nav.contains(event.target)) {
    isMenuOpen.value = false
    openSubmenus.value = {}
  }
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/">Home</router-link>
    </div>

    <button class="hamburger" @click="toggleMenu">☰</button>

    <ul :class="{ open: isMenuOpen }">
      <li class="nav-item has-submenu">
        <span @click="toggleSubmenu('about')">About ▾</span>
        <ul class="submenu" v-show="openSubmenus.about || isLargeScreen">
          <li><router-link to="/about#mission">Our Mission</router-link></li>
          <li><router-link to="/about#story">Our Story</router-link></li>
          <li><router-link to="/about#team">Meet the Team</router-link></li>
          <li><router-link to="/about#faq">FAQ</router-link></li>
        </ul>
      </li>

      <li class="nav-item has-submenu">
        <span @click="toggleSubmenu('programs')">Programs ▾</span>
        <ul class="submenu" v-show="openSubmenus.programs || isLargeScreen">
          <li><router-link to="/private-sessions">Private Sessions</router-link></li>
          <li><router-link to="/calendar">Session Calendar</router-link></li>
          <li class="has-submenu">
            <span @click="toggleSubmenu('booking')">Booking ▸</span>
            <ul class="submenu" v-show="openSubmenus.booking || isLargeScreen">
              <li><router-link to="/booking">Booking Form</router-link></li>
              <li><router-link to="/booking-confirmation">Booking Confirmation</router-link></li>
            </ul>
          </li>
          <li><router-link to="/public-events">Public Events</router-link></li>
          <li><router-link to="/upcoming-events">Upcoming Events</router-link></li>
          <li><router-link to="/event-details">Event Details</router-link></li>
        </ul>
      </li>

      <li class="nav-item has-submenu">
        <span @click="toggleSubmenu('getInvolved')">Get Involved ▾</span>
        <ul class="submenu" v-show="openSubmenus.getInvolved || isLargeScreen">
          <li><router-link to="/volunteer">Become a Volunteer</router-link></li>
          <li><router-link to="/requirements">Volunteer Requirements</router-link></li>
          <li><router-link to="/dog-owner">Dog Owner Applications</router-link></li>
        </ul>
      </li>

      <li class="nav-item has-submenu">
        <span @click="toggleSubmenu('resources')">Stories & Resources ▾</span>
        <ul class="submenu" v-show="openSubmenus.resources || isLargeScreen">
          <li><router-link to="/participant-stories">Participant Stories</router-link></li>
          <li><router-link to="/gallery">Photo & Video Gallery</router-link></li>
          <li><router-link to="/mental-health-support">Mental Health Support</router-link></li>
          <li><router-link to="/self-care-tips">Self-care Tips</router-link></li>
        </ul>
      </li>

      <li class="nav-item has-submenu">
        <span @click="toggleSubmenu('contact')">Contact ▾</span>
        <ul class="submenu" v-show="openSubmenus.contact || isLargeScreen">
          <li><router-link to="/contact-form">Contact Form</router-link></li>
          <li><router-link to="/email-phone">Email & Phone</router-link></li>
        </ul>
      </li>

      <li class="nav-item nav-right">
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  font-family: 'Lato', sans-serif;
  padding: 8px 16px;
  border-radius: 12px;
  position: relative;
  z-index: 10;
  background: #fdfaf4;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
}

.nav-left {
  flex: 1;
  justify-content: flex-start;
}
.nav-right {
  flex: 1;
  justify-content: flex-end;
}

.navbar ul {
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
  list-style: none;
  justify-content: center;
  flex: 3;
}

.nav-item {
  position: relative;
  font-weight: 500;
  font-size: 1.05rem;
  white-space: nowrap;
}

.nav-item > a,
.nav-item > span {
  color: #212615;
  padding: 6px 14px;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  transition:
    color 0.3s,
    background 0.3s;
}

.nav-item > a:hover,
.nav-item > span:hover {
  color: #33511c;
  background: rgba(245, 245, 245, 0.5);
}

.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border-radius: 12px;
  padding: 6px 0;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  opacity: 0;
  visibility: hidden;
  transform: translateY(5px);
  transition:
    opacity 0.25s ease,
    visibility 0.25s ease,
    transform 0.25s ease;
  z-index: 1000;
}

.nav-item.has-submenu:hover > .submenu,
.nav-item.has-submenu:focus-within > .submenu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.submenu li a {
  display: block;
  padding: 8px 16px;
  color: #212615;
  font-weight: 400;
  font-size: 0.92rem;
  border-radius: 10px;
  transition:
    background 0.2s,
    transform 0.2s;
}

.submenu li a:hover {
  background: rgba(220, 220, 220, 0.3);
  transform: translateX(2px);
}

.submenu li.has-submenu > .submenu {
  top: 0;
  left: 100%;
  background: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }
  .navbar ul {
    display: none;
    flex-direction: column;
    width: 100%;
    background: #fdfaf4;
    position: absolute;
    top: 100%;
    left: 0;
    border-radius: 8px;
    padding: 10px 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  .navbar ul.open {
    display: flex;
  }
  .submenu {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    box-shadow: none;
  }
  .submenu li a {
    padding-left: 20px;
  }
}
</style>
