<template>
  <div class="map-wrapper">
    <div class="control-panel">
      <h5>🐾 PawerUp Route Planner</h5>

      <div class="form-group">
        <label>Start Location</label>
        <div id="start-geocoder"></div>
        <input v-model="startInput" placeholder="e.g.  -37.91, 145.13  or  30 Sir John Monash Dr" />
        <button class="btn" @click="useMyLocation">📍 Use My Location</button>
      </div>

      <div class="form-group">
        <label>Destination</label>
        <select v-model="selectedDestination" @change="onDestinationChange">
          <option disabled value="">-- Select a therapy dog spot --</option>
          <option v-for="spot in therapyDogSpots" :key="spot.name" :value="spot.name">
            {{ spot.name }}
          </option>
        </select>
      </div>

      <button class="btn navigate-btn" @click="planRoute">Get Route</button>
      <button class="btn clear-btn" @click="clearRoute">Clear Route</button>

      <div v-if="activeSpot" class="spot-card">
        <div class="spot-header">
          <h6>{{ activeSpot.name }}</h6>
          <span class="badge">PawerUp Verified</span>
        </div>
        <p class="spot-desc">{{ activeSpot.description }}</p>
        <p class="spot-meta">📍 {{ activeSpot.address }}</p>
        <p class="spot-meta">🕒 {{ activeSpot.hours }}</p>
        <div class="spot-actions">
          <a class="btn" :href="`/events?spot=${encodeURIComponent(activeSpot.name)}`"
            >Join Event</a
          >
          <a class="btn outline" :href="activeSpot.moreUrl" target="_blank" rel="noopener"
            >Learn More</a
          >
        </div>
      </div>

      <p v-if="recommendation" class="recommendation">
        ⭐ Closest PawerUp Event: <b>{{ recommendation.name }}</b
        ><br />
        {{ recommendation.description }}
      </p>

      <p v-if="routeInfo" class="route-info">
        🛣️ Distance: {{ routeInfo.distance }} km<br />
        ⏱️ ETA: {{ routeInfo.duration }} min
      </p>
    </div>

    <div class="map-container">
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

mapboxgl.accessToken =
  import.meta.env.VITE_MAPBOX_TOKEN ||
  'pk.eyJ1IjoidGluYXRhbmcyMDQ4IiwiYSI6ImNtZ3E0Y2FoeDB2ZGIybXE0dmwxd2Y1d2EifQ.gL7GOnSJdEdFjKSE8X8Q0Q'

