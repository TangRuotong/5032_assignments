<script setup>
import { useRouter } from 'vue-router'
import privateSessionImg from '@/assets/icons/privateSession.jpg?url'
import publicEventImg from '@/assets/icons/publicEvent.jpg?url'

const router = useRouter()
const goToPrivate = () => router.push('/PriSessionView')
const goToPublic = () => router.push('/PuEventView')
</script>

<template>
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
          </div>
        </div>
      </div>

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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  }
  .overlay-desc {
    font-size: 0.95rem;
  }
}
</style>
