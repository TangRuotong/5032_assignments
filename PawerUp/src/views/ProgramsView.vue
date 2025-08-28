<script setup></script>

<template>
  <div class="container programs-container py-4">
    <h1>Our Programs</h1>

    <div class="row g-3">
      <!-- Private Sessions -->
      <div class="col-md-6 col-sm-6">
        <section class="program-section">
          <h2>Private Therapy Sessions</h2>
          <p>
            One-on-one therapy dog sessions tailored to individual needs, focusing on mental health
            and wellbeing.
          </p>
        </section>
      </div>

      <!-- Session Calendar -->
      <div class="col-md-6 col-sm-6">
        <section class="program-section">
          <h2>Session Calendar</h2>
          <p>
            Check our session calendar for upcoming therapy dog events and book your preferred
            timeslot.
          </p>
        </section>
      </div>

      <!-- Booking Form -->
      <div class="col-md-6 col-sm-6">
        <section class="program-section">
          <h2>Booking</h2>
          <p>
            Use our <router-link to="/booking">Booking Form</router-link> to reserve a session.
            After booking, view your
            <router-link to="/booking-confirmation">Booking Confirmation</router-link>.
          </p>
        </section>
      </div>

      <!-- Public Events -->
      <div class="col-md-6 col-sm-6">
        <section class="program-section">
          <h2>Public Events</h2>
          <p>
            Participate in community events featuring therapy dogs, workshops, and mental health
            activities.
          </p>
        </section>
      </div>

      <!-- Upcoming Events -->
      <div class="col-md-6 col-sm-6">
        <section class="program-section">
          <h2>Upcoming Events</h2>
          <p>Stay updated on future events and register early to secure your spot.</p>
        </section>
      </div>

      <!-- Event Details -->
      <div class="col-md-6 col-sm-6">
        <section class="program-section">
          <h2>Event Details</h2>
          <p>Learn more about individual events, including location, timing, and activities.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.programs-container {
  max-width: 960px;
  margin: 32px auto;
  padding: 48px 28px;
  font-family: 'Poppins', sans-serif;
  color: #003e4d;
  background: linear-gradient(135deg, #e0f7f4 0%, #d0f0e0 100%);
  border-radius: 20px;
  position: relative;
  overflow: visible;
}

.programs-container::before {
  content: '';
  position: absolute;
  width: 320px;
  height: 180px;
  right: -40px;
  top: -30px;
  background: radial-gradient(circle at 30% 30%, rgba(177, 196, 217, 0.12), transparent 40%);
  border-radius: 50%;
  pointer-events: none;
}

.programs-container h1 {
  font-size: 2.6rem;
  text-align: center;
  margin-bottom: 28px;
  font-weight: 400;
  letter-spacing: 0.6px;
  color: #214a3f;
}

/* card / section */
.program-section {
  background: rgba(255, 255, 255, 0.92);
  padding: 26px 22px;
  border-radius: 14px;
  border: 1px solid rgba(33, 74, 63, 0.04);
  box-shadow: 0 8px 26px rgba(16, 24, 32, 0.06);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.program-section:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(16, 24, 32, 0.08);
}

.programs-container h2 {
  font-size: 1.45rem;
  color: #33511c;
  margin-bottom: 10px;
  font-weight: 400;
  line-height: 1.1;
}

.programs-container p {
  font-size: 1rem;
  line-height: 1.7;
  color: #2a3d35;
  margin: 0;
  font-weight: 300;
}

.programs-container a {
  color: #004d40;
  text-decoration: underline;
  font-weight: 600;
}

.programs-container a:hover {
  color: #00796b;
}

.row > .col-md-6 > .program-section {
  margin-bottom: 0;
}

.programs-container .row {
  gap: 18px;
}
</style>
