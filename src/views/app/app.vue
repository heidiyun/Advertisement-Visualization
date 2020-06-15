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
        <div class="visualizations" style="width: 244px; height: 360px;">
          <div class="title">Adset List</div>
          <div class="adset-list component-area">
            <div
              class="adset-item d-flex"
              v-for="adset in $store.getters.adsets"
              :key="adset.id"
              @click="selectAdset(adset)"
            >
              <div
                class="adset-color"
                v-if="selectedAdsets.indexOf(adset.id) !== -1"
                :style="{ backgroundColor: `${adset.color}` }"
              ></div>

              <div class="adset-color" v-else></div>
              <div class="adset-name">{{ adset.name }}</div>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="visualizations scatter-plot">
          <div class="title">Scatter Plot</div>
          <div class="component-area">
            <scatter-plot></scatter-plot>
          </div>
        </div>
      </v-layout>
      <div class="visualizations mr-b-16" style="height: 300px">
        <div class="title">Line Graph</div>
        <div class="component-area">
          <line-graph></line-graph>
        </div>
      </div>
      <div class="visualizations mr-b-16" style="height:380px">
        <div class="title">Table</div>
        <div class="component-area">
          <adset-table></adset-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./app.ts"></script>

<style lang="scss">
@import "./app.scss";
</style>
