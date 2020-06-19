<template>
  <div class="advertisement-app">
    <div class="button-contents">
      <v-layout
        style="width:calc(100% - 64px); margin:auto; justify-content:space-between;"
      >
        <span class="title" style="font-size:large">Dashboard</span>
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
    <v-layout class="content-layout">
      <div class="adsetList">
        <div class="title">Adset List</div>
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
      <div class="contentList">
        <v-layout class="contents">
          <div class="flex-1 c-multiples">
            <div>Small Multiples</div>
            <div class="vis-content content-mg">
              <v-layout
                class="multiple-scatter-plot-area"
                style="margin-bottom: 12px;"
              >
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('clicks')"
                >
                  <div class="multiple-scatter-plot-title">clicks</div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="clicks"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('cpc')"
                >
                  <div class="multiple-scatter-plot-title">cpc</div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="cpc"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('uniqueClicks')"
                >
                  <div class="multiple-scatter-plot-title">uniqueClicks</div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="uniqueClicks"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('impressions')"
                >
                  <div class="multiple-scatter-plot-title">impressions</div>
                  <multiple-scatter-plot
                    style="height: 50px; "
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
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('cpm')"
                >
                  <div class="multiple-scatter-plot-title">cpm</div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="cpm"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('spend')"
                >
                  <div class="multiple-scatter-plot-title">spend</div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="spend"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('reach')"
                >
                  <div class="multiple-scatter-plot-title">reach</div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="reach"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('purchase')"
                >
                  <div class="multiple-scatter-plot-title">purchase</div>
                  <multiple-scatter-plot
                    style="height: 50px; "
                    metric2="purchase"
                  ></multiple-scatter-plot>
                </div>
              </v-layout>
              <v-layout class="multiple-scatter-plot-area">
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('omniPurchase')"
                >
                  <div class="multiple-scatter-plot-title">omniPurchase</div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="omniPurchase"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('omniAppInstall')"
                >
                  <div class="multiple-scatter-plot-title">omniAppInstall</div>
                  <multiple-scatter-plot
                    style="height: 50px; "
                    metric2="omniAppInstall"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('mobileAppInstall')"
                >
                  <div class="multiple-scatter-plot-title">
                    mobileAppInstall
                  </div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="mobileAppInstall"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('costPerPurchase')"
                >
                  <div class="multiple-scatter-plot-title">costPerPurchase</div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
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
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('costPerOmniPurchase')"
                >
                  <div class="multiple-scatter-plot-title">
                    costPerOmniPurchase
                  </div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="costPerOmniPurchase"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('costPerMobileAppInstall')"
                >
                  <div class="multiple-scatter-plot-title">
                    costPerMobileAppInstall
                  </div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="costPerMobileAppInstall"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('costPerOmniAppInstall')"
                >
                  <div class="multiple-scatter-plot-title">
                    costPerOmniAppInstall
                  </div>
                  <multiple-scatter-plot
                    style="height: 50px; margin-right: 12px;"
                    metric2="costPerOmniAppInstall"
                  ></multiple-scatter-plot>
                </div>
                <div
                  class="component-area"
                  style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                  @click="setMetric2('costPerUniqueClick')"
                >
                  <div class="multiple-scatter-plot-title">
                    costPerUniqueClick
                  </div>
                  <multiple-scatter-plot
                    style="height: 50px;"
                    metric2="costPerUniqueClick"
                  ></multiple-scatter-plot>
                </div>
              </v-layout>
            </div>
          </div>
          <div class="flex-1">
            <div>Detail View</div>
            <div class="vis-content">
              <div class="component-area" style="display: flex; width: 100%;">
                <div class="scatter-plot-guide y-guide">{{ metric1 }}</div>
                <scatter-plot></scatter-plot>
              </div>
              <div class="scatter-plot-guide">{{ metric2 }}</div>
              <!-- <div class="detail-view"> -->
              <!-- <div
                class="visualizations mr-b-16"
                style="display: flex; flex-direction: column; height: 360px; width: 22%;"
              >
                <div class="title">Correlation Analysis</div>
                <div class="component-area" style="display: flex; width: 22%;">
                  <div class="scatter-plot-guide y-guide">{{ metric1 }}</div>
                  <scatter-plot></scatter-plot>
                </div>
                <div class="scatter-plot-guide">{{ metric2 }}</div>
              </div> -->
            </div>
            <!-- </div> -->
          </div>
          <!-- <div class="multiple-visualization visualizations  mr-b-16"> -->
          <!-- <v-layout
              class="multiple-scatter-plot-area"
              style="margin-bottom: 12px;"
            >
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('clicks')"
              >
                <div class="multiple-scatter-plot-title">clicks</div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="clicks"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('cpc')"
              >
                <div class="multiple-scatter-plot-title">cpc</div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="cpc"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('uniqueClicks')"
              >
                <div class="multiple-scatter-plot-title">uniqueClicks</div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="uniqueClicks"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('impressions')"
              >
                <div class="multiple-scatter-plot-title">impressions</div>
                <multiple-scatter-plot
                  style="height: 50px; "
                  metric2="impressions"
                ></multiple-scatter-plot>
              </div>
            </v-layout> -->
          <!-- <v-layout
              class="multiple-scatter-plot-area"
              style="margin-bottom: 12px;"
            >
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('cpm')"
              >
                <div class="multiple-scatter-plot-title">cpm</div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="cpm"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('spend')"
              >
                <div class="multiple-scatter-plot-title">spend</div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="spend"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('reach')"
              >
                <div class="multiple-scatter-plot-title">reach</div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="reach"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('purchase')"
              >
                <div class="multiple-scatter-plot-title">purchase</div>
                <multiple-scatter-plot
                  style="height: 50px; "
                  metric2="purchase"
                ></multiple-scatter-plot>
              </div>
            </v-layout> -->
          <!-- <v-layout class="multiple-scatter-plot-area">
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('omniPurchase')"
              >
                <div class="multiple-scatter-plot-title">omniPurchase</div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="omniPurchase"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('omniAppInstall')"
              >
                <div class="multiple-scatter-plot-title">omniAppInstall</div>
                <multiple-scatter-plot
                  style="height: 50px; "
                  metric2="omniAppInstall"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('mobileAppInstall')"
              >
                <div class="multiple-scatter-plot-title">mobileAppInstall</div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="mobileAppInstall"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('costPerPurchase')"
              >
                <div class="multiple-scatter-plot-title">costPerPurchase</div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
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
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('costPerOmniPurchase')"
              >
                <div class="multiple-scatter-plot-title">
                  costPerOmniPurchase
                </div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="costPerOmniPurchase"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('costPerMobileAppInstall')"
              >
                <div class="multiple-scatter-plot-title">
                  costPerMobileAppInstall
                </div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="costPerMobileAppInstall"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('costPerOmniAppInstall')"
              >
                <div class="multiple-scatter-plot-title">
                  costPerOmniAppInstall
                </div>
                <multiple-scatter-plot
                  style="height: 50px; margin-right: 12px;"
                  metric2="costPerOmniAppInstall"
                ></multiple-scatter-plot>
              </div>
              <div
                class="component-area"
                style="width: 22%; display: flex; flex-direction: column; margin-right: 8px;"
                @click="setMetric2('costPerUniqueClick')"
              >
                <div class="multiple-scatter-plot-title">
                  costPerUniqueClick
                </div>
                <multiple-scatter-plot
                  style="height: 50px;"
                  metric2="costPerUniqueClick"
                ></multiple-scatter-plot>
              </div>
            </v-layout> -->
          <!-- </div> -->
          <!-- <div class="detail-view">
            <div
              class="visualizations mr-b-16"
              style="display: flex; flex-direction: column; height: 360px; width: 22%;"
            >
              <div class="title">Correlation Analysis</div>
              <div class="component-area" style="display: flex; width: 22%;">
                <div class="scatter-plot-guide y-guide">{{ metric1 }}</div>
                <scatter-plot></scatter-plot>
              </div>
              <div class="scatter-plot-guide">{{ metric2 }}</div>
            </div>
          </div> -->
        </v-layout>
        <v-layout class="bottom-content contents">
          <div class="flex-1 ">
            <div>Line Chart</div>
            <!-- <div class="width: 100%; height: 100%;"> -->
            <line-graph></line-graph>
            <!-- </div> -->
          </div>
          <!-- <div class="visualizations line-graph">
            <div class="title">Line Chart</div>
            <div class="component-area">
              <line-graph></line-graph>
            </div>
          </div> -->
          <div class="flex-1 ">
            <div>Adset Information</div>
            <!-- <div class="width: 100%; height: 100%;"> -->
            <!-- <adset-table></adset-table> -->
          </div>
          <!-- <div
            class="visualizations mr-b-16 table-content"
            style="height:300px;"
          >
            <div class="title">Adset Information</div>
            <div class="component-area">
              <adset-table></adset-table>
            </div>
          </div> -->
        </v-layout>
      </div>
    </v-layout>
  </div>
</template>

<script src="./app.ts"></script>

<style lang="scss">
@import "./app.scss";
</style>
