<template>
  <section
    class="hero-section"
    aria-label="User dashboard header"
    :style="{ backgroundImage: `url(${userboardPic})` }"
  >
    <div class="overlay"></div>
    <div class="container text-center text-white">
      <h1 class="display-5 fw-bold">User Dashboard</h1>
      <p class="lead">Track your bookings and messages, and explore events nearby</p>
    </div>
  </section>

  <div class="container-fluid py-5">
    <div class="row g-4">
      <div class="col-12 col-lg-4">
        <section class="card profile-card shadow-sm border-0 p-4" aria-labelledby="profile-title">
          <h2 id="profile-title" class="visually-hidden">Profile</h2>
          <div class="d-flex align-items-center gap-3">
            <img
              :src="user.avatar"
              alt="User avatar"
              class="rounded-circle border border-3"
              width="88"
              height="88"
            />
            <div>
              <p class="h6 fw-bold text-title mb-1">{{ user.name }}</p>
              <p class="text-muted mb-1 small">{{ user.email }}</p>
              <small class="text-secondary">Joined: {{ user.joined }}</small>
            </div>
          </div>
          <hr />
          <div class="row text-center">
            <div class="col">
              <p class="stat-num text-success mb-0">{{ bookings.length }}</p>
              <p class="small text-muted mb-0">Bookings</p>
            </div>
            <div class="col">
              <p class="stat-num text-info mb-0">{{ ratedCount }}</p>
              <p class="small text-muted mb-0">Rated</p>
            </div>
            <div class="col">
              <p class="stat-num text-warning mb-0">{{ recommendations.length }}</p>
              <p class="small text-muted mb-0">Nearby</p>
            </div>
          </div>
        </section>

        <section
          class="card booking-card shadow-sm p-4 border-0 mt-4"
          aria-labelledby="bookings-title"
        >
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 id="bookings-title" class="h5 fw-semibold text-success mb-0">My Bookings</h2>
            <i class="bi bi-calendar2-check fs-5 text-muted" aria-hidden="true"></i>
          </div>
          <ul class="list-group list-group-flush">
            <li v-for="b in bookings" :key="b.id" class="list-group-item py-3">
              <div class="d-flex justify-content-between align-items-center gap-3">
                <div>
                  <strong>{{ b.event }}</strong>
                  <p class="small text-muted mb-0">📅 {{ b.date }}</p>
                </div>
                <div>
                  <button
                    v-if="!b.rated && b !== selectedBooking"
                    class="btn btn-sm btn-outline-info"
                    @click="openRating(b)"
                  >
                    Rate
                  </button>
                  <span v-else-if="b.rated" class="badge bg-success">Rated</span>
                </div>
              </div>
              <div v-if="b === selectedBooking" class="mt-2">
                <span
                  v-for="n in 5"
                  :key="n"
                  class="fs-4 star"
                  :class="rating >= n ? 'text-warning' : 'text-muted'"
                  role="button"
                  tabindex="0"
                  @click="rating = n"
                  @keydown.enter="rating = n"
                  >★</span
                >
                <div class="mt-2 d-flex gap-2">
                  <button class="btn btn-sm btn-success" @click="submitRating(b)">Submit</button>
                  <button class="btn btn-sm btn-secondary" @click="cancelRating">Cancel</button>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>

      <div class="col-12 col-lg-8">
        <section class="card inbox-card shadow-sm border-0 p-3 mb-4" aria-labelledby="inbox-title">
          <h2 id="inbox-title" class="h5 text-title fw-bold mb-3">Inbox Messages</h2>
          <ul v-if="messages.length" class="list-group">
            <li v-for="m in messages" :key="m.id" class="list-group-item">
              <div class="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <strong class="d-block">{{ m.title }}</strong>
                  <small class="text-muted">{{ formatTimestamp(m.timestamp) }}</small>
                </div>
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="toggleDetail(m)"
                  :aria-expanded="m.showDetail ? 'true' : 'false'"
                  :aria-controls="`msg-${m.id}`"
                >
                  {{ m.showDetail ? 'Hide' : 'View' }}
                </button>
              </div>
              <div v-if="m.showDetail" class="mt-3 msg-box" :id="`msg-${m.id}`">
                <p class="mb-2 text-dark">{{ m.message }}</p>
                <div v-if="m.details" class="msg-details">
                  <p v-for="(val, key) in m.details" :key="key">
                    <strong>{{ key }}:</strong> {{ val }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <p v-else class="text-center text-muted mb-0">No messages yet.</p>
        </section>

        <section class="card map-card shadow-sm border-0 p-3" aria-labelledby="nearby-title">
          <h2 id="nearby-title" class="h5 text-title fw-bold mb-3">Recommended Nearby Events</h2>
          <div v-if="recommendations.length" class="recommendations mb-3" role="list">
            <div
              v-for="(spot, i) in recommendations"
              :key="spot.name"
              class="rec-row p-3 mb-3 rounded-3 border"
              role="listitem"
            >
              <div class="d-flex justify-content-between align-items-start">
                <div class="pe-2">
                  <h3 class="h6 fw-bold text-dark mb-1">{{ i + 1 }}. {{ spot.name }}</h3>
                  <small class="text-muted d-block mb-1">{{ spot.distance.toFixed(2) }} km</small>
                  <p class="mb-1 text-muted small">{{ spot.description }}</p>
                  <small class="text-secondary d-block">📍 {{ spot.address }}</small>
                </div>
                <a
                  class="icon-btn mt-1"
                  :href="navLink(spot)"
                  target="_blank"
                  rel="noopener"
                  :aria-label="`Navigate to ${spot.name}`"
                  title="Navigate"
                >
                  <img src="@/assets/icons/map.svg" alt="Navigate" width="24" height="24" />
                </a>
              </div>
            </div>
          </div>
          <div v-else class="empty-tip text-center text-muted mb-3">
            Enable location or search start point to see spots
          </div>
          <div class="map-wrapper" aria-label="Map with route and search controls">
            <Map
              @update-recommendations="updateRecommendations"
              @route-details="updateRouteDetails"
            />
          </div>
          <div v-if="routeDetails" class="route-details mt-3 p-3 bg-light rounded-3 border">
            <h3 class="h6 fw-bold text-dark mb-2">Route Details</h3>
            <p class="small text-muted mb-1"><strong>From:</strong> {{ routeDetails.start }}</p>
            <p class="small text-muted mb-1"><strong>To:</strong> {{ routeDetails.end }}</p>
            <p class="small text-muted">
              <strong>Distance:</strong> {{ routeDetails.distance }} km ·
              <strong>Duration:</strong> {{ routeDetails.duration }} min
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { httpsCallable } from 'firebase/functions'
import { functions, auth, db } from '@/firebase/init.js'
import { onAuthStateChanged } from 'firebase/auth'
import { ratingsStore } from '@/stores/ratingStore.js'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import Map from '@/components/Map.vue'
import userboardPic from '@/assets/icons/userboardPic.jpg?url'
import profilePic from '@/assets/icons/profile.jpg?url'

const user = ref({ name: 'Guest User', email: 'guest@example.com', joined: '', avatar: profilePic })
const bookings = ref(ratingsStore.bookings)
const selectedBooking = ref(null)
const rating = ref(0)
const recommendations = ref([])
const messages = ref([])
const routeDetails = ref(null)
const ratedCount = computed(() => bookings.value.filter((b) => b.rated).length)
let unsubscribe = null
const getInboxMessages = httpsCallable(functions, 'getInboxMessages')

function openRating(b) {
  selectedBooking.value = b
  rating.value = 0
}
function submitRating(b) {
  if (rating.value === 0) return alert('Please select a rating')
  const ok = ratingsStore.addRating(b.id, user.value.email, rating.value)
  if (ok) b.rated = true
  selectedBooking.value = null
  rating.value = 0
}
function cancelRating() {
  selectedBooking.value = null
  rating.value = 0
}
function updateRecommendations(spots) {
  recommendations.value = spots || []
}
function updateRouteDetails(details) {
  routeDetails.value = details
}
function navLink(spot) {
  if (spot?.lat && spot?.lng)
    return `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`
  const q = encodeURIComponent(spot?.address || spot?.name || '')
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}
function formatTimestamp(ts) {
  if (!ts) return 'Pending...'
  if (ts.toDate) return ts.toDate().toLocaleString()
  return new Date(ts).toLocaleString()
}
function toggleDetail(msg) {
  msg.showDetail = !msg.showDetail
}

onMounted(() => {
  onAuthStateChanged(auth, async (u) => {
    if (u) {
      user.value.email = u.email
      user.value.name = u.displayName || 'Anonymous'
      user.value.avatar = u.photoURL || profilePic
      const res = await getInboxMessages({ uid: u.uid })
      messages.value = res.data.msgs.map((m) => ({ ...m, showDetail: false }))
      const q = query(collection(db, 'inboxes', u.uid, 'msgs'), orderBy('timestamp', 'desc'))
      unsubscribe = onSnapshot(q, (snapshot) => {
        const newMsgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          showDetail: false,
        }))
        messages.value = newMsgs
      })
    }
  })
})
onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})
</script>

