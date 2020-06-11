import { Vue, Component, Watch } from "vue-property-decorator";
import * as d3 from "d3";

interface AdsetType {
  x: number;
  y: number;
  colorHSL: { h: number; s: number; l: number };
}
@Component({})
export default class ScatterPlot extends Vue {
  // TODO
  // 1. button 추가
  // button 이 눌릴때 (metric 변경 -> data 변경)
  // data가 변경될 때 this.svg 다시 렌더링
  // 2. color hsl 로 적용

  private data: Array<AdsetType> = [];
  private selectedMetric: { 1?: string; 2?: string } = {
    1: "metric1",
    2: "metric2"
  };

  private margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  } = { top: 20, right: 10, bottom: 30, left: 40 };
  private width: number = 820 - 120 - this.margin.left - this.margin.right;
  private height: number = 360 - this.margin.top - this.margin.bottom;

  private svg: any;
  private tooltip: any;
  private xAxis: any;
  private yAxis: any;
  private dots: any;

  @Watch("selectedMetric", { deep: true })
  onMetricChange(newVal: { 1?: string; 2?: string }) {
    console.log("[ON CHANGE METRIC]", newVal);
    const temp = [];
    const adsetCount = 2;
    const dotCountPerAdset = 20;
    if (newVal[1] && newVal[2]) {
      for (let i = 0; i < adsetCount; i++) {
        const c = Math.random() * 360;
        for (let j = 1; j <= dotCountPerAdset; j++) {
          temp.push({
            x: Math.random() * 100,
            y: Math.random() * 100,
            colorHSL: {
              h: c,
              s: (j + 0.5) / dotCountPerAdset,
              l: 0.5
            }
          });
        }
      }
    }

    this.data = temp;
    this.renderScatterPlot();
  }

  private changeMetric2(value: string) {
    this.selectedMetric[2] = value;
    console.log("[CHANGE METRIC 2]", this.selectedMetric[2]);
  }

  private initScatterPlot() {
    // x축 그리기
    this.xAxis = d3
      .scaleLinear()
      .domain([0, 0])
      .range([0, this.width]);
    this.svg
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0, " + this.height + ")")
      .style("color", "#888")
      .call(d3.axisBottom(this.xAxis));

    // y축 그리기
    this.yAxis = d3
      .scaleLinear()
      .domain([0, 0])
      .range([this.height, 0]);
    this.svg
      .append("g")
      .attr("class", "yAxis")
      .style("color", "#888")
      .call(d3.axisLeft(this.yAxis));
  }

  private renderScatterPlot() {
    // x 축 update
    this.xAxis = d3
      .scaleLinear()
      .domain([0, Math.max(...this.data.map(d => d.x), 0)])
      .range([0, this.width]);
    this.svg.selectAll("g.xAxis").call(d3.axisBottom(this.xAxis));

    // y축 update
    this.yAxis = d3
      .scaleLinear()
      .domain([0, Math.max(...this.data.map(d => d.y), 0)])
      .range([this.height, 0]);
    this.svg.selectAll("g.yAxis").call(d3.axisLeft(this.yAxis));

    if (this.dots) this.svg.selectAll("g.circle").remove();
    this.dots = this.svg
      .append("g")
      .attr("class", "circle")
      .selectAll("dot")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("cx", (d: AdsetType) => this.xAxis(d.x))
      .attr("cy", (d: AdsetType) => this.yAxis(d.y))
      .attr("r", 5)
      .style("fill", (d: AdsetType) =>
        d3.hsl(d.colorHSL.h, d.colorHSL.s, d.colorHSL.l)
      )
      .on("mouseover", (d: AdsetType) => {
        this.tooltip
          .html("x: " + d.x + "<br/>" + "y: " + d.y)
          .style("top", this.yAxis(d.y) - 36 + "px")
          .style("left", this.xAxis(d.x) + "px")
          .style("display", "block")
          .style("z-index", 3);
      })
      .on("mouseout", (d: AdsetType) => {
        this.tooltip.style("display", "none");
      });
  }

  private mounted() {
    // svg 생성
    this.svg = d3
      .select("#scatter-plot")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );

    // tooltip 생성
    this.tooltip = d3
      .select("#scatter-plot")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("display", "none")
      .style("background", "#eee")
      .style("padding", "4px 12px")
      .style("border-radius", "8px")
      .style("opacity", 0.9);

    this.initScatterPlot();
    this.onMetricChange(this.selectedMetric);
    console.log(d3);
  }
}
