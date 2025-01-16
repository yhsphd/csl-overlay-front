<script setup>
import CslBox from "./CslBox.vue";
</script>

<template>
  <div class="master-banpick-box">
    <svg width="423" height="745" viewBox="0 0 423 745" fill="none" class="box">
      <g>
        <path
          d="M2 263L421.5 263M19 744H404C413.941 744 422 735.941 422 726V19C422 9.05888 413.941 1 404 1H19C9.05888 1 1 9.05889 1 19V726C1 735.941 9.05888 744 19 744Z"
          stroke="url(#paint0_linear_429_98)"
          stroke-width="2"
        />
      </g>
      <defs>
        <linearGradient id="paint0_linear_429_98" gradientTransform="rotate(75, 0.5, 0.5)">
          <stop offset="0%" stop-color="#CD2E3A" />
          <stop offset="100%" stop-color="#0047A0" />
        </linearGradient>
      </defs>
    </svg>
    <div class="bans">
      <div class="header">Bans</div>
      <div class="content horizontal-box">
        <div class="divided red">
          <div class="spacer" style="height: 0"></div>
          <div class="pickBox">NM5</div>
          <div class="spacer" style="height: 48px"></div>
          <div class="pickBox">NM5</div>
        </div>
        <div style="width: 32px"></div>
        <div class="divided blue">
          <div class="spacer" style="height: 24px"></div>
          <div class="pickBox">NM5</div>
          <div class="spacer" style="height: 0"></div>
          <div class="pickBox">NM5</div>
        </div>
      </div>
    </div>
    <div class="picks">
      <div class="header">Picks</div>
      <div class="content">
        <div class="horizontal-box">
          <div class="divided red">
            <div class="spacer" style="height: 0"></div>
            <div class="pickBox">NM5</div>
            <div class="pickBox">NM5</div>
            <div class="pickBox">NM5</div>
            <div class="pickBox">NM5</div>
            <div class="pickBox">NM5</div>
          </div>
          <div style="width: 32px"></div>
          <div class="divided blue">
            <div class="spacer" style="height: 24px"></div>
            <div class="pickBox">NM5</div>
            <div class="pickBox">NM5</div>
            <div class="pickBox">NM5</div>
            <div class="pickBox">NM5</div>
            <div class="pickBox">NM5</div>
          </div>
        </div>
        <CslBox class="pickBox tbBox" :lessRound="true">TB</CslBox>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-banpick-box {
  width: 423px;
  height: 745px;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  color: white;
}

.box {
  position: absolute;
}

.bans {
  width: 100%;
  height: 260px;
}

.picks {
  width: 100%;
  height: 485px;
}

.header {
  font-family: "novecento";
  font-size: 36px;
  text-align: center;
  line-height: 64px;
}

.content {
  padding: 0 24px;
}

.pickBox {
  position: relative;
  font-family: "Novecento";
  width: 170px;
  height: 48px;
  line-height: 48px;
  font-size: 32px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 8px;
  color: white;
  border: solid white;
}

.tbBox {
  width: 370px;
  height: 60px;
  line-height: 60px;
  border: unset;
}

.red .pickBox {
  border: solid var(--csl-red);
  color: var(--csl-red);
}

.blue .pickBox {
  border: solid var(--csl-blue);
  color: var(--csl-blue);
}

.red .spacer {
  transition: height 1s ease;
}
</style>
