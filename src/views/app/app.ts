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
  private colors: string[] = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#3F51B5",
    "#2196F3",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#CDDC39",
    "#FFEB3B",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#607D8B"
  ];

  public onChange(date: moment.Moment[], dateString: string[]) {
    console.log(date);
    // this.momentRange = [moment(dateString, 'YYYY-MM-DD'), moment(dateString, 'YYYY-MM-DD')];

    this.$store.commit("setDate", dateString);
    this.momentRange = date;
  }

  public handleMenuClick(e: any) {
    console.log("click", e);
  }

  private mounted() {
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
  }

  public created() {
    this.momentRange = [
      moment("2020-04-01", "YYYY-MM-DD"),
      moment("2020-04-30", "YYYY-MM-DD")
    ];
  }
}
