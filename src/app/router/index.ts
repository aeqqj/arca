import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../routes/Landing.vue';
import Home from '../routes/Home.vue';
import Profile from '../routes/Profile.vue';
import Search from '../routes/Search.vue';
import Vault from '../routes/Vault.vue';
import Admin from '../routes/Admin.vue';
import Create from '../routes/Create.vue';
import Authentication from '../routes/Authentication.vue';

const routes = [
    { path: '/', name: 'Landing', component: Landing },
    { path: '/home', name: 'Home', component: Home },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/search', name: 'Search', component: Search },
    { path: '/vault', name: 'Vault', component: Vault },
    { path: '/admin', name: 'Admin', component: Admin },
    { path: '/create', name: 'Create', component: Create },
    { path: '/auth', name: 'Authentication', component: Authentication },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
