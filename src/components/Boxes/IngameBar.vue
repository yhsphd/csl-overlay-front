<script setup>
import { range } from "@/assets/utils";
import LogoComponent from "../LogoComponent.vue";
import { useOrderStore } from "@/stores/order";
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();
const ov = useOrderStore();
</script>

<template>
  <div class="master-ingame-bar">
    <svg class="box" width="1880" height="106" viewBox="0 0 1880 106" fill="none">
      <path
        d="M1 10C1 5.02943 5.02944 1 10 1H1870C1874.97 1 1879 5.02944 1879 10V96C1879 100.971 1874.97 105 1870 105H10C5.02944 105 1 100.971 1 96V10Z"
        stroke="url(#paint0_linear_429_98)"
        stroke-width="2"
      />
      <path d="M200 1H849V105H200V1Z" stroke="url(#paint0_linear_429_98)" stroke-width="2" />
      <path d="M1031 1H1680V105H1031V1Z" stroke="url(#paint0_linear_429_98)" stroke-width="2" />
      <defs>
        <linearGradient id="paint0_linear_429_98" gradientTransform="rotate(75, 0.5, 0.5)">
          <stop offset="0%" stop-color="#CD2E3A" />
          <stop offset="100%" stop-color="#0047A0" />
        </linearGradient>
      </defs>
    </svg>

    <div class="contentBar horizontal-box novecento">
      <div class="webCam"></div>
      <div class="p1 red horizontal-box">
        <div class="label">P1</div>
        <div>
          <div class="nick">{{ ov.teams?.[0]?.name }}</div>
          <div class="horizontal-box">
            <div
              class="point"
              v-for="i in range(1, (ov.bo ? ov.bo : 0 + 1) / 2 + 1)"
              :key="i"
              :class="{ enabled: i <= ov.setScores?.[0] }"
            ></div>
          </div>
        </div>
      </div>
      <LogoComponent class="logo" type="white"></LogoComponent>
      <div class="p2 blue horizontal-box">
        <div>
          <div class="nick">{{ ov.teams?.[1]?.name }}</div>
          <div class="horizontal-box" style="direction: rtl">
            <div
              class="point"
              v-for="i in range(1, (ov.bo ? ov.bo : 0 + 1) / 2 + 1)"
              :key="i"
              :class="{ enabled: i <= ov.setScores?.[1] }"
            ></div>
          </div>
        </div>
        <div class="label">P2</div>
      </div>

      <div class="absolute-center-horizontal" style="bottom: -16px">
        <div class="matchNumber horizontal-box">
          <div class="colorband red"></div>
          <div class="content">Match {{ state.data?.match_code?.replace(/\D/g, "") }}</div>
          <div class="colorband blue"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-ingame-bar {
  width: 1880px;
  height: 106px;
  backdrop-filter: blur(12px);
  color: white;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 16px;
}

.box {
  position: absolute;
}

.contentBar {
  position: relative;
  width: 100%;
  height: 100%;
}

.webCam {
  width: 200px;
}

.logo {
  width: 80px;
  margin: 10px 50px 0 50px;
}

.p1,
.p2 {
  width: 650px;
}

.p2 {
  justify-content: flex-end;
}

.label {
  width: 70px;
  height: 38px;
  border-radius: 8px;
  text-align: center;
  line-height: 36px;
  font-size: 24px;
  margin: 16px;
}

.red .label {
  background-color: var(--csl-red);
}

.blue .label {
  background-color: var(--csl-blue);
}

.nick {
  font-size: 36px;
  line-height: 68px;
}

.point {
  width: 16px;
  height: 16px;
  margin: 0 8px 0 8px;
  border-radius: 4px;
  opacity: 0.5;
  filter: grayscale(100%) saturate(0);
  transition:
    opacity 500ms ease,
    filter 500ms ease;
}

.point.enabled {
  opacity: 1;
  filter: grayscale(0) saturate(100%);
}

.red .point {
  background-color: var(--csl-red-light);
}

.blue .point {
  background-color: var(--csl-blue-light);
}

.matchNumber {
  width: 200px;
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  color: black;
  background-color: white;
  transform: skewX(-30deg);
}

.colorband {
  width: 10px;
  min-width: 10px;
  height: 100%;
}

.colorband.red {
  background-color: var(--csl-red);
}

.colorband.blue {
  background-color: var(--csl-blue);
}

.matchNumber .content {
  flex-grow: 1;
  text-align: center;
  transform: skewX(30deg);
}
</style>
