<script setup>
import { ref } from 'vue'
import { auth } from '../firebase/init.js'
import { onAuthStateChanged } from 'firebase/auth'
import { ratingsStore } from '../stores/ratingStore.js'

const user = ref({
  name: 'Guest User',
  email: 'guest@example.com',
  joined: '2024-08-10',
  avatar: 'https://i.pravatar.cc/150?img=12',
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
    user.value.avatar = currentUser.photoURL || user.value.avatar
    bookings.value.forEach((b) => {
      b.rated = ratingsStore.hasRated(b.id, user.value.email)
    })
  }
})
</script>

<template>
  <section class="hero-section text-white text-center">
    <div class="overlay"></div>
    <div class="container position-relative">
      <h1 class="display-4 fw-bold">User Dashboard</h1>
      <p class="lead">Manage your bookings, ratings, and profile</p>
    </div>
  </section>

  <div class="container py-5">
    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card profile-card shadow-lg text-center p-4">
          <img
            :src="user.avatar"
            alt="avatar"
            class="rounded-circle mb-3 border border-3 border-light"
            width="120"
          />
          <h4 class="fw-bold text-primary">{{ user.name }}</h4>
          <p class="text-muted">{{ user.email }}</p>
          <small class="text-secondary">Joined: {{ user.joined }}</small>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card booking-card shadow-lg p-4">
          <h3 class="mb-4 text-success">My Bookings</h3>
          <ul class="list-group">
            <li v-for="b in bookings" :key="b.id" class="list-group-item booking-item">
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
  </div>
</template>

<style scoped>
.hero-section {
  background: url('https://live.staticflickr.com/7734/17115609957_0c90eb3de5_b.jpg') center/cover
    no-repeat;
  padding: 100px 0;
  position: relative;
}
.hero-section .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(94, 94, 91, 0.35);
}
.hero-section h1,
.hero-section p {
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
}

@media (max-width: 1200px) {
  .hero-section {
    padding: 80px 0;
    background-position: center top;
  }
  .hero-section h1 {
    font-size: 1.8rem;
  }
  .hero-section p {
    font-size: 1rem;
  }
}

.card {
  border-radius: 15px;
  font-family: 'Poppins', sans-serif;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.profile-card {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.booking-card {
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  border: none;
}

button.btn-primary {
  background: #ff7f50;
  border: none;
}
button.btn-primary:hover {
  background: #ff6333;
}
button.btn-outline-primary {
  border-color: #ff7f50;
  color: #ff7f50;
}
button.btn-outline-primary:hover {
  background: #ff7f50;
  color: white;
}
</style>
