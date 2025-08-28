<script setup>
import { ref, watch } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: '',
  resident: '',
  specialNeeds: '',
  otherNeeds: '',
  reason: '',
  event: '',
})

const events = ref([
  { id: '1', name: 'Private Therapy Session' },
  { id: '2', name: 'Group Dog Therapy' },
  { id: '3', name: 'Community Mental Health Workshop' },
])

const specialOptions = ref([
  { id: '1', name: 'Allergies' },
  { id: '2', name: 'Accessibility Requirement' },
  { id: '3', name: 'Other' },
])

const errors = ref({})
const showDogMessage = ref(false)
const showOtherNeeds = ref(false)

watch(
  () => form.value.specialNeeds,
  (val) => {
    showOtherNeeds.value = val === 'Other'
  },
)

// Validators
const validateFirstName = () => {
  errors.value.firstName = form.value.firstName.trim() ? '' : 'First name is required.'
}
const validateLastName = () => {
  errors.value.lastName = form.value.lastName.trim() ? '' : 'Last name is required.'
}
const validateEmail = () => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.value.email = re.test(form.value.email) ? '' : 'Invalid email address.'
}
const validatePhone = () => {
  errors.value.phone = form.value.phone ? '' : ''
}
const validateGender = () => {
  errors.value.gender = form.value.gender ? '' : 'Gender is required.'
}
const validateResident = () => {
  errors.value.resident = form.value.resident ? '' : 'Please select an option.'
}
const validateReason = () => {
  errors.value.reason = form.value.reason.trim() ? '' : 'Reason for booking is required.'
}
const validateEvent = () => {
  errors.value.event = form.value.event ? '' : 'Please select an event.'
}
const checkDogKeyword = () => {
  showDogMessage.value = form.value.reason.toLowerCase().includes('dog')
}

const handleSubmit = () => {
  validateFirstName()
  validateLastName()
  validateEmail()
  validatePhone()
  validateGender()
  validateResident()
  validateReason()
  validateEvent()

  if (Object.values(errors.value).some((err) => err)) {
    alert('Please fix the errors before submitting.')
    return
  }

  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
  bookings.push({ ...form.value })
  localStorage.setItem('bookings', JSON.stringify(bookings))

  alert('Booking submitted successfully!')

  clearForm()
}

const clearForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    resident: '',
    specialNeeds: '',
    otherNeeds: '',
    reason: '',
    event: '',
  }
  showOtherNeeds.value = false
}
</script>

<template>
  <div class="container py-5">
    <h2 class="text-center mb-4">Book Your Session</h2>
    <form @submit.prevent="handleSubmit">
      <div class="row g-3">
        <div class="col-sm-6">
          <label>First Name *</label>
          <input
            type="text"
            v-model="form.firstName"
            @blur="validateFirstName"
            class="form-control"
            :class="{ 'is-invalid': errors.firstName }"
          />
          <div v-if="errors.firstName" class="invalid-feedback">{{ errors.firstName }}</div>
        </div>
        <div class="col-sm-6">
          <label>Last Name *</label>
          <input
            type="text"
            v-model="form.lastName"
            @blur="validateLastName"
            class="form-control"
            :class="{ 'is-invalid': errors.lastName }"
          />
          <div v-if="errors.lastName" class="invalid-feedback">{{ errors.lastName }}</div>
        </div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-sm-6">
          <label>Email *</label>
          <input
            type="email"
            v-model="form.email"
            @blur="validateEmail"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
          />
          <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="col-sm-6">
          <label>Phone</label>
          <input type="text" v-model="form.phone" class="form-control" />
        </div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-sm-6">
          <label>Gender *</label>
          <select
            v-model="form.gender"
            @blur="validateGender"
            class="form-select"
            :class="{ 'is-invalid': errors.gender }"
          >
            <option value="" disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer">Prefer not to say</option>
          </select>
          <div v-if="errors.gender" class="invalid-feedback">{{ errors.gender }}</div>
        </div>
        <div class="col-sm-6">
          <label>Australian Resident? *</label>
          <select
            v-model="form.resident"
            @blur="validateResident"
            class="form-select"
            :class="{ 'is-invalid': errors.resident }"
          >
            <option value="" disabled>Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <div v-if="errors.resident" class="invalid-feedback">{{ errors.resident }}</div>
        </div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-sm-6">
          <label>Special Requirements</label>
          <select v-model="form.specialNeeds" class="form-select">
            <option value="" disabled>Select an option</option>
            <option v-for="opt in specialOptions" :key="opt.id" :value="opt.name">
              {{ opt.name }}
            </option>
          </select>
        </div>

        <div class="col-sm-6" v-if="form.specialNeeds === 'Other'">
          <label for="otherNeeds">Please specify</label>
          <input v-model="form.otherNeeds" id="otherNeeds" type="text" class="form-control" />
        </div>
      </div>

      <div class="mt-3">
        <label>Event *</label>
        <select
          v-model="form.event"
          @blur="validateEvent"
          class="form-select"
          :class="{ 'is-invalid': errors.event }"
        >
          <option value="" disabled>Select an event</option>
          <option v-for="event in events" :key="event.id" :value="event.id">
            {{ event.name }}
          </option>
        </select>
        <div v-if="errors.event" class="invalid-feedback">{{ errors.event }}</div>
      </div>

      <div class="mt-3">
        <label>Reason for Booking *</label>
        <textarea
          v-model="form.reason"
          @input="checkDogKeyword"
          @blur="validateReason"
          class="form-control"
          :class="{ 'is-invalid': errors.reason }"
        ></textarea>
        <div v-if="errors.reason" class="invalid-feedback">{{ errors.reason }}</div>
        <div v-if="showDogMessage" class="form-text text-success">
          🐶 You mentioned "dog"! Would you like to know more about our therapy dog programs?
        </div>
      </div>

      <div class="d-flex mt-4 gap-2">
        <button type="submit" class="btn btn-success flex-fill">Submit Booking</button>
        <button type="button" class="btn btn-secondary flex-fill" @click="clearForm">
          Clear Form
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 80vw;
  background: #fafcf8;
  padding: 30px;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  color: #212615;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

label {
  font-weight: 500;
  color: #212615;
}

textarea {
  min-height: 100px;
}
</style>
