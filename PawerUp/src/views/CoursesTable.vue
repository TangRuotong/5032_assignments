<template>
  <section class="container py-5 courses-wrapper">
    <h2 class="text-center main-title mb-3">📚 Therapy Dog Training Courses</h2>
    <p class="text-center main-intro mb-4">
      Browse available courses and find the perfect one for you and your therapy companion.
    </p>

    <div class="text-center mb-4">
      <button class="btn btn-outline-success me-2" @click="exportCSV">Export as CSV</button>
      <button class="btn btn-outline-primary" @click="exportPDF">Export as PDF</button>
    </div>

    <DataTable :data="courses" :columns="columns" themeColor="#0073e6" />
  </section>
</template>

<script setup>
import DataTable from '@/components/DataTable.vue'
import { jsPDF } from 'jspdf'

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

function exportCSV() {
  const header = columns.map((c) => c.label)
  const rows = courses.map((c) => columns.map((col) => c[col.key]))
  const csv = [header, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Therapy_Courses.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function exportPDF() {
  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text('Therapy Dog Training Courses', 14, 20)
  doc.setFontSize(12)
  let y = 35
  courses.forEach((c, i) => {
    doc.text(`${i + 1}. ${c.name}`, 14, y)
    doc.text(`Duration: ${c.duration} | Level: ${c.level}`, 14, y + 7)
    doc.text(`Price: $${c.price} | Availability: ${c.availability}`, 14, y + 14)
    y += 22
    if (y > 270) {
      doc.addPage()
      y = 20
    }
  })
  doc.save('Therapy_Courses.pdf')
}
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

.btn {
  border-radius: 8px;
  min-height: 44px;
  font-weight: 600;
}
</style>
