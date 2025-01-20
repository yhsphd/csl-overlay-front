<script setup>
import IngameBar from "@/components/Boxes/IngameBar.vue";
import IngameBottomBar from "@/components/Boxes/IngameBottomBar.vue";
</script>

<template>
  <div class="master-ingame-scene scene">
    <IngameBar class="ingameBar absolute-center-horizontal"></IngameBar>
    <IngameBottomBar class="ingameBottomBar absolute-center-horizontal"></IngameBottomBar>
  </div>
</template>

<style scoped>
.ingameBar {
  position: absolute;
  top: 22px;
}

.ingameBottomBar {
  position: absolute;
  bottom: 20px;
}
</style>
