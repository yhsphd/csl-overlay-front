<script setup>
import ConnectionInfo from "@/components/ConnectionInfo.vue";
</script>

<template>
  <div>
    <ConnectionInfo></ConnectionInfo>
    <router-link to="control">Control Panel</router-link>
    <router-link :to="{ name: 'scenes' }">Overlay Scenes</router-link>
  </div>
</template>
