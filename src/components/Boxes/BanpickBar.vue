<script setup></script>

<template>
  <div class="master-banpick-bar">
    <svg class="box" width="1679" height="115" viewBox="0 0 1679 115" fill="none">
      <path
        d="M700 1H979M700 1V114M700 1H169M979 1V114M979 1H1510M979 114H700M979 114H1510M979 114V69H1510V114M700 114H169M700 114V69H169V114M169 1H19C9.05888 1 1 9.05888 1 19V96C1 105.941 9.05888 114 19 114H169M169 1V114M1510 1H1660C1669.94 1 1678 9.05888 1678 19V96C1678 105.941 1669.94 114 1660 114H1510M1510 1V114"
        stroke="url(#paint0_linear_429_98)"
        stroke-width="2"
      />
      <defs>
        <linearGradient id="paint0_linear_429_98" gradientTransform="rotate(75, 0.5, 0.5)">
          <stop offset="0%" stop-color="#CD2E3A" />
          <stop offset="100%" stop-color="#0047A0" />
        </linearGradient>
      </defs>
    </svg>
    <div class="contentBar horizontal-box">
      <div style="width: 168px"></div>
      <div class="playerBox red">
        <div class="nick novecento">worst hr player</div>
        <div class="state poppins">Defending</div>
      </div>
      <div class="scores theJamsil">
        <div class="absolute-center">3 : 2</div>
      </div>
      <div class="playerBox blue">
        <div class="nick novecento">worst hr player</div>
        <div class="state poppins">Defending</div>
      </div>
      <div style="width: 168px"></div>
    </div>
  </div>
</template>

<style scoped>
.master-banpick-bar {
  width: 1679px;
  height: 115px;
  backdrop-filter: blur(12px);
  color: white;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.25);
}

.box {
  position: absolute;
}

.contentBar {
  width: 100%;
  height: 100%;
}

.playerBox {
  width: 530px;
}

.scores {
  position: relative;
  width: 280px;
  text-align: center;
  font-size: 96px;
  font-weight: 700;
  white-space: nowrap;
}

.playerBox {
  text-align: center;
}

.nick {
  height: 70px;
  font-size: 44px;
  line-height: 70px;
}

.state {
  height: 45px;
  font-size: 28px;
  line-height: 40px;
  font-weight: 600;
}

.red .state {
  color: var(--csl-red-light);
}

.blue .state {
  color: var(--csl-blue-light);
}
</style>
