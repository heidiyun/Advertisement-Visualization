import Adset from "@/model/Adset";

const colors: string[] = [
  "#F44336",
  "#3F51B5",
  "#009688",
  "#FFEB3B",
  "#795548",
  "#E91E63",
  "#2196F3",
  "#4CAF50",
  "#FF9800",
  "#9C27B0",
  "#00BCD4",
  "#CDDC39",
  "#FF5722",
  "#607D8B"
];

const metrics: string[] = [];

function makeJson(jsonString: string) {
  return JSON.parse(
    "{" +
      jsonString
        .slice(1, jsonString.length - 1)
        .replace(/"action_type":/gi, "")
        .replace(/}/gi, "")
        .replace(/{/gi, "")
        .replace(/,"value"/gi, "") +
      "}"
  );
}

function filterAdset(
  date: string[],
  adsets: Adset[],
  isAll: boolean,
  insightKeys?: string[]
) {
  const startDate = date[0];
  const endDate = date[1];

  const duration =
    Number(endDate.split("-").join("")) - Number(startDate.split("-").join(""));

  const resultAdsets: Adset[] = [];

  for (let i = 0; i < adsets.length; i++) {
    const adset = adsets[i];
    const insight = new Map();

    for (let j = 0; j < duration + 1; j++) {
      const key = startDate.split("-");

      key[2] = Number(key[2]) + j + "";
      key[2] = key[2].length === 1 ? "0" + key[2] : key[2];

      const metric1 = insightKeys?.[0];

      isAll
        ? insight.set(key.join("-"), adset.insights.get(key.join("-")))
        : insight.set(
            key.join("-"),
            adset.insights.get(key.join("-"))[`${metric1}`]
          );

      if (insightKeys?.length === 2) {
        const metric2 = insightKeys?.[1];
        insight.set(key.join("-"), [
          adset.insights.get(key.join("-"))[`${metric1}`],
          adset.insights.get(key.join("-"))[`${metric2}`]
        ]);
      }
    }
    const cloneAdset = JSON.parse(JSON.stringify(adset));
    delete cloneAdset.insights;
    cloneAdset.insights = insight;

    resultAdsets.push(cloneAdset);
  }

  return resultAdsets;
}
export default {
  colors,
  metrics,
  makeJson,
  filterAdset
};
