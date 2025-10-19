<template>
  <section class="booking-wrap container py-5" aria-labelledby="booking-title">
    <div class="row justify-content-center align-items-stretch">
      <div class="col-12 col-lg-6 form-side">
        <h1 id="booking-title" class="page-title text-center mb-4">Book Your Session</h1>
        <p class="text-center text-muted mb-4">
          Schedule your PawerUp therapy session below. All required fields are marked with *.
        </p>

        <form @submit.prevent="handleSubmit" novalidate>
          <div class="row g-3">
            <div class="col-12 col-sm-6">
              <label class="form-label" for="firstName">First Name *</label>
              <input
                id="firstName"
                v-model.trim="form.firstName"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.firstName }"
                autocomplete="given-name"
              />
              <div v-if="errors.firstName" class="invalid-hint">{{ errors.firstName }}</div>
            </div>

            <div class="col-12 col-sm-6">
              <label class="form-label" for="lastName">Last Name *</label>
              <input
                id="lastName"
                v-model.trim="form.lastName"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.lastName }"
                autocomplete="family-name"
              />
              <div v-if="errors.lastName" class="invalid-hint">{{ errors.lastName }}</div>
            </div>

            <div class="col-12 col-sm-6">
              <label class="form-label" for="email">Email *</label>
              <input
                id="email"
                v-model.trim="form.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                autocomplete="email"
              />
              <div v-if="errors.email" class="invalid-hint">{{ errors.email }}</div>
            </div>

            <div class="col-12 col-sm-6">
              <label class="form-label" for="phone">Phone</label>
              <input
                id="phone"
                v-model.trim="form.phone"
                type="tel"
                class="form-control"
                autocomplete="tel"
              />
            </div>

            <div class="col-12 col-sm-6">
              <label class="form-label" for="gender">Gender *</label>
              <select
                id="gender"
                v-model="form.gender"
                class="form-select"
                :class="{ 'is-invalid': errors.gender }"
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer">Prefer not to say</option>
              </select>
              <div v-if="errors.gender" class="invalid-hint">{{ errors.gender }}</div>
            </div>

            <div class="col-12 col-sm-6">
              <label class="form-label" for="resident">Australian Resident? *</label>
              <select
                id="resident"
                v-model="form.resident"
                class="form-select"
                :class="{ 'is-invalid': errors.resident }"
              >
                <option value="" disabled>Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <div v-if="errors.resident" class="invalid-hint">{{ errors.resident }}</div>
            </div>

            <div class="col-12 col-sm-6">
              <label class="form-label" for="specialNeeds">Special Requirements</label>
              <select id="specialNeeds" v-model="form.specialNeeds" class="form-select">
                <option value="" disabled>Select an option</option>
                <option v-for="opt in specialOptions" :key="opt.id" :value="opt.name">
                  {{ opt.name }}
                </option>
              </select>
            </div>

            <div class="col-12 col-sm-6" v-if="showOtherNeeds">
              <label class="form-label" for="otherNeeds">Please specify</label>
              <input
                id="otherNeeds"
                v-model.trim="form.otherNeeds"
                type="text"
                class="form-control"
              />
            </div>

            <div class="col-12">
              <label class="form-label" for="event">Event *</label>
              <select
                id="event"
                v-model="form.event"
                class="form-select"
                :class="{ 'is-invalid': errors.event }"
              >
                <option value="" disabled>Select an event</option>
                <option v-for="ev in events" :key="ev.id" :value="ev.id">{{ ev.name }}</option>
              </select>
              <div v-if="errors.event" class="invalid-hint">{{ errors.event }}</div>
            </div>

            <div class="col-12">
              <label class="form-label" for="reason">Reason for Booking *</label>
              <textarea
                id="reason"
                v-model.trim="form.reason"
                class="form-control"
                rows="4"
                :class="{ 'is-invalid': errors.reason }"
              ></textarea>
              <div v-if="errors.reason" class="invalid-hint">{{ errors.reason }}</div>
            </div>
          </div>

          <div class="d-flex gap-3 mt-4">
            <button type="submit" class="btn btn-teal flex-fill">Submit Booking</button>
            <button type="button" class="btn btn-outline-secondary flex-fill" @click="clearForm">
              Clear Form
            </button>
          </div>

          <div v-if="submitMsg" class="toast-bar mt-3" :class="successType">{{ submitMsg }}</div>
        </form>
      </div>

      <div
        class="col-12 col-lg-6 img-side"
        role="img"
        aria-label="Therapy dog with youth"
        :style="{ backgroundImage: `url(${bookPic})` }"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import bookPic from '@/assets/icons/bookPic.jpg?url'
