<script setup>
defineProps({
  range: Number,
});

const model = defineModel();

function createRange(cap) {
  return Array.from({ length: cap }, (_, i) => i);
}
</script>

<template>
  <div class="master-range-dropdown">
    <select v-model="model">
      <option v-for="num in createRange(range)" :key="num" :value="num">
        {{ num }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
