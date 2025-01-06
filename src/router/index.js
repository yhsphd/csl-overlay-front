import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/control",
      name: "control",
      component: () => import("../views/ControlView.vue"),
    },
    {
      path: "/overlay",
      name: "scenes",
      component: () => import("../views/ScenesView.vue"),
    },
    {
      path: "/overlay/countdown",
      name: "countdown",
      component: () => import("../views/Scenes/CountdownScene.vue"),
    },
    {
      path: "/overlay/outro",
      name: "outro",
      component: () => import("../views/Scenes/OutroScene.vue"),
    },
    {
      path: "/overlay/intro",
      name: "intro",
      component: () => import("../views/Scenes/IntroScene.vue"),
    },
  ],
});

export default router;
