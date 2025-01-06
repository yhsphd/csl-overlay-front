<script setup></script>

<template>
  <div class="master-match">
    <div class="code novecento">MATCH 2</div>
    <div class="player red horizontal-box win">
      <img class="pfp" src="https://a.ppy.sh/6665667" />
      <div class="nick">yhsphd</div>
      <div class="score">6</div>
    </div>
    <div class="player blue horizontal-box win">
      <img class="pfp" src="https://a.ppy.sh/6665667" />
      <div class="nick">yhsphd</div>
      <div class="score">6</div>
    </div>
    <div class="nextHint"></div>
  </div>
</template>

<style scoped>
.master-match {
  font-family: "Poppins";
}

.code {
  font-size: 28px;
  font-weight: 700;
}

.player {
  height: 72px;
  align-items: center;
}

.player.win {
  background-color: rgba(var(--csl-red-light), 0.15);
}

.pfp {
  width: 64px;
}

.nick {
  font-size: 24px;
}

.score {
  font-size: 30px;
}
</style>
