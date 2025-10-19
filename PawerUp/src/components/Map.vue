<template>
  <div class="container-fluid py-4">
    <div class="row g-4">
      <div class="col-12 col-md-5 col-lg-4">
        <div class="control-panel shadow-sm p-3 rounded-4 bg-white">
          <h5 class="text-center fw-bold mb-3">🐾 PawerUp Route Planner</h5>
          <div class="mb-3">
            <label class="form-label">Start Location</label>
            <div class="geocoder-wrap position-relative">
              <div id="start-geocoder"></div>
              <button class="btn btn-outline-primary geolocate-btn" @click="useMyLocation">
                📍
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Destination</label>
            <select v-model="selectedDestination" @change="onDestinationChange" class="form-select">
              <option disabled value="">-- Select a therapy dog spot --</option>
              <option v-for="spot in therapyDogSpots" :key="spot.name" :value="spot.name">
                {{ spot.name }}
              </option>
            </select>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-success flex-fill" @click="planRoute">Get Route</button>
            <button class="btn btn-secondary flex-fill" @click="clearRoute">Clear</button>
          </div>

          <div v-if="activeSpot" class="mt-3 p-2 rounded bg-light border">
            <h6 class="fw-bold">{{ activeSpot.name }}</h6>
            <p class="mb-1">{{ activeSpot.description }}</p>
            <p class="mb-1">📍 {{ activeSpot.address }}</p>
            <p class="mb-1">🕒 {{ activeSpot.hours }}</p>
            <div class="d-flex gap-2 mt-2">
              <a
                class="btn btn-primary flex-fill"
                :href="`/events?spot=${encodeURIComponent(activeSpot.name)}`"
                >Join Event</a
              >
              <a
                class="btn btn-outline-primary flex-fill"
                :href="activeSpot.moreUrl"
                target="_blank"
                rel="noopener"
                >Learn More</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-7 col-lg-8">
        <div id="map" class="map-container rounded-4 shadow-sm"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const emit = defineEmits(['update-recommendations', 'route-details'])

mapboxgl.accessToken =
  import.meta.env.VITE_MAPBOX_TOKEN ||
  'pk.eyJ1IjoidGluYXRhbmcyMDQ4IiwiYSI6ImNtZ3E0Y2FoeDB2ZGIybXE0dmwxd2Y1d2EifQ.gL7GOnSJdEdFjKSE8X8Q0Q'

