<script setup>
import { ref } from 'vue'

// Dynamic card data
const highlightCards = ref([
  {
    id: 1,
    title: 'Community',
    text: 'Engage with local therapy dog programs and events',
    color: '#b5dcc6',
  },
  {
    id: 2,
    title: 'Support',
    text: 'Get emotional support and guidance from professionals',
    color: '#89b8a3',
  },
  {
    id: 3,
    title: 'Activities',
    text: 'Participate in workshops, classes, and interactive sessions',
    color: '#fde4e1',
  },
  {
    id: 4,
    title: 'Resources',
    text: 'Access mental health tips, articles, and helpful tools',
    color: '#fbcda1',
  },
])
</script>

<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="mb-3">Welcome to Pawer Up</h1>
      <p>Supporting youth mental health with therapy dog interactions</p>
    </div>

    <div class="row justify-content-center">
      <div
        v-for="card in highlightCards"
        :key="card.id"
        class="col-12 col-sm-6 col-md-4 mb-4 d-flex"
      >
        <div class="highlight-card flex-fill" :style="{ backgroundColor: card.color }">
          <div class="card-content">
            <h2>{{ card.title }}</h2>
            <p>{{ card.text }}</p>
          </div>
          <div class="card-layer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  font-family: 'Poppins', sans-serif;
  color: #212615;
}

/* Header */
h1 {
  font-size: 3rem;
  font-weight: 500;
  letter-spacing: 1.5px;
}

p {
  font-size: 1.2rem;
  font-weight: 300;
}

/* Card style */
.highlight-card {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  padding: 25px;
}

.highlight-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}

/* Layer effect */
.card-layer {
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background: rgba(255, 255, 255, 0.05);
  transform: rotate(15deg);
}

/* Card content */
.card-content {
  position: relative;
  z-index: 2;
}

.highlight-card h2 {
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 10px;
}

.highlight-card p {
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: 300;
}
</style>
