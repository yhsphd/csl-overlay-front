import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ScenesView from "../views/ScenesView.vue";
import CountdownScene from "../views/Scenes/CountdownScene.vue";
import OutroScene from "../views/Scenes/OutroScene.vue";
import IntroScene from "../views/Scenes/IntroScene.vue";
import BracketsScene from "../views/Scenes/BracketsScene.vue";
import AnalysisScene from "@/views/Scenes/AnalysisScene.vue";
import CameraScene from "@/views/Scenes/CameraScene.vue";
import BanpickScene from "@/views/Scenes/BanpickScene.vue";

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
      component: ScenesView,
    },
    {
      path: "/overlay/countdown",
      name: "countdown",
      component: CountdownScene,
    },
    {
      path: "/overlay/outro",
      name: "outro",
      component: OutroScene,
    },
    {
      path: "/overlay/intro",
      name: "intro",
      component: IntroScene,
    },
    {
      path: "/overlay/brackets",
      name: "brackets",
      component: BracketsScene,
    },
    {
      path: "/overlay/analysis",
      name: "analysis",
      component: AnalysisScene,
    },
    {
      path: "/overlay/camera",
      name: "camera",
      component: CameraScene,
    },
    {
      path: "/overlay/banpick",
      name: "banpick",
      component: BanpickScene,
    },
  ],
});

export default router;
