<template>
  <div class="multiple-scatter-plot-wrapper">
    <div
      class="multiple-scatter-plot"
      :id="'multiple-scatter-plot-' + metric2"
      ref="multiple-scatter-plot"
    ></div>
    <!-- <div class="side-bar" ref="sidebar">
      <div class="color-zone"></div>
      <div class="button-zone">
        <a-select :value="metric2" style="width: 100px" @change="changeMetric2">
          <a-select-option v-for="metric in metric2List" :key="metric">
            {{ metric }}
          </a-select-option>
        </a-select>
      </div>
    </div> -->
  </div>
</template>

<script src="./multipleScatterPlot.ts"></script>

<style lang="scss" scoped>
@import "./multipleScatterPlot.scss";
</style>
