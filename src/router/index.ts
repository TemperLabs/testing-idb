import { createRouter, createWebHistory } from 'vue-router';
import Doctors from '@pages/Doctors.vue'
import Nurses from '@pages/Nurses.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Doctors,
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: Doctors,
  },
  {
    path: '/nurses',
    name: 'Nurses',
    component: Nurses,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;