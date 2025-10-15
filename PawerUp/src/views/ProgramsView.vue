<script setup>
import { useRouter } from 'vue-router'
import privateSessionImg from '@/assets/icons/privateSession.jpg?url'
import publicEventImg from '@/assets/icons/publicEvent.jpg?url'

const router = useRouter()
const goToPrivate = () => router.push('/prisession')
const goToPublic = () => router.push('/puevent')
</script>

<template>
  <div class="programs-wrapper container-fluid px-4 py-5">
    <div class="text-center mb-5">
      <h1 class="main-title">Our Programs</h1>
      <p class="main-intro">
        Youth-focused therapy with certified therapy dogs, designed to bring calm and confidence
        through connection.
      </p>
    </div>

    <div class="row justify-content-center gy-5 mb-5">
      <div class="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8 col-xxl-7">
        <div class="about-block p-4 p-md-5">
          <h2 class="block-title">About Our Platform</h2>
          <p class="block-text">
            We've built a modern web platform for a Victoria-based youth mental health nonprofit. It
            helps young people connect with certified therapy dogs on campuses and in community
            spaces, providing stress-free, friendly support.
          </p>
          <p class="block-text">
            You can book short sessions, discover pop-up events, meet our volunteers and therapy
            dogs, and read stories from other young people to feel supported and connected.
            Everything is designed to be easy, accessible, and inclusive—helping you take care of
            your mental wellbeing without pressure or stigma.
          </p>
        </div>
      </div>
    </div>

    <div class="floating-panels row justify-content-center gx-4 gy-5">
      <div class="col-12 col-md-6">
        <div class="panel" tabindex="0">
          <img :src="privateSessionImg" alt="Private Session" class="panel-img" />
          <div class="title-static left">Private Sessions</div>
          <div class="panel-overlay left">
            <h3 class="overlay-title">Private Sessions</h3>
            <p class="overlay-desc">
              One-to-one youth-oriented sessions for anxiety, exam stress, social withdrawal, trauma
              reactions, and emotional regulation. Small confidential settings with tailored pacing
              and measurable goals to build resilience and coping skills.
            </p>
            <button class="btn-learn" @click.stop="goToPrivate">Learn more & book</button>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="panel" tabindex="0">
          <img :src="publicEventImg" alt="Public Event" class="panel-img" />
          <div class="title-static right">Public Programs</div>
          <div class="panel-overlay right">
            <h3 class="overlay-title">Public Programs</h3>
            <p class="overlay-desc">
              Mobile services for schools, universities, and community venues. Short, stigma-free
              pop-ups and workshops that boost peer connection, build coping skills, and improve
              wellbeing at scale.
            </p>
            <button class="btn-learn" @click.stop="goToPublic">Therapy services</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.programs-wrapper {
  font-family: 'Poppins', sans-serif;
  color: #073b6b;
  background-color: #ffffff;
}

.main-title {
  font-size: clamp(2.6rem, 5vw, 4rem);
  font-weight: 900;
  color: #008b8b;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.main-intro {
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  color: #006666;
  font-weight: 500;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.7;
}

.about-block {
  background: rgba(0, 139, 139, 0.06);
  border-radius: 16px;
}

.block-title {
  color: #008b8b;
  font-size: 1.7rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.block-text {
  font-size: 1.06rem;
  color: #004c4c;
  font-weight: 500;
  line-height: 1.78;
  margin-bottom: 12px;
}

.floating-panels {
  margin-top: 40px;
}

.panel {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.panel-img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
  display: block;
}

.title-static {
  position: absolute;
  top: 18px;
  color: #ffffff;
  font-weight: 900;
  font-size: clamp(1.8rem, 3.8vw, 3rem);
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow:
    0 6px 18px rgba(0, 0, 0, 0.45),
    0 2px 6px rgba(0, 0, 0, 0.6);
  transition:
    opacity 220ms ease,
    transform 220ms ease;
  pointer-events: none;
}
.title-static.left {
  left: 20px;
  text-align: left;
}
.title-static.right {
  right: 20px;
  text-align: right;
}

.panel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.15) 30%,
    rgba(0, 0, 0, 0.55) 75%,
    rgba(0, 0, 0, 0.7) 100%
  );
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px 24px;
  justify-content: center;
  opacity: 0;
  transition: opacity 280ms ease;
  pointer-events: none;
}
.panel-overlay.left {
  align-items: flex-start;
  text-align: left;
}
.panel-overlay.right {
  align-items: flex-end;
  text-align: right;
}

.overlay-title {
  font-size: clamp(1.7rem, 2.6vw, 2.2rem);
  font-weight: 800;
  text-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
}

.overlay-desc {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.55;
  max-width: 92%;
}

.btn-learn {
  background-color: #008b8b;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 10px 26px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.25s ease,
    transform 0.15s ease;
}
.panel-overlay.right .btn-learn {
  align-self: flex-end;
}
.panel-overlay.left .btn-learn {
  align-self: flex-start;
}
.btn-learn:hover {
  background-color: #007575;
  transform: translateY(-1px);
}

.panel:hover .panel-overlay,
.panel:focus-within .panel-overlay {
  opacity: 1;
  pointer-events: auto;
}

.panel:hover .title-static,
.panel:focus-within .title-static {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 992px) {
  .panel-img {
    min-height: 360px;
  }
}

@media (max-width: 576px) {
  .main-title {
    font-size: 2.2rem;
  }
  .overlay-title {
    font-size: 1.5rem;
  }
  .overlay-desc {
    font-size: 0.95rem;
  }
}
</style>
