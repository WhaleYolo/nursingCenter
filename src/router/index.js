import Vue from 'vue'
import VueRouter from 'vue-router'
const home = () => import('../views/home')
const login = () => import(/* webpackChunkName: "discovery" */ '../views/login')
const checkin = () => import('../views/customer/checkin.vue')
const checkout = () => import('../views/customer/checkout.vue')
const customerInfo = () => import('../views/customer/customerInfo.vue')
const recurePlan = () => import('../views/recure/recurePlan.vue')
const recureStatus = () => import('../views/recure/recureStatus.vue')
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
    //meta: { requiresAuth: true }
  },
  {
    path: '/customer/checkout',
    name: 'checkout',
    component: checkout
  },
  {
    path: '/customer/customerInfo',
    name: 'customerInfo',
    component: customerInfo
  },
  {
    path: '/recure/recurePlan',
    name: 'recurePlan',
    component: recurePlan
  },
  {
    path: '/recure/recureStatus',
    name: 'recureStatus',
    component: recureStatus
  },
  {
    path: '/bed/bedInfo',
    name: 'bedInfo',
    component: bedInfo
  },
  {
    path: '/food/foodRecord',
    name: 'foodRecord',
    component: foodRecord
  },
  {
    path: '/nursing/nursingItem',
    name: 'nursingItem',
    component: nursingItem
  },
  {
    path: '/nursing/nursingInfo',
    name: 'nursingInfo',
    component: nursingInfo
  },
  {
    path: '/staff/doctor',
    name: 'doctor',
    component: doctor
  },
  {
    path: '/staff/nurse',
    name: 'nurse',
    component: nurse
  },
  {
    path: '/staff/nursingWorker',
    name: 'nursingWorker',
    component: nursingWorker
  },
  {
    path: '/user/userInfo',
    name: 'userInfo',
    component: userInfo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
