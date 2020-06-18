import { Vue, Component, Watch } from "vue-property-decorator";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import AdsetTable from "@/components/table";
import LineGraph from "@/components/lineGraph";
import scatterPlot from "@/components/scatterPlot";
import MultipleScatterPlot from "@/components/multipleScatterPlot";
import * as data from "@/data/advertisements-d.json";
import Adset from "@/model/Adset";
import moment from "moment";
import utils from "@/util/util.ts";

Vue.use(Antd);

Vue.component("adset-table", AdsetTable);
Vue.component("line-graph", LineGraph);
Vue.component("scatter-plot", scatterPlot);
Vue.component("multiple-scatter-plot", MultipleScatterPlot);

@Component({})
export default class App extends Vue {
  public momentRange: moment.Moment[] = [];
  private colors: string[] = utils.colors;
  private metrics: string[] = [];
  private selectedAdsets: number[] = [];
  private usedColors: number[] = [];
  private colorIndex = 5;
  private size = "small";

  public onChange(date: moment.Moment[], dateString: string[]) {
    // this.momentRange = [moment(dateString, 'YYYY-MM-DD'), moment(dateString, 'YYYY-MM-DD')];

    const startDate = dateString[0].split("-").join("");
    const endDate = dateString[1].split("-").join("");

    if (endDate >= "20200401" && endDate <= "20200430") {
      if (startDate < "20200401" || startDate > "20200430") {
        dateString = ["2020-04-01", dateString[1]];
      }
    } else {
      if (startDate >= "20200401" && startDate <= "20200430") {
        dateString = [dateString[0], "2020-04-30"];
      } else {
        dateString = [];
      }
    }

    if (endDate > "20200430" && startDate < "20200401") {
      dateString = ["2020-04-01", "2020-04-30"];
    }

    this.$store.commit("setDate", dateString);
    console.log("date", this.$store.getters.date);
    this.momentRange = date;
  }

  public handleMenuClick(e: { key: string }) {
    this.$store.commit("setMetric1", e.key);
  }

  private selectAdset(adset: Adset) {
    const index = this.selectedAdsets.indexOf(adset.id);
    if (index !== -1) {
      this.colorIndex = utils.colors.indexOf(
        this.$store.getters.allAdset[adset.id].color
      );
      const nowColorIndex = this.usedColors.indexOf(this.colorIndex);
      this.usedColors.splice(nowColorIndex, 1);

      this.selectedAdsets.splice(index, 1);
    } else {
      this.selectedAdsets.push(adset.id);

      this.$store.getters.allAdset[adset.id].color =
        utils.colors[this.colorIndex];
      this.usedColors.push(this.colorIndex);

      this.colorIndex = (this.colorIndex + 1) % 14;

      console.log("a", this.usedColors, this.colorIndex);

      while (
        this.usedColors.length !== utils.colors.length &&
        this.usedColors.indexOf(this.colorIndex) !== -1
      ) {
        this.colorIndex = (this.colorIndex + 1) % 14;
      }
    }
    this.$store.commit("setSelectedAdsets", this.selectedAdsets);
  }

  private componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  private rgbToHex(r: number, g: number, b: number) {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
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

    for (let i = 0; i < 5; i++) {
      this.selectedAdsets.push(this.$store.getters.allAdset[i].id);
      this.usedColors.push(i);
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
