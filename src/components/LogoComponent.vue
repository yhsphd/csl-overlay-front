<script setup>
defineProps({
  type: String,
  invert: Boolean,
});
</script>

<template>
  <div class="master-logo" :style="{ filter: invert ? 'invert(1)' : 'unset' }">
    <img v-if="type === 'normal'" src="@/assets/img/logo.svg" />
    <img v-if="type === 'white'" src="@/assets/img/logo_w.svg" />
    <img v-if="type === 'g_normal'" src="@/assets/img/logo_g.svg" />
    <img v-if="type === 'g_white'" src="@/assets/img/logo_g_w.svg" />
    <img v-if="type === 'sponsor'" src="@/assets/img/drunkdeer.png" />
  </div>
</template>

<style scoped>
img {
  width: inherit;
  height: inherit;
}
</style>
