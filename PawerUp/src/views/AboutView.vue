<script setup>
import aboutPic from '@/assets/icons/aboutPic.jpg?url'
</script>

<template>
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
      </div>
    </div>
  </div>
</template>

<style scoped>
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
}

.about-content ul {
  padding-left: 20px;
}
</style>
