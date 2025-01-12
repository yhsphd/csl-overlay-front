<script setup>
import AnalysisBox from "@/components/Boxes/AnalysisBox.vue";
import { colors, intObjectToArray, osuPfpUrl } from "@/assets/utils";
import { useOverlayDataStore } from "@/stores/socket";
import { computed } from "vue";
import badgesCSV from "@/assets/badges_separated.csv?raw";

const state = useOverlayDataStore();

const teams = computed(() => intObjectToArray(state.data?.teams));
const players = computed(() => teams.value.map((x) => x.players[0]));
const badges = computed(() => players.value.map((x) => getPlayerBadges(x.nick)));

const getPlayerBadges = (nick) => {
  const lines = badgesCSV.split(/\r?\n/);
  const badges = [];

  let reading = false;
  for (let i = 0; i < lines.length; i++) {
    const splited = lines[i].split(",");

    if (nick === splited[0]) {
      reading = true;
    } else if (reading) {
      if (splited[0].length > 0) {
        badges.push(splited);
      } else {
        reading = false;
        break;
      }
    }
  }

  return badges;
};
</script>

<template>
  <div class="master-analysis-scene scene">
    <div
      class="playerWrapper"
      :class="{ red: col === 'red', blue: col === 'blue' }"
      v-for="(col, i) in ['red', 'blue']"
      :key="col"
    >
      <div class="nickBox horizontal-box novecento">
        <div
          class="pBox"
          :style="{ backgroundColor: col === 'red' ? colors.cslRed : colors.cslBlue }"
        >
          P{{ i + 1 }}
        </div>
        <div class="nick">{{ players[i].nick }}</div>
      </div>
      <AnalysisBox :color="col === 'red' ? 'cslRed' : 'cslBlue'">
        <div class="box box1">
          <img class="pfp" :src="osuPfpUrl(players[i].id)" />
          <div class="rank horizontal-box poppins">
            <div class="globe"></div>
            <div>#{{ players[i].rank }} ({{ Math.round(players[i]?.pp).toLocaleString() }}pp)</div>
          </div>
          <div class="commentWrapper">
            <div class="comment theJamsil absolute-center">{{ teams[i].comment }}</div>
          </div>
        </div>
        <div class="box box2">
          <div class="header horizontal-box">
            <div class="novecento">Achivements ({{ badges[i].length }})</div>
            <div style="flex-grow: 1"></div>
            <div class="theJamsil">업적</div>
          </div>
          <div class="contents">
            <div
              class="badgeWrapper horizontal-box poppins"
              v-for="(badge, j) in badges[i]"
              :key="j"
            >
              <img class="badge" :src="badge[0]" />
              <div style="flex-grow: 1"></div>
              <div>
                <div style="font-size: 28px">{{ badge[1] }}</div>
                <div style="font-size: 20px">{{ badge[2] }}</div>
              </div>
            </div>
          </div>
        </div>
      </AnalysisBox>
    </div>
    <div class="novecento vs absolute-center">VS</div>
  </div>
</template>

<style scoped>
.master-analysis-scene {
  color: white;
}

.playerWrapper {
  position: absolute;
}

.playerWrapper.red {
  left: 80px;
}

.playerWrapper.blue {
  right: 80px;
}

.nickBox {
  margin: 66px 0 32px 0;
  align-items: center;
}

.blue .nickBox {
  flex-direction: row-reverse;
}

.pBox {
  width: 100px;
  height: 50px;
  text-align: center;
  font-size: 36px;
  font-weight: 500;
  border-radius: 12px;
}

.nick {
  font-size: 64px;
  margin: 0 32px 0 32px;
  width: 10px;
  white-space: nowrap;
}

.blue .nick {
  direction: rtl;
}

.box {
  box-sizing: border-box;
  padding: 48px 64px 48px 64px;
}

.box1 {
  position: relative;
  width: 100%;
  height: 330px;
}

.pfp {
  position: absolute;
  max-width: 210px;
  max-height: 210px;
  width: auto;
  height: auto;
  right: 60px;
  top: 60px;
}

.globe {
  width: 36px;
  height: 36px;
  margin-right: 16px;
  mask: url(@/assets/img/global.png) 0 0/36px 36px;
}

.red .globe {
  background-color: var(--csl-red-light);
}

.blue .globe {
  background-color: var(--csl-blue-light);
}

.red .rank {
  color: var(--csl-red-light);
}

.blue .rank {
  color: var(--csl-blue-light);
}

.rank {
  font-size: 32px;
  font-weight: 500;
  line-height: 36px;
  height: 36px;
}

.header {
  font-size: 44px;
  font-weight: 500;
}

.vs {
  position: absolute;
  font-size: 112px;
  font-weight: 700;
}

.commentWrapper {
  position: absolute;
  width: 380px;
  height: 200px;
}

.comment {
  font-size: 36px;
  font-weight: 500;
  max-width: 400px;
  box-sizing: border-box;
  padding: 40px;
  white-space: pre;
}

.comment:before,
.comment:after {
  font-family: "Novecento";
  position: absolute;
  font-size: 50px;
  color: #ffffff;
  font-weight: 700;
}
.comment:before {
  content: "\201c";
  top: 20px;
  left: 10px;
}
.comment:after {
  content: "\201d";
  bottom: 0;
  right: 10px;
}

.box2 {
  position: relative;
}

.box2 > .contents {
  scrollbar-width: none;
  height: 350px;
  overflow-y: scroll;
  flex-grow: 1;
}

.badgeWrapper {
  text-align: right;
  font-weight: 500;
  margin: 30px 0 30px 0;
  height: 56px;
  line-height: 30px;
}

.red .badgeWrapper {
  color: var(--csl-red-light);
}

.blue .badgeWrapper {
  color: var(--csl-blue-light);
}

.badge {
  width: 120px;
  height: auto;
}
</style>
