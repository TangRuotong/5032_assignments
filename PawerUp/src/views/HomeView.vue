<script setup></script>

<template>
  <div class="home-container">
    <div class="home-header">
      <h1>Welcome to Pawer Up</h1>
      <p>Supporting youth mental health with therapy dog interactions</p>
    </div>

    <div class="home-main">
      <div class="highlight-card card-1">
        <h2>Community</h2>
        <p>Engage with local therapy dog programs and events</p>
      </div>

      <div class="highlight-card card-2">
        <h2>Support</h2>
        <p>Get emotional support and guidance from professionals</p>
      </div>

      <div class="highlight-card card-3">
        <h2>Activities</h2>
        <p>Participate in workshops, classes, and interactive sessions</p>
      </div>

      <div class="highlight-card card-4">
        <h2>Resources</h2>
        <p>Access mental health tips, articles, and helpful tools</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  font-family: 'Lato', sans-serif;
  padding: 40px 20px;
  background: #fafcf8;
  min-height: 100vh;
  color: #212615;
  max-width: 95vw; /* responsive width */
  margin: 0 auto;
}

/* Header */
.home-header {
  text-align: center;
  margin-bottom: 50px;
}

.home-header h1 {
  font-size: 3.2rem;
  font-weight: 300;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
}

.home-header p {
  font-size: 1.2rem;
  font-weight: 300;
  color: #212615;
}

/* Card layout - staggered, irregular */
.home-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  position: relative;
}

/* Card base */
.highlight-card {
  border-radius: 30px;
  padding: 30px;
  flex: 1 1 280px; /* responsive card width */
  max-width: 300px; /* original design width */
  min-height: 180px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  background-clip: padding-box;
}

/* Card hover effect */
.highlight-card:hover {
  transform: translateY(-10px) rotate(-1deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Card shape variation */
.highlight-card.rounded {
  border-radius: 40px 20px 40px 20px;
}

.highlight-card-circle {
  border-radius: 50% / 30%;
}

/* Card colors */
.card-green {
  background-color: #b5dcc6;
}
.card-darkgreen {
  background-color: #89b8a3;
}
.card-pink {
  background-color: #fde4e1;
}
.card-peach {
  background-color: #fbcda1;
}

/* Title & text */
.highlight-card h2 {
  font-size: 1.6rem;
  font-weight: 300;
  margin-bottom: 12px;
  color: #212615;
}

.highlight-card p {
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: 300;
}

/* Optional layer behind cards */
.card-layer {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  z-index: 0;
}
.card-layer-1 {
  width: 200px;
  height: 200px;
  background: #b1c4d9;
  top: -30px;
  left: -50px;
}
.card-layer-2 {
  width: 150px;
  height: 150px;
  background: #fde4e1;
  bottom: -20px;
  right: 20px;
}

/* Responsive adjustments for small screens */
@media (max-width: 576px) {
  .home-header h1 {
    font-size: 2.4rem;
  }
  .home-header p {
    font-size: 1rem;
  }
  .highlight-card {
    padding: 20px;
    min-height: 160px;
  }
}
</style>
