import Insight from "./Insight";

export default class Adset {
  private id = -1;
  private name = "";
  private dailyBudget = "";
  private billingEvent = "";
  private bidStrategy = "";
  private color = "";
  private insights: Map<string, Insight> = new Map();

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
      let actions = JSON.stringify(i.actions);
      actions = actions.slice(1, actions.length - 1);

      actions =
        "{" +
        actions
          .replace(/"action_type":/gi, "")
          .replace(/}/gi, "")
          .replace(/{/gi, "")
          .replace(/,"value"/gi, "") +
        "}";

      actions = JSON.parse(actions);

      let costPerActionType = JSON.stringify(i.cost_per_action_type);
      costPerActionType =
        "{" +
        costPerActionType
          .slice(1, costPerActionType.length - 1)
          .replace(/"action_type":/gi, "")
          .replace(/}/gi, "")
          .replace(/{/gi, "")
          .replace(/,"value"/gi, "") +
        "}";

      costPerActionType = JSON.parse(costPerActionType);

      // obj = obj
      //   .replace(/\"action_type\"\:/gi, '')
      //   .replace(/}/gi, '')
      //   .replace(/{/gi, '')
      //   .replace(/\,\"value\"/gi, '');
      // obj = '{' + obj + '}';
      // console.log(JSON.parse(actions));

      // const actions = { ...i.actions };
      // const costPerActionType = { ...i.cost_per_action_type };

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
