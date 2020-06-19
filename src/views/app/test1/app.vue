<template>
  <div class="advertisement-app">
    <div class="button-contents">
      <v-layout
        style="width:1090px; margin:auto; justify-content:space-between;"
      >
        <span class="title" style="font-size:x-large">Dashboard</span>
        <div>
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
        </div>
      </v-layout>
    </div>
    <div class="visualization-wrapper">
      <v-layout class="mr-b-16">
        <div class="visualizations" style="width: 180px; height: 360px;">
          <div class="title">애드셋 목록</div>
          <div class="adset-list component-area">
            <div
              class="adset-item d-flex"
              v-for="adset in $store.getters.allAdset"
              :key="adset.id"
              @click="selectAdset(adset)"
            >
              <div
                class="adset-color"
                v-if="selectedAdsets.indexOf(adset.id) !== -1"
                :style="{ backgroundColor: `${adset.color}` }"
              ></div>

              <div class="adset-color" v-else></div>
              <div
                class="adset-name"
                :selected="selectedAdsets.indexOf(adset.id) !== -1"
              >
                {{ adset.name }}
              </div>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="visualizations line-graph">
          <div class="title">시간별 추이</div>
          <div class="component-area">
            <line-graph></line-graph>
          </div>
        </div>
      </v-layout>
      <!-- <v-layout class="mr-b-16">
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">clicks</div>
          <div class="component-area" style="flex: 1;">
            <multiple-scatter-plot metric2="clicks"></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">cpc</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot metric2="cpc"></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">uniqueClicks</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot
              metric2="uniqueClicks"
            ></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1;"
        >
          <div class="multiple-scatter-plot-title">impressions</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot
              metric2="impressions"
            ></multiple-scatter-plot>
          </div>
        </div>
      </v-layout>
      <v-layout class="mr-b-16">
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">cpm</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot metric2="cpm"></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">spend</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot metric2="spend"></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">reach</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot metric2="reach"></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1;"
        >
          <div class="multiple-scatter-plot-title">purchase</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot metric2="purchase"></multiple-scatter-plot>
          </div>
        </div>
      </v-layout>
      <v-layout class="mr-b-16">
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">omniPurchase</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot
              metric2="omniPurchase"
            ></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">mobileAppInstall</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot
              metric2="mobileAppInstall"
            ></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">omniAppInstall</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot
              metric2="omniAppInstall"
            ></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1;"
        >
          <div class="multiple-scatter-plot-title">costPerPurchase</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot
              metric2="costPerPurchase"
            ></multiple-scatter-plot>
          </div>
        </div>
      </v-layout> -->
      <!-- <v-layout class="mr-b-16">
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">costPerOmniPurchase</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot
              metric2="costPerOmniPurchase"
            ></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">costPerMobileAppInstall</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot
              metric2="costPerMobileAppInstall"
            ></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1; margin-right: 12px;"
        >
          <div class="multiple-scatter-plot-title">costPerOmniInstall</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot
              metric2="costPerOmniInstall"
            ></multiple-scatter-plot>
          </div>
        </div>
        <div
          class="visualizations padding-small"
          style="height: 150px; display: flex; flex-direction: column; flex: 1;"
        >
          <div class="multiple-scatter-plot-title">costPerUniqueClick</div>
          <div class="component-area" style="flex: 1">
            <multiple-scatter-plot
              metric2="costPerUniqueClick"
            ></multiple-scatter-plot>
          </div>
        </div>
      </v-layout> -->
      <div class="visualizations mr-b-16">
        <div class="title">Small Multiples</div>
        <v-layout
          class="multiple-scatter-plot-area"
          style="margin-bottom: 12px;"
        >
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('clicks')"
          >
            <div class="multiple-scatter-plot-title">clicks</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="clicks"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('cpc')"
          >
            <div class="multiple-scatter-plot-title">cpc</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="cpc"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('uniqueClicks')"
          >
            <div class="multiple-scatter-plot-title">uniqueClicks</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="uniqueClicks"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('impressions')"
          >
            <div class="multiple-scatter-plot-title">impressions</div>
            <multiple-scatter-plot
              style="height: 150px; "
              metric2="impressions"
            ></multiple-scatter-plot>
          </div>
        </v-layout>
        <v-layout
          class="multiple-scatter-plot-area"
          style="margin-bottom: 12px;"
        >
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('cpm')"
          >
            <div class="multiple-scatter-plot-title">cpm</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="cpm"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('spend')"
          >
            <div class="multiple-scatter-plot-title">spend</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="spend"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('reach')"
          >
            <div class="multiple-scatter-plot-title">reach</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="reach"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('purchase')"
          >
            <div class="multiple-scatter-plot-title">purchase</div>
            <multiple-scatter-plot
              style="height: 150px; "
              metric2="purchase"
            ></multiple-scatter-plot>
          </div>
        </v-layout>
        <v-layout class="multiple-scatter-plot-area">
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('omniPurchase')"
          >
            <div class="multiple-scatter-plot-title">omniPurchase</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="omniPurchase"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('omniAppInstall')"
          >
            <div class="multiple-scatter-plot-title">omniAppInstall</div>
            <multiple-scatter-plot
              style="height: 150px; "
              metric2="omniAppInstall"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('mobileAppInstall')"
          >
            <div class="multiple-scatter-plot-title">mobileAppInstall</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="mobileAppInstall"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('costPerPurchase')"
          >
            <div class="multiple-scatter-plot-title">costPerPurchase</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="costPerPurchase"
            ></multiple-scatter-plot>
          </div>
        </v-layout>
        <v-layout
          class="multiple-scatter-plot-area"
          style="margin-bottom: 12px;"
        >
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('costPerOmniPurchase')"
          >
            <div class="multiple-scatter-plot-title">costPerOmniPurchase</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="costPerOmniPurchase"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('costPerMobileAppInstall')"
          >
            <div class="multiple-scatter-plot-title">
              costPerMobileAppInstall
            </div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="costPerMobileAppInstall"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('costPerOmniAppInstall')"
          >
            <div class="multiple-scatter-plot-title">costPerOmniAppInstall</div>
            <multiple-scatter-plot
              style="height: 150px; margin-right: 12px;"
              metric2="costPerOmniAppInstall"
            ></multiple-scatter-plot>
          </div>
          <div
            class="component-area"
            style="flex: 1; display: flex; flex-direction: column; margin-right: 8px;"
            @click="setMetric2('costPerUniqueClick')"
          >
            <div class="multiple-scatter-plot-title">costPerUniqueClick</div>
            <multiple-scatter-plot
              style="height: 150px;"
              metric2="costPerUniqueClick"
            ></multiple-scatter-plot>
          </div>
        </v-layout>
      </div>
      <div
        class="visualizations mr-b-16"
        style="display: flex; flex-direction: column; height: 360px; flex: 1;"
      >
        <div class="title">상관관계 분석</div>
        <div class="component-area" style="display: flex; flex: 1;">
          <div class="scatter-plot-guide y-guide">{{ metric1 }}</div>
          <scatter-plot></scatter-plot>
        </div>
        <div class="scatter-plot-guide">{{ metric2 }}</div>
      </div>
      <div class="visualizations mr-b-16" style="height:440px;">
        <div class="title">애드셋 정보</div>
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
