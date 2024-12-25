<script setup>
import { RouterView } from "vue-router";
import { socket, useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();
socket.off(); // remove any existing listeners (after a hot module replacement)
state.bindEvents();
state.connect();
</script>

<template>
  <RouterView />
</template>

<style scoped>
RouterView {
  width: 1920px;
  height: 1080px;
  margin: 0;
  padding: 0;
}
</style>