const therapyDogSpots = [
  {
    name: 'Caulfield Park',
    coords: [145.0227, -37.8772],
    address: 'Balaclava Rd, Caulfield North',
    hours: 'Open 24 hours',
    description: 'Large green spaces, lakeside paths; popular with local pups.',
    moreUrl: 'https://www.google.com/maps/search/Caulfield+Park+Caulfield+North',
  },
  {
    name: 'Princes Park (Caulfield South)',
    coords: [145.0191, -37.899],
    address: 'Bambra Rd & North Rd, Caulfield South',
    hours: 'Open 24 hours',
    description: 'Shaded ovals and walking loops; family-friendly.',
    moreUrl: 'https://www.google.com/maps/search/Princes+Park+Caulfield+South',
  },
  {
    name: 'Packer Park',
    coords: [145.0497, -37.9076],
    address: 'Leila Rd, Carnegie',
    hours: 'Open 24 hours',
    description: 'Wide open fields and paths; easy parking nearby.',
    moreUrl: 'https://www.google.com/maps/search/Packer+Park+Carnegie',
  },
  {
    name: 'Duncan Mackinnon Reserve',
    coords: [145.0619, -37.9045],
    address: 'North Rd, Murrumbeena',
    hours: 'Open 24 hours',
    description: 'Sports ovals, paths, and community vibe.',
    moreUrl: 'https://www.google.com/maps/search/Duncan+Mackinnon+Reserve',
  },
  {
    name: 'Koornang Park',
    coords: [145.0493, -37.8929],
    address: 'Munro Ave, Carnegie',
    hours: 'Open 24 hours',
    description: 'Leafy local park; short loops perfect for calm walks.',
    moreUrl: 'https://www.google.com/maps/search/Koornang+Park+Carnegie',
  },
  {
    name: 'Boyd Park',
    coords: [145.0678, -37.8928],
    address: 'Neerim Rd, Murrumbeena',
    hours: 'Open 24 hours',
    description: 'Linear park along old rail; peaceful and green.',
    moreUrl: 'https://www.google.com/maps/search/Boyd+Park+Murrumbeena',
  },
  {
    name: 'Lord Reserve',
    coords: [145.0492, -37.8841],
    address: 'Malane St, Carnegie',
    hours: 'Open 24 hours',
    description: 'Neighbourhood ovals and relaxed open lawns.',
    moreUrl: 'https://www.google.com/maps/search/Lord+Reserve+Carnegie',
  },
  {
    name: 'Jells Park',
    coords: [145.1915, -37.9009],
    address: 'Waverley Rd, Wheelers Hill',
    hours: 'Open 24 hours',
    description: 'Lakes, long paths, and nature feel; weekend favourite.',
    moreUrl: 'https://www.google.com/maps/search/Jells+Park',
  },
  {
    name: 'Valley Reserve',
    coords: [145.1325, -37.8803],
    address: 'Waimarie Dr, Mount Waverley',
    hours: 'Open 24 hours',
    description: 'Bushland trails and creeks; tranquil and shady.',
    moreUrl: 'https://www.google.com/maps/search/Valley+Reserve+Mount+Waverley',
  },
  {
    name: 'Central Reserve',
    coords: [145.16, -37.8787],
    address: 'Springvale Rd & Waverley Rd, Glen Waverley',
    hours: 'Open 24 hours',
    description: 'Large community reserve with multiple ovals.',
    moreUrl: 'https://www.google.com/maps/search/Central+Reserve+Glen+Waverley',
  },
  {
    name: 'Warrawee Park Oval',
    coords: [145.0899, -37.8999],
    address: 'Drummond St, Oakleigh',
    hours: 'Open 24 hours',
    description: 'Oakleigh heartland oval with open surrounds.',
    moreUrl: 'https://www.google.com/maps/search/Warrawee+Park+Oakleigh',
  },
  {
    name: 'Caloola Reserve',
    coords: [145.0955, -37.9307],
    address: 'Beryl Ave, Oakleigh South',
    hours: 'Open 24 hours',
    description: 'Quiet local reserve; easy access and parking.',
    moreUrl: 'https://www.google.com/maps/search/Caloola+Reserve+Oakleigh+South',
  },
  {
    name: 'Namatjira Park',
    coords: [145.114, -37.9356],
    address: 'Namatjira Ave, Clarinda',
    hours: 'Open 24 hours',
    description: 'Wetlands edges and open fields; relaxed ambience.',
    moreUrl: 'https://www.google.com/maps/search/Namatjira+Park+Clarinda',
  },
  {
    name: 'Bald Hill Park',
    coords: [145.1219, -37.9398],
    address: 'Oak St, Clarinda',
    hours: 'Open 24 hours',
    description: 'Expansive grassland with gentle slopes.',
    moreUrl: 'https://www.google.com/maps/search/Bald+Hill+Park+Clarinda',
  },
  {
    name: 'Gardiners Creek Reserve (Ashwood)',
    coords: [145.1066, -37.8677],
    address: 'High St Rd & Warrigal Rd, Ashwood',
    hours: 'Open 24 hours',
    description: 'Creek-side shared paths and leafy shade.',
    moreUrl: 'https://www.google.com/maps/search/Gardiners+Creek+Reserve+Ashwood',
  },
]

