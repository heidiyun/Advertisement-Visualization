import Insight from "./Insight";
import util from "@/util/util.ts";
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
      const actions = util.makeJson(JSON.stringify(i.actions));

      const costPerActionType = util.makeJson(
        JSON.stringify(i.cost_per_action_type)
      );

      const insight: Insight = {
        clicks: i.clicks,
        uniqueClicks: i.unique_clicks,
        impressions: i.impressions,
        cpc: i.cpc,
        cpm: i.cpm,
        spend: i.spend,
        reach: i.reach,
        purchase: actions.purchase,
        omniPurchase: actions.omni_purchase,
        mobileAppInstall: actions.mobile_app_install,
        omniAppInstall: actions.omni_app_install,
        costPerPurchase: costPerActionType.purchase,
        costPerOmniPurchase: costPerActionType.omni_purchase,
        costPerMobileAppInstall: costPerActionType.mobile_app_install,
        costPerOmniAppInstall: costPerActionType.omni_app_install,
        costPerUniqueClick: i.cost_per_unique_click
      };
      this.insights?.set(i.date_start, insight);
    });
  }
}
