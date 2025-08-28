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
  <div class="home-container">
    <div class="home-header">
      <h1>Welcome to Pawer Up</h1>
      <p>Supporting youth mental health with therapy dog interactions</p>
    </div>

    <div class="home-main">
      <div
        v-for="card in highlightCards"
        :key="card.id"
        class="highlight-card"
        :style="{ backgroundColor: card.color }"
      >
        <h2>{{ card.title }}</h2>
        <p>{{ card.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
  background: #fafcf8;
  min-height: 100vh;
  color: #212615;
  max-width: 95vw;
  margin: 0 auto;
}

.home-header {
  text-align: center;
  margin-bottom: 50px;
}

.home-header h1 {
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
}

.home-header p {
  font-size: 1.2rem;
  font-weight: 300;
  color: #212615;
}

.home-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.highlight-card {
  border-radius: 30px;
  padding: 30px;
  flex: 1 1 280px;
  max-width: 300px;
  min-height: 180px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.highlight-card:hover {
  transform: translateY(-10px) rotate(-1deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

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
</style>
