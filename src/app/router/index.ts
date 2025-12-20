import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/modules/authentication/store/authStore'

import Landing from '../routes/Landing.vue'
import Home from '../routes/Home.vue'
import Profile from '../routes/Profile.vue'
import Search from '../routes/Search.vue'
import Vault from '../routes/Vault.vue'
import Admin from '../routes/Admin.vue'
import Create from '../routes/Create.vue'
import Authentication from '../routes/Authentication.vue'

const routes = [
    { path: '/', name: 'Landing', component: Landing, meta: { public: true } },
    { path: '/auth', name: 'Authentication', component: Authentication, meta: { public: true } },

    { path: '/home', name: 'Home', component: Home },
    { path: '/profile/:userId', name: 'Profile', component: Profile, props: true },
    { path: '/search', name: 'Search', component: Search },
    { path: '/vault', name: 'Vault', component: Vault },
    { path: '/admin', name: 'Admin', component: Admin },
    { path: '/create', name: 'Create', component: Create },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Global auth guard
router.beforeEach((to) => {
    const auth = useAuthStore()

    // If route is NOT public and user is NOT authenticated
    if (!to.meta.public && !auth.isAuthenticated) {
        return '/auth'
    }

    // Optional: redirect logged-in users away from auth page
    if (to.meta.public && auth.isAuthenticated && to.path === '/auth') {
        return '/home'
    }
})

export default router
