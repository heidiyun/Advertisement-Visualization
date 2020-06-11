import { Vue, Component } from "vue-property-decorator";
import * as d3 from "d3";

@Component({})
export default class ScatterPlot extends Vue {
  // TODO
  // 1. button 추가
  // button 이 눌릴때 (metric 변경 -> data 변경)
  // data가 변경될 때 this.svg 다시 렌더링
  // 2. color hsl 로 적용

  private data: Array<{ x: number; y: number }> = [];

  private margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  } = { top: 20, right: 100, bottom: 30, left: 40 };
  private width: number = 820 - this.margin.left - this.margin.right;
  private height: number = 360 - this.margin.top - this.margin.bottom;

  private svg: any;
  private x: any;
  private y: any;
  private tooltip: any;

  private mounted() {
    for (let i = 0; i < 100; i++) {
      this.data.push({ x: Math.random() * 100, y: Math.random() * 100 });
    }

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

    // x 축 그리기
    this.x = d3
      .scaleLinear()
      .domain([0, Math.max(...this.data.map(d => d.x))])
      .range([0, this.width]);
    this.svg
      .append("g")
      .attr("transform", "translate(0, " + this.height + ")")
      .style("color", "#888")
      .call(d3.axisBottom(this.x));

    // y축 그리기
    this.y = d3
      .scaleLinear()
      .domain([0, Math.max(...this.data.map(d => d.y))])
      .range([this.height, 0]);
    this.svg
      .append("g")
      .style("color", "#888")
      .call(d3.axisLeft(this.y));

    this.svg
      .append("g")
      .selectAll("dot")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("cx", (d: { x: number; y: number }) => this.x(d.x))
      .attr("cy", (d: { x: number; y: number }) => this.y(d.y))
      .attr("r", 5)
      .style("fill", d3.hsl(166, Math.random(), 0.3))
      .on("mouseover", (d: { x: number; y: number }) => {
        this.tooltip
          .html("x: " + d.x + "<br/>" + "y: " + d.y)
          .style("top", this.y(d.y) - 36 + "px")
          .style("left", this.x(d.x) + "px")
          .style("display", "block");
      })
      .on("mouseout", (d: { x: number; y: number }) => {
        this.tooltip.style("display", "none");
      });

    console.log(d3);
  }
}
