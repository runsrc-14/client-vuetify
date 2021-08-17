import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList"),
      meta: {
        title: 'หน้าหลัก',
        keepAlive: true
      },
    },
    {
      path: "/stations",
      name: "weather",
      component: () => import("./components/weather"),
      meta: {
        title: 'สถานี',
        keepAlive: false
      },
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial"),
      meta: {
        title: 'จัดการข้อมูล',
      },
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial"),
      meta: {
        title: 'เพิ่มข้อมูล',
        keepAlive: true
      },
    },

    {
      path: "/",
      name: "chart",
      component: () => import("./components/cases"),
      meta: {
        title: 'หน้าแรก',

      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/login"),
      meta: {
        title: 'เข้าสู่ระบบ',
      },
    },
    {
      // catch all 404 - define at the very end
      path: "*",
      component: () => import("./views/NotFound.vue"),
      meta:{
        title: 'NotFound'
      }
      }

  ]
});
