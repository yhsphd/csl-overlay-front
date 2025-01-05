<script setup>
import ConnectionInfo from "@/components/ConnectionInfo.vue";
</script>

<template>
  <main>
    <ConnectionInfo></ConnectionInfo>
    <router-link :to="{ name: 'countdown' }">Countdown</router-link>
  </main>
</template>
