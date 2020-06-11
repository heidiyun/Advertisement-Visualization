const colors: string[] = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#3F51B5",
  "#2196F3",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#CDDC39",
  "#FFEB3B",
  "#FF9800",
  "#FF5722",
  "#795548",
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

export default {
  colors,
  metrics,
  makeJson
};
