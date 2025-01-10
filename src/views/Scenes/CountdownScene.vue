<script setup>
import { ref, computed, onMounted } from "vue";
import { secondsToMMSS, secondsLeft, pageSwitcher } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";

import LogoComponent from "@/components/LogoComponent.vue";
import OverflowText from "@/components/OverflowText.vue";

const state = useOverlayDataStore();

const timeLeftString = ref("");

const np = computed(() => {
  if (!state.data.now_playing) {
    return {
      cover: "",
      title: "",
      artist: "",
      time: 0,
      length: 1,
    };
  }
  return state.data.now_playing[state.data.now_playing.mode];
});

const title = computed(() => np.value.title);
const artist = computed(() => np.value.artist);
const duration = computed(() => np.value.length / 1000);
const position = computed(() => np.value?.time / 1000);
const positionFrac = computed(() => (position.value / duration.value) * 100);

const switcher = ref(new pageSwitcher(["nowPlaying", "nextMatch"], [10000, 50000]));

const matches = computed(() => state.data?.CSL?.matches);
const orderedCodes = computed(() =>
  Object.keys(matches.value).sort((a, b) => {
    const dateA = new Date(a.schedule);
    const dateB = new Date(b.schedule);
    return dateA - dateB;
  })
);
const teams = computed(() => state.data?.CSL?.teams);
const nextMatch = computed(() => matches.value[orderedCodes.value[0]]);
const bracket = computed(() => {
  switch (nextMatch.value?.bracket) {
    case "Quarterfinals":
      return "QF";
    case "Semifinals":
      return "SF";
    case "Final":
      return "F";
    default:
      return "";
  }
});

onMounted(() => {
  setInterval(() => {
    const diff = secondsLeft(state.data?.schedule);
    timeLeftString.value = diff >= 0 ? secondsToMMSS(diff) : "00:00";
  }, 1000);

  switcher.value.init();
});
</script>

<template>
  <div class="master-countdown-scene scene">
    <LogoComponent class="logo absolute-center-horizontal" type="white"></LogoComponent>
    <div class="header absolute-center">Time to Event</div>
    <div class="timeLeft absolute-center">{{ timeLeftString }}</div>
    <div class="middleArea absolute-center" @click="switcher.advancePage()">
      <Transition name="switchPage" mode="out-in">
        <div
          v-if="switcher.currPage === 'nowPlaying'"
          class="nowPlaying horizontal-box"
          :key="switcher.currPage"
        >
          <div class="label">Now Playing</div>
          <div class="value">
            <OverflowText class="title" :speed="100" :key="artist + title"
              >{{ artist }} - {{ title }}</OverflowText
            >
            <div class="progressBar">
              <div class="position" :style="{ width: positionFrac + '%' }"></div>
            </div>
          </div></div
      ></Transition>
      <Transition name="switchPage" mode="out-in">
        <div
          v-if="switcher.currPage === 'nextMatch'"
          class="nextMatch horizontal-box"
          :key="switcher.currPage"
        >
          <div class="label">Next Match</div>
          <div class="value">
            <OverflowText class="matchup" :key="nextMatch"
              >{{ bracket }} - {{ teams[nextMatch.players[0]].nick }} vs.
              {{ teams[nextMatch.players[1]].nick }}</OverflowText
            >
          </div>
        </div></Transition
      >
    </div>
    <LogoComponent class="sponsor absolute-center-horizontal" type="sponsor"></LogoComponent>
  </div>
</template>

<style scoped>
.master-countdown-scene {
  position: absolute;
  color: white;
  font-family: "theJamsil", "Noto Sans KR";
}

.logo {
  top: 92px;
  width: 144px;
}

.header {
  top: 300px;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: 8px;
}

.timeLeft {
  font-weight: 800;
  font-size: 360px;
  letter-spacing: 20px;
}

.middleArea {
  top: 760px;
  height: 60px;
  width: 1120px;
  font-weight: 800;
  font-size: 40px;
  letter-spacing: 4px;
  justify-content: center;
}

.middleArea > * {
  position: absolute;
}

.label {
  text-align: center;
  width: 300px;
  padding-right: 60px;
  line-height: 50px;
}

.value {
  font-weight: 400;
  width: 760px;
  white-space: nowrap;
}

.title {
  font-size: 32px;
  height: 32px;
  width: inherit;
  line-height: 32px;
}

.matchup {
  width: inherit;
  height: 100%;
}

.progressBar {
  width: 100%;
  height: 8px;
  margin-top: 16px;
  border: solid white 1px;
}

.progressBar > .position {
  background-color: white;
  width: 20%;
  height: 100%;
}

.nextMatch {
  line-height: 50px;
}

.sponsor {
  position: absolute;
  width: 400px;
  bottom: 70px;
}
</style>
