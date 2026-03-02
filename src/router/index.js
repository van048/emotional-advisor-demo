import Vue from 'vue';
import VueRouter from 'vue-router';
const HomeView = () => import('../views/Home.vue');
const AboutView = () => import('../views/About.vue');
const ContactView = () => import('../views/Contact.vue');
const RecommendationResultView = () => import('../views/RecommendationResult.vue');

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
  },
  {
    path: '/recommendation/:mood',
    name: 'recommendation',
    component: RecommendationResultView
  }
];

const router = new VueRouter({
  routes
});

// 添加调试日志
router.beforeEach((to, from, next) => {
  console.log('[路由调试] 正在导航到:', to, to.path);
  next();
});

export default router;