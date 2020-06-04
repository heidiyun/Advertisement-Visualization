import { Vue, Component } from "vue-property-decorator";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Table from "@/components/table";
import LineGraph from "@/components/lineGraph";
import ScatterPlot from "@/components/scatterPlot";

Vue.use(Antd);
Vue.component("table", Table);
Vue.component("line-graph", LineGraph);
Vue.component("scatter-plot", ScatterPlot);

@Component({})
export default class App extends Vue {}
