import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import * as d3 from "d3";

interface DotType {
  dotID: string;
  name: string;
  date: string[];
  metric1: number;
  metric2: number;
  color: string;
  bidStrategy: string;
  billingEvent: string;
  dailyBudget: string;
}

type UIType = {
  margin: { top: number; bottom: number; left: number; right: number };
  width: number;
  height: number;
  dotSize: number;
  dotCountPerAdset: number;
};

type metricType =
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

@Component({})
export default class MultipleScatterPlot extends Vue {
  @Prop({ default: "clicks" }) metric2!: string;
  public $refs!: Vue["$refs"] & {
    "multiple-scatter-plot": HTMLElement;
  };

  private data: Array<DotType> = [];

  private metric2List: metricType[] = [
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

  private ui: UIType = {
    margin: { top: 5, bottom: 20, left: 5, right: 5 },
    width: 0,
    height: 0,
    dotSize: 1,
    dotCountPerAdset: 10
  };

  private svg: any;
  private xScale: any;
  private yScale: any;
  private dots: any;

  @Watch("$store.getters.adsetsForMultiples")
  private onAdsetsChange(adsets: any) {
    console.log("[CHANGE ADSETS]", adsets);
    this.data = [];

    //  { [key: number]: { colors: string } }
    adsets.forEach((adset: any) => {
      adset.insights.forEach((v: { [metric: string]: number }, k: string) => {
        this.data.push({
          dotID: adset.id + "-" + k,
          name: adset.name,
          date: [k],
          metric1: v[this.$store.getters.metric1],
          metric2: v[this.metric2],
          color: adset.color,
          bidStrategy: adset.bidStrategy,
          billingEvent: adset.billingEvent,
          dailyBudget: adset.dailyBudget
        });
      });
    });
    this.renderScatterPlot();
  }

  private initScatterPlot() {
    // x축 그리기
    // const x = d3.scale.linear().domain([0, 0]);

    this.xScale = d3
      .scaleLinear()
      .domain([0, 0])
      .range([0, this.ui.width]);
    this.svg
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0, " + this.ui.height + ")")
      .style("color", "#888")
      .call(d3.axisBottom(this.xScale).tickSize(2));

    // y축 그리기
    this.yScale = d3
      .scaleLinear()
      .domain([0, 0])
      .range([this.ui.height, 0]);
    this.svg
      .append("g")
      .attr("class", "yAxis")
      .style("color", "#888")
      .call(d3.axisLeft(this.yScale).tickSize(2));
  }

  private renderScatterPlot() {
    const yGuideWidth =
      (Math.max(...this.data.map(d => d.metric1)).toFixed(0) + "").length * 8;
    d3.select(`#multiple-scatter-plot-graph-${this.metric2}`).attr(
      "transform",
      "translate(" +
        (this.ui.margin.left + yGuideWidth) +
        "," +
        this.ui.margin.top +
        ")"
    );
    // x 축 update
    this.xScale = d3
      .scaleLinear()
      .domain([0, Math.max(...this.data.map(d => d.metric2), 0)])
      .range([0, this.ui.width - yGuideWidth]);
    this.svg.selectAll("g.xAxis").call(
      d3
        .axisBottom(this.xScale)
        .ticks(3)
        .tickSize(2)
    );

    // y축 update
    this.yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...this.data.map(d => d.metric1), 0)])
      .range([this.ui.height, 0]);
    this.svg.selectAll("g.yAxis").call(
      d3
        .axisLeft(this.yScale)
        .ticks(3)
        .tickSize(2)
    );

    if (this.dots) this.svg.selectAll("g.circle").remove();
    this.dots = this.svg
      .append("g")
      .attr("class", "circle")
      .selectAll("dot")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("cx", (d: DotType) => this.xScale(d.metric2))
      .attr("cy", (d: DotType) => this.yScale(d.metric1))
      .attr("r", this.ui.dotSize)
      .style(
        "fill",
        (d: DotType, i: number) => {
          // adset i의 갯수
          const count = this.data.filter(d => d.name === this.data[i].name)
            .length;
          const idx = i % count;
          const color = d3.hsl(d.color);
          color.l += ((1 - color.l) * (count - idx)) / (count + 1);
          return color;
        }
        // color change
      );
    // .on("mouseover", (d: DotType) => {
    //   this.tooltip
    //     .style("display", "block")
    //     .style("left", this.xScale(d.metric2) + "px")
    //     .style("top", this.yScale(d.metric1) - 90 + "px")
    //     .style("z-index", 100)
    //     .html(`
    //       <div>
    //         <div style="display: flex;">
    //           <div style="font-weight: bold">${d.name}</div>
    //         </div>
    //         <div style="display: flex; justify-content: flex-end;">
    //           <div style="font-size: 10px;">${
    //             d.date.length === 1
    //               ? d.date[0]
    //               : d.date[0] + "<br/> &nbsp;~" + d.date[d.date.length - 1]
    //           }</div>
    //         </div>
    //         <div style="width: 100%; border-top: solid .5px #ccc; padding-left: -2px; margin-bottom: 4px;"></div>
    //         <div style="display: flex;">
    //           <div style="font-weight: bold">${
    //             this.$store.getters.metric1
    //           }: &nbsp;</div>
    //           <div>${
    //             Number.isInteger(d.metric1) ? d.metric1 : d.metric1.toFixed(2)
    //           }</div></div>
    //         <div style="display: flex;">
    //           <div style="font-weight: bold">${
    //             this.$store.getters.metric2
    //           }: &nbsp;</div>
    //           <div>${
    //             Number.isInteger(d.metric2) ? d.metric2 : d.metric2.toFixed(2)
    //           }</div></div>
    //       </div>
    //     `);
    // })
    // .on("mouseout", (d: DotType) => {
    //   this.tooltip.style("display", "none");
    // });
  }

  private hexToHSL(hex: string): { h: number; s: number; l: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };
    let r, g, b;
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0;
    let s;
    const l = (max + min) / 2;
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, l };
  }
  private mounted() {
    this.ui.width =
      this.$refs["multiple-scatter-plot"].clientWidth -
      this.ui.margin.left -
      this.ui.margin.right;
    this.ui.height =
      this.$refs["multiple-scatter-plot"].clientHeight -
      this.ui.margin.top -
      this.ui.margin.bottom;
    // svg 생성
    this.svg = d3
      .select(`#multiple-scatter-plot-${this.metric2}`)
      .append("svg")
      .attr("class", `multiple-scatter-plot-${this.metric2}`)
      .style("width", "100%")
      .style("height", "100%")
      .append("g")
      .attr("id", `multiple-scatter-plot-graph-${this.metric2}`)
      .attr(
        "transform",
        "translate(" + this.ui.margin.left + "," + this.ui.margin.top + ")"
      );

    // tooltip 생성
    // this.tooltip = d3
    //   .select(`#multiple-scatter-plot-${this.metric2}`)
    //   .append("div")
    //   .attr("class", "tooltip")
    //   .style("position", "absolute")
    //   .style("display", "none")
    //   .style("background", "#eee")
    //   .style("padding", "4px 12px")
    //   .style("border-radius", "8px")
    //   .style("opacity", 0.9);

    this.initScatterPlot();
    // this.onMetricChange(this.selectedMetric);
  }
}
