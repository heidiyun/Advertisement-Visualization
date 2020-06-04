import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LineGraph from "@/components/lineGraph";
import { Table } from "ant-design-vue";
import ScatterPlot from "@/components/scatterPlot";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "lineGraph",
    component: LineGraph
  },
  {
    path: "/",
    name: "table",
    component: Table
  },
  {
    path: "/",
    name: "scatterPlot",
    component: ScatterPlot
  }
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