import { auth, functions } from '@/firebase/init.js'
import { httpsCallable } from 'firebase/functions'

const addInboxMessage = httpsCallable(functions, 'addInboxMessage')

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

const specialOptions = ref([
  { id: 1, name: 'Allergies' },
  { id: 2, name: 'Accessibility Requirement' },
  { id: 3, name: 'Other' },
])

const events = ref([
  { id: '1', name: 'Private Therapy Session' },
  { id: '2', name: 'Group Dog Therapy' },
  { id: '3', name: 'Community Mental Health Workshop' },
])

const errors = ref({})
const showOtherNeeds = ref(false)
const submitMsg = ref('')
const successType = ref('success')

watch(
  () => form.value.specialNeeds,
  (v) => (showOtherNeeds.value = v === 'Other'),
)

const validate = () => {
  const e = {}
  if (!form.value.firstName.trim()) e.firstName = 'First name is required.'
  if (!form.value.lastName.trim()) e.lastName = 'Last name is required.'
  if (!form.value.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email))
    e.email = 'Enter a valid email.'
  if (!form.value.gender) e.gender = 'Gender is required.'
  if (!form.value.resident) e.resident = 'Select an option.'
  if (!form.value.event) e.event = 'Event selection required.'
  if (!form.value.reason.trim()) e.reason = 'Reason is required.'
  errors.value = e
  return Object.keys(e).length === 0
}

const clearForm = () => {
  Object.keys(form.value).forEach((k) => (form.value[k] = ''))
  showOtherNeeds.value = false
  errors.value = {}
}

const handleSubmit = async () => {
  if (!validate()) {
    submitMsg.value = 'Please correct the highlighted fields.'
    successType.value = 'error'
    return
  }

  try {
    const user = auth.currentUser
    if (!user) {
      submitMsg.value = 'Please log in before booking.'
      successType.value = 'error'
      return
    }

    const selectedEvent =
      events.value.find((e) => e.id === form.value.event)?.name || 'Unknown Event'

    await addInboxMessage({
      uid: user.uid,
      title: 'Booking Confirmed',
      message: `Your booking for "${selectedEvent}" has been confirmed!`,
      details: {
        name: `${form.value.firstName} ${form.value.lastName}`,
        email: form.value.email,
        reason: form.value.reason,
        date: new Date().toISOString(),
      },
    })

    submitMsg.value =
      '✅ Booking submitted successfully! A confirmation message has been added to your inbox.'
    successType.value = 'success'
    clearForm()
  } catch (err) {
    console.error('❌ addInboxMessage failed:', err)
    submitMsg.value = 'Booking failed: ' + (err.message || 'Unknown error')
    successType.value = 'error'
  }
}
</script>

<style scoped>
.booking-wrap {
  font-family: 'Poppins', sans-serif;
  background-color: rgba(0, 139, 139, 0.06);
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.page-title {
  font-weight: 800;
  color: #008b8b;
}

.form-side {
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
}

.img-side {
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  min-height: 600px;
}

.form-label {
  font-weight: 600;
  color: #333;
}

.form-control,
.form-select,
textarea {
  border-radius: 10px;
}

.invalid-hint {
  color: #d33;
  font-size: 0.9rem;
  margin-top: 4px;
}

.btn-teal {
  background: #008b8b;
  color: white;
  border: none;
  min-height: 48px;
}
.btn-teal:hover {
  background: #007676;
}

.toast-bar {
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 600;
}
.toast-bar.success {
  background: #e6f7f7;
  color: #006b6b;
}
.toast-bar.error {
  background: #fdecea;
  color: #b1352e;
}

@media (max-width: 992px) {
  .img-side {
    min-height: 280px;
    border-radius: 0 0 16px 16px;
  }
}
</style>
