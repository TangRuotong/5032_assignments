<template>
  <section
    class="hero-section text-white text-center"
    :style="{ backgroundImage: `url(${userboardPic})` }"
  >
    <div class="overlay"></div>
    <div class="container position-relative">
      <h1 class="display-4 fw-bold">User Dashboard</h1>
      <p class="lead">Manage your bookings, ratings, and explore therapy dog events</p>
    </div>
  </section>

  <div class="container py-5">
    <div class="row g-4">
      <!-- Profile Card -->
      <div class="col-md-4">
        <div class="card profile-card shadow-sm text-center p-4">
          <img
            :src="user.avatar"
            alt="avatar"
            class="rounded-circle mb-3 border border-3 border-light"
            width="120"
            height="120"
          />
          <h4 class="fw-bold text-primary mb-1">{{ user.name }}</h4>
          <p class="text-muted small mb-1">{{ user.email }}</p>
          <small class="text-secondary">Joined: {{ user.joined }}</small>
        </div>
      </div>

      <!-- Booking List -->
      <div class="col-md-8">
        <div class="card booking-card shadow-sm p-4">
          <h3 class="mb-4 text-success fw-semibold">My Bookings</h3>
          <ul class="list-group">
            <li
              v-for="b in bookings"
              :key="b.id"
              class="list-group-item booking-item border-0 border-bottom"
            >
              <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <strong class="text-dark">{{ b.event }}</strong>
                  <p class="mb-0 small text-muted">Date: {{ b.date }}</p>
                </div>
                <div>
                  <button
                    v-if="!b.rated && b !== selectedBooking"
                    class="btn btn-sm btn-outline-info"
                    @click="openRating(b)"
                  >
                    Rate
                  </button>
                  <span v-else-if="b.rated" class="badge bg-gradient bg-success">Rated</span>
                </div>
              </div>

              <div v-if="b === selectedBooking" class="d-flex align-items-center gap-2 mb-2">
                <span
                  v-for="n in 5"
                  :key="n"
                  class="fs-3 star"
                  :class="rating >= n ? 'text-warning' : 'text-muted'"
                  @click="rating = n"
                >
                  ★
                </span>
                <button class="btn btn-sm btn-success" @click="submitRating(b)">Submit</button>
                <button class="btn btn-sm btn-secondary" @click="cancelRating">Cancel</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="map-section mt-5">
      <h3 class="text-primary fw-bold mb-4 text-center">Find Therapy Dog Events Near You</h3>
      <Map />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '../firebase/init.js'
import { onAuthStateChanged } from 'firebase/auth'
import { ratingsStore } from '../stores/ratingStore.js'
import Map from '@/components/Map.vue'

import userboardPic from '@/assets/icons/userboardPic.jpg?url'
import profilePic from '@/assets/icons/profile.jpg?url'

const user = ref({
  name: 'Guest User',
  email: 'guest@example.com',
  joined: '2024-08-10',
  avatar: profilePic,
})

const bookings = ref(ratingsStore.bookings)
const selectedBooking = ref(null)
const rating = ref(0)

const openRating = (booking) => {
  selectedBooking.value = booking
  rating.value = 0
}

const submitRating = (booking) => {
  if (rating.value === 0) {
    alert('Please select a rating before submitting.')
    return
  }

  const success = ratingsStore.addRating(booking.id, user.value.email, rating.value)
  if (success) {
    booking.rated = true
    alert(`You rated "${booking.event}" with ${rating.value} stars!`)
  } else {
    alert('You have already rated this booking.')
  }

  selectedBooking.value = null
  rating.value = 0
}

const cancelRating = () => {
  selectedBooking.value = null
  rating.value = 0
}

onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    user.value.email = currentUser.email
    user.value.name = currentUser.displayName || 'Anonymous User'
    user.value.avatar = currentUser.photoURL || profilePic
    bookings.value.forEach((b) => {
      b.rated = ratingsStore.hasRated(b.id, user.value.email)
    })
  }
})
</script>

<style scoped>
.container {
  font-family: 'Poppins', sans-serif;
}

.hero-section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 100px 0;
  position: relative;
  color: #fff;
}
.hero-section .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(45, 60, 73, 0.45);
}
.hero-section h1,
.hero-section p {
  position: relative;
  z-index: 1;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
}

/* Cards */
.card {
  border-radius: 15px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.profile-card {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}
.booking-card {
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  border: none;
}

.map-section {
  background: linear-gradient(135deg, #c9f4e5 0%, #b5dcff 100%);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.map-section h3 {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
  text-align: center;
}

.star {
  cursor: pointer;
  transition: color 0.2s ease;
}

@media (max-width: 1200px) {
  .hero-section {
    padding: 80px 0;
  }
  .hero-section h1 {
    font-size: 1.8rem;
  }
  .hero-section p {
    font-size: 1rem;
  }
}
</style>
