import 'bootstrap/dist/css/bootstrap.min.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCmfS_VaBN7Nz9MXlJHCwCxVeZipo4XxkA',
//   authDomain: 'pawerup-92f54.firebaseapp.com',
//   projectId: 'pawerup-92f54',
//   storageBucket: 'pawerup-92f54.firebasestorage.app',
//   messagingSenderId: '117236558919',
//   appId: '1:117236558919:web:3e764f6ff99231608f9562',
// }

// // Initialize Firebase
// initializeApp(firebaseConfig)
