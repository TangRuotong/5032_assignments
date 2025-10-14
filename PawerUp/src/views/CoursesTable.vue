<template>
  <section class="container py-5 courses-wrapper">
    <h2 class="text-center main-title mb-3">📚 Therapy Dog Training Courses</h2>
    <p class="text-center main-intro mb-5">
      Browse available courses and find the perfect one for you and your therapy companion.
    </p>
    <DataTable :data="courses" :columns="columns" themeColor="#0073e6" />
  </section>
</template>

<script setup>
import DataTable from '@/components/DataTable.vue'

const columns = [
  { label: 'Course Name', key: 'name' },
  { label: 'Duration', key: 'duration' },
  { label: 'Level', key: 'level' },
  { label: 'Price (AUD)', key: 'price' },
  { label: 'Availability', key: 'availability' },
]

const courses = [
  {
    name: 'Puppy Development Clinic',
    duration: '4 weeks',
    level: 'Beginner',
    price: 250,
    availability: 'Open',
  },
  {
    name: 'Therapy Certification Course',
    duration: '8 weeks',
    level: 'Advanced',
    price: 650,
    availability: 'Open',
  },
  {
    name: 'Intensive Obedience Training',
    duration: '6 weeks',
    level: 'Intermediate',
    price: 450,
    availability: 'Full',
  },
  {
    name: 'Trick Training Course',
    duration: '5 weeks',
    level: 'Intermediate',
    price: 300,
    availability: 'Open',
  },
  {
    name: 'Water Treadmill Sessions',
    duration: 'Single Session',
    level: 'All',
    price: 80,
    availability: 'Open',
  },
  {
    name: 'Animal Assisted Therapy Prep',
    duration: '6 weeks',
    level: 'Advanced',
    price: 600,
    availability: 'Open',
  },
  {
    name: 'Stay & Train Program',
    duration: '10 days',
    level: 'All',
    price: 1200,
    availability: 'Full',
  },
  {
    name: 'Therapy Workshop for Handlers',
    duration: '2 days',
    level: 'All',
    price: 180,
    availability: 'Open',
  },
  {
    name: 'Puppy Clinic @ Samford Vets',
    duration: '3 weeks',
    level: 'Beginner',
    price: 150,
    availability: 'Open',
  },
  {
    name: 'One-on-One Therapy Coaching',
    duration: 'Flexible',
    level: 'All',
    price: 100,
    availability: 'Open',
  },
  {
    name: 'Canine Socialization Class',
    duration: '4 weeks',
    level: 'Beginner',
    price: 240,
    availability: 'Full',
  },
  {
    name: 'Therapy Readiness Bootcamp',
    duration: '5 weeks',
    level: 'Advanced',
    price: 500,
    availability: 'Open',
  },
  {
    name: 'Handler Leadership Workshop',
    duration: '2 days',
    level: 'Intermediate',
    price: 220,
    availability: 'Full',
  },
  {
    name: 'Relaxation & Mindfulness for Dogs',
    duration: '3 weeks',
    level: 'All',
    price: 260,
    availability: 'Open',
  },
]
</script>

<style scoped>
.courses-wrapper {
  font-family: 'Poppins', sans-serif;
  color: #073b6b;
}

.main-title {
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 900;
  color: #0073e6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.main-intro {
  color: #004080;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.blue-header {
  background-color: rgba(0, 115, 230, 0.1) !important;
}
</style>
