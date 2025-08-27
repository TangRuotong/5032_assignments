<script setup></script>

<template>
  <div class="programs-container">
    <h1>Our Programs</h1>

    <!-- Private Sessions -->
    <section id="private-sessions" class="program-section">
      <h2>Private Therapy Sessions</h2>
      <p>
        One-on-one therapy dog sessions tailored to individual needs, focusing on mental health and
        wellbeing.
      </p>
    </section>

    <!-- Session Calendar -->
    <section id="calendar" class="program-section">
      <h2>Session Calendar</h2>
      <p>
        Check our session calendar for upcoming therapy dog events and book your preferred timeslot.
      </p>
    </section>

    <!-- Booking Form -->
    <section id="booking" class="program-section">
      <h2>Booking</h2>
      <p>
        Use our <router-link to="/booking">Booking Form</router-link> to reserve a session. After
        booking, you can view your
        <router-link to="/booking-confirmation">Booking Confirmation</router-link>.
      </p>
    </section>

    <!-- Public Events -->
    <section id="public-events" class="program-section">
      <h2>Public Events</h2>
      <p>
        Participate in community events featuring therapy dogs, workshops, and mental health
        activities.
      </p>
    </section>

    <!-- Upcoming Events -->
    <section id="upcoming-events" class="program-section">
      <h2>Upcoming Events</h2>
      <p>Stay updated on future events and register early to secure your spot.</p>
    </section>

    <!-- Event Details -->
    <section id="event-details" class="program-section">
      <h2>Event Details</h2>
      <p>Learn more about individual events, including location, timing, and activities.</p>
    </section>
  </div>
</template>

<style scoped>
.programs-container {
  max-width: 960px;
  margin: 30px auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #003e4d;
  background: linear-gradient(135deg, #e0f7f4, #d0f0e0);
  border-radius: 15px;
}

.programs-container h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
}

.program-section {
  background-color: rgba(255, 255, 255, 0.85);
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.program-section:hover {
  transform: translateY(-3px);
}

.programs-container h2 {
  font-size: 1.4rem;
  color: #00796b;
  margin-bottom: 8px;
}

.programs-container p {
  font-size: 1rem;
  line-height: 1.6;
}

/* Router links style for consistency */
.programs-container a {
  color: #004d40;
  text-decoration: underline;
  font-weight: 600;
}

.programs-container a:hover {
  color: #00796b;
}
</style>
