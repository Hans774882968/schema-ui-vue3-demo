import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    component: HomeView,
    name: 'home',
    path: '/',
  },
  {
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/multiTypeDashboard/MultiTypeDashboard.vue'),

    name: 'dashboard',

    path: '/dashboard/:dashboardType',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
