<template>
  <div class="scatter-plot-wrapper">
    <div class="scatter-plot" id="scatter-plot"></div>
    <div class="side-bar" ref="sidebar">
      <div class="color-zone"></div>
      <div class="button-zone">
        <a-select
          :value="selectedMetric[2]"
          style="width: 100px"
          @change="changeMetric2"
        >
          <a-select-option value="metric1">
            Metric 1
          </a-select-option>
          <a-select-option value="metric2">
            Metric 2
          </a-select-option>
          <a-select-option value="metric3">
            Metric 3
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
