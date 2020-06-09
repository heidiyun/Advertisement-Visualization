import { Vue, Component } from "vue-property-decorator";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import AdsetTable from "@/components/table";
import LineGraph from "@/components/lineGraph";
import ScatterPlot from "@/components/scatterPlot";
import * as data from "../../../data/advertisements-d.json";
import Adset from "@/model/Adset";
import moment from "moment";

Vue.use(Antd);
Vue.component("adset-table", AdsetTable);
Vue.component("line-graph", LineGraph);
Vue.component("scatter-plot", ScatterPlot);

@Component({})
export default class App extends Vue {
  public momentRange: moment.Moment[] = [];

  public onChange(date: moment.Moment[], dateString: string[]) {
    console.log(date);
    // this.momentRange = [moment(dateString, 'YYYY-MM-DD'), moment(dateString, 'YYYY-MM-DD')];
    this.momentRange = date;
  }

  public handleMenuClick(e: any) {
    console.log("click", e);
  }

  private mounted() {
    // Adset Init
    console.log(data);
    const adsets: Array<Adset> = [];

    data.forEach(d => {
      const adsetData = d.data.adset;
      const insights = d.data.insights;

      const adset = new Adset(
        adsetData.id,
        adsetData.name,
        adsetData.daily_budget,
        adsetData.billing_event,
        adsetData.bid_strategy,
        "#fefefe",
        insights
      );
      adsets.push(adset);
    });
    this.$store.commit("setAdsets", adsets);

    console.log(this.$store.getters.adsets);
  }

  public created() {
    this.momentRange = [
      moment("2015-01-01", "YYYY-MM-DD"),
      moment("2015-01-31", "YYYY-MM-DD")
    ];
  }
}
