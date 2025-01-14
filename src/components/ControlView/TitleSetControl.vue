<script setup>
import { useOverlayDataStore } from "@/stores/socket";
import { computed, ref } from "vue";

const state = useOverlayDataStore();

const currentTitle = computed(() => state?.data?.stream_title);
const stagedTitle = ref("");

function change() {
  // SEND EVENT TO BACKEND
  state.sendControlEvent("titleUpdate", stagedTitle.value);
  alert("Stream title changed to " + stagedTitle.value);
}
</script>

<template>
  <div class="master-titleset-control">
    <div class="control">Current title: {{ currentTitle }}</div>
    <div class="horizontal-box control">
      <div>Change Stream Title:</div>
      <div style="width: 8px"></div>
      <input v-model="stagedTitle" @keyup.enter="change()" />
      <button @click="change()">Change</button>
    </div>
  </div>
</template>

<style scoped>
.control {
  margin: 16px;
}

input {
  width: 400px;
}
</style>
