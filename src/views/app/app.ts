import { Vue, Component } from "vue-property-decorator";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import AdsetTable from "@/components/table";
import LineGraph from "@/components/lineGraph";
import ScatterPlot from "@/components/scatterPlot";

import moment from "moment";

Vue.use(Antd);
Vue.component("adset-table", AdsetTable);
Vue.component("line-graph", LineGraph);
Vue.component("scatter-plot", ScatterPlot);

interface DataSet {
  clicks: number;
  impressions: number;
  cpc: number;
  cpm: number;
  spend: number;
  reach: number;
  purchase: number;
  omni_purchase: number;
  mobile_app_install: number;
  omni_app_install: number;
  unique_clicks: number;
  cost_per_purchase: number;
  cost_per_omni_purchase: number;
  cost_per_mobile_app_install: number;
  cost_per_omni_app_install: number;
  cost_per_unique_click: number;
}

const dataSet = [
  "clicks",
  "impressions",
  "cpc",
  "cpm",
  "spend",
  "reach",
  "purchase",
  "omni_purchase",
  "mobile_app_install",
  "unique_clicks",
  "cost_per_purchase",
  "cost_per_omni_purchase",
  "cost_per_mobile_app_install",
  "cost_per_omni_app_install",
  "cost_per_unique_click"
];

@Component({})
export default class App extends Vue {
  public momentRange: moment.Moment[] = [];
  public insights = [
    "clicks",
    "impressions",
    "cpc",
    "cpm",
    "spend",
    "reach",
    "purchase",
    "omni_purchase",
    "mobile_app_install",
    "unique_clicks",
    "cost_per_purchase",
    "cost_per_omni_purchase",
    "cost_per_mobile_app_install",
    "cost_per_omni_app_install",
    "cost_per_unique_click"
  ];
  public metric1 = "clicks";

  public onChange(date: moment.Moment[], dateString: string[]) {
    console.log(date);
    // this.momentRange = [moment(dateString, 'YYYY-MM-DD'), moment(dateString, 'YYYY-MM-DD')];
    this.momentRange = date;
  }

  public handleMenuClick(e: { key: number }) {
    this.metric1 = this.insights[e.key];
  }

  public created() {
    this.momentRange = [
      moment("2015-01-01", "YYYY-MM-DD"),
      moment("2015-01-31", "YYYY-MM-DD")
    ];
  }
}
