<template>
  <div class="booking-form-container">
    <h2 class="form-title">Book Your Session</h2>

    <form @submit.prevent="handleSubmit">
      <!-- FIRST NAME & LAST NAME IN ONE ROW -->
      <div class="form-row">
        <div class="form-group half-width">
          <label for="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            v-model="form.firstName"
            @blur="validateFirstName"
            :class="{ 'error-border': errors.firstName }"
            placeholder="Enter your first name"
            required
          />
          <p v-if="errors.firstName" class="error-msg">{{ errors.firstName }}</p>
        </div>

        <div class="form-group half-width">
          <label for="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            v-model="form.lastName"
            @blur="validateLastName"
            :class="{ 'error-border': errors.lastName }"
            placeholder="Enter your last name"
            required
          />
          <p v-if="errors.lastName" class="error-msg">{{ errors.lastName }}</p>
        </div>
      </div>

      <!-- EMAIL -->
      <div class="form-group">
        <label for="email">Email *</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          @blur="validateEmail"
          :class="{ 'error-border': errors.email }"
          placeholder="Enter your email"
          required
        />
        <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
      </div>

      <!-- GENDER & RESIDENT IN ONE ROW -->
      <div class="form-row">
        <div class="form-group half-width">
          <label for="gender">Gender *</label>
          <select
            id="gender"
            v-model="form.gender"
            @blur="validateGender"
            :class="{ 'error-border': errors.gender }"
            required
          >
            <option value="" disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer">Prefer not to say</option>
          </select>
          <p v-if="errors.gender" class="error-msg">{{ errors.gender }}</p>
        </div>

        <div class="form-group half-width">
          <label for="resident">Are you an Australian resident? *</label>
          <select
            id="resident"
            v-model="form.resident"
            @blur="validateResident"
            :class="{ 'error-border': errors.resident }"
            required
          >
            <option value="" disabled>Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <p v-if="errors.resident" class="error-msg">{{ errors.resident }}</p>
        </div>
      </div>

      <!-- EVENT SELECTION -->
      <div class="form-group">
        <label for="event">Select Event *</label>
        <select
          id="event"
          v-model="form.event"
          @blur="validateEvent"
          :class="{ 'error-border': errors.event }"
          required
        >
          <option value="" disabled>Select an event</option>
          <option v-for="event in events" :key="event.id" :value="event.id">
            {{ event.name }}
          </option>
        </select>
        <p v-if="errors.event" class="error-msg">{{ errors.event }}</p>
      </div>

      <!-- SPECIAL NEEDS -->
      <div class="form-group">
        <label for="specialNeeds">Do you have any special needs?</label>
        <select id="specialNeeds" v-model="form.specialNeeds">
          <option value="">None</option>
          <option value="hearing">Hearing support</option>
          <option value="visual">Visual support</option>
          <option value="mobility">Mobility assistance</option>
          <option value="other">Other (please specify)</option>
        </select>
        <input
          v-if="form.specialNeeds === 'other'"
          type="text"
          v-model="form.otherNeeds"
          placeholder="Please specify"
        />
      </div>

      <!-- REASON FOR BOOKING -->
      <div class="form-group">
        <label for="reason">Reason for Booking *</label>
        <textarea
          id="reason"
          v-model="form.reason"
          @input="checkDogKeyword"
          @blur="validateReason"
          :class="{ 'error-border': errors.reason }"
          placeholder="Tell us why you are booking"
          required
        ></textarea>
        <p v-if="errors.reason" class="error-msg">{{ errors.reason }}</p>
        <p v-if="showDogMessage" class="info-msg">
          🐶 You mentioned "dog"! Would you like to know more about our therapy dog programs?
        </p>
      </div>

      <button type="submit" class="submit-btn">Submit Booking</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
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

const errors = ref({})
const showDogMessage = ref(false)

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
  validateGender()
  validateResident()
  validateReason()
  validateEvent()

  if (Object.values(errors.value).some((err) => err)) {
    alert('Please fix the errors before submitting.')
    return
  }

  alert('Booking submitted successfully!')

  emit('booking-complete')
}
</script>

<style scoped>
.booking-form-container {
  max-width: 600px;
  margin: 30px auto;
  padding: 25px;
  background: linear-gradient(135deg, #fafcf8, #fde4e1); /* gradient using your color palette */
  border-radius: 25px; /* rounder corners */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); /* soft depth */
  font-family: 'Segoe UI', sans-serif; /* consistent with HomeView */
  color: #212615; /* main text color */
}

.form-title {
  font-size: 1.8rem;
  font-weight: 500;
  color: #212615;
  margin-bottom: 25px;
  text-align: center;
  letter-spacing: 0.5px; /* slightly elongated letters */
}

.form-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.half-width {
  flex: 1;
  min-width: 120px;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 5px;
  color: #212615;
  font-size: 0.95rem;
}

input,
select,
textarea {
  padding: 12px;
  border-radius: 15px; /* rounder input fields */
  border: 1px solid #b1c4d9; /* subtle border */
  font-size: 14px;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #89b8a3; /* focus highlight from color palette */
  box-shadow: 0 0 8px rgba(137, 184, 163, 0.3);
  outline: none;
}

.error-border {
  border-color: #fbcda1 !important;
  box-shadow: 0 0 8px rgba(251, 205, 161, 0.4);
}

.error-msg {
  color: #c07436; /* error color from palette */
  font-size: 13px;
  margin-top: 5px;
}

.info-msg {
  color: #5c8b39; /* info color from palette */
  font-size: 13px;
  margin-top: 5px;
}

.submit-btn {
  width: 100%;
  background-color: #89b8a3; /* primary button color */
  color: #212615;
  font-weight: 600;
  padding: 14px;
  border: none;
  border-radius: 25px; /* more rounded button */
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background-color: #5c8b39; /* hover color from palette */
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
</style>
