<template>
  <svg class="graph-wrapper" id="line-graph" ref="line-graph">
    <!-- <text
      v-for="(y, i) in yAxis"
      :key="`texty-${i}`"
      :y="y.y"
      :x="setting.paddingX"
    >
      {{ y.text }}
    </text> -->
    <!-- <path></path> -->
    <!-- <path id="graph-path"></path> -->
    <!-- <circle id="graph-circle"></circle> -->
    <!-- <path
      class="line-style"
      v-for="(line, i) in lines"
      :key="`line-${i}`"
      :d="line.path"
      :style="`stroke: ${line.color};`"
    >
      <circle
        v-for="(circle, j) in line.circle"
        :key="`circle-${i}-${j}`"
        :cx="circle.cx"
        :cy="circle.cy"
        :r="3"
        :fill="line.color"
      ></circle>
    </path> -->
    <!-- <circle
      v-for="(line, i) in lines"
      :key="`circle-${i}`"
      :cx="line.circle.cx"
      :cy="line.circle.cy"
      :r="3"
      :fill="line.circle.color"
    ></circle> -->
  </svg>
  <!-- <div class="line-graph" id="line-graph" ref="line-graph"></div> -->
  <!-- </div> -->
</template>

<script src="./lineGraph.ts"></script>

<style lang="scss" scoped>
@import "./lineGraph.scss";
</style>
