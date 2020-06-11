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
        clicks: i.clicks ? i.clicks : 0,
        uniqueClicks: i.unique_clicks ? i.unique_clicks : 0,
        impressions: i.impressions ? i.impressions : 0,
        cpc: i.cpc ? i.cpc : 0,
        cpm: i.cpm ? i.cpm : 0,
        spend: i.spend ? i.spend : 0,
        reach: i.reach ? i.reach : 0,
        purchase: actions.purchase ? actions.purchase : 0,
        omniPurchase: actions.omni_purchase ? actions.omni_purchase : 0,
        mobileAppInstall: actions.mobile_app_install
          ? actions.mobile_app_install
          : 0,
        omniAppInstall: actions.omni_app_install ? actions.omni_app_install : 0,
        costPerPurchase: costPerActionType.purchase
          ? costPerActionType.purchase
          : 0,
        costPerOmniPurchase: costPerActionType.omni_purchase
          ? costPerActionType.omni_purchase
          : 0,
        costPerMobileAppInstall: costPerActionType.mobile_app_install
          ? costPerActionType.mobile_app_install
          : 0,
        costPerOmniAppInstall: costPerActionType.omni_app_install
          ? costPerActionType.omni_app_install
          : 0,
        costPerUniqueClick: i.cost_per_unique_click
          ? i.cost_per_unique_click
          : 0
      };

      this.insights?.set(i.date_start, insight);

      utils.metrics = Object.keys(insight);
    });
  }
}
