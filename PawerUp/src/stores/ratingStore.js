import { reactive } from 'vue'

export const ratingsStore = reactive({
  bookings: [
    { id: 1, event: 'Therapy Dog Session', ratings: [], ratedBy: [] },
    { id: 2, event: 'Mindfulness Workshop', ratings: [], ratedBy: [] },
  ],

  addRating(bookingId, userEmail, score) {
    const booking = this.bookings.find((b) => b.id === bookingId)
    if (!booking) return
    if (booking.ratedBy.includes(userEmail)) return false
    booking.ratings.push(score)
    booking.ratedBy.push(userEmail)
    return true
  },

  getAverage(bookingId) {
    const booking = this.bookings.find((b) => b.id === bookingId)
    if (!booking || booking.ratings.length === 0) return 0
    const sum = booking.ratings.reduce((a, b) => a + b, 0)
    return (sum / booking.ratings.length).toFixed(1)
  },

  hasRated(bookingId, userEmail) {
    const booking = this.bookings.find((b) => b.id === bookingId)
    if (!booking) return false
    return booking.ratedBy.includes(userEmail)
  },
})
