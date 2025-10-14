<template>
  <section class="container py-5 dogs-wrapper">
    <h2 class="text-center main-title mb-3">🐶 Registered Therapy Dogs</h2>
    <p class="text-center main-intro mb-5">
      Explore our certified therapy dogs and their dedicated handlers.
    </p>
    <DataTable :data="dogs" :columns="columns" themeColor="#008b8b" />
  </section>
</template>

<script setup>
import DataTable from '@/components/DataTable.vue'

const columns = [
  { label: 'Name', key: 'dog' },
  { label: 'Breed', key: 'breed' },
  { label: 'Handler', key: 'handler' },
  { label: 'Certification', key: 'certification' },
  { label: 'Status', key: 'status' },
]

const dogs = [
  {
    dog: 'Milo',
    breed: 'Golden Retriever',
    handler: 'Sophie Taylor',
    certification: 'Therapy Certified',
    status: 'Active',
  },
  {
    dog: 'Luna',
    breed: 'Labrador Retriever',
    handler: 'James Lee',
    certification: 'Assistance Certified',
    status: 'Active',
  },
  {
    dog: 'Archie',
    breed: 'Cavoodle',
    handler: 'Emily Smith',
    certification: 'Pending Review',
    status: 'Inactive',
  },
  {
    dog: 'Bella',
    breed: 'Border Collie',
    handler: 'Lucas Wong',
    certification: 'Therapy Certified',
    status: 'Active',
  },
  {
    dog: 'Rocky',
    breed: 'German Shepherd',
    handler: 'Grace Thompson',
    certification: 'Therapy Certified',
    status: 'Inactive',
  },
  {
    dog: 'Buddy',
    breed: 'Cocker Spaniel',
    handler: 'Michael Davis',
    certification: 'Therapy Certified',
    status: 'Active',
  },
  {
    dog: 'Willow',
    breed: 'Spoodle',
    handler: 'Olivia Jones',
    certification: 'Pending Review',
    status: 'Active',
  },
  {
    dog: 'Coco',
    breed: 'Poodle',
    handler: 'Sarah Green',
    certification: 'Therapy Certified',
    status: 'Active',
  },
  {
    dog: 'Bailey',
    breed: 'Labrador',
    handler: 'Ella Nguyen',
    certification: 'Assistance Certified',
    status: 'Active',
  },
  {
    dog: 'Teddy',
    breed: 'Cavapoo',
    handler: 'Daniel Wilson',
    certification: 'Therapy Certified',
    status: 'Inactive',
  },
  {
    dog: 'Charlie',
    breed: 'Beagle',
    handler: 'Amelia Clark',
    certification: 'Therapy Certified',
    status: 'Active',
  },
  {
    dog: 'Ruby',
    breed: 'Kelpie Mix',
    handler: 'Henry Adams',
    certification: 'Pending Review',
    status: 'Inactive',
  },
]
</script>

<style scoped>
.dogs-wrapper {
  font-family: 'Poppins', sans-serif;
  color: #073b6b;
}

.main-title {
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 900;
  color: #008b8b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.main-intro {
  color: #006666;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.table-light {
  background-color: rgba(0, 139, 139, 0.1) !important;
}
</style>
