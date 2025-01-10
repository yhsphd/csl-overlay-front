<script setup>
import ConnectionInfo from "@/components/ConnectionInfo.vue";
</script>

<template>
  <main>
    <ConnectionInfo></ConnectionInfo>
    <router-link :to="{ name: 'countdown' }">Countdown</router-link>
    <router-link :to="{ name: 'outro' }">Outro</router-link>
    <router-link :to="{ name: 'intro' }">Intro</router-link>
    <router-link :to="{ name: 'brackets' }">Brackets & Schedules</router-link>
  </main>
</template>
