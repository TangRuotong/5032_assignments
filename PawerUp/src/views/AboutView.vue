<script setup>
import aboutPic from '@/assets/icons/aboutPic.jpg?url'
</script>

<template>
<<<<<<< HEAD
  <div class="about-wrapper">
    <section class="about-hero" :style="{ backgroundImage: `url(${aboutPic})` }">
      <div class="hero-text text-center">
        <h1 class="hero-title">About PawerUp</h1>
        <p class="hero-subtitle">Creating calm, connection, and confidence through therapy dogs.</p>
=======
  <div class="about-hero" :style="{ backgroundImage: `url(${aboutPic})` }">
    <div class="overlay">
      <h1 class="hero-title">About Us</h1>
    </div>
  </div>

  <div class="container py-5 about-content">
    <div class="row justify-content-center gy-5">
      <div class="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8 col-xxl-7">
        <h2>Who We Are</h2>
        <p>
          We're a Victoria-based not-for-profit dedicated to supporting young people's mental health
          and wellbeing. Our mission is simple: make emotional support easy, friendly, and
          stigma-free.
        </p>

        <h2>What We Do</h2>
        <p>
          We connect young people with certified therapy dogs through short, low-pressure sessions
          on campuses and in community spaces. Whether you're feeling stressed, anxious, or just
          need a friendly companion, our programs help you feel calmer, more connected, and
          emotionally supported.
        </p>

        <h2>Who We Help</h2>
        <p>
          Our programs are designed for all young people who want support for their mental health
          and wellbeing. We focus on creating approachable, informal, and inclusive opportunities
          for youth to feel supported and connected.
        </p>
        <ul>
          <li>Students at university or TAFE dealing with study stress</li>
          <li>Young migrants or international students adjusting to life in Australia</li>
          <li>Young people in regional areas with limited access to mental health support</li>
        </ul>
        <p>
          Spending time with therapy dogs has been shown to reduce stress and encourage positive
          emotional connection.
        </p>

        <h2>How We Help</h2>
        <ul>
          <li>Book short sessions with therapy dogs in your community or campus</li>
          <li>Find out about upcoming pop-up events nearby</li>
          <li>Meet our volunteers and certified therapy dogs</li>
          <li>Read stories from young people who have benefitted from our programs</li>
        </ul>

        <h2>Why It Matters</h2>
        <p>
          Our web platform makes it easy for young people to access gentle emotional support without
          referrals or formal diagnosis. It's about building resilience, reducing loneliness, and
          giving every young person a safe space to feel supported.
        </p>
>>>>>>> 6a3e90072351c82c5dc2b9cbcd7dbc8922ef7302
      </div>
    </section>

    <section class="about-section py-5 px-4">
      <div class="container-fluid">
        <div class="row justify-content-center gy-5">
          <div class="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8 col-xxl-7">
            <h2 class="section-heading">Who We Are</h2>
            <p>
              We're a Victoria-based not-for-profit dedicated to supporting young people's mental
              health and wellbeing. Our mission is simple: make emotional support easy, friendly,
              and stigma-free.
            </p>

            <h2 class="section-heading">What We Do</h2>
            <p>
              We connect young people with certified therapy dogs through short, low-pressure
              sessions on campuses and in community spaces. Whether you're feeling stressed,
              anxious, or just need a friendly companion, our programs help you feel calmer, more
              connected, and emotionally supported.
            </p>

            <h2 class="section-heading">Who We Help</h2>
            <p>
              Our programs are designed for all young people who want support for their mental
              health and wellbeing. We focus on creating approachable, informal, and inclusive
              opportunities for youth to feel supported and connected.
            </p>
            <ul>
              <li>Students at university or TAFE managing study stress</li>
              <li>Young migrants or international students adjusting to life in Australia</li>
              <li>Young people in regional areas with limited access to mental health support</li>
            </ul>
            <p>
              Spending time with therapy dogs has been shown to reduce stress and encourage positive
              emotional connection.
            </p>

            <h2 class="section-heading">How We Help</h2>
            <ul>
              <li>Book short sessions with therapy dogs in your community or campus</li>
              <li>Find out about upcoming pop-up events nearby</li>
              <li>Meet our volunteers and certified therapy dogs</li>
              <li>Read stories from young people who have benefitted from our programs</li>
            </ul>

            <h2 class="section-heading">Why It Matters</h2>
            <p>
              Our web platform makes it easy for young people to access gentle emotional support
              without referrals or formal diagnosis. It's about building resilience, reducing
              loneliness, and giving every young person a safe space to feel supported.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section text-center py-5">
      <div class="container">
        <h2 class="cta-title">🐾 Join the PawerUp movement</h2>
        <p class="cta-subtitle">
          Be part of something meaningful — volunteer, partner, or simply spread the calm.
        </p>
        <button class="cta-button">Get Involved</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import aboutPic from '@/assets/icons/aboutPic.jpg?url'
</script>

<style scoped>
<<<<<<< HEAD
.about-wrapper {
  width: 100%;
  font-family: 'Poppins', sans-serif;
  background-color: #ffffff;
  color: #2c2c2c;
  overflow-x: hidden;
}

.about-hero {
  width: 100%;
  height: 70vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .hero-text {
  background: rgba(255, 255, 255, 0.65);
  border-radius: 20px;
  padding: 40px 30px;
  max-width: 900px;
} */

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: #ffffff;
  line-height: 5;
}

.about-section {
  background-color: #f9fafb;
  line-height: 1.9;
  font-size: 1.1rem;
  padding-top: 100px;
  padding-bottom: 100px;
}

.section-heading {
  font-size: 2rem;
  font-weight: 800;
  color: #008b8b;
  margin-top: 50px;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.about-section ul {
  padding-left: 20px;
  list-style-type: circle;
  color: #333;
}

.about-section li {
  margin-top: 8px;
  line-height: 1.7;
}

.cta-section {
  background: linear-gradient(135deg, #b8f3e0 0%, #d7fff0 100%);
  color: #004c3f;
}

.cta-title {
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: #006b6b;
}

.cta-subtitle {
  font-size: 1.2rem;
  margin-bottom: 25px;
  color: #005f56;
}

.cta-button {
  background-color: #008b8b;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #007171;
}

@media (max-width: 768px) {
  .about-hero {
    height: 60vh;
  }
  .hero-text {
    padding: 25px;
  }
  .hero-title {
    font-size: 2.2rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .cta-title {
    font-size: 1.9rem;
  }
=======
.about-hero {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  margin-top: 40px;
}

.overlay {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-title {
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
}

.about-content {
  font-family: 'Poppins', sans-serif;
  color: #4a4a4a;
  background-color: transparent;
  text-align: left;
}

.about-content h2 {
  color: #008b8b;
  margin-top: 20px;
  font-size: 1.4rem;
  line-height: 2.5rem;
}

.about-content p,
.about-content ul {
  font-size: 1rem;
  line-height: 2rem;
  margin-top: 10px;
>>>>>>> 6a3e90072351c82c5dc2b9cbcd7dbc8922ef7302
}

.about-content ul {
  padding-left: 20px;
}
</style>
