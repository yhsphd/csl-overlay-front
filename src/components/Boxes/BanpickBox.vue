<script setup>
import { computed } from "vue";
import CslBox from "./CslBox.vue";
import { range } from "@/assets/utils";
import { useOrderStore } from "@/stores/order";

const ov = useOrderStore();

const boxOrder = computed(() => {
  const stagedBoxOrder = [];

  /* Will access the following index:
     0 2
     1 3
     ---
     4 9
     5 10
     6 11
     7 12
     8 13
      14  */

  if (!ov.firstBan || !ov.firstPick) return [];

  if (ov.firstBan === "red") {
    stagedBoxOrder.push(0, 3, 1, 2);
  } else {
    stagedBoxOrder.push(1, 2, 0, 3);
  }

  if (ov.firstPick === "red") {
    stagedBoxOrder.push(4, 6, 8, 10, 12, 5, 7, 9, 11, 13);
  } else {
    stagedBoxOrder.push(5, 7, 9, 11, 13, 4, 6, 8, 10, 12);
  }

  stagedBoxOrder.push(14);

  return stagedBoxOrder;
});

const getorderInd = (boxInd) => {
  return boxOrder.value[boxInd];
};

const getPick = (boxInd) => {
  return ov.order?.[getorderInd(boxInd)];
};
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
          <div class="spacer" :style="{ height: ov.firstBan === 'red' ? 0 : '24px' }"></div>
          <div class="pickBox">{{ getPick(0)?.code }}</div>
          <div class="spacer" :style="{ height: ov.firstBan === 'red' ? '48px' : 0 }"></div>
          <div class="pickBox">{{ getPick(1)?.code }}</div>
        </div>
        <div style="width: 32px"></div>
        <div class="divided blue">
          <div class="spacer" :style="{ height: ov.firstBan === 'blue' ? 0 : '24px' }"></div>
          <div class="pickBox">{{ getPick(2)?.code }}</div>
          <div class="spacer" :style="{ height: ov.firstBan === 'blue' ? '48px' : 0 }"></div>
          <div class="pickBox">{{ getPick(3)?.code }}</div>
        </div>
      </div>
    </div>
    <div class="picks">
      <div class="header">Picks</div>
      <div class="content">
        <div class="horizontal-box">
          <div class="divided red">
            <div class="spacer" :style="{ height: ov.firstPick === 'red' ? 0 : '24px' }"></div>
            <div
              class="pickBox"
              v-for="boxInd in range(4, ov.bo === 9 ? 8 : 9)"
              :key="boxInd"
              :style="{
                color: getPick(boxInd)?.win === 1 ? 'var(--csl-blue)' : 'var(--csl-red)',
                opacity: getPick(boxInd) || ov.curmap + 3 === boxOrder[boxInd] ? 1 : 0.3,
              }"
              :class="{ pulsing: getPick(boxInd)?.pick === 1 && getPick(boxInd)?.win === -1 }"
            >
              {{ getPick(boxInd)?.code || "???" }}
            </div>
          </div>
          <div style="width: 32px"></div>
          <div class="divided blue">
            <div class="spacer" :style="{ height: ov.firstPick === 'blue' ? 0 : '24px' }"></div>
            <div
              class="pickBox"
              v-for="boxInd in range(9, ov.bo === 9 ? 13 : 14)"
              :key="boxInd"
              :style="{
                color: getPick(boxInd)?.win === 0 ? 'var(--csl-red)' : 'var(--csl-blue)',
                opacity: getPick(boxInd) || ov.curmap + 3 === boxOrder[boxInd] ? 1 : 0.3,
              }"
              :class="{ pulsing: getPick(boxInd)?.pick === 1 && getPick(boxInd)?.win === -1 }"
            >
              {{ getPick(boxInd)?.code || "???" }}
            </div>
          </div>
        </div>
        <CslBox
          class="pickBox tbBox horizontal-center"
          :lessRound="true"
          :style="{ opacity: ov.tb ? 1 : 0.3 }"
          :class="{ pulsing: ov.tb, tbDisabled: !ov.tb }"
          >TB</CslBox
        >
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
  border-radius: 16px;
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
  position: absolute;
  width: 370px;
  height: 60px;
  line-height: 60px;
  border: unset;
  bottom: 12px;
}

.red .pickBox {
  border: solid var(--csl-red);
  color: var(--csl-red);
}

.blue .pickBox {
  border: solid var(--csl-blue);
  color: var(--csl-blue);
}

.spacer {
  transition: height 1s ease;
}

.pulsing {
  animation: upNextPulse 700ms ease infinite;
}

.tbDisabled {
  filter: grayscale(100%);
}
</style>
