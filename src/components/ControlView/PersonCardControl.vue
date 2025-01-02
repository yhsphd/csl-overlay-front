<script setup>
import { useOverlayDataStore } from "@/stores/socket";
import { ref, computed } from "vue";

const state = useOverlayDataStore();

const defaultDuration = 5;
const duration = ref(defaultDuration);
const count = ref(1);
const people = computed(() => state.data?.CSL?.people);
const selected = ref([0, 0, 0]);

function reset() {
  duration.value = defaultDuration;
  count.value = 1;
  for (let i = 0; i < selected.value.length; i++) {
    selected.value[i] = 0;
  }
}

function sendTrigger() {
  state.sendControlEvent("showPeopleCards", {
    duration: duration.value,
    people: selected.value.slice(0, count.value).map((x) => people.value[x]),
  });
}
</script>

<template>
  <div class="master-personcard-control">
    <div class="horizontal-box control">
      <div>Count:</div>
      <input class="numInput" type="number" min="1" max="3" v-model="count" />
      <div class="vertical-divider"></div>
      <div>Duration (s):</div>
      <input class="numInput" type="number" v-model="duration" />
      <div class="vertical-divider"></div>
      <button @click="reset()">Reset</button>
      <button @click="sendTrigger()" class="control-trigger">S H O W</button>
    </div>
    <table class="stage">
      <tbody>
        <tr>
          <td class="stageElement" v-for="(personI, i) in selected.slice(0, count)" :key="i">
            <img class="pfp" :src="people?.[personI].pfp" />
            <table class="attributes">
              <tbody>
                <tr v-for="(attr, label) in people?.[personI]" :key="label">
                  <td>{{ label }}</td>
                  <td>
                    <a v-if="label === 'pfp'" :href="attr">{{ attr }}</a>
                    <a
                      v-else-if="label === 'uid' && attr !== '-1'"
                      :href="'https://osu.ppy.sh/u/' + attr"
                    >
                      {{ attr }}
                    </a>
                    <div v-else :href="attr">{{ attr }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <select v-model="selected[i]">
                <option v-for="(person, j) in people" :key="j" :value="j">
                  {{ j + " - " + person.nick }}
                </option>
              </select>
            </div>
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
  border: solid gray 2px;
}

th {
  font-size: 8pt;
}

.control {
  align-items: center;
}

.control > * {
  margin: 4px;
}

.control > .vertical-divider {
  height: 24px;
  width: 2px;
  margin: 0 16px 0 16px;
  background-color: gray;
}

.numInput {
  width: 40px;
}

.stage {
  margin: 8px;
}

.stageElement {
  max-width: 200px;
  overflow: hidden;
}

.pfp {
  width: 200px;
}
</style>
