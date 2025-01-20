<script setup>
import { useOverlayDataStore } from "@/stores/socket";
import MatchComponent from "./BracketsComponent/MatchComponent.vue";
import { computed } from "vue";

const state = useOverlayDataStore();

defineProps({
  wide: Boolean,
});

const matches = computed(() => state.data?.CSL?.matches);
const teams = computed(() => state.data?.CSL?.teams);
const code = computed(() => state.data?.match_code);
</script>

<template>
  <div class="master-brackets" ref="masterRef">
    <table>
      <tbody>
        <tr>
          <td>
            <MatchComponent
              :match="matches?.M1"
              :teams="teams"
              :next="code === 'M1'"
              :wide="wide"
            ></MatchComponent>
          </td>
          <td class="connector" :class="{ wide }"><hr /></td>
          <td>
            <MatchComponent
              :match="matches?.M3"
              :teams="teams"
              :next="code === 'M3'"
              :wide="wide"
            ></MatchComponent>
          </td>
          <td class="binder" :class="{ wide }" rowspan="2">
            <hr />
            <hr />
            <hr />
            <hr />
            <div :style="{ width: wide ? '160px' : '80px' }"></div>
          </td>
          <td rowspan="2">
            <MatchComponent
              :match="matches?.M5"
              :teams="teams"
              :next="code === 'M5'"
              :wide="wide"
            ></MatchComponent>
          </td>
        </tr>
        <tr>
          <td>
            <MatchComponent
              :match="matches?.M2"
              :teams="teams"
              :next="code === 'M2'"
              :wide="wide"
            ></MatchComponent>
          </td>
          <td class="connector" :class="{ wide }"><hr /></td>
          <td>
            <MatchComponent
              :match="matches?.M4"
              :teams="teams"
              :next="code === 'M4'"
              :wide="wide"
            ></MatchComponent>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table,
th,
td {
  border-collapse: collapse;
}

tr {
  height: 250px;
}

.connector > hr {
  width: 40px;
}

.wide > hr {
  margin: 0 40px 0 40px;
}

td {
  position: relative;
}

.binder {
  width: 80px;
}

.binder > hr {
  position: absolute;
}

.binder > hr:nth-child(1) {
  width: 40px;
  top: 25%;
}
.binder > hr:nth-child(2) {
  width: 40px;
  top: 50%;
  left: 40px;
}
.binder > hr:nth-child(3) {
  width: 40px;
  top: 75%;
}
.binder > hr:nth-child(4) {
  width: 0;
  height: 50%;
  top: 25%;
  left: 40px;
}
</style>
