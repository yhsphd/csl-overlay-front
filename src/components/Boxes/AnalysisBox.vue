<script setup>
import { colors } from "@/assets/utils";
import { computed } from "vue";

const props = defineProps({
  color: String,
});

const mainColor = computed(() => colors[props.color]);
</script>

<template>
  <div class="master-analysis-box">
    <svg class="box" width="770" height="830" viewBox="0 0 770 830" fill="none">
      <g>
        <rect width="770" height="830" rx="50" />
        <rect
          x="2.5"
          y="2.5"
          width="765"
          height="825"
          rx="47.5"
          :stroke="mainColor"
          stroke-width="5"
        />
      </g>
      <path d="M4 329L765 329" :stroke="mainColor" stroke-width="5" stroke-linecap="round" />
    </svg>
    <slot></slot>
  </div>
</template>

<style scoped>
.master-analysis-box {
  width: 770px;
  height: 830px;
  border-radius: 47.5px;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
}

.box {
  position: absolute;
}
</style>
