<template>
  <section
    class="hero-section"
    aria-label="Admin dashboard header"
    :style="{ backgroundImage: `url(${adminPic})` }"
  >
    <div class="overlay"></div>
    <div class="container text-center text-white">
      <h1 class="display-5 fw-bold">Admin Dashboard</h1>
      <p class="lead">Monitor performance, manage schedules, and communicate efficiently</p>
    </div>
  </section>

  <div class="container-fluid py-5">
    <div class="row g-4">
      <div class="col-12 col-lg-6">
        <section class="card shadow-sm border-0 p-4">
          <h2 class="h5 fw-semibold text-primary mb-3">Platform Insights</h2>
          <canvas id="bookingsChart"></canvas>
          <hr />
          <canvas id="popularChart"></canvas>
        </section>
      </div>

      <div class="col-12 col-lg-6">
        <section class="card shadow-sm border-0 p-4" aria-labelledby="calendar-title">
          <h2 id="calendar-title" class="h5 fw-semibold text-success mb-3">Booking Overview</h2>
          <ul class="list-group small">
            <li
              v-for="(e, i) in events"
              :key="i"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{{ e.name }}</strong> — {{ e.date }}
              </span>
              <span v-if="e.conflict" class="badge bg-danger">Conflict</span>
              <span v-else class="badge bg-secondary">OK</span>
            </li>
          </ul>
          <div v-if="hasConflicts" class="alert alert-warning mt-3 mb-0" role="alert">
            ⚠ Some bookings overlap. Please review schedule.
          </div>
        </section>
      </div>

      <div class="col-12 col-lg-6">
        <section class="card shadow-sm border-0 p-4" aria-labelledby="bulkmail-title">
          <h2 id="bulkmail-title" class="h5 fw-semibold text-info mb-3">Send Bulk Message</h2>
          <form @submit.prevent="sendMessage">
            <div class="mb-3">
              <label for="msgTitle" class="form-label">Title</label>
              <input v-model="msgTitle" id="msgTitle" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="msgBody" class="form-label">Message</label>
              <textarea
                v-model="msgBody"
                id="msgBody"
                class="form-control"
                rows="3"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100" :disabled="isSending">
              {{ isSending ? 'Sending...' : 'Send to All Users' }}
            </button>
          </form>
          <p v-if="sentStatus" class="mt-3 text-success fw-semibold">{{ sentStatus }}</p>
        </section>
      </div>

      <div class="col-12 col-lg-6">
        <section class="card shadow-sm border-0 p-4" aria-labelledby="export-title">
          <h2 id="export-title" class="h5 fw-semibold text-warning mb-3">Export Data</h2>
          <p class="text-muted small mb-3">
            Download a CSV of all bookings for offline analysis or API integration.
          </p>
          <button class="btn btn-outline-warning w-100" @click="exportData">
            ⬇ Download Bookings CSV
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init.js'
import { collection, getDocs } from 'firebase/firestore'
import Chart from 'chart.js/auto'
import adminPic from '@/assets/icons/adminboardPic.jpg?url'
import axios from 'axios'

const bookings = ref([])
const events = ref([])
const hasConflicts = ref(false)
const msgTitle = ref('')
const msgBody = ref('')
const sentStatus = ref('')
const isSending = ref(false)

function dateToYMD(val) {
  if (!val) return 'Unknown'
  if (typeof val === 'string') return val.substring(0, 10)
  if (val.toDate) return val.toDate().toISOString().substring(0, 10)
  if (typeof val.seconds === 'number')
    return new Date(val.seconds * 1000).toISOString().substring(0, 10)
  return 'Unknown'
}

async function loadBookings() {
  const snapshot = await getDocs(collection(db, 'bookings'))
  bookings.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  generateCharts()
  simulateCalendar()
}

function simulateCalendar() {
  const mapped = bookings.value.slice(0, 6).map((b) => ({
    name: b.event || 'Untitled',
    date: dateToYMD(b.date),
  }))
  mapped.sort((a, b) => a.date.localeCompare(b.date))
  let conflict = false
  for (let i = 1; i < mapped.length; i++) {
    if (mapped[i].date !== 'Unknown' && mapped[i].date === mapped[i - 1].date) {
      mapped[i].conflict = true
      mapped[i - 1].conflict = true
      conflict = true
    } else {
      mapped[i].conflict = mapped[i].conflict || false
    }
  }
  events.value = mapped
  hasConflicts.value = conflict
}

function generateCharts() {
  const ctx1 = document.getElementById('bookingsChart')
  const ctx2 = document.getElementById('popularChart')

  const byDate = {}
  bookings.value.forEach((b) => {
    const day = dateToYMD(b.date)
    byDate[day] = (byDate[day] || 0) + 1
  })

  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: Object.keys(byDate),
      datasets: [
        {
          label: 'Bookings per Day',
          data: Object.values(byDate),
          borderColor: '#0a6aa1',
          backgroundColor: 'rgba(10,106,161,0.1)',
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  })

  const byType = {}
  bookings.value.forEach((b) => {
    const key = b.event || 'Other'
    byType[key] = (byType[key] || 0) + 1
  })

  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: Object.keys(byType),
      datasets: [
        {
          label: 'Event Popularity',
          data: Object.values(byType),
          backgroundColor: ['#0a6aa1', '#2b8ce1', '#ff7f50', '#ffc107', '#6c757d'],
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } },
  })
}

async function sendMessage() {
  if (!msgTitle.value || !msgBody.value) return
  try {
    isSending.value = true
    sentStatus.value = ''
    await axios.post(
      'https://us-central1-pawerup-92f54.cloudfunctions.net/sendBulkMessage',
      { title: msgTitle.value, message: msgBody.value },
      { headers: { 'Content-Type': 'application/json' } },
    )
    sentStatus.value = 'Message sent successfully!'
    msgTitle.value = ''
    msgBody.value = ''
  } catch (err) {
    sentStatus.value = 'Failed to send message.'
    console.error(err)
  } finally {
    isSending.value = false
  }
}

function exportData() {
  if (!bookings.value.length) return alert('No data to export.')
  const csvHeader = ['Event', 'Date', 'Email', 'Reason']
  const csvRows = bookings.value.map((b) => [
    b.event || '',
    dateToYMD(b.date),
    b.email || '',
    b.reason || '',
  ])
  const csv = [csvHeader, ...csvRows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'bookings_data.csv'
  link.click()
}

onMounted(() => {
  loadBookings()
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
.card {
  border-radius: 14px;
  background: #fff;
}
h2 {
  color: #0a6aa1;
}
.alert {
  font-size: 0.9rem;
}
canvas {
  width: 100% !important;
  max-height: 300px;
}
.btn {
  min-height: 44px;
}
@media (max-width: 992px) {
  canvas {
    max-height: 220px;
  }
}
</style>
