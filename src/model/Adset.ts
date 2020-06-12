import Insight from "./Insight";
import utils from "@/util/util.ts";
export default class Adset {
  public readonly id = -1;
  public readonly name = "";
  public readonly dailyBudget = "";
  public readonly billingEvent = "";
  public readonly bidStrategy = "";
  public readonly color = "";
  public readonly insights: Map<string, Insight> = new Map();

  constructor(
    id: number,
    name: string,
    dailyBudget: string,
    billingEvent: string,
    bidStrategy: string,
    color: string,
    insights: {}[]
  ) {
    this.id = id;
    this.name = name;
    this.dailyBudget = dailyBudget;
    this.billingEvent = billingEvent;
    this.bidStrategy = bidStrategy;
    this.color = color;

    insights.forEach(i => {
      const actions = utils.makeJson(JSON.stringify(i.actions));

      const costPerActionType = utils.makeJson(
        JSON.stringify(i.cost_per_action_type)
      );

      const insight: Insight = {
        clicks: i.clicks * 1,
        uniqueClicks: i.unique_clicks * 1,
        impressions: i.impressions * 1,
        cpc: i.cpc * 1,
        cpm: i.cpm * 1,
        spend: i.spend * 1,
        reach: i.reach * 1,
        purchase: actions.purchase * 1,
        omniPurchase: actions.omni_purchase * 1,
        mobileAppInstall: actions.mobile_app_install * 1,
        omniAppInstall: actions.omni_app_install * 1,
        costPerPurchase: costPerActionType.purchase * 1,
        costPerOmniPurchase: costPerActionType.omni_purchase * 1,
        costPerMobileAppInstall: costPerActionType.mobile_app_install * 1,
        costPerOmniAppInstall: costPerActionType.omni_app_install * 1,
        costPerUniqueClick: i.cost_per_unique_click * 1
      };

      this.insights?.set(i.date_start, insight);

      utils.metrics = Object.keys(insight);
    });
  }
}
