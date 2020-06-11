import { Vue, Component } from "vue-property-decorator";
// import testData from '@/data/advertisements-d.json';
type dataType =
  | "clicks"
  | "impressions"
  | "cpc"
  | "cpm"
  | "spend"
  | "reach"
  | "purchase"
  | "omni_purchase"
  | "omni_purchase"
  | "mobile_app_install"
  | "omni_app_install"
  | "unique_clicks"
  | "cost_per_purchase"
  | "cost_per_omni_purchase"
  | "cost_per_mobile_app_install"
  | "cost_per_omni_app_install"
  | "cost_per_unique_click";
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

const dataSet: dataType[] = [
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

  public data = [
    {
      key: "1",
      name: "John ",
      age: 32,
      address: "New York Park"
    },
    {
      key: "2",
      name: "Jim Green",
      age: 40,
      address: "London Park"
    }
  ];

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
