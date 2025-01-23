<script setup>
import { getMappool, intObjectToArray } from "@/assets/utils";
import { useOrderStore } from "@/stores/order";
import { useOverlayDataStore } from "@/stores/socket";
import { computed } from "vue";

const state = useOverlayDataStore();
const ov = useOrderStore();

const props = defineProps({
  compact: Boolean,
  pickData: Object,
});

const mappool = computed(() => intObjectToArray(state.data?.mappool));
const pick = computed(() => (props.pickData ? props.pickData : ov.lastPick));
const code = computed(() => pick.value?.code);
const map = computed(() => getMappool(mappool.value, code.value));
const history = computed(() => state.data?.CSL?.history);
const mapHistory = computed(() => {
  const defaultValue = {
    log: [],
    score: [0, 0],
    acc: [0, 0],
    combo: [0, 0],
    miss: [0, 0],
  };

  if (!code.value) {
    return defaultValue;
  }

  return history[map.value.map_id] ? history[map.value.map_id] : defaultValue;
});

const getDiff = (vsValue) => {
  return vsValue[0] - vsValue[1];
};

const comparerChar = (vsValue) => {
  const diff = getDiff(vsValue);
  return diff === 0 ? "=" : diff > 0 ? ">" : "<";
};
</script>

<template>
  <div class="master-result-diff-component">
    <div class="scoreBar horizontal-box novecento">
      <div class="label red">P1</div>
      <div class="score red" :class="{ glowing: getDiff(mapHistory.score) >= 0 }">
        {{ mapHistory.score[0] }}
      </div>
      <div class="comparer">{{ comparerChar(mapHistory.score) }}</div>
      <div class="score blue" :class="{ glowing: getDiff(mapHistory.score) <= 0 }">
        {{ mapHistory.score[1] }}
      </div>
      <div class="label blue">P2</div>
    </div>
    <div class="detailedResults novecento">
      <div class="statLine horizontal-box">
        <div class="statLabel">Acc</div>
        <div class="stat red" :class="{ better: getDiff(mapHistory.acc) >= 0 }">
          {{ mapHistory.acc[0] }}%
        </div>
        <div class="comparer">{{ comparerChar(mapHistory.acc) }}</div>
        <div class="stat blue" :class="{ better: getDiff(mapHistory.acc) <= 0 }">
          {{ mapHistory.acc[1] }}%
        </div>
        <div class="statLabel"></div>
      </div>
      <div class="statLine horizontal-box">
        <div class="statLabel">Combo</div>
        <div class="stat red" :class="{ better: getDiff(mapHistory.combo) >= 0 }">
          {{ mapHistory.combo[0] }}
        </div>
        <div class="comparer">{{ comparerChar(mapHistory.combo) }}</div>
        <div class="stat blue" :class="{ better: getDiff(mapHistory.combo) <= 0 }">
          {{ mapHistory.combo[1] }}
        </div>
        <div class="statLabel"></div>
      </div>
      <div class="statLine horizontal-box" v-if="!compact">
        <div class="statLabel">Miss</div>
        <div class="stat red" :class="{ better: getDiff(mapHistory.miss) <= 0 }">
          <!-- Lower is better -->
          {{ mapHistory.miss[0] }}
        </div>
        <div class="comparer">{{ comparerChar(mapHistory.miss) }}</div>
        <div class="stat blue" :class="{ better: getDiff(mapHistory.miss) >= 0 }">
          <!-- Lower is better -->
          {{ mapHistory.miss[1] }}
        </div>
        <div class="statLabel"></div>
      </div>
      <div
        v-if="!compact"
        style="
          position: absolute;
          top: 0;
          right: 0;
          writing-mode: vertical-lr;
          transform: rotateZ(180deg);
          background-color: #515151;
          height: 100%;
          font-size: 18px;
          text-align: center;
        "
      >
        STATS
      </div>
    </div>
  </div>
</template>

<style scoped>
.scoreBar {
  margin-top: 16px;
  line-height: 36px;
}

.label {
  width: 72px;
  height: 36px;
  border-radius: 8px;
  text-align: center;
  line-height: 36px;
  font-size: 24px;
}

.label.red {
  background-color: var(--csl-red);
}

.label.blue {
  background-color: var(--csl-blue);
}

.scoreBar > .comparer {
  font-size: 48px;
}

.score {
  font-size: 32px;
  width: 180px;
  text-align: center;
}

.red.glowing {
  text-shadow:
    0 0 5px var(--csl-red),
    0 0 10px var(--csl-red),
    0 0 20px var(--csl-red),
    0 0 30px var(--csl-red);
}

.blue.glowing {
  text-shadow:
    0 0 5px var(--csl-blue),
    0 0 10px var(--csl-blue),
    0 0 20px var(--csl-blue),
    0 0 30px var(--csl-blue);
}

.detailedResults {
  position: relative;
  font-size: 22px;
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
}

.statLabel {
  width: 72px;
  padding-left: 16px;
  box-sizing: border-box;
}

.stat {
  width: 180px;
  text-align: center;
}

.stat.better.red {
  color: var(--csl-red-light);
}

.stat.better.blue {
  color: var(--csl-blue-light);
}

.detailedResults .comparer {
  width: 30px;
  text-align: center;
}

.statLine:nth-child(odd) {
  background-color: rgba(217, 217, 217, 0.1);
}
</style>
