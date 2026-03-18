import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes = [
  { path: '/', component: () => import('../pages/Landing.vue') },
  { path: '/auth', component: () => import('../pages/auth/AuthScreen.vue'), meta: { guest: true } },
  { path: '/onboarding', component: () => import('../pages/auth/Onboarding.vue'), meta: { requiresAuth: false } }, // Allow entering without full user profile
  
  // Test selection and runs
  { path: '/test-select', component: () => import('../pages/test/TestSelect.vue'), meta: { requiresAuth: true } },
  { path: '/test/stress', component: () => import('../pages/test/Stress.vue'), meta: { requiresAuth: true } },
  { path: '/test/portrait', component: () => import('../pages/test/Portrait.vue'), meta: { requiresAuth: true } },
  
  // Results
  { path: '/result/stress', component: () => import('../pages/result/StressRes.vue'), meta: { requiresAuth: true } },
  { path: '/result/portrait', component: () => import('../pages/result/PortraitRes.vue'), meta: { requiresAuth: true } },
  
  // Dashboards
  { path: '/dashboard', component: () => import('../pages/dashboards/Dashboard.vue'), meta: { requiresAuth: true } },
  { path: '/parent', component: () => import('../pages/dashboards/ParentDashboard.vue'), meta: { requiresAuth: true, role: 'parent' } },
  { path: '/parent/child/:id', component: () => import('../pages/dashboards/ChildDetail.vue'), meta: { requiresAuth: true, role: 'parent' } },
  { path: '/school/dashboard', component: () => import('../pages/dashboards/SchoolDashboard.vue'), meta: { requiresAuth: true, role: 'school_psychologist' } },
  { path: '/psychologist/dashboard', component: () => import('../pages/dashboards/PsychologistDashboard.vue'), meta: { requiresAuth: true, role: 'professional_psychologist' } },
  
  // Admin
  { path: '/admin-login', component: () => import('../pages/admin/AdminLogin.vue'), meta: { guest: true } },
  { path: '/admin/dashboard', component: () => import('../pages/dashboards/AdminDashboard.vue'), meta: { requiresAuth: true, role: 'admin' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // Since guards fire before app mount init, we ensure storage is loaded
  if (!userStore.user && localStorage.getItem('user')) {
    userStore.loadUserFromStorage()
  }

  const isAuth = userStore.isLoggedIn
  const userRole = userStore.role

  if (to.meta.requiresAuth && !isAuth) {
    next('/auth')
  } else if (to.meta.guest && isAuth) {
    // If guest route but logged in, bounce to dashboard
    next('/dashboard')
  } else if (to.meta.role && to.meta.role !== userRole) {
    // Role mismatch
    next('/dashboard')
  } else {
    next()
  }
})

export default router
