import { Vue, Component, Watch } from "vue-property-decorator";
import Adset from "@/model/Adset";

import * as d3 from "d3";

interface Point {
  cx: number;
  cy: number;
}
interface LineData {
  path: Point[];
  circle: Point[];
  color: string;
}
const line = d3
  .line()
  .x(d => d.cx)
  .y(d => d.cy)
  .curve(d3.curveCardinal);

@Component({})
export default class LineGraph extends Vue {
  public $refs!: Vue["$refs"] & {
    "line-graph": HTMLElement;
  };
  public svg!: any;

  public width!: number;
  public height!: number;
  public max!: number;
  public selected = "clicks";
  public setting = {
    space: 0,
    paddingX: 40,
    textX: 40,
    paddingY: 30,
    textY: 20,
    max: 1200
  };

  public data: Adset[] = [];
  public lines: LineData[] = [];
  public yAxis: Array<{
    text: string;
    y: number;
  }> = [];

  @Watch("$store.getters.adsetsForLineGraph")
  public onChangeDate() {
    this.svg.selectAll("*").remove();
    this.svg = d3.select("#line-graph");
    this.data = this.$store.getters.adsetsForLineGraph;
    if (this.data.length === 0) return;
    let max = Math.max(
      ...this.data.map(data => Array.from(data.insights.values())).flat()
    );
    max = max < 10 ? 10 : Math.floor(max);
    const length = max < 100 ? 10 : 100;
    this.max = Math.ceil(max / length) * length;
    const size = this.data[0].insights.size;
    this.setting.space =
      (this.width - (this.setting.paddingX * 2 + this.setting.textX)) /
      (size - 1);
    // this.updateMetric(this.$store.getters.metric1);
    this.updateGraph(this.width, this.height);
    this.updateYAxis(this.max);
    this.updateXAxis(size);
  }

  public updateMetric(metric: string) {
    this.svg
      .append("text")
      .text(`${metric}`)
      .attr("y", this.setting.paddingY - 20)
      .style("fill", "#ccc")
      .attr("x", this.setting.paddingX - 4);
  }

  public updateGraph(width: number, height: number) {
    this.data.forEach(data => {
      const points: Point[] = [];
      let i = 0;
      data.insights.forEach((value: number) => {
        const cx =
          this.setting.paddingX + this.setting.textX + this.setting.space * i;
        const cy =
          this.setting.paddingY + (this.max - value) * (height / this.max);
        points.push({
          cx,
          cy
        });
        this.svg
          .append("circle")
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("fill", data.color)
          .style("stroke", "#ffffff")
          .attr("r", 3);
        i++;
      });
      this.svg
        .append("path")
        .attr("d", line(points))
        .attr("fill", "none")
        .style("stroke", data.color)
        .attr("stroke-width", "1.9")
        .lower();
    });
  }

  public updateXAxis(size: number) {
    const keys = Array.from(this.data[0].insights.keys());
    const cutoff = Math.floor(keys.length / 10);
    for (let i = 0; i < keys.length; i++) {
      if (i % (cutoff + 1) === 0) {
        const key = keys[i].split("-");
        this.svg
          .append("text")
          .text(`${key[1]}.${key[2]}`)
          .attr("y", this.height + this.setting.paddingY + this.setting.textY)
          .style("fill", "#888")
          .attr(
            "x",
            this.setting.paddingX +
              this.setting.textX +
              this.setting.space * i -
              14
          );
      }
    }
  }

  public updateYAxis(max: number) {
    this.svg
      .append("text")
      .text(0)
      .attr("y", this.height + this.setting.paddingY + 4)
      .attr("x", this.setting.paddingX * 2 - 10)
      .attr("text-anchor", "end")
      .style("fill", "#888");
    this.svg
      .append("path")
      .attr(
        "d",
        line([
          {
            cx: this.setting.paddingX + this.setting.textX,
            cy: this.height + this.setting.paddingY
          },
          {
            cx: this.width - this.setting.paddingX,
            cy: this.height + this.setting.paddingY
          }
        ])
      )
      .attr("fill", "none")
      .style("stroke", "#eeeeee")
      .attr("stroke-width", "1.5")
      .lower();

    for (let i = 1; i < 5; i++) {
      this.svg
        .append("path")
        .attr(
          "d",
          line([
            {
              cx: this.setting.paddingX + this.setting.textX,
              cy: this.height + this.setting.paddingY - (i * this.height) / 4
            },
            {
              cx: this.width - this.setting.paddingX,
              cy: this.height + this.setting.paddingY - (i * this.height) / 4
            }
          ])
        )
        .attr("fill", "none")
        .style("stroke", "#eeeeee")
        .attr("stroke-width", "1")
        .lower();
      this.svg
        .append("text")
        .attr("text-anchor", "end")
        .text(this.numberWithCommas(this.max * (i / 4)))
        .attr(
          "y",
          this.height + this.setting.paddingY - (i * this.height) / 4 + 4
        )
        .attr("x", this.setting.paddingX * 2 - 10)
        .style("fill", "#888");
    }
  }

  public numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public mounted() {
    this.width = this.$refs["line-graph"].clientWidth;
    this.height =
      this.$refs["line-graph"].clientHeight -
      this.setting.paddingY * 2 -
      this.setting.textY;
    this.svg = d3.select("#line-graph");
  }
}
