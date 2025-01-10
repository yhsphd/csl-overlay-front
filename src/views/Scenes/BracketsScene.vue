<script setup>
import BracketsComponent from "@/components/BracketsComponent.vue";
import CslBox from "@/components/CslBox.vue";
import LogoComponent from "@/components/LogoComponent.vue";
</script>

<template>
  <div class="master-brackets-scene scene">
    <LogoComponent class="logo absolute-center-horizontal" type="white"></LogoComponent>

    <CslBox class="container absolute-center-horizontal">
      <div class="midBox">
        <div class="section">
          <div class="page">
            <div class="header">
              <div>BRACKET | 대진표</div>
              <div class="sub poppins">*Match times subject to change.</div>
            </div>
            <div class="content">
              <BracketsComponent class="brackets" :wide="true"></BracketsComponent>
            </div>
          </div>
        </div>
      </div>
    </CslBox>
  </div>
</template>

<style scoped>
.master-brackets-scene {
  position: absolute;
  color: white;
}

.logo {
  top: 72px;
  width: 144px;
}

.container {
  width: 1760px;
  height: 750px;
  bottom: 60px;
}

.midBox {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px;
  display: flex;
}

.section {
  position: relative;
  display: flex;
  width: 100%;
}

.page {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px;
}

.header {
  font-family: "Novecento", "theJamsil";
  font-size: 44px;
  letter-spacing: 2px;
  font-weight: 700;
}

.header > .sub {
  font-size: 20px;
  font-weight: 500;
}

.brackets {
  margin-top: 32px;
  width: 100%;
}
</style>
