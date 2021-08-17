import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: "/editUser",
    name: "จัดการเจ้าหน้าที่",
    component: () => import("../components/EditUsers"),
    meta: {
      title: 'จัดการผู้ใช้งานระบบ',
      keepAlive: true
    },
  },
  {
    path: "/stations",
    name: "จัดการข้อมูลสถานี",
    component: () => import("../components/weather"),
    meta: {
      title: 'จัดการข้อมูลสถานี',
      keepAlive: false
    },
  },


  {
    path: "/home",
    name: "Dashboard", 
    component: () => import("../components/cases"),
    meta: {
      title: 'Dashboard',

    },
  },
  {
    path: "/login",
    name: "เข้าสู่ระบบ",
    component: () => import("../components/login"),
    meta: {
      title: 'เข้าสู่ระบบ',
    },
  },
  {
    path: "/stations1",
    name: "สถานี1",
    component: () => import("../components/stations/st1.vue"),
    meta: {
      title: 'สถานี1',
    },
  },
  {
    path: "/stations2",
    name: "สถานี2",
    component: () => import("../components/stations/st2.vue"),
    meta: {
      title: 'สถานี2',
    },
  },
  {
    // catch all 404 - define at the very end
    path: "*",
    name:"404 Page",
    component: () => import("../views/NotFound.vue"),
    meta: {
      title: 'NotFound'
    }
  }


]

const router = new VueRouter({
  // mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to);
  document.title =  `SMF - ${to.name}`
  next()
})

export default router
