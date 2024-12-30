<script setup>
import { useOverlayDataStore } from "@/stores/socket";
import OverlayDataPreview from "@/components/ControlView/OverlayDataPreview.vue";
import TimerSetControl from "@/components/ControlView/TimerSetControl.vue";

const state = useOverlayDataStore();

function testfunc() {
  state.sendEvent("control", "asdf");
}
</script>

<template>
  <div class="master-control-view">
    <h1>Circles in SEOUL</h1>
    <h2>Main event overlay CONTROL PANEL</h2>

    <div class="control-divider"></div>

    <h3>Person Card</h3>

    <div class="control-divider"></div>

    <h3>Timer Set</h3>
    <TimerSetControl></TimerSetControl>

    <div class="control-divider"></div>

    <h3>OverlayData Preview</h3>
    <OverlayDataPreview></OverlayDataPreview>

    <button v-on:click="testfunc()">dsfsdgdfhdf</button>
  </div>
</template>

<style scoped>
.control-divider {
  width: 100%;
  height: 2px;
  background-color: gray;
}
</style>
