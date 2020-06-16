<template>
  <div class="scatter-plot-wrapper">
    <div class="scatter-plot" id="scatter-plot" ref="scatter-plot"></div>
    <div class="side-bar" ref="sidebar">
      <div class="color-zone"></div>
      <div class="button-zone">
        <a-select :value="metric2" style="width: 100px" @change="changeMetric2">
          <a-select-option v-for="metric in metric2List" :key="metric">
            {{ metric }}
          </a-select-option>
        </a-select>
      </div>
    </div>
  </div>
</template>

<script src="./scatterPlot.ts"></script>

<style lang="scss" scoped>
@import "./scatterPlot.scss";
</style>