const therapyDogSpots = [
  {
    name: 'Caulfield Park',
    coords: [145.0227, -37.8772],
    address: 'Balaclava Rd, Caulfield North',
    hours: 'Open 24h',
    description: 'Large green spaces, lakeside paths.',
    moreUrl: 'https://www.google.com/maps/search/Caulfield+Park+Caulfield+North',
  },
  {
    name: 'Princes Park (Caulfield South)',
    coords: [145.0191, -37.899],
    address: 'Bambra Rd & North Rd, Caulfield South',
    hours: 'Open 24h',
    description: 'Shaded ovals, family-friendly loops.',
    moreUrl: 'https://www.google.com/maps/search/Princes+Park+Caulfield+South',
  },
  {
    name: 'Packer Park',
    coords: [145.0497, -37.9076],
    address: 'Leila Rd, Carnegie',
    hours: 'Open 24h',
    description: 'Wide fields and paths.',
    moreUrl: 'https://www.google.com/maps/search/Packer+Park+Carnegie',
  },
  {
    name: 'Duncan Mackinnon Reserve',
    coords: [145.0619, -37.9045],
    address: 'North Rd, Murrumbeena',
    hours: 'Open 24h',
    description: 'Community ovals and tracks.',
    moreUrl: 'https://www.google.com/maps/search/Duncan+Mackinnon+Reserve',
  },
  {
    name: 'Koornang Park',
    coords: [145.0493, -37.8929],
    address: 'Munro Ave, Carnegie',
    hours: 'Open 24h',
    description: 'Leafy local park for calm walks.',
    moreUrl: 'https://www.google.com/maps/search/Koornang+Park+Carnegie',
  },
  {
    name: 'Boyd Park',
    coords: [145.0678, -37.8928],
    address: 'Neerim Rd, Murrumbeena',
    hours: 'Open 24h',
    description: 'Linear park along old rail.',
    moreUrl: 'https://www.google.com/maps/search/Boyd+Park+Murrumbeena',
  },
  {
    name: 'Lord Reserve',
    coords: [145.0492, -37.8841],
    address: 'Malane St, Carnegie',
    hours: 'Open 24h',
    description: 'Relaxed open lawns near ovals.',
    moreUrl: 'https://www.google.com/maps/search/Lord+Reserve+Carnegie',
  },
  {
    name: 'Jells Park',
    coords: [145.1915, -37.9009],
    address: 'Waverley Rd, Wheelers Hill',
    hours: 'Open 24h',
    description: 'Lakes, long paths, nature feel.',
    moreUrl: 'https://www.google.com/maps/search/Jells+Park',
  },
  {
    name: 'Valley Reserve',
    coords: [145.1325, -37.8803],
    address: 'Waimarie Dr, Mount Waverley',
    hours: 'Open 24h',
    description: 'Bushland trails and creeks.',
    moreUrl: 'https://www.google.com/maps/search/Valley+Reserve+Mount+Waverley',
  },
  {
    name: 'Central Reserve',
    coords: [145.16, -37.8787],
    address: 'Springvale Rd, Glen Waverley',
    hours: 'Open 24h',
    description: 'Large community reserve.',
    moreUrl: 'https://www.google.com/maps/search/Central+Reserve+Glen+Waverley',
  },
  {
    name: 'Warrawee Park Oval',
    coords: [145.0899, -37.8999],
    address: 'Drummond St, Oakleigh',
    hours: 'Open 24h',
    description: 'Oakleigh oval with open surrounds.',
    moreUrl: 'https://www.google.com/maps/search/Warrawee+Park+Oakleigh',
  },
  {
    name: 'Caloola Reserve',
    coords: [145.0955, -37.9307],
    address: 'Beryl Ave, Oakleigh South',
    hours: 'Open 24h',
    description: 'Quiet reserve, easy parking.',
    moreUrl: 'https://www.google.com/maps/search/Caloola+Reserve+Oakleigh+South',
  },
  {
    name: 'Namatjira Park',
    coords: [145.114, -37.9356],
    address: 'Namatjira Ave, Clarinda',
    hours: 'Open 24h',
    description: 'Wetlands edges and fields.',
    moreUrl: 'https://www.google.com/maps/search/Namatjira+Park+Clarinda',
  },
  {
    name: 'Bald Hill Park',
    coords: [145.1219, -37.9398],
    address: 'Oak St, Clarinda',
    hours: 'Open 24h',
    description: 'Expansive grassland, gentle slopes.',
    moreUrl: 'https://www.google.com/maps/search/Bald+Hill+Park+Clarinda',
  },
  {
    name: 'Gardiners Creek Reserve (Ashwood)',
    coords: [145.1066, -37.8677],
    address: 'High St Rd & Warrigal Rd, Ashwood',
    hours: 'Open 24h',
    description: 'Creek-side shared paths, shade.',
    moreUrl: 'https://www.google.com/maps/search/Gardiners+Creek+Reserve+Ashwood',
  },
]

const map = ref(null)
const selectedDestination = ref('')
const routeInfo = ref(null)
const activeSpot = ref(null)
const closestThree = ref([])
const userLocation = ref(null)
const startCoords = ref(null)
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
    placeholder: 'Search address, POI, or paste "lat, lng"',
    countries: 'au',
    types: 'address,poi',
  })
  startGeocoder.addTo('#start-geocoder')
  startGeocoder.on('result', (e) => {
    if (e?.result?.center) startCoords.value = e.result.center
  })

  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: false,
  })
  map.value.addControl(geolocate, 'bottom-right')

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLocation.value = [pos.coords.longitude, pos.coords.latitude]
      new mapboxgl.Marker({ color: '#007aff' }).setLngLat(userLocation.value).addTo(map.value)
      map.value.flyTo({ center: userLocation.value, zoom: 13 })
      updateClosestSpots()
    },
    () => {
      userLocation.value = [145.1336, -37.91]
      updateClosestSpots()
    },
    { enableHighAccuracy: true },
  )

  therapyDogSpots.forEach((spot) => {
    new mapboxgl.Marker({ color: '#2b8ce1' })
      .setLngLat(spot.coords)
      .setPopup(
        new mapboxgl.Popup({ offset: 16 }).setHTML(
          `<div style="min-width:220px">
          <h6 style="margin:0 0 6px 0">${spot.name}</h6>
          <div style="font-size:12px;color:#333;margin-bottom:6px">${spot.address}</div>
          <div style="font-size:12px;color:#555;margin-bottom:8px">${spot.description}</div>
          <button class="popup-nav" data-dest="${spot.name}" style="width:100%;padding:6px;border-radius:6px;border:1px solid #2b8ce1;background:#fff;color:#2b8ce1;cursor:pointer">Navigate</button>
        </div>`,
        ),
      )
      .addTo(map.value)
  })

  document.addEventListener('click', (e) => {
    const el = e.target
    if (el && el.classList.contains('popup-nav')) {
      const destName = el.getAttribute('data-dest')
      selectedDestination.value = destName
      onDestinationChange()
      planRoute()
    }
  })
})

