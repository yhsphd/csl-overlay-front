<script setup>
import { computed, ref, watch } from "vue";
import OverflowText from "../OverflowText.vue";
import { intObjectToArray, osuPfpUrl, secondsToMMSS } from "@/assets/utils";

const props = defineProps({
  next: Boolean,
  match: Object,
  teams: Object,
  wide: Boolean,
});

const schedule = computed(() => new Date(props.match?.schedule));

const players = computed(() => {
  return intObjectToArray(props.match?.players).map((x) => props.teams[x]);
});

const scores = computed(() =>
  props.match?.result && Object.keys(props.match?.result).length ? props.match?.result : [0, 0]
);
const win = computed(() => {
  if (scores.value?.[0] === scores.value?.[1]) {
    return "";
  } else if (scores.value?.[0] > scores.value?.[1]) {
    return "red";
  } else {
    return "blue";
  }
});
const showScores = computed(() => !props.next && (scores.value[0] + scores.value[1] || props.wide));
const nickRerenderTrigger = ref(0);

const matchWidth = computed(() => (props.wide ? 410 : 280));

watch(scores, () => {
  nickRerenderTrigger.value++;
});
watch(
  () => props.teams, // to watch props
  () => {
    nickRerenderTrigger.value++;
  }
);
watch(
  () => props.next,
  () => {
    nickRerenderTrigger.value++;
  }
);
</script>

<template>
  <div class="master-match" :style="{ width: matchWidth + 'px' }">
    <div class="code horizontal-box novecento">
      <div>MATCH {{ match?.code[1] }}</div>
      <div v-if="matchWidth > 300" style="flex-grow: 1"></div>
      <div v-if="matchWidth > 300 && !next">
        {{ secondsToMMSS(schedule.getHours() * 60 + schedule.getMinutes()) }}
      </div>
    </div>
    <div class="player red horizontal-box" :class="{ win: win === 'red' }">
      <img class="pfp" :src="osuPfpUrl(players[0]?.id)" />
      <OverflowText class="nick" :key="nickRerenderTrigger">{{
        players[0]?.nick || "???"
      }}</OverflowText>
      <div
        v-if="scores || next || wide"
        class="score"
        :style="{ opacity: showScores ? 1 : 0, width: showScores ? 'unset' : 0 }"
      >
        {{ scores[0] }}
      </div>
    </div>
    <div class="player blue horizontal-box" :class="{ win: win === 'blue' }">
      <img class="pfp" :src="osuPfpUrl(players[1]?.id)" />
      <OverflowText class="nick" :key="nickRerenderTrigger">{{
        players[1]?.nick || "???"
      }}</OverflowText>
      <div
        v-if="scores || next || wide"
        class="score"
        :style="{ opacity: showScores ? 1 : 0, width: showScores ? 'unset' : 0 }"
      >
        {{ scores[1] }}
      </div>
    </div>
    <div v-show="next && !(scores[0] + scores[1])" class="nextHint">
      <div class="upNext">>>> UP NEXT</div>
    </div>
  </div>
</template>

<style scoped>
.master-match {
  position: relative;
  font-family: "Poppins";
  padding: 16px;
}

.code {
  font-size: 28px;
  font-weight: 700;
}

.player {
  height: 72px;
  align-items: center;
  font-weight: 500;
}

.player.win.red {
  background-color: rgba(var(--csl-red-light-rgb), 0.15);
}

.player.win.blue {
  background-color: rgba(var(--csl-blue-light-rgb), 0.15);
}

.pfp {
  width: 64px;
  margin: 4px;
}

.nick {
  box-sizing: border-box;
  height: 100%;
  font-size: 24px;
  line-height: 72px;
  margin: 8px;
  flex-grow: 1;
  white-space: nowrap;
}

.red > .nick,
.red.win > .score {
  color: var(--csl-red-light);
}

.blue > .nick,
.blue.win > .score {
  color: var(--csl-blue-light);
}

.win > .score {
  font-weight: 800;
}

.score {
  font-size: 30px;
  margin: 16px;
}

.nextHint {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid white;
  animation: upNextPulse 5s ease-in-out infinite;
}

.upNext {
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 16px;
  right: 0;
  background: white;
  color: black;
  font-size: 24px;
  font-weight: 700;
  text-align: right;
  writing-mode: vertical-lr;
  transform: rotateZ(180deg);
}
</style>
