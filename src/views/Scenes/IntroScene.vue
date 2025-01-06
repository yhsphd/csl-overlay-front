<script setup>
import { secondsLeft, secondsToMMSS } from "@/assets/utils";
import { onMounted, ref } from "vue";

import CslBox from "@/components/CslBox.vue";
import LogoComponent from "@/components/LogoComponent.vue";

import { useOverlayDataStore } from "@/stores/socket";
import BracketsComponent from "@/components/BracketsComponent.vue";

const state = useOverlayDataStore();

const timeLeftString = ref();

onMounted(() => {
  setInterval(() => {
    const diff = secondsLeft(state.data?.schedule);
    timeLeftString.value = diff >= 0 ? secondsToMMSS(diff) : "00:00";
  }, 1000);
});
</script>

<template>
  <div class="master-intro-scene scene">
    <LogoComponent class="logo absolute-center-horizontal" type="white"></LogoComponent>

    <CslBox class="container absolute-center-horizontal">
      <div class="midBox">
        <div class="section">
          <div class="page">
            <div class="header">
              <div>NEXT MATCH IN</div>
              <div style="flex-grow: 1"></div>
              <div class="theJamsil">{{ timeLeftString }}</div>
            </div>
            <div class="content">
              <div class="horizontal-box" style="width: 100%; margin-top: 120px">
                <img class="pfp" src="https://a.ppy.sh/6665667" />
                <div class="novecento vs">VS</div>
                <img class="pfp" src="https://a.ppy.sh/6665667" />
              </div>
              <div class="playersInfo poppins">
                <div class="player red">
                  <div class="nick">yhsphd</div>
                  <div class="stats">#15,852 (7,985pp)</div>
                </div>
                <div class="player blue">
                  <div class="nick">yhsphd</div>
                  <div class="stats">#15,852 (7,985pp)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="section">
          <div class="page" v-if="true">
            <div class="header">
              <div>BRACKET</div>
              <div style="flex-grow: 1"></div>
              <div class="theJamsil">대진표</div>
            </div>
            <div class="content">
              <BracketsComponent></BracketsComponent>
            </div>
          </div>
          <div class="page" v-if="false">
            <div class="header">
              <div>SPONSORED BY</div>
            </div>
            <div class="content">
              <LogoComponent class="sponsor absolute-center" type="sponsor"></LogoComponent>
            </div>
          </div>
        </div>
      </div>
    </CslBox>
  </div>
</template>

<style scoped>
.master-intro-scene {
  position: absolute;
  color: white;
}

.logo {
  top: 92px;
  width: 144px;
}

.container {
  position: absolute;
  bottom: 60px;
  width: 1760px;
  height: 750px;
}

.midBox {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px;
  display: flex;
}

.divider {
  width: 5px;
  background: white;
  height: 100%;
  margin: 0 50px 0 50px;
}

.section {
  position: relative;
  display: flex;
  width: 50%;
}

.page {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px;
}

.header {
  display: flex;
  font-family: "Novecento Sans";
  font-size: 44px;
  letter-spacing: 2px;
  font-weight: 700;
}

.pfp {
  width: 230px;
}

.vs {
  flex-grow: 1;
  font-size: 112px;
  font-weight: 700;
  text-align: center;
  margin-top: 40px;
}

.playersInfo {
  position: relative;
  margin-top: 40px;
  width: 100%;
  font-weight: 600;
}

.player {
  position: absolute;
}

.player.red {
  color: var(--csl-red-light);
}

.player.blue {
  right: 0;
  text-align: right;
  color: var(--csl-blue-light);
}

.nick {
  font-size: 36px;
  margin-bottom: 12px;
}

.stats {
  font-size: 24px;
}

.sponsor {
  width: 590px;
}
</style>
