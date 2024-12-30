<script setup>
import { useOverlayDataStore } from "@/stores/socket";
import { JsonViewer } from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";

const state = useOverlayDataStore();
</script>

<template>
  <div class="master-overlaydata-preview">
    <div class="wrapper">
      <JsonViewer :value="state.data"></JsonViewer>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  border: solid gray 1px;
  max-height: 400px;
  overflow-y: scroll;
}
</style>
