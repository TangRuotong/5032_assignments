<template>
  <div class="container">
    <h2>Send Email</h2>
    <form @submit.prevent="sendEmail">
      <div>
        <label>To:</label>
        <input type="email" v-model="toEmail" required />
      </div>

      <div>
        <label>Subject:</label>
        <input type="text" v-model="subject" required />
      </div>

      <div>
        <label>Message:</label>
        <textarea v-model="message" required></textarea>
      </div>

      <button type="submit">Send Email</button>
    </form>

    <div v-if="jsondata">
      <h3>Response:</h3>
      <pre>{{ jsondata }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      toEmail: '',
      subject: '',
      message: '',
      jsondata: null,
      error: null,
    }
  },
  methods: {
    async sendEmail() {
      try {
        const response = await axios.post(
          'https://api.sendgrid.com/v3/mail/send',
          {
            personalizations: [
              {
                to: [{ email: this.toEmail }],
                subject: this.subject,
              },
            ],
            from: { email: 'your_verified_email@example.com' },
            content: [
              {
                type: 'text/plain',
                value: this.message,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer YOUR_SENDGRID_API_KEY`,
              'Content-Type': 'application/json',
            },
          },
        )

        this.jsondata = 'Email sent successfully!'
      } catch (error) {
        console.error('Error sending email:', error)
        this.error = error
        this.jsondata = 'Failed to send email.'
      }
    },
  },
}
</script>

<style>
.container {
  max-width: 400px;
  margin: 0 auto;
}
form div {
  margin-bottom: 10px;
}
button {
  background-color: #5c8b39;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #4b732e;
}
</style>
