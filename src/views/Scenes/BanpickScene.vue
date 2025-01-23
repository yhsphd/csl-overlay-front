<script setup>
import BanpickBar from "@/components/Boxes/BanpickBar.vue";
import BanpickBox from "@/components/Boxes/BanpickBox.vue";
import CslBox from "@/components/Boxes/CslBox.vue";
import LogoComponent from "@/components/LogoComponent.vue";
import OverflowText from "@/components/OverflowText.vue";
import MapBox from "@/components/MapBox.vue";

import { useOverlayDataStore } from "@/stores/socket";
import { computed } from "vue";
import { intObjectToArray, secondsToMMSS } from "@/assets/utils";
import { useOrderStore } from "@/stores/order";
import ResultDiffComponent from "@/components/ResultDiffComponent.vue";

const state = useOverlayDataStore();
const ov = useOrderStore();

const mappool = computed(() => intObjectToArray(state.data?.mappool));
const mapToShow = computed(() => ov.lastPickedMap);
const statsToShow = computed(() =>
  mapToShow.value.stats?.modified ? mapToShow.value.stats.modified : mapToShow.value.stats
);
const showPrevResult = computed(
  () => !(ov.playing || ov.defending || ov.order.length === 4 || ov.tb)
);
</script>

<template>
  <div class="master-banpick-scene scene">
    <LogoComponent class="logo absolute-center-horizontal" type="white"></LogoComponent>

    <BanpickBar class="banpickBar absolute-center-horizontal"></BanpickBar>
    <CslBox class="mappoolBox" :thin="true">
      <div class="header">Mappool</div>
      <div class="content">
        <div
          class="mapBox horizontal-box"
          v-for="(map, i) in mappool"
          :key="i"
          :style="{
            opacity: ov.unavailableMaps.banned.includes(map.code) ? 0.3 : 1,
            color: ov.unavailableMaps.red.includes(map.code)
              ? 'var(--csl-red-light)'
              : ov.unavailableMaps.blue.includes(map.code)
                ? 'var(--csl-blue-light)'
                : 'white',
          }"
          :class="{ pulsing: ov.unavailableMaps.highlight === map.code }"
        >
          <div class="code novecento">{{ map.code }}</div>
          <OverflowText class="title poppins">
            {{ map.artist }} - {{ map.title }} [{{ map.difficulty }}]
          </OverflowText>
        </div>
      </div>
    </CslBox>
    <BanpickBox class="banpickBox absolute-center-horizontal"></BanpickBox>
    <CslBox class="pickBox" :thin="true">
      <Transition name="switchPage" mode="out-in">
        <div v-if="!showPrevResult" style="position: absolute">
          <div class="header">Current Pick</div>
          <div class="content">
            <MapBox></MapBox>
            <div class="bmapStats">
              <div class="header">Beatmap Information</div>
              <div class="horizontal-box">
                <div class="statColumn">
                  <div class="statLine horizontal-box">
                    <div>Drain</div>
                    <div style="flex-grow: 1"></div>
                    <div>{{ secondsToMMSS(statsToShow?.length / 1000) }}</div>
                  </div>
                  <div class="statLine horizontal-box">
                    <div>BPM</div>
                    <div style="flex-grow: 1"></div>
                    <div>{{ statsToShow?.bpm.toFixed(0) }}</div>
                  </div>
                  <div class="statLine horizontal-box">
                    <div>Circles</div>
                    <div style="flex-grow: 1"></div>
                    <div>{{ mapToShow?.count_circles }}</div>
                  </div>
                  <div class="statLine horizontal-box">
                    <div>Sliders</div>
                    <div style="flex-grow: 1"></div>
                    <div>{{ mapToShow?.count_sliders }}</div>
                  </div>

                  <div class="statLine horizontal-box">
                    <div>Spinners</div>
                    <div style="flex-grow: 1"></div>
                    <div>{{ mapToShow?.count_spinners }}</div>
                  </div>
                </div>
                <div class="statColumn">
                  <div class="statLine horizontal-box">
                    <div>SR</div>
                    <div style="flex-grow: 1"></div>
                    <div>{{ statsToShow?.sr.toFixed(2) }}</div>
                  </div>
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
          </div>
        </div>
      </Transition>
      <Transition name="switchPage" mode="out-in">
        <div v-if="showPrevResult" style="position: absolute">
          <div class="header">Previous Pick Result</div>
          <div class="content">
            <MapBox type="result"></MapBox>
            <ResultDiffComponent v-if="showPrevResult"></ResultDiffComponent>
          </div>
        </div>
      </Transition>
    </CslBox>
    <CslBox class="commBox" :thin="true"></CslBox>
  </div>
</template>

<style scoped>
.master-banpick-scene {
  color: white;
}

.logo {
  width: 56px;
  top: 34px;
}

.banpickBar {
  top: 108px;
}

.mappoolBox {
  position: absolute;
  width: 590px;
  height: 743px;
  left: 121px;
  top: 274px;
}

.banpickBox {
  top: 274px;
}

.pickBox {
  position: absolute;
  width: 590px;
  height: 390px;
  right: 121px;
  top: 274px;
}

.commBox {
  position: absolute;
  width: 590px;
  height: 332px;
  right: 121px;
  top: 685px;
}

.header {
  font-family: "novecento";
  font-size: 36px;
  text-align: center;
  line-height: 64px;
}

.content {
  padding: 0 24px;
}

.mapBox {
  margin-bottom: 2px;
}

.code {
  width: 70px;
  min-width: 70px;
  font-size: 26px;
}

.title {
  width: 700px;
  font-size: 20px;
  white-space: nowrap;
}

.bmapStats {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
}

.bmapStats > .header {
  font-size: 24px;
  background-color: #515151;
  line-height: 40px;
}

.statColumn {
  width: 50%;
  font-family: "Novecento";
  font-size: 22px;
  padding: 0 8px 0 8px;
}

.statLine:nth-child(odd) {
  background-color: rgba(217, 217, 217, 0.1);
}

.pulsing {
  animation: upNextPulse 700ms ease infinite;
}
</style>
