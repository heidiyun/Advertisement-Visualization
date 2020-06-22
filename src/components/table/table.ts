import { Vue, Component, Watch } from "vue-property-decorator";
import Insight from "@/model/Insight";

type dataType =
  | "clicks"
  | "impressions"
  | "cpc"
  | "cpm"
  | "spend"
  | "reach"
  | "purchase"
  | "omniPurchase"
  | "omniPurchase"
  | "mobileAppInstall"
  | "omniAppInstall"
  | "uniqueClicks"
  | "costPerPurchase"
  | "costPerOmniPurchase"
  | "costPerMobileAppInstall"
  | "costPerOmniAppInstall"
  | "costPerUniqueClick";

const dataSet: dataType[] = [
  "clicks",
  "impressions",
  "cpc",
  "cpm",
  "spend",
  "reach",
  "purchase",
  "omniPurchase",
  "mobileAppInstall",
  "uniqueClicks",
  "costPerPurchase",
  "costPerOmniPurchase",
  "costPerMobileAppInstall",
  "costPerOmniAppInstall",
  "costPerUniqueClick"
];

interface TableData {
  name: string;
  clicks: string;
  impressions: string;
  cpc: string;
  cpm: string;
  spend: string;
  reach: string;
  purchase: string;
  omniPurchase: string;
  mobileAppInstall: string;
  omniAppInstall: string;
  uniqueClicks: string;
  costPerPurchase: string;
  costPerOmniPurchase: string;
  costPerMobileAppInstall: string;
  costPerOmniAppInstall: string;
  costPerUniqueClick: string;
  insight: Insight;
}

@Component({})
export default class Table extends Vue {
  public columns: Array<{
    title: string;
    width: number;
    dataIndex: string;
    name?: string;
    fixed?: string;
    key?: string;
    sorter?: (a: any, b: any) => number;
  }> = [];

  public uiLength = {
    x: 1500,
    y: 346
  };
  public uiIf = false;
  public data = [];
  public filteredData: TableData[] = [];

  @Watch("$store.getters.adsets")
  onChangeData(val1: any, val2: any) {
    this.data = this.$store.getters.adsets;
    this.filterData();
  }

  public filterData() {
    const result: TableData[] = [];
    this.data.forEach(
      (data: { name: string; insights: Map<string, Insight> }) => {
        const filteredInsight: TableData = {};

        const insight: Insight = {};
        let first = true;
        data.insights.forEach(value => {
          if (first) {
            Object.keys(value).forEach((key: dataType) => {
              insight[key] = value[key];
            });
            first = false;
          } else {
            Object.keys(value).forEach((key: dataType) => {
              insight[key] += value[key];
            });
          }
        });
        Object.keys(insight).forEach(key => {
          filteredInsight[key] = this.numToString(insight[key]);
        });
        filteredInsight.name = data.name;
        filteredInsight.insight = insight;
        result.push(filteredInsight);
      }
    );
    this.filteredData = result;
  }

  public mounted() {
    this.uiLength.y =
      document.getElementsByClassName("table-wrapper")[0].clientHeight - 30;
  }

  public numToString(num: number) {
    const str = num.toString();
    const strCut = str.indexOf(".") === -1 ? str : num.toFixed(2).toString();
    return strCut.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public created() {
    this.columns = [
      {
        title: "id",
        width: 100,
        dataIndex: "name",
        key: "name",
        fixed: "left"
      }
    ];
    dataSet.forEach((name: dataType, i: number) => {
      const data = {
        title: name,
        dataIndex: name,
        key: `${i}`,
        width:
          name.length < 12
            ? name.length < 8
              ? 105
              : 130
            : name.indexOf("costPer") !== -1
            ? 205
            : 175,
        sorter: (a: TableData, b: TableData) =>
          a.insight[name] - b.insight[name]
      };
      this.columns.push(data);
    });
  }
}