<style scoped>
.hero-section {
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 5rem 0;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}
.text-title {
  color: #0a6aa1;
}
.profile-card,
.booking-card,
.inbox-card,
.map-card {
  background: #fff;
  border-radius: 14px;
}
.stat-num {
  font-size: 1.25rem;
  font-weight: 800;
}
.star {
  cursor: pointer;
}
.inbox-card {
  max-height: 340px;
  overflow-y: auto;
}
.msg-box {
  background: #f8f9fb;
  border-radius: 10px;
  padding: 10px 14px;
  border: 1px solid #e1e4e8;
}
.msg-details p {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: #333;
}
.msg-details strong {
  color: #0a6aa1;
}
.map-wrapper {
  height: 640px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
:deep(.map-container) {
  flex: 1 1 auto;
  height: 100% !important;
  min-height: 400px !important;
}
.recommendations .rec-row {
  background: #f8fafc;
  border-left: 4px solid #2b8ce1;
}
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid #0a6aa1;
  color: #0a6aa1;
  text-decoration: none;
}
.route-details {
  font-size: 0.9rem;
}
.btn {
  min-height: 44px;
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
@media (max-width: 992px) {
  .map-wrapper {
    height: auto;
    min-height: 480px;
  }
  :deep(.map-container) {
    min-height: 480px !important;
  }
}
@media (max-width: 576px) {
  .map-wrapper {
    height: auto;
    min-height: 420px;
  }
  :deep(.map-container) {
    min-height: 420px !important;
  }
}
</style>
