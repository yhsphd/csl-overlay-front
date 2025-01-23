<script setup>
import { computed } from "vue";

const props = defineProps({
  data: Array,
});

const safeData = computed(() => {
  if (props.data.length < 2) {
    return [
      [0, 0],
      [1, 1],
    ];
  } else {
    return props.data;
  }
});

// Get min and max values for scaling
const minX = Math.min(...safeData.value.map((d) => d[0]));
const maxX = Math.max(...safeData.value.map((d) => d[0]));
const minY = Math.min(...safeData.value.map((d) => d[1]));
const maxY = Math.max(...safeData.value.map((d) => d[1]));
const yZero = computed(() => maxY);

const scaleddata = computed(() => safeData.value.map(([x, y]) => [x - minX, maxY - y]));

const generateFilledPath = (condition) => {
  const points = scaleddata.value.map(([x, y]) => `${x},${condition(y) ? y : yZero.value}`);
  return `M ${points.join(" ")} L ${points[points.length - 1].split(",")[0]},${yZero.value} Z`;
};

const positivePath = computed(() => generateFilledPath((y) => y < yZero.value));
const negativePath = computed(() => generateFilledPath((y) => y > yZero.value));
</script>

<template>
  <div class="master-scorediff-graph">
    <svg :viewBox="`0 0 ${maxX - minX} ${maxY - minY}`" preserveAspectRatio="none">
      <!-- Draw the baseline -->
      <line
        :x1="0"
        :y1="yZero"
        :x2="maxX - minX"
        :y2="yZero"
        stroke="white"
        :stroke-width="(maxY - minY) * 0.02"
      />

      <!-- Render positive and negative areas -->
      <path :d="positivePath" fill="var(--csl-red)" opacity="0.8" stroke="none" />
      <path :d="negativePath" fill="var(--csl-blue)" opacity="0.8" stroke="none" />
    </svg>
  </div>
</template>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>
