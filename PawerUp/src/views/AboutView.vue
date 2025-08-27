<script setup></script>

<template>
  <div class="about-container">
    <h1>About Pawer Up NFP</h1>

    <section class="mission">
      <h2>Our Mission</h2>
      <p>
        Our mission is to provide safe, stigma-free access to therapy dog interactions for youth,
        promoting mental health and wellbeing in Victoria.
      </p>
    </section>

    <section class="story">
      <h2>Our Story</h2>
      <p>
        Pawer Up NFP was founded with the vision to bring emotional support to young people through
        community-based programs with therapy dogs. Our journey started in 2020...
      </p>
    </section>

    <section class="team">
      <h2>Meet the Team</h2>
      <p>
        Our team consists of mental health professionals, volunteer coordinators, and certified
        therapy dog handlers dedicated to supporting youth wellbeing.
      </p>
    </section>

    <section class="faq">
      <h2>FAQ</h2>
      <p>Find answers to common questions about our programs and participation.</p>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1000px; /* wider container */
  margin: 60px auto; /* more space around container */
  padding: 35px 40px; /* larger padding */
  font-family: 'Segoe UI', sans-serif;
  color: #212615;
  background: linear-gradient(135deg, #fafcf8, #fbcda1);
  border-radius: 30px; /* slightly larger rounded corners */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); /* more depth */
  position: relative;
  overflow: hidden;
}

/* Decorative ellipses */
.about-container::before,
.about-container::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
}

.about-container::before {
  width: 250px; /* larger ellipse */
  height: 250px;
  background-color: #b5dcc6;
  top: -60px;
  left: -60px;
}

.about-container::after {
  width: 200px;
  height: 200px;
  background-color: #fde4e1;
  bottom: -50px;
  right: -50px;
}

/* Headings */
.about-container h1 {
  font-size: 2.8rem; /* larger main title */
  text-align: center;
  margin-bottom: 30px;
  color: #5c8b39;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.about-container h2 {
  font-size: 1.8rem; /* slightly larger secondary title */
  color: #89b8a3;
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: 500;
  letter-spacing: 0.4px;
}

/* Paragraphs */
.about-container p {
  font-size: 1.05rem; /* slightly larger text */
  line-height: 1.8; /* more breathing space */
  margin-top: 12px;
  color: #212615;
}

.about-container p:not(:last-child) {
  margin-bottom: 18px; /* larger paragraph spacing */
}
</style>
