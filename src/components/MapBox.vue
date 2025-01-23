<script setup>
import { computed } from "vue";
import OverflowText from "./OverflowText.vue";
import { useOrderStore } from "@/stores/order";
import ScoreDiffGraph from "./ScoreDiffGraph.vue";
import { useOverlayDataStore } from "@/stores/socket";
import { getMappool, intObjectToArray } from "@/assets/utils";

const state = useOverlayDataStore();

const props = defineProps({
  type: String,
  horizontal: Boolean,
  pickData: Object,
});

const ov = useOrderStore();

const masterHeight = computed(() => {
  if (props.horizontal) {
    return "109px";
  } else if (props.type === "result") {
    return "150px";
  } else {
    return "109px";
  }
});

const mappool = computed(() => intObjectToArray(state.data?.mappool));
const pick = computed(() => (props.pickData ? props.pickData : ov.lastPick));
const code = computed(() => pick.value?.code);
const map = computed(() => getMappool(mappool.value, code.value));
const history = computed(() => state.data?.CSL?.history);
const mapHistory = computed(() => {
  const defaultValue = {
    log: [],
    score: [0, 0],
    acc: [0, 0],
    combo: [0, 0],
    miss: [0, 0],
  };

  if (!code.value) {
    return defaultValue;
  }

  return history[map.value.map_id] ? history[map.value.map_id] : defaultValue;
});
</script>

<template>
  <div class="master-map-box">
    <div
      class="mapBox"
      :style="{ height: masterHeight, backgroundImage: `url(${map?.background})` }"
    >
      <div v-if="!horizontal" class="contentWrapper">
        <div class="code novecento">{{ map?.code }}</div>
        <OverflowText class="title poppins" :key="map?.title">
          {{ map?.artist }} - {{ map?.title }}
        </OverflowText>
        <div v-if="type !== 'result'" class="diff poppins">[{{ map?.difficulty }}]</div>
        <ScoreDiffGraph
          v-if="type === 'result'"
          class="scoreDiffGraph"
          :data="mapHistory.log"
        ></ScoreDiffGraph>
      </div>
      <div v-if="horizontal" class="contentWrapper horizontal-box horizontal">
        <div class="code novecento">{{ map?.code }}</div>
        <div style="margin-left: 16px">
          <OverflowText class="title poppins" :key="map?.title" style="width: 410px">
            {{ map?.artist }} - {{ map?.title }}
          </OverflowText>
          <div v-if="type !== 'result'" class="diff poppins">[{{ map?.difficulty }}]</div>
          <ScoreDiffGraph
            v-if="type === 'result'"
            class="scoreDiffGraph"
            :data="mapHistory.log"
          ></ScoreDiffGraph>
        </div>
      </div>
      <div
        class="backgroundTint"
        :style="{
          backgroundColor:
            type === 'result'
              ? `var(--csl-${pick?.win ? 'blue' : 'red'})`
              : ov.tb
                ? 'black'
                : `var(--csl-${pick?.team ? 'blue' : 'red'})`,
        }"
      ></div>
      <div class="backgroundDarker"></div>
    </div>
  </div>
</template>

<style scoped>
.master-map-box {
  color: white;
}

.mapBox {
  position: relative;
  width: 538px;
  height: 109px;
  border-radius: 8px;
  border: solid white 2px;
  box-sizing: border-box;
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
  opacity: 0.6;
}

.backgroundDarker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
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

.scoreDiffGraph {
  width: 100%;
  height: 56px;
  margin-top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
}

.contentWrapper.horizontal {
  align-items: center;
}

.horizontal .code {
  width: 64px;
}
</style>
