<script setup>
import { computed, ref } from "vue";
import LogoComponent from "../LogoComponent.vue";
import CountUp from "vue-countup-v3";
import { useOrderStore } from "@/stores/order";
import { useOverlayDataStore } from "@/stores/socket";
import OverflowText from "../OverflowText.vue";
import { clamp, intObjectToArray } from "@/assets/utils";

const ov = useOrderStore();
const state = useOverlayDataStore();

const mapToShow = computed(() => state.data?.now_playing?.osu);
const statsToShow = computed(() => mapToShow.value?.stats?.modified);

const liveScoresBak = ref([0, 0]);
const liveScores = computed(() => {
  if (liveScores.value) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    liveScoresBak.value = liveScores.value;
  }
  return intObjectToArray(state.data?.lobby?.scores);
});
// const liveScores = computed(() => [125600, 100000]);
const diffBak = computed(() => liveScoresBak.value[0] - liveScoresBak.value[1]);
const diff = computed(() => liveScores.value?.[0] - liveScores.value?.[1]);
const diffWidth = computed(() => (clamp(Math.abs(diff.value), 0, 150000) * 50) / 150000);
const winning = computed(() => (diff.value > 0 ? "red" : diff.value < 0 ? "blue" : ""));
const scorePosOffset = computed(() => 50 + clamp(diffWidth.value, 12.5, 35) + "%");
</script>

<template>
  <div class="master-ingame-bottom-bar">
    <svg class="box" width="1886" height="172" viewBox="0 0 1886 172" fill="none">
      <path
        d="M1876 1H10C5.02944 1 1 5.02944 1 10V162C1 166.971 5.02945 171 10 171H1876C1880.97 171 1885 166.971 1885 162V10M1876 1C1880.97 1 1885 5.02944 1885 10M1876 1H1423V58H1885V10M465 1H1421M465 1V171H1421V1M465 1V112H1421V1"
        stroke="url(#paint0_linear_429_98)"
        stroke-width="2"
      />
      <defs>
        <linearGradient id="paint0_linear_429_98" gradientTransform="rotate(75, 0.5, 0.5)">
          <stop offset="0%" stop-color="#CD2E3A" />
          <stop offset="100%" stop-color="#0047A0" />
        </linearGradient>
      </defs>
    </svg>

    <div class="contentBar horizontal-box novecento">
      <div class="sideBox">
        <div class="mapBox" :style="{ backgroundImage: `url(${mapToShow?.background})` }">
          <div class="contentWrapper">
            <div class="code novecento">{{ mapToShow?.code }}</div>
            <OverflowText class="title poppins" :key="mapToShow?.title">
              {{ mapToShow?.artist }} - {{ mapToShow?.title }}
            </OverflowText>
            <div class="diff poppins">[{{ mapToShow?.difficulty }}]</div>
          </div>
          <div
            class="backgroundTint"
            :style="{
              backgroundColor: ov.tb ? 'black' : `var(--csl-${ov.lastPick?.team ? 'blue' : 'red'})`,
            }"
          ></div>
          <div class="backgroundDarker"></div>
        </div>
        <div class="horizontal-box">
          <div class="statColumn">
            <div class="statLine horizontal-box">
              <div>SR</div>
              <div style="flex-grow: 1"></div>
              <div>{{ statsToShow?.sr.toFixed(2) }}</div>
            </div>
            <div class="statLine horizontal-box">
              <div>BPM</div>
              <div style="flex-grow: 1"></div>
              <div>{{ statsToShow?.bpm.toFixed(0) }}</div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="statColumn">
            <div class="statLine horizontal-box">
              <div>AR</div>
              <div style="flex-grow: 1"></div>
              <div>{{ statsToShow?.ar.toFixed(1) }}</div>
            </div>
            <div class="statLine horizontal-box">
              <div>CS</div>
              <div style="flex-grow: 1"></div>
              <div>{{ statsToShow?.cs.toFixed(1) }}</div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="statColumn">
            <div class="statLine horizontal-box">
              <div>HP</div>
              <div style="flex-grow: 1"></div>
              <div>{{ statsToShow?.hp.toFixed(1) }}</div>
            </div>
            <div class="statLine horizontal-box">
              <div>OD</div>
              <div style="flex-grow: 1"></div>
              <div>{{ statsToShow?.od.toFixed(1) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="centerBox">
        <div class="scorebarArea">
          <div class="scorebar red" :style="{ width: winning === 'red' ? diffWidth + '%' : 0 }">
            <div class="scorediff" :style="{ opacity: winning === 'blue' ? 1 : 0 }">
              <count-up
                :startVal="Math.abs(diffBak)"
                :endVal="Math.abs(diff)"
                :duration="0.1"
              ></count-up>
              <!-- {{ Math.abs(diff).toLocaleString() }} -->
            </div>
          </div>
          <div class="scorebar blue" :style="{ width: winning === 'blue' ? diffWidth + '%' : 0 }">
            <div class="scorediff" :style="{ opacity: winning === 'red' ? 1 : 0 }">
              <count-up
                :startVal="Math.abs(diffBak)"
                :endVal="Math.abs(diff)"
                :duration="0.1"
              ></count-up>
            </div>
          </div>
        </div>
        <div
          class="score red"
          :class="{ winning: winning === 'red' }"
          :style="{
            right: winning === 'red' ? scorePosOffset : '50%',
            transform: winning !== 'red' ? 'unset' : 'translateX(50%)',
          }"
        >
          <count-up
            :startVal="liveScoresBak[0]"
            :endVal="liveScores?.[0]"
            :duration="0.1"
          ></count-up>
          <!-- {{ liveScores?.[0]?.toLocaleString() }} -->
        </div>
        <div
          class="score blue"
          :class="{ winning: winning === 'blue' }"
          :style="{
            left: winning === 'blue' ? scorePosOffset : '50%',
            transform: winning !== 'blue' ? 'unset' : 'translateX(-50%)',
          }"
        >
          <count-up
            :startVal="liveScoresBak[1]"
            :endVal="liveScores?.[1]"
            :duration="0.1"
          ></count-up>
          <!-- {{ liveScores?.[1]?.toLocaleString() }} -->
        </div>
        <div
          class="absolute-center-horizontal"
          style="position: absolute; bottom: 12px; font-size: 32px"
        >
          Score
        </div>
      </div>
      <div class="sideBox" style="position: relative">
        <div style="text-align: center; font-size: 32px; line-height: 57px">Sponsored by</div>
        <LogoComponent
          class="sponsor absolute-center-horizontal"
          type="sponsor"
          style="margin-top: 28px"
        ></LogoComponent>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-ingame-bottom-bar {
  width: 1886px;
  height: 172px;
  backdrop-filter: blur(12px);
  color: white;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  overflow: hidden;
}

