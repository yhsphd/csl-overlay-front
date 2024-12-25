<script setup>
import { ref, computed } from "vue";
import { useOverlayDataStore } from "@/stores/socket";
import { JsonViewer } from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";

const state = useOverlayDataStore();
const overlayDataSampled = ref({});

setInterval(() => {
  overlayDataSampled.value = Object.assign(overlayDataSampled.value, state.data);
}, 1000);
</script>

<template>
  <div class="master-control-view">
    <h1>Circles in SEOUL</h1>
    <h2>Main event overlay</h2>
    <h3>CONTROL PANEL</h3>
    <div>
      <JsonViewer :value="overlayDataSampled" :expandDepth="4"></JsonViewer>
    </div>
  </div>
</template>

<style scoped>
.master-control-view {
  width: 1920px;
  height: 1080px;
}
</style>
