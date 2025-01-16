<script setup>
import BanpickBar from "@/components/Boxes/BanpickBar.vue";
import BanpickBox from "@/components/Boxes/BanpickBox.vue";
import CslBox from "@/components/Boxes/CslBox.vue";
import LogoComponent from "@/components/LogoComponent.vue";
import OverflowText from "@/components/OverflowText.vue";
import MapBox from "@/components/MapBox.vue";
</script>

<template>
  <div class="master-banpick-scene scene">
    <LogoComponent class="logo absolute-center-horizontal" type="white"></LogoComponent>

    <BanpickBar class="banpickBar absolute-center-horizontal"></BanpickBar>
    <CslBox class="mappoolBox" :thin="true">
      <div class="header">Mappool</div>
      <div class="content">
        <div class="mapBox horizontal-box" v-for="_ in 19" :key="_">
          <div class="code novecento">NM1</div>
          <OverflowText class="title poppins">
            Kawada Mami - Going back to square one [Throw of the Dice]
          </OverflowText>
        </div>
      </div>
    </CslBox>
    <BanpickBox class="banpickBox absolute-center-horizontal"></BanpickBox>
    <CslBox class="pickBox" :thin="true">
      <div v-if="false" style="position: absolute">
        <div class="header">Current Pick</div>
        <div class="content">
          <MapBox></MapBox>
          <div class="bmapStats">
            <div class="header">Beatmap Information</div>
            <div class="horizontal-box">
              <div class="statColumn">
                <div class="statLine horizontal-box">
                  <div>Drain</div>
                  <div style="flex-grow: 1"></div>
                  <div>04:22</div>
                </div>
                <div class="statLine horizontal-box">
                  <div>BPM</div>
                  <div style="flex-grow: 1"></div>
                  <div>04:22</div>
                </div>
                <div class="statLine horizontal-box">
                  <div>Notes</div>
                  <div style="flex-grow: 1"></div>
                  <div>04:22</div>
                </div>
                <div class="statLine horizontal-box">
                  <div>Sliders</div>
                  <div style="flex-grow: 1"></div>
                  <div>04:22</div>
                </div>
              </div>
              <div class="statColumn">
                <div class="statLine horizontal-box">
                  <div>SR</div>
                  <div style="flex-grow: 1"></div>
                  <div>04:22</div>
                </div>
                <div class="statLine horizontal-box">
                  <div>AR</div>
                  <div style="flex-grow: 1"></div>
                  <div>04:22</div>
                </div>
                <div class="statLine horizontal-box">
                  <div>CS</div>
                  <div style="flex-grow: 1"></div>
                  <div>04:22</div>
                </div>
                <div class="statLine horizontal-box">
                  <div>HP</div>
                  <div style="flex-grow: 1"></div>
                  <div>04:22</div>
                </div>
                <div class="statLine horizontal-box">
                  <div>OD</div>
                  <div style="flex-grow: 1"></div>
                  <div>04:22</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="true" style="position: absolute">
        <div class="header">Previous Pick Result</div>
        <div class="content">
          <MapBox type="result"></MapBox>
          <div class="scoreBar horizontal-box novecento">
            <div class="label red">P1</div>
            <div class="score red">0460020</div>
            <div class="comparer">></div>
            <div class="score blue">0460020</div>
            <div class="label blue">P2</div>
          </div>
          <div class="detailedResults novecento">
            <div class="statLine horizontal-box">
              <div class="statLabel">Acc</div>
              <div class="stat">98.19%</div>
              <div class="comparer">></div>
              <div class="stat">98.19%</div>
              <div class="statLabel"></div>
            </div>
            <div class="statLine horizontal-box">
              <div class="statLabel">Combo</div>
              <div class="stat">1284</div>
              <div class="comparer">></div>
              <div class="stat">1284</div>
              <div class="statLabel"></div>
            </div>
            <div class="statLine horizontal-box">
              <div class="statLabel">Miss</div>
              <div class="stat">2</div>
              <div class="comparer">></div>
              <div class="stat">26</div>
              <div class="statLabel"></div>
            </div>
            <div
              style="
                position: absolute;
                top: 0;
                right: 0;
                writing-mode: vertical-lr;
                transform: rotateZ(180deg);
                background-color: #515151;
                height: 100%;
                font-size: 18px;
                text-align: center;
              "
            >
              STATS
            </div>
          </div>
        </div>
      </div>
    </CslBox>
    <CslBox class="commBox" :thin="true"></CslBox>
  </div>
</template>

<style scoped>
.master-banpick-scene {
  color: white;
}

.logo {
  width: 56px;
  top: 34px;
}

.banpickBar {
  top: 108px;
}

.mappoolBox {
  position: absolute;
  width: 590px;
  height: 743px;
  left: 121px;
  top: 274px;
}

.banpickBox {
  top: 274px;
}

.pickBox {
  position: absolute;
  width: 590px;
  height: 390px;
  right: 121px;
  top: 274px;
}

.commBox {
  position: absolute;
  width: 590px;
  height: 332px;
  right: 121px;
  top: 685px;
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

.mapBox {
  margin-bottom: 2px;
}

.code {
  width: 70px;
  min-width: 70px;
  font-size: 26px;
}

.title {
  width: 700px;
  font-size: 20px;
  white-space: nowrap;
}

.bmapStats {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
}

.bmapStats > .header {
  font-size: 24px;
  background-color: #515151;
  line-height: 40px;
}

.statColumn {
  width: 50%;
  font-family: "Novecento";
  font-size: 22px;
  padding: 0 8px 0 8px;
}

.statLine:nth-child(odd) {
  background-color: rgba(217, 217, 217, 0.1);
}

.scoreBar {
  margin-top: 16px;
  line-height: 36px;
}

.label {
  width: 72px;
  height: 36px;
  border-radius: 8px;
  text-align: center;
  line-height: 36px;
  font-size: 24px;
}

.label.red {
  background-color: var(--csl-red);
}

.label.blue {
  background-color: var(--csl-blue);
}

.score {
  font-size: 32px;
  width: 180px;
  text-align: center;
}

.score.red {
  text-shadow:
    0 0 5px var(--csl-red),
    0 0 10px var(--csl-red),
    0 0 20px var(--csl-red),
    0 0 30px var(--csl-red);
}

.score.blue {
  text-shadow:
    0 0 5px var(--csl-blue),
    0 0 10px var(--csl-blue),
    0 0 20px var(--csl-blue),
    0 0 30px var(--csl-blue);
}

.scoreBar > .comparer {
  font-size: 48px;
}

.detailedResults {
  position: relative;
  font-size: 22px;
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
}

.statLabel {
  width: 72px;
  padding-left: 16px;
  box-sizing: border-box;
}

.stat {
  width: 180px;
  text-align: center;
}

.detailedResults .comparer {
  width: 30px;
  text-align: center;
}
</style>
