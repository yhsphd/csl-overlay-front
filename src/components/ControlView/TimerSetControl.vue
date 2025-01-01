<script setup>
import { ref, computed, onMounted } from "vue";
import { useOverlayDataStore } from "@/stores/socket";
import { secondsToMMSS, toISOStringTimezoneOffset } from "@/assets/utils";
import HmsSelection from "./HmsSelection.vue";

const state = useOverlayDataStore();

const secondsLeft = ref(0);
const durationSelection = ref([0, 0, 0]);
const deadlineSelection = ref([0, 0, 0]);

const timeLeftString = computed(() => {
  return (secondsLeft.value < 0 ? "-" : "") + secondsToMMSS(secondsLeft.value);
});

function setValue(type) {
  let target = new Date();
  const durationMs =
    1000 *
    (durationSelection.value[2] +
      60 * (durationSelection.value[1] + 60 * durationSelection.value[0]));
  switch (type) {
    case "duration":
      target = new Date(new Date().getTime() + durationMs);
      break;
    case "deadline":
      target.setHours(deadlineSelection.value[0]);
      target.setMinutes(deadlineSelection.value[1]);
      target.setSeconds(deadlineSelection.value[2]);
      break;
  }
  // SEND EVENT TO BACKEND
  state.sendControlEvent("scheduleUpdate", target.toISOString());
  alert("Timer updated to " + toISOStringTimezoneOffset(target));
}

function resetValue(type) {
  const curr = new Date();
  switch (type) {
    case "duration":
      durationSelection.value = [0, 0, 0];
      break;
    case "deadline":
      deadlineSelection.value = [curr.getHours(), curr.getMinutes(), curr.getSeconds()];
      break;
  }
}

onMounted(() => {
  setInterval(() => {
    secondsLeft.value = (new Date(state.data.schedule) - new Date()) / 1000;
  }, 100);

  resetValue("deadline");
});
</script>

<template>
  <div class="master-timerset-control">
    <table class="wrapper">
      <tbody>
        <tr>
          <td colspan="2">
            <div>Current Time</div>
            <div class="mono">{{ toISOStringTimezoneOffset(new Date()) }}</div>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div>Current Timer</div>
            <div class="mono">{{ toISOStringTimezoneOffset(state.data.schedule) }}</div>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div>Time Left</div>
            <div class="mono">{{ timeLeftString }}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div>Set by Duration</div>
            <HmsSelection class="hms" v-model="durationSelection"></HmsSelection>
            <!-- <div>{{ durationSelection }}</div> -->
            <button @click="resetValue('duration')">RESET</button>
            <button @click="setValue('duration')">SET</button>
          </td>
          <td>
            <div>Set by Deadline</div>
            <HmsSelection class="hms" v-model="deadlineSelection"></HmsSelection>
            <!-- <div>{{ deadlineSelection }}</div> -->
            <button @click="resetValue('deadline')">RESET</button>
            <button @click="setValue('deadline')">SET</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.master-timerset-control {
  display: flex;
}

table,
th,
td {
  border: 2px solid gray;
  border-collapse: collapse;
  text-align: center;
}

table {
  margin: 8px;
}

td {
  padding: 4px;
}

.hms {
  margin: 8px;
}
</style>
