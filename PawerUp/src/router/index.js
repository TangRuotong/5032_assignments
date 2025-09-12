import { auth, db } from '@/firebase/init.js'
import { doc, getDoc } from 'firebase/firestore'
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BookingView from '../views/BookingView.vue'
import ProgramsView from '../views/ProgramsView.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminView from '../views/AdminView.vue'
import UserboardView from '../views/UserboardView.vue'

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
    path: '/programs',
    name: 'Programs',
    component: ProgramsView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAdmin: true },
  },
  {
    path: '/userboard',
    name: 'Userboard',
    component: UserboardView,
  },
  {
    path: '/booking',
    name: 'Booking',
    component: BookingView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const user = auth.currentUser

  if (to.meta.requiresAdmin) {
    if (!user) {
      alert('Please sign in first.')
      return next('/dashboard')
    }

    try {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const role = docSnap.data().role
        if (role === 'admin') {
          return next()
        } else {
          alert('You are not authorized to view this page.')
          return next('/booking')
        }
      } else {
        console.warn('User document not found in Firestore!')
        return next('/dashboard')
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
      return next('/dashboard')
    }
  }
  if (to.meta.requiresAuth) {
    if (!user) {
      alert('Please log in to access this page.')
      return next('/dashboard')
    }

    try {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const role = docSnap.data().role
        if (role === 'user' || role === 'admin') {
          return next()
        } else {
          alert('You are not authorized to view this page.')
          return next('/dashboard')
        }
      } else {
        alert('No user profile found. Please contact support.')
        return next('/dashboard')
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
      return next('/dashboard')
    }
  }
  next()
})

export default router
