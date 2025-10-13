<template>
  <div class="home-wrapper">
    <section class="hero-section" :style="{ backgroundImage: `url(${homePic})` }">
      <div class="hero-text text-center">
        <h1 class="hero-title">Therapy Dogs for Youth Wellbeing</h1>
        <p class="hero-subtitle">
          Empowering young people across Victoria through calm connection, kindness, and canine
          companionship.
        </p>
      </div>
    </section>

    <section class="intro-section py-5 px-4">
      <div class="container-fluid">
        <div class="row justify-content-center gy-5">
          <div class="col-12 col-md-10 col-lg-9 col-xl-8">
            <h2 class="section-heading">Our Mission</h2>
            <p>
              PawerUp is a Victoria-based not-for-profit dedicated to improving youth mental health
              and wellbeing. Our therapy dog programs bring warmth, trust, and emotional support to
              campuses and community spaces—helping young people manage stress, anxiety, and
              loneliness in safe, stigma-free ways.
            </p>

            <h2 class="section-heading">Why Therapy Dogs?</h2>
            <p>
              Interacting with therapy dogs has been shown to reduce cortisol levels, enhance mood,
              and promote social connection. At PawerUp, each visit is more than a moment of
              joy—it's an opportunity to build resilience, confidence, and emotional regulation.
            </p>

            <h2 class="section-heading">What We Offer</h2>
            <div class="row gy-4 mt-3">
              <div
                v-for="offer in offers"
                :key="offer.id"
                class="col-12 col-sm-6 col-md-4 col-lg-4"
              >
                <div class="info-card h-100">
                  <h3>{{ offer.title }}</h3>
                  <p>{{ offer.desc }}</p>
                </div>
              </div>
            </div>

            <h2 class="section-heading mt-5">Our Vision</h2>
            <p>
              We believe every young person deserves moments of calm and connection. Through
              evidence-based animal-assisted interactions, PawerUp aims to make emotional support
              easy to access, stigma-free, and part of everyday life in Victoria.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section text-center py-5">
      <div class="container">
        <h2 class="cta-title">🐶 Join our volunteer program today</h2>
        <p class="cta-subtitle">Bring joy and calm to your community with PawerUp therapy dogs.</p>
        <button class="cta-button">Join Us</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import homePic from '@/assets/icons/homePic.jpg?url'

const offers = ref([
  {
    id: 1,
    title: 'Campus Sessions',
    desc: 'Short, stress-free therapy dog sessions at universities and TAFEs—helping manage study stress and build social connection.',
  },
  {
    id: 2,
    title: 'Community Events',
    desc: 'Pop-up programs at libraries, festivals, and youth hubs—making mental health conversations approachable and inclusive.',
  },
  {
    id: 3,
    title: 'Volunteer & Dog Teams',
    desc: "Certified volunteers and therapy dogs bringing calm energy and emotional support where it's needed most.",
  },
  {
    id: 4,
    title: 'Workshops & Talks',
    desc: 'Interactive wellbeing workshops focusing on empathy, self-regulation, and the science of connection.',
  },
  {
    id: 5,
    title: 'Therapy Dog Certification',
    desc: 'Our certification pathway equips qualified teams to deliver emotional support in schools and organizations.',
  },
  {
    id: 6,
    title: 'Partner Programs',
    desc: 'Collaborations with universities, councils, and mental health organizations for youth wellbeing initiatives.',
  },
])
</script>

<style scoped>
.home-wrapper {
  width: 100%;
  font-family: 'Poppins', sans-serif;
  color: #212615;
  background-color: #ffffff;
  overflow-x: hidden;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 80vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-text {
  text-align: center;
  background: rgba(255, 255, 255, 0.6);
  padding: 40px 20px;
  border-radius: 20px;
  max-width: 900px;
}

.hero-title {
  font-size: clamp(2.6rem, 5vw, 4.8rem);
  font-weight: 900;
  color: #2b8ce1;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 500;
  color: #333;
  line-height: 1.6;
}

.intro-section {
  background-color: #f9fafb;
  color: #333;
  font-size: 1.1rem;
  line-height: 1.9;
  padding-top: 100px;
  padding-bottom: 100px;
}

.section-heading {
  font-size: 2.2rem;
  font-weight: 800;
  color: #2b8ce1;
  margin-top: 60px;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  height: 100%;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.info-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #005d83;
  margin-bottom: 12px;
}

.info-card p {
  font-size: 1rem;
  color: #444;
  line-height: 1.7;
}

.cta-section {
  background: linear-gradient(135deg, #c9f4e5 0%, #b5dcff 100%);
  color: #004b66;
}

.cta-title {
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.cta-subtitle {
  font-size: 1.2rem;
  margin-bottom: 25px;
}

.cta-button {
  background-color: #2b8ce1;
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
  background-color: #176ebc;
}

@media (max-width: 768px) {
  .hero-section {
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
}
</style>
