<script setup>
import { computed } from "vue";

const props = defineProps({
  type: String,
});

const masterHeight = computed(() => {
  switch (props.type) {
    case "result":
      return "150px";
    default:
      return "109px";
  }
});
</script>

<template>
  <div class="master-map-box">
    <div class="mapBox" :style="{ height: masterHeight }">
      <div class="contentWrapper">
        <div class="code novecento">NM1</div>
        <div class="title poppins">1.Kla$ feat. Czar, Schokk - Russian Kings</div>
        <div class="diff poppins">[lip gloss & makeup]</div>
        <div v-if="type === 'result'" class="scoreDiffGraph"></div>
      </div>
      <div class="backgroundTint"></div>
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
  background-color: var(--csl-blue);
  opacity: 0.8;
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
}

.diff {
  font-size: 14px;
  font-weight: 500;
}

.scoreDiffGraph {
  width: 100%;
  height: 30px;
  margin-top: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url(@/assets/img/scoredifftest.svg);
  background-position: center;
  background-size: 100% 100%;
  border-radius: 8px;
}
</style>
