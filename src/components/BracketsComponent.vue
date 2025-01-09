<script setup>
import MatchComponent from "./BracketsComponent/MatchComponent.vue";
</script>

<template>
  <div class="master-brackets">
    <table>
      <tbody>
        <tr>
          <td>
            <MatchComponent></MatchComponent>
          </td>
          <td class="connector"><hr /></td>
          <td>
            <MatchComponent></MatchComponent>
          </td>
          <td class="binder" rowspan="2">
            <hr />
            <hr />
            <hr />
            <hr />
            <div style="width: 80px"></div>
          </td>
          <td rowspan="2">
            <MatchComponent></MatchComponent>
          </td>
        </tr>
        <tr>
          <td>
            <MatchComponent></MatchComponent>
          </td>
          <td class="connector"><hr /></td>
          <td>
            <MatchComponent></MatchComponent>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table,
th,
td {
  border-collapse: collapse;
}

tr {
  height: 250px;
}

.connector > hr {
  width: 40px;
}

td {
  position: relative;
}

.binder {
  width: 80px;
}

.binder > hr {
  position: absolute;
}

.binder > hr:nth-child(1) {
  width: 40px;
  top: 25%;
}
.binder > hr:nth-child(2) {
  width: 40px;
  top: 50%;
  right: 0;
}
.binder > hr:nth-child(3) {
  width: 40px;
  top: 75%;
}
.binder > hr:nth-child(4) {
  width: 0;
  height: 50%;
  top: 25%;
  left: 50%;
}
</style>
