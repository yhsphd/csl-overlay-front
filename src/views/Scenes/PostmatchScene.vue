<script setup>
import LogoComponent from "@/components/LogoComponent.vue";
import BanpickBar from "@/components/Boxes/BanpickBar.vue";
import BanpickBox from "@/components/Boxes/BanpickBox.vue";
import CslBox from "@/components/Boxes/CslBox.vue";
import MapBox from "@/components/MapBox.vue";
import ResultDiffComponent from "@/components/ResultDiffComponent.vue";
import { useOrderStore } from "@/stores/order";
import { computed, ref } from "vue";
import { intObjectToArray } from "@/assets/utils";

const ov = useOrderStore();

const mapsInPage = 5;
const pageNum = ref(0);
const turnPage = (turn) => {
  switch (turn) {
    case "next":
      if (pageNum.value < maxPages - 1) pageNum.value++;
      break;
    case "prev":
      if (pageNum.value > 0) pageNum.value--;
      break;
  }
};

const pickOrders = computed(() => {
  const order = intObjectToArray(ov.order);
  const picks = [];
  for (let i = 0; i < order.length; i++) {
    if (order[i].pick) {
      picks.push(order[i]);
    }
  }
  return picks;
});
const maxPages = Math.ceil(pickOrders.value.length / mapsInPage);
</script>

<template>
  <div class="master-postmatch-scene scene">
    <LogoComponent class="logo absolute-center-horizontal" type="white"></LogoComponent>
    <BanpickBar class="banpickBar absolute-center-horizontal"></BanpickBar>
    <BanpickBox class="banpickBox"></BanpickBox>

    <CslBox class="detailedInfoBox" :thin="true">
      <div class="header horizontal-box">
        <svg
          width="17"
          height="20"
          viewBox="0 0 17 20"
          @click="turnPage('prev')"
          style="z-index: 10"
        >
          <path
            d="M16 1.33975L1 10L16 18.6603L16 1.33975Z"
            stroke="white"
            :fill="pageNum === 0 ? 'none' : 'white'"
          />
        </svg>
        <div style="margin: 0 24px 0 24px">Match Overview</div>
        <svg
          width="17"
          height="20"
          viewBox="0 0 17 20"
          @click="turnPage('next')"
          style="z-index: 10"
        >
          <path
            d="M17 10L0.500001 19.5263L0.500002 0.47372L17 10Z"
            stroke="white"
            :fill="pageNum === maxPages - 1 ? 'none' : 'white'"
          />
        </svg>
      </div>
      <Transition name="switchPage" mode="out-in">
        <div class="page" :key="pageNum">
          <div
            class="resultRow horizontal-box"
            v-for="(result, i) in pickOrders.slice(
              pageNum * mapsInPage,
              (pageNum + 1) * mapsInPage
            )"
            :key="i"
          >
            <MapBox :horizontal="true" type="result" :pickData="result"></MapBox>
            <div style="width: 32px; color: white"></div>
            <ResultDiffComponent :compact="true" :pickData="result"></ResultDiffComponent>
          </div>
        </div>
      </Transition>
    </CslBox>
  </div>
</template>

<style scoped>
.master-postmatch-scene {
  color: white;
}

svg {
  cursor: pointer;
  pointer-events: all;
}

.logo {
  width: 56px;
  top: 34px;
}

.banpickBar {
  top: 108px;
}

.banpickBox {
  position: absolute;
  bottom: 63px;
  left: 122px;
}

.detailedInfoBox {
  position: absolute;
  bottom: 63px;
  right: 122px;
  width: 1199px;
  height: 744px;
}

.header {
  width: 100%;
  font-family: "novecento";
  font-size: 36px;
  text-align: center;
  line-height: 72px;
  height: 72px;
  justify-content: center;
  align-items: center;
}

.page {
  position: absolute;
  padding: 0 48px;
}

.resultRow {
  align-items: center;
  margin-bottom: 4px;
}
</style>