const map = ref(null)
const userLocation = ref(null)
const startInput = ref('')
const startCoords = ref(null)
const selectedDestination = ref('')
const routeInfo = ref(null)
const recommendation = ref(null)
const activeSpot = ref(null)
const routeSourceId = 'route'
let startGeocoder

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [145.1336, -37.91],
    zoom: 12,
  })

  map.value.addControl(new mapboxgl.NavigationControl(), 'top-right')

  startGeocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
    marker: false,
    placeholder: 'Search a start location…',
    countries: 'au',
  })
  const holder = document.getElementById('start-geocoder')
  if (holder) startGeocoder.addTo('#start-geocoder')

  startGeocoder.on('result', (e) => {
    if (e?.result?.center) {
      startCoords.value = e.result.center
      startInput.value =
        e.result.place_name || `${e.result.center[1].toFixed(5)}, ${e.result.center[0].toFixed(5)}`
    }
  })

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLocation.value = [pos.coords.longitude, pos.coords.latitude]
      new mapboxgl.Marker({ color: '#007aff' })
        .setLngLat(userLocation.value)
        .setPopup(new mapboxgl.Popup().setText('Your current location'))
        .addTo(map.value)
      map.value.flyTo({ center: userLocation.value, zoom: 13 })
      findClosestSpot()
    },
    () => {
      userLocation.value = [145.1336, -37.91]
      findClosestSpot()
    },
    { enableHighAccuracy: true },
  )

  therapyDogSpots.forEach((spot) => {
    const m = new mapboxgl.Marker({ color: '#2b8ce1' })
      .setLngLat(spot.coords)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="min-width:220px">
           <h6 style="margin:0 0 6px 0">${spot.name}</h6>
           <div style="font-size:12px;color:#333;margin-bottom:6px">${spot.address}</div>
           <div style="font-size:12px;color:#555;margin-bottom:8px">${spot.description}</div>
           <button class="popup-btn" data-dest="${spot.name}">Get Directions</button>
         </div>`,
        ),
      )
      .addTo(map.value)
  })

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup-btn')) {
      const destName = e.target.getAttribute('data-dest')
      selectedDestination.value = destName
      onDestinationChange()
      planRoute()
    }
  })
})

function useMyLocation() {
  if (userLocation.value) {
    startCoords.value = [...userLocation.value]
    startInput.value = `${userLocation.value[1].toFixed(5)}, ${userLocation.value[0].toFixed(5)}`
    if (startGeocoder) startGeocoder.setInput('')
  }
}

function parseLatLngText(txt) {
  const p = txt.split(',').map((s) => s.trim())
  if (p.length === 2) {
    const lat = parseFloat(p[0])
    const lng = parseFloat(p[1])
    if (!isNaN(lat) && !isNaN(lng)) return [lng, lat]
  }
  return null
}

async function planRoute() {
  let start = null
  if (startCoords.value) start = startCoords.value
  else if (parseLatLngText(startInput.value)) start = parseLatLngText(startInput.value)
  else if (userLocation.value) start = userLocation.value
  else start = [145.1336, -37.91]
  const destSpot = therapyDogSpots.find((s) => s.name === selectedDestination.value)
  if (!destSpot) return
  await drawRoute(start, destSpot.coords)
}

function clearRoute() {
  if (map.value.getLayer(routeSourceId)) map.value.removeLayer(routeSourceId)
  if (map.value.getSource(routeSourceId)) map.value.removeSource(routeSourceId)
  routeInfo.value = null
}

async function drawRoute(start, end) {
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`
  const res = await fetch(url)
  const data = await res.json()
  const route = data.routes?.[0]
  if (!route) return
  if (map.value.getSource(routeSourceId)) {
    map.value.removeLayer(routeSourceId)
    map.value.removeSource(routeSourceId)
  }
  map.value.addSource(routeSourceId, {
    type: 'geojson',
    data: { type: 'Feature', geometry: route.geometry },
  })
  map.value.addLayer({
    id: routeSourceId,
    type: 'line',
    source: routeSourceId,
    layout: { 'line-join': 'round', 'line-cap': 'round' },
    paint: { 'line-color': '#2b8ce1', 'line-width': 5, 'line-opacity': 0.85 },
  })
  routeInfo.value = {
    distance: (route.distance / 1000).toFixed(2),
    duration: Math.round(route.duration / 60),
  }
  const b = new mapboxgl.LngLatBounds()
  b.extend(start).extend(end)
  map.value.fitBounds(b, { padding: 64 })
}

function findClosestSpot() {
  if (!userLocation.value) return
  let min = Infinity
  let close = null
  therapyDogSpots.forEach((s) => {
    const dx = userLocation.value[0] - s.coords[0]
    const dy = userLocation.value[1] - s.coords[1]
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d < min) {
      min = d
      close = s
    }
  })
  recommendation.value = close
}

function onDestinationChange() {
  const s = therapyDogSpots.find((x) => x.name === selectedDestination.value)
  activeSpot.value = s || null
}
</script>

<style scoped>
.map-wrapper {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.control-panel {
  width: 320px;
  background: #f9f9f9;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Poppins', sans-serif;
}
.control-panel h5 {
  text-align: center;
  margin-bottom: 10px;
}
.form-group {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group input,
.form-group select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
}
.btn {
  background-color: #2b8ce1;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  margin-top: 4px;
  display: inline-block;
  text-align: center;
}
.btn:hover {
  background-color: #176ebc;
}
.navigate-btn {
  background: linear-gradient(135deg, #00b09b, #96c93d);
}
.clear-btn {
  background: #aaa;
  margin-left: 8px;
}
.recommendation {
  margin-top: 10px;
  background: #fff3cd;
  border-radius: 8px;
  padding: 8px;
  font-size: 0.9rem;
}
.route-info {
  margin-top: 10px;
  background: #e9f9ff;
  border-radius: 8px;
  padding: 8px;
  font-size: 0.9rem;
}
.spot-card {
  margin-top: 12px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 12px;
}
.spot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.badge {
  background: #e6f2ff;
  color: #2b8ce1;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
}
.spot-desc {
  margin: 8px 0;
  color: #333;
}
.spot-meta {
  margin: 2px 0;
  color: #555;
  font-size: 0.92rem;
}
.spot-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}
.btn.outline {
  background: #ffffff;
  color: #2b8ce1;
  border: 1px solid #2b8ce1;
}
.map-container {
  flex: 1;
  min-width: 520px;
  height: 70vh;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(43, 140, 225, 0.25);
}
.map {
  width: 100%;
  height: 100%;
}
.popup-btn {
  background-color: #2b8ce1;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  margin-top: 5px;
  cursor: pointer;
}
.popup-btn:hover {
  background-color: #176ebc;
}
#start-geocoder :deep(.mapboxgl-ctrl-geocoder) {
  width: 100%;
  max-width: 100%;
}
</style>
