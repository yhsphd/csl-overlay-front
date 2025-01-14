<script setup>
import "@/components/Camera/camera.css";
import { onMounted, ref } from "vue";

const props = defineProps({
  pfp: String,
  nick: String,
  desc: String,
  duration: Number,
});

const nickContainerRef = ref();
const masterRef = ref();

onMounted(() => {
  setTimeout(() => (masterRef.value.style.opacity = 1), 500);
  setTimeout(() => (nickContainerRef.value.style.width = "400px"), 1500);
  setTimeout(() => (masterRef.value.style.opacity = "0"), props.duration * 1000);
});
</script>

<template>
  <div class="master-person-card novecento" ref="masterRef">
    <div class="skewedBoxWrapper horizontal-box">
      <div class="contentWrapper">
        <div class="content pfp">
          <img :src="pfp" />
          <img :src="pfp" />
        </div>
      </div>
      <div class="divider red"></div>
      <div class="contentWrapper nickContainer" ref="nickContainerRef">
        <div class="nick content" style="height: 67%">
          <div class="absolute-center">{{ nick }}</div>
        </div>
        <div class="contentWrapper" style="height: 33%; background-color: #e8e8e8">
          <div class="role content poppins" style="height: 100%">
            <div class="absolute-center">{{ desc }}</div>
          </div>
        </div>
      </div>
      <div class="divider blue"></div>
    </div>
  </div>
</template>

<style scoped>
.master-person-card {
  opacity: 0;
  height: 100px;
  transition: opacity 0.5s ease;
}

.skewedBoxWrapper {
  height: 100px;
}

.pfp {
  width: 90px;
}

.pfp > img:nth-child(1) {
  position: absolute;
  z-index: 10;
  left: -35px;
  height: 100px;
  box-shadow: black 0 0 30px;
  border: solid rgba(0, 0, 0, 0.7) 1px;
}

.pfp > img:nth-child(2) {
  position: absolute;
  left: -75px;
  top: -50px;
  width: 200px;
  height: 200px;
  filter: blur(2px) saturate(200%);
}

.nick {
  font-size: 40px;
  line-height: 65px;
}

.role {
  font-size: 20px;
  font-weight: 500;
}

.nickContainer {
  width: 0;
  text-align: center;
  transition: width 1s ease;
  white-space: nowrap;
}
</style>
