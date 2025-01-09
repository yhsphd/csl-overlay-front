<script setup>
import { ref, watch } from "vue";
import OverflowText from "../OverflowText.vue";

const next = ref(false);
const scores = ref(false);
const win = ref("");
const nickRerenderTrigger = ref(0);

const matchWidth = ref(280);

watch(scores, () => {
  nickRerenderTrigger.value++;
});
watch(next, () => {
  nickRerenderTrigger.value++;
});
</script>

<template>
  <div class="master-match" :style="{ width: matchWidth + 'px' }">
    <div class="code horizontal-box novecento">
      <div>MATCH 2</div>
      <div v-if="matchWidth > 300" style="flex-grow: 1"></div>
      <div v-if="matchWidth > 300" style="margin-right: 32px">12:34</div>
    </div>
    <div class="player red horizontal-box" :class="{ win: win === 'red' }">
      <img class="pfp" src="https://a.ppy.sh/6665667" />
      <OverflowText class="nick" :key="nickRerenderTrigger">worst hr player</OverflowText>
      <div
        v-if="score || next"
        class="score"
        :style="{ opacity: scores ? 1 : 0, width: scores ? 'unset' : 0 }"
      >
        6
      </div>
    </div>
    <div class="player blue horizontal-box" :class="{ win: win === 'blue' }">
      <img class="pfp" src="https://a.ppy.sh/6665667" />
      <OverflowText class="nick" :key="nickRerenderTrigger">fragranceofpage123</OverflowText>
      <div
        v-if="score || next"
        class="score"
        :style="{ opacity: scores ? 1 : 0, width: scores ? 'unset' : 0 }"
      >
        6
      </div>
    </div>
    <div v-show="next" class="nextHint">
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

@keyframes upNextPulse {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
