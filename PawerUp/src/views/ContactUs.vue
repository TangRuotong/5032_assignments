<script setup>
import { ref } from 'vue'
import axios from 'axios'

const FUNCTION_URL = 'https://us-central1-pawerup-92f54.cloudfunctions.net/sendContact'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  heardFrom: '',
})

const errors = ref({})
const submitting = ref(false)
const toast = ref({ show: false, type: '', message: '' })

const validate = () => {
  const e = {}
  if (!form.value.firstName.trim()) e.firstName = 'First name is required'
  if (!form.value.lastName.trim()) e.lastName = 'Last name is required'
  if (!form.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
    e.email = 'Valid email is required'
  if (!form.value.service) e.service = 'Please choose a service'
  if (!form.value.message.trim()) e.message = 'Please enter your enquiry'
  if (!form.value.heardFrom) e.heardFrom = 'Please select one'
  errors.value = e
  return Object.keys(e).length === 0
}

const submitForm = async () => {
  if (!validate()) {
    showToast('Please fix the errors above', 'error')
    return
  }
  submitting.value = true
  try {
    const payload = {
      name: `${form.value.firstName} ${form.value.lastName}`,
      email: form.value.email,
      phone: form.value.phone,
      service: form.value.service,
      message: form.value.message,
      source: form.value.heardFrom,
      recipient: 'tina1319980173@gmail.com',
    }

    if (fileData.value) payload.attachment = fileData.value

    await axios.post(FUNCTION_URL, payload)
    showToast('Thanks! Your enquiry has been sent.', 'success')
    resetForm()
    fileData.value = null
  } catch (err) {
    console.error(err.response?.data || err.message)
    showToast('Failed to send. Please try again later.', 'error')
  } finally {
    submitting.value = false
  }
}

const fileData = ref(null)

const handleFile = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    fileData.value = {
      filename: file.name,
      type: file.type,
      content: reader.result.split(',')[1],
    }
  }
  reader.readAsDataURL(file)
}

const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    heardFrom: '',
  }
  errors.value = {}
}

const showToast = (message, type) => {
  toast.value = { show: true, message, type }
  setTimeout(() => (toast.value.show = false), 2800)
}
</script>

<template>
  <section class="contact-wrap container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8">
        <h1 class="page-title text-center mb-4">Enquire about our services</h1>
        <p class="text-center text-muted mb-5">
          Tell us what you need and how we can help. Our team will get back to you shortly.
        </p>

        <form @submit.prevent="submitForm" novalidate>
          <div class="row g-3">
            <div class="col-12 col-sm-6">
              <label class="form-label">Your name *</label>
              <div class="row g-2">
                <div class="col-6">
                  <input
                    v-model.trim="form.firstName"
                    type="text"
                    class="form-control"
                    placeholder="First"
                  />
                  <div v-if="errors.firstName" class="invalid-hint">{{ errors.firstName }}</div>
                </div>
                <div class="col-6">
                  <input
                    v-model.trim="form.lastName"
                    type="text"
                    class="form-control"
                    placeholder="Last"
                  />
                  <div v-if="errors.lastName" class="invalid-hint">{{ errors.lastName }}</div>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6">
              <label class="form-label">Your email address *</label>
              <input
                v-model.trim="form.email"
                type="email"
                class="form-control"
                placeholder="you@example.com"
              />
              <div v-if="errors.email" class="invalid-hint">{{ errors.email }}</div>
            </div>

            <div class="col-12 col-sm-6">
              <label class="form-label">Your phone number</label>
              <input
                v-model.trim="form.phone"
                type="text"
                class="form-control"
                placeholder="Optional"
              />
            </div>

            <div class="col-12">
              <label class="form-label">Attach a file (optional)</label>
              <input type="file" class="form-control" @change="handleFile" />
            </div>

            <div class="col-12 col-sm-6">
              <label class="form-label">Which service is your enquiry regarding? *</label>
              <select v-model="form.service" class="form-select">
                <option value="" disabled>Select</option>
                <option value="Private Therapy Session">Private Therapy Session</option>
                <option value="Group Dog Therapy">Group Dog Therapy</option>
                <option value="Campus Pop-up">Campus Pop-up</option>
                <option value="Workshop / Talk">Workshop / Talk</option>
                <option value="Therapy Dog Certification">Therapy Dog Certification</option>
                <option value="Volunteer Program">Volunteer Program</option>
                <option value="Partner Program">Partner Program</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
              <div v-if="errors.service" class="invalid-hint">{{ errors.service }}</div>
            </div>

            <div class="col-12">
              <label class="form-label">Your enquiry or question *</label>
              <textarea
                v-model.trim="form.message"
                class="form-control"
                rows="6"
                placeholder="How can we help?"
              ></textarea>
              <div v-if="errors.message" class="invalid-hint">{{ errors.message }}</div>
            </div>

            <div class="col-12">
              <label class="form-label">How did you hear about us? *</label>
              <div class="row g-2">
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="Breeder recommendation"
                      v-model="form.heardFrom"
                      id="opt1"
                    />
                    <label class="form-check-label" for="opt1">Dog Breeder recommendation</label>
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="Word of mouth"
                      v-model="form.heardFrom"
                      id="opt2"
                    />
                    <label class="form-check-label" for="opt2"
                      >Word of mouth / personal recommendation</label
                    >
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="Search engine"
                      v-model="form.heardFrom"
                      id="opt3"
                    />
                    <label class="form-check-label" for="opt3"
                      >Search engine (Google, Bing, etc.)</label
                    >
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="Social media"
                      v-model="form.heardFrom"
                      id="opt4"
                    />
                    <label class="form-check-label" for="opt4"
                      >Social Media (Facebook, Instagram, etc.)</label
                    >
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="Other"
                      v-model="form.heardFrom"
                      id="opt5"
                    />
                    <label class="form-check-label" for="opt5">Other</label>
                  </div>
                </div>
              </div>
              <div v-if="errors.heardFrom" class="invalid-hint mt-1">{{ errors.heardFrom }}</div>
            </div>
          </div>

          <div class="d-flex gap-3 mt-4">
            <button class="btn btn-teal flex-fill" type="submit" :disabled="submitting">
              <span v-if="submitting">Sending…</span>
              <span v-else>Send enquiry</span>
            </button>
            <button
              class="btn btn-outline-secondary flex-fill"
              type="button"
              @click="resetForm"
              :disabled="submitting"
            >
              Clear
            </button>
          </div>
        </form>

        <div v-if="toast.show" class="toast-bar" :class="toast.type">{{ toast.message }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-wrap {
  font-family: 'Poppins', sans-serif;
  background-color: rgba(0, 139, 139, 0.06);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-weight: 800;
  color: #008b8b;
}
.form-label {
  font-weight: 600;
  color: #333;
}
.form-control,
.form-select {
  border-radius: 10px;
}
.invalid-hint {
  color: #d33;
  font-size: 0.9rem;
  margin-top: 4px;
}
.btn-teal {
  background: #008b8b;
  color: #fff;
  border: none;
}
.btn-teal:hover {
  background: #007676;
}
.toast-bar {
  margin-top: 16px;
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
</style>
