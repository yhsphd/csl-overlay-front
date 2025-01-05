<script setup>
import ConnectionInfo from "@/components/ConnectionInfo.vue";
</script>

<template>
  <main>
    <ConnectionInfo></ConnectionInfo>
    <router-link :to="{ name: 'countdown' }">Countdown</router-link>
    <router-link :to="{ name: 'outro' }">Outro</router-link>
  </main>
</template>
