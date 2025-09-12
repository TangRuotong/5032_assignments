<script setup>
import { ratingsStore } from '../stores/ratingStore.js'
</script>

<template>
  <section class="programs-view-section py-5">
    <div class="container">
      <h1 class="text-center mb-5">Our Programs</h1>

      <div v-for="booking in ratingsStore.bookings" :key="booking.id" class="program-bar mb-4">
        <div
          class="program-content d-flex flex-column flex-md-row align-items-center justify-content-between p-4"
        >
          <div class="program-info">
            <h2>{{ booking.event }}</h2>
            <p>
              Description of {{ booking.event }} goes here. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
            <p v-if="booking.ratings.length > 0" class="text-warning mb-0">
              ⭐Recommended index: {{ ratingsStore.getAverage(booking.id) }} ({{
                booking.ratings.length
              }}
              ratings)
            </p>
            <p v-else class="text-muted mb-0">No ratings yet</p>
          </div>
          <div class="program-action mt-3 mt-md-0">
            <router-link :to="`/booking`" class="btn btn-primary">Book Now</router-link>
          </div>
        </div>
      </div>

      <div class="row mt-5 g-4">
        <div class="col-md-6">
          <div class="extra-bar p-4">
            <h3>Session Calendar</h3>
            <p>
              Check our session calendar for upcoming therapy dog events and book your preferred
              timeslot.
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="extra-bar p-4">
            <h3>Booking</h3>
            <p>
              Use our <router-link to="/booking">Booking Form</router-link> to reserve a session.
              After booking, view your
              <router-link to="/userBoard">Booking Confirmation</router-link>.
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="extra-bar p-4">
            <h3>Public Events</h3>
            <p>
              Participate in community events featuring therapy dogs, workshops, and mental health
              activities.
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="extra-bar p-4">
            <h3>Upcoming Events</h3>
            <p>Stay updated on future events and register early to secure your spot.</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="extra-bar p-4">
            <h3>Event Details</h3>
            <p>Learn more about individual events, including location, timing, and activities.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.programs-view-section {
  font-family: 'Poppins', sans-serif;
  background: url('https://live.staticflickr.com/4134/4805426720_90b216340b_b.jpg') center/cover
    no-repeat;
  padding-top: 800px;
  padding-bottom: 800px;
  position: relative;
}

.programs-view-section h1 {
  font-weight: 600;
  color: #fdf8f8;
  letter-spacing: 0.6px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
}

.program-bar {
  border-radius: 16px;
  background: #fff;
  border: 1px solid #eee;
  color: #333;
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.program-bar:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
}

.program-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.program-info h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #16a6e0;
}

.program-info p {
  font-weight: 300;
  line-height: 1.5;
  margin-bottom: 6px;
  color: #555;
}

.program-action .btn-primary {
  background: #16a6e0;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  color: #fff;
  transition: 0.3s;
}

.program-action .btn-primary:hover {
  background: #16a6e0;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(249, 109, 0, 0.3);
}

.extra-bar {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #eee;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.extra-bar:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.extra-bar h3 {
  font-weight: 600;
  color: #16a6e0;
  margin-bottom: 10px;
}

.extra-bar p {
  font-weight: 300;
  line-height: 1.6;
  color: #555;
}
</style>
