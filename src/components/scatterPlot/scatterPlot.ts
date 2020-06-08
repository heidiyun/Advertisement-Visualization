import { Vue, Component } from "vue-property-decorator";
import * as d3 from "d3";

@Component({})
export default class ScatterPlot extends Vue {
  private data: number[] = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100
  ];

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
      .style("opacity", 0);

    // x 축 그리기
    this.x = d3
      .scaleLinear()
      .domain([0, Math.max(...this.data)])
      .range([0, this.width]);
    this.svg
      .append("g")
      .attr("transform", "translate(0, " + this.height + ")")
      .style("color", "#888")
      .call(d3.axisBottom(this.x));

    // y축 그리기
    this.y = d3
      .scaleLinear()
      .domain([0, Math.max(...this.data)])
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
      .attr("cx", (d: number) => this.x(d))
      .attr("cy", (d: number) => this.y(d))
      .attr("r", 5)
      .style("fill", "red")
      .on("mouseover", (d: number) => {
        this.tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        this.tooltip
          .html(d + "<br/>")
          .style("left", 300 + "px")
          .style("top", d3.event.mouseY - 28 + "px");
      })
      .on("mouseout", (d: number) => {
        this.tooltip
          .transition()
          .duration(200)
          .style("opacity", 0);
      });

    console.log(d3);
  }
}
