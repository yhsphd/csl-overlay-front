<script setup>
import { onMounted, ref } from "vue";
import LogoComponent from "@/components/LogoComponent.vue";

const words = ["WATCHING", "PLAYING", "ATTENDING", "SUPPORTING", "STAFFING"];
const ind = ref(0);

const liftRef = ref();

const height = ref();
const hold = 1500;
const swipe = 500;

const cycle = () => {
  setTimeout(() => {
    liftRef.value.style.transitionDuration = swipe + "ms";
    liftRef.value.style.transform = "translateY(-50%)";
    setTimeout(() => {
      liftRef.value.style.transitionDuration = "0ms";
      ind.value = ind.value == words.length - 1 ? 0 : ind.value + 1;
      liftRef.value.style.transform = "translateY(0)";
      cycle();
    }, hold);
  }, swipe);
};

onMounted(() => {
  height.value = liftRef.value.clientHeight;
  cycle();
});
</script>

<template>
  <div class="master-outro-scene scene">
    <LogoComponent class="logo absolute-center-horizontal" type="white"></LogoComponent>
    <LogoComponent class="sponsor absolute-center-horizontal" type="sponsor"></LogoComponent>

    <div class="wrapper absolute-center">
      <div class="line">THANKS FOR</div>
      <div class="line">
        <div class="lift" ref="liftRef">
          <div>{{ words[ind] }}</div>
          <div>{{ words[(ind + 1) % words.length] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-outro-scene {
  position: absolute;
  color: white;
}

.logo {
  top: 92px;
  width: 144px;
}

.sponsor {
  position: absolute;
  width: 400px;
  bottom: 70px;
}

.wrapper {
  top: 540px;
  width: 100%;
  text-align: center;
}

.wrapper * {
  font-family: "Novecento Sans";
  font-weight: 800;
  font-size: 200px;
  letter-spacing: 24px;
}

.line {
  position: relative;
  margin: 36px 0 36px 0;
  width: 100%;
  height: 200px;
  line-height: 200px;
  overflow: hidden;
}

.lift {
  width: 100%;
  text-align: center;
  transform: translateY(0);
  transition-property: transform;
}
</style>
