<template>
  <div class="advertisement-app">
    <div class="visualization-wrapper">
      <v-layout class="button-contents">
        <a-range-picker @change="onChange" :defaultValue="momentRange" />
        <!-- <a-select
          default-value="metric1"
          style="width: 120px; margin: 0 8px;"
          @change="handleMenuClick"
        >
          <a-select-option
            v-for="metric in metrics"
            :key="metric"
            :value="metric"
            >{{ metric }}</a-select-option
          >
        </a-select>-->
        <a-dropdown style="margin: 0 8px;">
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item v-for="metric in metrics" :key="metric">
              {{ metric }}
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            {{ $store.getters.metric1 }}
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </v-layout>
      <v-layout class="mr-b-16">
        <div
          class="visualizations adset-list"
          style="height: 360px; width: 244px;"
        >
          <div
            class="adset-item d-flex"
            v-for="adset in $store.getters.adsets"
            :key="adset.id"
          >
            <div
              class="adset-color"
              :style="{ backgroundColor: `${adset.color}` }"
            ></div>
            <div class="adset-name">{{ adset.name }}</div>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="visualizations" style="height: 360px; width: 820px;">
          <scatter-plot></scatter-plot>
        </div>
      </v-layout>
      <v-layout class="visualizations mr-b-16" style="height: 300px">
        <line-graph></line-graph>
      </v-layout>
      <v-layout class="visualizations mr-b-16" style="height: 380px">
        <adset-table></adset-table>
      </v-layout>
    </div>
  </div>
</template>

<script src="./app.ts"></script>

<style lang="scss">
@import "./app.scss";
</style>
