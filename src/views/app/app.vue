<template>
  <div class="advertisement-app">
    <div class="button-contents">
      <v-layout
        style="width:calc(100% - 32px); margin:auto; justify-content:space-between;"
      >
        <span class="title" style="font-size:large">Dashboard</span>
        <div>
          <!-- <a-range-picker
            @change="onChange"
            :defaultValue="momentRange"
          /> -->
          <a-dropdown style="margin: 0 8px; transform: scale(0.8);">
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
          <a-range-picker
            size="small"
            @change="onChange"
            :defaultValue="momentRange"
          />
        </div>
      </v-layout>
    </div>
    <v-layout class="content-layout">
      <div class="adset-list adsetList">
        <div class="title">Adset List</div>
        <div class="">
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
      <div class="contentList">
        <v-layout class="contents">
          <div class="flex-1">
            <div class="c-name">Small Multiples</div>
            <div class="c-content">
              <div
                style="width: 100%; height: 100%; padding: 2px 10px 0; display: flex; flex-direction: column;"
              >
                <v-layout
                  class="multiple-scatter-plot-area"
                  style="height: 25%; padding: 8px 0;"
                >
                  <div
                    class="component-area"
                    style="height: 100%;  display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('clicks')"
                  >
                    <div class="multiple-scatter-plot-title">clicks</div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="clicks"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('cpc')"
                  >
                    <div class="multiple-scatter-plot-title">cpc</div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="cpc"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('uniqueClicks')"
                  >
                    <div class="multiple-scatter-plot-title">uniqueClicks</div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="uniqueClicks"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('impressions')"
                  >
                    <div class="multiple-scatter-plot-title">impressions</div>
                    <multiple-scatter-plot
                      style="flex: 1; "
                      metric2="impressions"
                    ></multiple-scatter-plot>
                  </div>
                </v-layout>
                <v-layout
                  class="multiple-scatter-plot-area"
                  style="height: 25%; padding: 8px 0;"
                >
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('cpm')"
                  >
                    <div class="multiple-scatter-plot-title">cpm</div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="cpm"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('spend')"
                  >
                    <div class="multiple-scatter-plot-title">spend</div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="spend"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('reach')"
                  >
                    <div class="multiple-scatter-plot-title">reach</div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="reach"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('purchase')"
                  >
                    <div class="multiple-scatter-plot-title">purchase</div>
                    <multiple-scatter-plot
                      style="flex: 1; "
                      metric2="purchase"
                    ></multiple-scatter-plot>
                  </div>
                </v-layout>
                <v-layout
                  class="multiple-scatter-plot-area"
                  style="height: 25%; padding: 8px 0;"
                >
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('omniPurchase')"
                  >
                    <div class="multiple-scatter-plot-title">omniPurchase</div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="omniPurchase"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('omniAppInstall')"
                  >
                    <div class="multiple-scatter-plot-title">
                      omniAppInstall
                    </div>
                    <multiple-scatter-plot
                      style="flex: 1; "
                      metric2="omniAppInstall"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('mobileAppInstall')"
                  >
                    <div class="multiple-scatter-plot-title">
                      mobileAppInstall
                    </div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="mobileAppInstall"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('costPerPurchase')"
                  >
                    <div class="multiple-scatter-plot-title">
                      costPerPurchase
                    </div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="costPerPurchase"
                    ></multiple-scatter-plot>
                  </div>
                </v-layout>
                <v-layout
                  class="multiple-scatter-plot-area"
                  style="height: 25%; padding: 8px 0;"
                >
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('costPerOmniPurchase')"
                  >
                    <div class="multiple-scatter-plot-title">
                      costPerOmniPurchase
                    </div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="costPerOmniPurchase"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('costPerMobileAppInstall')"
                  >
                    <div class="multiple-scatter-plot-title">
                      costPerMobileAppInstall
                    </div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="costPerMobileAppInstall"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('costPerOmniAppInstall')"
                  >
                    <div class="multiple-scatter-plot-title">
                      costPerOmniAppInstall
                    </div>
                    <multiple-scatter-plot
                      style="flex: 1; margin-right: 12px;"
                      metric2="costPerOmniAppInstall"
                    ></multiple-scatter-plot>
                  </div>
                  <div
                    class="component-area"
                    style="height: 100%; display: flex; flex-direction: column; margin-right: 8px;"
                    @click="setMetric2('costPerUniqueClick')"
                  >
                    <div class="multiple-scatter-plot-title">
                      costPerUniqueClick
                    </div>
                    <multiple-scatter-plot
                      style="flex: 1;"
                      metric2="costPerUniqueClick"
                    ></multiple-scatter-plot>
                  </div>
                </v-layout>
              </div>
            </div>
          </div>
          <div style="width: 16px;"></div>
          <div class="flex-1">
            <div class="c-name">Correlation Analysis</div>
            <div
              class="c-content"
              style="display: flex; flex-direction: column;"
            >
              <div
                class="component-area"
                style="flex: 1; display: flex; width: 100%; height: 100%;"
              >
                <div class="scatter-plot-guide y-guide">{{ metric1 }}</div>
                <scatter-plot></scatter-plot>
              </div>
              <div
                class="scatter-plot-guide"
                style="height: 20px; margin-bottom: 12px;"
              >
                {{ metric2 }}
              </div>
            </div>
          </div>
        </v-layout>
        <v-layout class="contents">
          <div class="flex-1">
            <div class="c-name">Line Chart</div>
            <div class="c-content" style="padding-top: 16px">
              <line-graph></line-graph>
            </div>
          </div>
          <div style="width: 16px;"></div>
          <div class="flex-1">
            <div class="c-name">Adset Information</div>
            <div class="c-content">
              <adset-table></adset-table>
            </div>
          </div>
        </v-layout>
      </div>
    </v-layout>
  </div>
</template>

<script src="./app.ts"></script>

<style lang="scss">
@import "./app.scss";
</style>
