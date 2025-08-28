import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BookingForm from '../components/BookingForm.vue'
import ProgramsForm from '../views/ProgramsView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/booking',
    name: 'Booking',
    component: BookingForm,
  },
  {
    path: '/programs',
    name: 'Programs',
    component: ProgramsForm,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
