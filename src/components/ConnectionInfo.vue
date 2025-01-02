<script setup>
import { computed } from "vue";
import { useOverlayDataStore } from "@/stores/socket";

const state = useOverlayDataStore();

const currentUri = computed(() => {
  const res = state.getURI();
  return res ? res : "";
});

const connected = computed(() => state.connected);
</script>

<template>
  <div class="master-connection-info">
    Currently {{ connected ? "connected to: " + currentUri : "disconnected" }}
  </div>
</template>

<style scoped></style>
