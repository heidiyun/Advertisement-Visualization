import { Vue, Component, Watch } from "vue-property-decorator";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import AdsetTable from "@/components/table";
import LineGraph from "@/components/lineGraph";
import ScatterPlot from "@/components/scatterPlot";
import * as data from "@/data/advertisements-d.json";
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
  private selectedAdsets: number[] = [];

  public onChange(date: moment.Moment[], dateString: string[]) {
    // this.momentRange = [moment(dateString, 'YYYY-MM-DD'), moment(dateString, 'YYYY-MM-DD')];

    this.$store.commit("setDate", dateString);
    this.momentRange = date;
  }

  public handleMenuClick(e: { key: string }) {
    this.$store.commit("setMetric1", e.key);
  }

  @Watch("$store.getters.adsetsForScatterPlot")
  public test() {
    console.log("test adsets", this.$store.getters.adsetsForScatterPlot);
  }

  private selectAdset(adset: Adset) {
    const index = this.selectedAdsets.indexOf(adset.id);
    if (index !== -1) {
      this.selectedAdsets.splice(index, 1);
    } else {
      this.selectedAdsets.push(adset.id);

      // this.$store.getters.allAdset[adset.id].color = '#9c27b0';
    }
    this.$store.commit("setSelectedAdsets", this.selectedAdsets);
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

    this.metrics = utils.metrics;

    this.$store.commit("setMetric1", "clicks");
    this.$store.commit("setMetric2", "cpc");

    for (let i = 0; i < this.$store.getters.allAdset.length; i++) {
      this.selectedAdsets.push(this.$store.getters.allAdset[i].id);
    }
    this.$store.commit("setSelectedAdsets", this.selectedAdsets);
    console.log(this.selectedAdsets);
  }

  public created() {
    this.momentRange = [
      moment("2020-04-01", "YYYY-MM-DD"),
      moment("2020-04-30", "YYYY-MM-DD")
    ];
  }
}
