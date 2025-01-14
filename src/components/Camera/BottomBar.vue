<script setup>
import "@/components/Camera/camera.css";
import { pageSwitcher, secondsLeft, secondsToMMSS } from "@/assets/utils";
import LogoComponent from "@/components/LogoComponent.vue";

import { useOverlayDataStore } from "@/stores/socket";
import { computed, onMounted, ref } from "vue";

const state = useOverlayDataStore();

const timeLeftString = ref();
const title = computed(() => state.data?.stream_title);

const logoSwitcher = ref(new pageSwitcher(["csl", "sponsor"], [50000, 10000]));

onMounted(() => {
  setInterval(() => {
    const diff = secondsLeft(state.data?.schedule);
    timeLeftString.value = diff >= 0 ? secondsToMMSS(diff) : "00:00";
  }, 1000);

  logoSwitcher.value.init();
});
</script>

<template>
  <div class="master-bottom-bar">
    <div class="skewedBoxWrapper horizontal-box novecento">
      <div class="contentWrapper side" style="background-color: #e8e8e8">
        <div class="content" style="height: 100%">
          <Transition name="switchPage" mode="out-in">
            <LogoComponent
              v-if="logoSwitcher.currPage === 'sponsor'"
              class="logo absolute-center"
              type="sponsor"
              :invert="true"
            ></LogoComponent
          ></Transition>
          <Transition name="switchPage" mode="out-in">
            <LogoComponent
              v-if="logoSwitcher.currPage === 'csl'"
              class="logo absolute-center"
              type="white"
              :invert="true"
              style="height: 80%; top: 56px"
            ></LogoComponent
          ></Transition>
        </div>
      </div>
      <div class="divider red"></div>
      <div class="contentWrapper center">
        <div class="content title" style="height: 67%">{{ title }}</div>
        <div class="contentWrapper titleSub poppins" style="height: 33%; background-color: #e8e8e8">
          <div class="content">
            Circles in SEOUL Circles in SEOUL Circles in SEOUL Circles in SEOUL Circles in SEOUL
            Circles in SEOUL Circles in SEOUL Circles in SEOUL Circles in SEOUL Circles in SEOUL
            Circles in SEOUL Circles in SEOUL
          </div>
        </div>
      </div>
      <div class="divider blue"></div>
      <div class="contentWrapper side">
        <div class="contentWrapper timerHeader" style="height: 33%; background-color: #e8e8e8">
          <div class="content">We are back in</div>
        </div>
        <div class="content theJamsil timerBody" style="height: 67%">{{ timeLeftString }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-bottom-bar {
  width: 1700px;
  height: 100px;
}

.contentWrapper.side {
  width: 300px;
  min-width: 300px;
}

.timerHeader {
  text-align: center;
  font-size: 24px;
}

.timerBody {
  text-align: center;
  font-weight: 900;
  font-size: 40px;
  line-height: 65px;
}

.title {
  font-family: "Novecento", "theJamsil";
  font-weight: 600;
  font-size: 40px;
  text-align: center;
  line-height: 65px;
  white-space: nowrap;
  overflow: hidden;
}

.titleSub {
  font-size: 24px;
  text-align: center;
  color: #b3b3b3;
  font-weight: 700;
  white-space: nowrap;
}
</style>
