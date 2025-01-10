<script setup>
import { osuPfpUrl, pageSwitcher, secondsLeft, secondsToMMSS } from "@/assets/utils";
import { onMounted, ref, computed } from "vue";

import CslBox from "@/components/CslBox.vue";
import LogoComponent from "@/components/LogoComponent.vue";
import BracketsComponent from "@/components/BracketsComponent.vue";

import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();

const players = computed(() => [
  state.data?.teams?.[0].players[0],
  state.data?.teams?.[1].players[0],
]);

const timeLeftString = ref();

const rightPageSwitcher = ref(new pageSwitcher(["brackets", "sponsor"], [50000, 10000]));

const bracketsContainerRef = ref();

const onWheel = (event) => {
  bracketsContainerRef.value.scrollLeft += event.deltaY / 10; // Convert vertical scroll to horizontal
};

onMounted(() => {
  setInterval(() => {
    const diff = secondsLeft(state.data?.schedule);
    timeLeftString.value = diff >= 0 ? secondsToMMSS(diff) : "00:00";
  }, 1000);

  rightPageSwitcher.value.init();
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
                <img class="pfp" :src="osuPfpUrl(players?.[0]?.id)" />
                <div class="novecento vs">VS</div>
                <img class="pfp" :src="osuPfpUrl(players?.[1]?.id)" />
              </div>
              <div class="playersInfo poppins">
                <div class="player red">
                  <div class="nick">{{ players[0]?.nick }}</div>
                  <div class="stats">
                    #{{ players[0]?.rank }} ({{ Math.round(players[0]?.pp).toLocaleString() }}pp)
                  </div>
                </div>
                <div class="player blue">
                  <div class="nick">{{ players[1]?.nick }}</div>
                  <div class="stats">
                    #{{ players[1]?.rank }} ({{ Math.round(players[1]?.pp).toLocaleString() }}pp)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="section">
          <Transition name="switchPage" mode="out-in"
            ><div class="page" v-if="rightPageSwitcher.currPage === 'brackets'">
              <div class="header" @click="rightPageSwitcher.advancePage">
                <div>BRACKET</div>
                <div style="flex-grow: 1"></div>
                <div class="theJamsil">대진표</div>
              </div>
              <div class="content">
                <div class="bracketsContainer" @wheel.prevent="onWheel" ref="bracketsContainerRef">
                  <BracketsComponent class="bracket"></BracketsComponent>
                </div>
              </div></div
          ></Transition>
          <Transition name="switchPage" mode="out-in"
            ><div class="page" v-if="rightPageSwitcher.currPage === 'sponsor'">
              <div class="header" @click="rightPageSwitcher.advancePage">
                <div>SPONSORED BY</div>
              </div>
              <div class="content">
                <LogoComponent class="sponsor absolute-center" type="sponsor"></LogoComponent>
              </div></div
          ></Transition>
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
  top: 72px;
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
  font-family: "Novecento";
  font-size: 44px;
  letter-spacing: 2px;
  font-weight: 700;
}

.pfp {
  max-width: 230px;
  max-height: 230px;
  width: auto;
  height: auto;
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

.bracketsContainer {
  position: relative;
  top: 40px;
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: none;
}
</style>
