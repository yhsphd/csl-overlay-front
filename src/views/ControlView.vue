<script setup>
import { ref } from "vue";
import { useOverlayDataStore } from "@/stores/socket";
import OverlayDataPreview from "@/components/ControlView/OverlayDataPreview.vue";
import TimerSetControl from "@/components/ControlView/TimerSetControl.vue";
import PersonCardControl from "@/components/ControlView/PersonCardControl.vue";
import ConnectionInfo from "@/components/ConnectionInfo.vue";

const state = useOverlayDataStore();

const stagedRootUrl = ref();

function reconnect() {
  state.reconnectTo(stagedRootUrl.value);
}
</script>

<template>
  <div class="master-control-view">
    <h1>Circles in SEOUL</h1>
    <h2>Main event overlay CONTROL PANEL</h2>

    <div class="control-divider"></div>

    <ConnectionInfo class="control"></ConnectionInfo>
    <div class="horizontal-box control">
      <div>Change Root URL:</div>
      <div style="width: 8px"></div>
      <input v-model="stagedRootUrl" @keyup.enter="reconnect()" />
      <button @click="reconnect()">Reconnect</button>
    </div>

    <div class="control-divider"></div>

    <h3>Person Card</h3>
    <PersonCardControl></PersonCardControl>

    <div class="control-divider"></div>

    <h3>Timer Set</h3>
    <TimerSetControl></TimerSetControl>

    <div class="control-divider"></div>

    <h3>OverlayData Preview</h3>
    <OverlayDataPreview></OverlayDataPreview>
  </div>
</template>

<style scoped>
table,
th,
td {
  border: 2px solid gray;
  border-collapse: collapse;
}

.control-divider {
  width: 100%;
  height: 2px;
  background-color: gray;
}

.control {
  margin: 16px;
}
</style>
