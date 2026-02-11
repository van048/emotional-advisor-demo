import Vue from 'vue';
import VueRouter from 'vue-router';
const HomeView = () => import('../views/Home.vue');
const AboutView = () => import('../views/About.vue');
const ContactView = () => import('../views/Contact.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/about/:id',
    name: 'about-detail',
    component: AboutView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;