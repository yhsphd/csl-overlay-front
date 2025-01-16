<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  thin: Boolean,
  lessRound: Boolean,
});

const masterRef = ref();
const radius = computed(() => (props.lessRound ? 8 : props.thin ? 18 : 47.5));
const width = ref(0);
const height = ref(0);

onMounted(() => {
  width.value = masterRef.value.clientWidth ? masterRef.value.clientWidth : 0;
  height.value = masterRef.value.clientHeight ? masterRef.value.clientHeight : 0;
});
</script>

<template>
  <div class="master-csl-box" ref="masterRef" :style="{ borderRadius: radius + 'px' }">
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
          :width="width >= 5 ? width - 5 : 0"
          :height="height >= 5 ? height - 5 : 0"
          :rx="radius"
          stroke="url(#paint0_linear_429_98)"
          :stroke-width="thin ? 2 : 5"
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
  position: relative;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
}

.box {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