.box {
  position: absolute;
  z-index: 1000;
}

.contentBar {
  width: 100%;
  height: 100%;
}

.sideBox {
  width: 462px;
  height: 100%;
}

.centerBox {
  position: relative;
  width: 956px;
}

.sponsor {
  width: 280px;
}

.scorebarArea {
  position: relative;
  width: 100%;
  height: 20px;
}

.scorebar {
  position: absolute;
  font-family: "Poppins";
  font-weight: 600;
  height: 100%;
  font-size: 24px;
  width: 0;
  box-sizing: border-box;
}

.scorebar.red {
  right: 50%;
  color: var(--csl-blue-light);
  background-color: var(--csl-red-light);
  direction: rtl;
}

.scorebar.blue {
  left: 50%;
  color: var(--csl-red-light);
  background-color: var(--csl-blue-light);
}

.scorediff {
  transition: opacity 500ms ease;
  margin: 4px 12px 0 12px;
}

.score {
  position: absolute;
  top: 40px;
  font-family: "theJamsil";
  font-size: 48px;
  font-weight: 300;
  margin: 0 8px 0 8px;
  width: fit-content;
}

.score.winning {
  font-weight: 600;
  font-size: 56px;
  top: 30px;
}

.score.red {
  right: 90%; /* should programmatically be capped */
  transform: translateX(50%);
}

.score.blue {
  left: 50%; /* should programmatically be capped */
}

.mapBox {
  position: relative;
  width: 100%;
  height: 109px;
  box-sizing: border-box;
  background-image: url(https://assets.ppy.sh/beatmaps/977796/covers/raw.jpg);
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.backgroundTint {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.backgroundDarker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
}

.contentWrapper {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
}

.code {
  font-size: 32px;
  line-height: 32px;
}

.title {
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
  width: 100%;
  height: 32px;
}

.diff {
  font-size: 14px;
  font-weight: 500;
}

.bmapStats {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
}

.statColumn {
  font-family: "Novecento";
  font-size: 22px;
  padding: 0 8px 0 8px;
}

.statColumn:nth-child(1) {
  width: 44%;
}

.statColumn:nth-child(3),
.statColumn:nth-child(5) {
  width: 28%;
}

.divider {
  width: 2px;
  height: 60px;
  background-color: white;
}

.statLine:nth-child(even) {
  background-color: rgba(217, 217, 217, 0.1);
}
</style>
