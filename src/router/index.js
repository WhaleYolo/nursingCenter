import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'
const home = () => import('../views/home')
const login = () => import(/* webpackChunkName: "discovery" */ '../views/login')
const checkin = () => import('../views/customer/checkin.vue')
const checkout = () => import('../views/customer/checkout.vue')
const customerInfo = () => import('../views/customer/customerInfo.vue')
const recurePlan = () => import('../views/recure/recurePlan.vue')
const bedInfo = () => import('../views/bed/bedInfo.vue')
const foodRecord = () => import('../views/food/foodRecord.vue')
const nursingInfo = () => import('../views/nursing/nursingInfo.vue')
const nursingItem = () => import('../views/nursing/nursingItem.vue')
const nurse = () => import('../views/staff/nurse.vue')
const nursingWorker = () => import('../views/staff/nursingWorker.vue')
const doctor = () => import('../views/staff/doctor.vue')
const userInfo = () => import('../views/user/userInfo.vue')

// const customer = () => import('../views')
// const customer = () => import('../views')
// const customer = () => import('../views')

// const insert = () => import('../views/insert')
// const update = () => import('../views/update')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/customer/checkin',
    name: 'checkin',
    component: checkin,
    meta: { requiresAuth: true }
  },
  {
    path: '/customer/checkout',
    name: 'checkout',
    component: checkout,
    meta: { requiresAuth: true }
  },
  {
    path: '/customer/customerInfo',
    name: 'customerInfo',
    component: customerInfo,
    meta: { requiresAuth: true }
  },
  {
    path: '/recure/recurePlan',
    name: 'recurePlan',
    component: recurePlan,
    meta: { requiresAuth: true }
  },
  {
    path: '/bed/bedInfo',
    name: 'bedInfo',
    component: bedInfo,
    meta: { requiresAuth: true }
  },
  {
    path: '/food/foodRecord',
    name: 'foodRecord',
    component: foodRecord,
    meta: { requiresAuth: true }
  },
  {
    path: '/nursing/nursingItem',
    name: 'nursingItem',
    component: nursingItem,
    meta: { requiresAuth: true }
  },
  {
    path: '/nursing/nursingInfo',
    name: 'nursingInfo',
    component: nursingInfo,
    meta: { requiresAuth: true }
  },
  {
    path: '/staff/doctor',
    name: 'doctor',
    component: doctor,
    meta: { requiresAuth: true }
  },
  {
    path: '/staff/nurse',
    name: 'nurse',
    component: nurse,
    meta: { requiresAuth: true }
  },
  {
    path: '/staff/nursingWorker',
    name: 'nursingWorker',
    component: nursingWorker,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/userInfo',
    name: 'userInfo',
    component: userInfo,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { // 判断该路由是否需要登录权限
    const token = sessionStorage.getItem("token")
    if (token) { // 判断当前的token是否存在 ； 登录存入的token
      next()
    } else {
      if (to.path === '/login') {
        next()
      } else {
        Element.Message.error('请您先登录', { duration: 3 * 1000 })
        next('/login')
      }
    }
  } else {
    next()
  }
})


export default router
