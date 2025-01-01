<script setup>
import RangeDropdown from "../RangeDropdown.vue";

const model = defineModel();
</script>

<template>
  <div class="master-hms-selection">
    <table class="wrapper">
      <tbody>
        <tr>
          <th>H</th>
          <th></th>
          <th>M</th>
          <th></th>
          <th>S</th>
        </tr>
        <tr>
          <td><RangeDropdown :range="100" v-model="model[0]"></RangeDropdown></td>
          <td>:</td>
          <td><RangeDropdown :range="60" v-model="model[1]"></RangeDropdown></td>
          <td>:</td>
          <td><RangeDropdown :range="60" v-model="model[2]"></RangeDropdown></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.wrapper {
  border: solid gray 2px;
}

th {
  font-size: 8pt;
}
</style>
