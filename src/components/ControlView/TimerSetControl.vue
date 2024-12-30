<script setup>
import { ref, computed, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useOverlayDataStore } from "@/stores/socket";
import { secondsToMMSS } from "@/assets/utils";

const state = useOverlayDataStore();

const date = ref(new Date());
const secondsLeft = ref(0);

const timeLeftString = computed(() => {
  return (secondsLeft.value < 0 ? "-" : "") + secondsToMMSS(secondsLeft.value);
});

onMounted(() => {
  setInterval(() => {
    secondsLeft.value = (new Date(state.data.schedule) - new Date()) / 1000;
  }, 100);
});
</script>

<template>
  <div class="master-timerset-control">
    <div class="section">
      <div>Current Timer</div>
      <div>{{ state.data.schedule }}</div>
      <div>{{ timeLeftString }}</div>
    </div>
    <div class="section">
      <div>Set by duration</div>
      <input type="number" class="durationInput" />
      :
      <input type="number" class="durationInput" />
      <br />
      <button>SET</button>
    </div>
    <div class="section">
      <div>Set by deadline</div>
      <VueDatePicker
        v-model="date"
        time-picker
        inline
        enable-seconds
        auto-apply
        seconds-increment="5"
      ></VueDatePicker>
      <div>{{ date }}</div>
      <button>SET</button>
    </div>
  </div>
</template>

<style scoped>
.master-timerset-control {
  display: flex;
}

.section {
  border: solid gray 2px;
  margin: 8px;
  padding: 16px;
}

.durationInput {
  width: 30px;
}
</style>
