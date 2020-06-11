import { Vue, Component, Watch } from "vue-property-decorator";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import AdsetTable from "@/components/table";
import LineGraph from "@/components/lineGraph";
import ScatterPlot from "@/components/scatterPlot";
import * as data from "../../../data/advertisements-d.json";
import Adset from "@/model/Adset";
import moment from "moment";
import utils from "@/util/util.ts";

Vue.use(Antd);
Vue.component("adset-table", AdsetTable);
Vue.component("line-graph", LineGraph);
Vue.component("scatter-plot", ScatterPlot);

@Component({})
export default class App extends Vue {
  public momentRange: moment.Moment[] = [];
  private colors: string[] = utils.colors;
  private metrics: string[] = [];

  public onChange(date: moment.Moment[], dateString: string[]) {
    console.log(date);

    // this.momentRange = [moment(dateString, 'YYYY-MM-DD'), moment(dateString, 'YYYY-MM-DD')];

    this.$store.commit("setDate", dateString);
    this.momentRange = date;
  }

  public handleMenuClick(selectedMetric: any) {
    this.$store.commit("setMetric1", selectedMetric);
    console.log(this.$store.getters.metric1);
  }

  @Watch("$store.getters.date")
  public test() {
    console.log(this.$store.getters.adsets);
  }

  private mounted() {
    this.$store.commit("setDate", ["2020-04-01", "2020-04-30"]);

    // Adset Init
    const adsets: Array<Adset> = [];

    data.forEach((d, index) => {
      const adsetData = d.data.adset;
      const insights = d.data.insights;
      const adset = new Adset(
        adsetData.id,
        adsetData.name,
        adsetData.daily_budget,
        adsetData.billing_event,
        adsetData.bid_strategy,
        this.colors[index],
        insights
      );
      adsets.push(adset);
    });

    this.$store.commit("setAdsets", adsets);

    console.log(this.$store.getters.adsets);
    this.metrics = utils.metrics;
  }

  public created() {
    this.momentRange = [
      moment("2020-04-01", "YYYY-MM-DD"),
      moment("2020-04-30", "YYYY-MM-DD")
    ];
  }
}
