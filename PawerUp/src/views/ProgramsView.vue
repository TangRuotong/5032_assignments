<script setup>
import { useRouter } from 'vue-router'
import privateSessionImg from '@/assets/icons/privateSession.jpg?url'
import publicEventImg from '@/assets/icons/publicEvent.jpg?url'

const router = useRouter()
const goToPrivate = () => router.push('/PriSessionView')
const goToPublic = () => router.push('/PuEventView')
</script>

<template>
<<<<<<< HEAD
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
=======
  <div class="content-wrap container">
    <h1 class="title">Our Programs</h1>
    <p class="intro">Youth-focused therapy with certified therapy dogs.</p>

    <div class="summary-grid">
      <div class="summary-block">
        <h2 class="summary-title">About Our Platform</h2>
        <p class="summary-text">
          We've built a modern web platform for a Victoria-based youth mental health nonprofit. It
          helps young people connect with certified therapy dogs on campuses and in community
          spaces, providing stress-free, friendly support. You can book short sessions, discover
          pop-up events, meet our volunteers and therapy dogs, and read stories from other young
          people to feel supported and connected. Everything is designed to be easy, accessible, and
          inclusive—helping you take care of your mental wellbeing without pressure or stigma.
        </p>
      </div>
    </div>

    <div class="floating-panels">
      <div class="panel private-panel" tabindex="0">
        <div class="media">
          <img :src="privateSessionImg" alt="Private Session" class="panel-img" />
          <div class="img-overlay left">
            <div class="overlay-title">Private Sessions</div>
            <div class="overlay-desc">
              One-to-one youth-oriented sessions for anxiety, exam stress, social withdrawal, trauma
              reactions and emotional regulation. Small confidential settings with tailored pacing
              and measurable goals to build resilience and coping skills.
            </div>
            <div class="overlay-actions">
              <button class="btn" @click.stop="goToPrivate">Learn more & book</button>
            </div>
>>>>>>> 6a3e90072351c82c5dc2b9cbcd7dbc8922ef7302
          </div>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      <div class="panel public-panel" tabindex="0">
        <div class="media">
          <img :src="publicEventImg" alt="Public Program" class="panel-img" />
          <div class="img-overlay right">
            <div class="overlay-title">Public Programs</div>
            <div class="overlay-desc">
              Mobile services for schools, universities and community venues. Short, stigma-free
              pop-ups and workshops to boost peer connection, build coping skills and improve
              wellbeing at scale.
            </div>
            <div class="overlay-actions">
              <button class="btn" @click.stop="goToPublic">Therapy services</button>
            </div>
>>>>>>> 6a3e90072351c82c5dc2b9cbcd7dbc8922ef7302
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
<<<<<<< HEAD
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
=======
.content-wrap {
  z-index: 1;
  padding-top: 36px;
  padding-bottom: 80px;
  max-width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;
}
.title {
  margin: 0 0 8px 0;
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  font-weight: 800;
  color: #2b8ce1;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.6px;
}
.intro {
  max-width: 900px;
  margin: 0 auto 28px auto;
  font-size: clamp(1rem, 1.2vw, 1.05rem);
  color: #2b8ce1;
  font-weight: 700;
  line-height: 1.45;
  text-align: center;
}
.summary-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  max-width: 100%;
  margin: 0 auto 0 auto;
}
.summary-block {
  background: rgba(43, 140, 225, 0.06);
  border-radius: 10px;
  padding: 18px;
}
.summary-title {
  margin: 0 0 8px 0;
  font-size: 1.05rem;
  color: #073b6b;
  font-weight: 800;
}
.summary-text {
  margin: 0;
  color: #073b6b;
  font-weight: 600;
  line-height: 1.5;
  font-size: 0.98rem;
}
.floating-panels {
  display: flex;
  gap: 32px;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
}
.panel {
  display: flex;
  flex-direction: column;
  width: 48%;
  min-width: 320px;
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;
}
.media {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  min-height: 420px;
  display: flex;
  align-items: stretch;
}
.panel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.img-overlay {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-end;
  pointer-events: none;
}
.img-overlay.left {
  align-items: flex-start;
  text-align: left;
}
.img-overlay.right {
  align-items: flex-end;
  text-align: right;
}
.overlay-title {
  color: #ffffff;
  font-weight: 900;
  font-size: 1.6rem;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  pointer-events: none;
}
.overlay-desc {
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.45;
  max-width: 86%;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 200ms ease,
    transform 200ms ease;
  pointer-events: none;
}
.overlay-actions {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 200ms ease,
    transform 200ms ease;
  pointer-events: none;
}
.public-panel .overlay-actions {
  justify-content: flex-end;
}
.btn {
  background: #2b8ce1;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
  pointer-events: auto;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    opacity 120ms ease;
}
.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(43, 140, 225, 0.18);
}
.panel:hover .img-overlay,
.panel:focus-within .img-overlay {
  background: rgba(0, 0, 0, 0.35);
}
.panel:hover .overlay-desc,
.panel:focus-within .overlay-desc,
.panel:hover .overlay-actions,
.panel:focus-within .overlay-actions {
  opacity: 1;
  transform: translateY(0);
}
@media (max-width: 1199.98px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
  .floating-panels {
    flex-direction: column;
  }
  .panel {
    width: 100%;
  }
  .media {
    min-height: 360px;
  }
}
@media (max-width: 575.98px) {
  .title {
    font-size: 1.6rem;
  }
  .intro {
    font-size: 0.95rem;
  }
  .media {
    min-height: 300px;
  }
  .overlay-title {
    font-size: 1.25rem;
>>>>>>> 6a3e90072351c82c5dc2b9cbcd7dbc8922ef7302
  }
  .overlay-desc {
    font-size: 0.95rem;
  }
}
</style>
