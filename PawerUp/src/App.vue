<!-- App.vue -->
<template>
  <div>
    <NavBar :hasBooked="hasBooked" />
    <router-view @booking-complete="onBookingComplete" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/Navbar.vue'

const hasBooked = ref(false)

const onBookingComplete = () => {
  hasBooked.value = true
}
</script>