function useMyLocation() {
  if (!userLocation.value) return
  startCoords.value = [...userLocation.value]
  if (startGeocoder)
    startGeocoder.setInput(
      `${userLocation.value[1].toFixed(5)}, ${userLocation.value[0].toFixed(5)}`,
    )
}

function calcDistance(a, b) {
  const R = 6371
  const dLat = ((b[1] - a[1]) * Math.PI) / 180
  const dLon = ((b[0] - a[0]) * Math.PI) / 180
  const s1 = Math.sin(dLat / 2)
  const s2 = Math.sin(dLon / 2)
  const aa = s1 * s1 + Math.cos((a[1] * Math.PI) / 180) * Math.cos((b[1] * Math.PI) / 180) * s2 * s2
  return R * 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa))
}

function updateClosestSpots() {
  if (!userLocation.value) return
  closestThree.value = therapyDogSpots
    .map((s) => ({ ...s, distance: calcDistance(userLocation.value, s.coords) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
  emit('update-recommendations', closestThree.value)
}

function onDestinationChange() {
  activeSpot.value = therapyDogSpots.find((x) => x.name === selectedDestination.value) || null
}

async function planRoute() {
  const start = startCoords.value || userLocation.value
  let destSpot = therapyDogSpots.find((s) => s.name === selectedDestination.value)
  if (!destSpot && closestThree.value.length) destSpot = closestThree.value[0]
  if (!start || !destSpot) return
  await drawRoute(start, destSpot)
}

async function drawRoute(start, destSpot) {
  const end = destSpot.coords
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
  const b = new mapboxgl.LngLatBounds()
  b.extend(start).extend(end)
  map.value.fitBounds(b, { padding: 64 })
  routeInfo.value = {
    startName: 'Start Point',
    endName: destSpot.name,
    distance: (route.distance / 1000).toFixed(2),
    duration: Math.round(route.duration / 60),
    mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${end[1]},${end[0]}`,
  }
  emit('route-details', {
    start: 'Start Point',
    end: destSpot.name,
    distance: (route.distance / 1000).toFixed(2),
    duration: Math.round(route.duration / 60),
  })
}

function clearRoute() {
  if (map.value?.getLayer(routeSourceId)) map.value.removeLayer(routeSourceId)
  if (map.value?.getSource(routeSourceId)) map.value.removeSource(routeSourceId)
  routeInfo.value = null
}
</script>

<style scoped>
.control-panel {
  font-family: 'Poppins', sans-serif;
}
.map-container {
  width: 100%;
  height: 65vh;
  min-height: 420px;
  margin-bottom: 2rem;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid #0a6aa1;
  color: #0a6aa1;
  text-decoration: none;
}
.route-box {
  background: #eef7ff;
  border: 1px solid #b9dafc;
}
.geocoder-wrap :deep(.mapboxgl-ctrl-geocoder) {
  width: 100%;
  max-width: 100%;
}
.geolocate-btn {
  position: absolute;
  right: 8px;
  bottom: -48px;
  height: 40px;
  line-height: 1;
  padding: 0 10px;
  border-radius: 8px;
}
@media (max-width: 992px) {
  .map-container {
    height: 50vh;
  }
}
@media (max-width: 768px) {
  .map-container {
    height: 45vh;
    margin-top: 1rem;
  }
}
@media (max-width: 576px) {
  .map-container {
    height: 40vh;
  }
}
</style>
