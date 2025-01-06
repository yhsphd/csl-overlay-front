<script setup>
import { onMounted, ref } from "vue";

const masterRef = ref();
const width = ref();
const height = ref();

onMounted(() => {
  width.value = masterRef.value.clientWidth;
  height.value = masterRef.value.clientHeight;
});
</script>

<template>
  <div class="master-csl-box" ref="masterRef">
    <svg
      class="box"
      :width="width"
      :height="height"
      :viewBox="[0, 0, width, height].join(' ')"
      fill="none"
    >
      <g>
        <rect
          x="2.5"
          y="2.5"
          :width="width - 5"
          :height="height - 5"
          rx="47.5"
          stroke="url(#paint0_linear_429_98)"
          stroke-width="5"
        />
      </g>
      <defs>
        <linearGradient id="paint0_linear_429_98" gradientTransform="rotate(75, 0.5, 0.5)">
          <stop offset="0%" stop-color="#CD2E3A" />
          <stop offset="100%" stop-color="#0047A0" />
        </linearGradient>
      </defs>
    </svg>
    <slot></slot>
  </div>
</template>

<style scoped>
.master-csl-box {
  border-radius: 47.5px;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
}

.box {
  position: absolute;
}
</style>
