import { Vue, Component, Watch } from "vue-property-decorator";
// import testData from '@/data/advertisements-d.json';
// import store from '@/store';

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
interface DataSet {
  clicks: number;
  impressions: number;
  cpc: number;
  cpm: number;
  spend: number;
  reach: number;
  purchase: number;
  omniPurchase: number;
  mobileAppInstall: number;
  omniAppInstall: number;
  uniqueClicks: number;
  costPerPurchase: number;
  costPerOmniPurchase: number;
  costPerMobileAppInstall: number;
  costPerOmniAppInstall: number;
  costPerUniqueClick: number;
}

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

  public data = [];

  @Watch("$store.getters.adsets")
  onChangeData(val1: any, val2: any) {
    this.data = this.$store.getters.adsets;
    this.filterData();
  }

  public filterData() {
    // console.log('asdf', this.data[0].insights);
  }

  public created() {
    this.columns = [
      { title: "id", width: 100, dataIndex: "name", key: "name", fixed: "left" }
    ];
    dataSet.forEach((name: dataType, i: number) => {
      const data = {
        title: name,
        dataIndex: name,
        key: `${i}`,
        width: 120,
        sorter: (a: DataSet, b: DataSet) => a[name] - b[name]
      };
      this.columns.push(data);
    });
  }
}
