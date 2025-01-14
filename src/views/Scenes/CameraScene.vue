<script setup>
import BottomBar from "@/components/Camera/BottomBar.vue";
import PersonCard from "@/components/Camera/PersonCard.vue";
import { socket } from "@/stores/socket";
import { ref, computed } from "vue";

const personCardsData = ref();
const lefts = computed(() => {
  const personCardCount = personCardsData.value?.people.length;
  switch (personCardCount) {
    case 1:
      return ["50%"];
    case 2:
      return ["33%", "66%"];
    case 3:
      return ["20%", "50%", "80%"];
    default:
      return [];
  }
});
const showPersonCards = (res) => {
  personCardsData.value = res;
};

socket.on("showPersonCards", (res) => showPersonCards(res));
</script>

<template>
  <div class="master-camera-scene scene">
    <BottomBar class="bottomBar absolute-center-horizontal"></BottomBar>
    <PersonCard
      class="personCard"
      v-for="(data, i) in personCardsData?.people"
      :key="data"
      :nick="data.nick"
      :pfp="data.pfp"
      :desc="data.desc"
      :duration="personCardsData.duration"
      :style="{
        left: lefts[i],
      }"
    ></PersonCard>
  </div>
</template>

<style scoped>
.scene {
  background: unset;
}

.personCard {
  position: absolute;
  bottom: 200px;
  transform: translateX(-50%);
}

.bottomBar {
  position: absolute;
  bottom: 50px;
}
</style>
