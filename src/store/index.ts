import Vue from "vue";
import Vuex from "vuex";
import Adset from "@/model/Adset";
import Insight from "@/model/Insight";

Vue.use(Vuex);

interface State {
  metric1: string | undefined;
  metric2: string | undefined;
  date: string[] | undefined;
  adsets: Adset[] | undefined;

  // adsets: Adset[] | undefined
}

export default new Vuex.Store<State>({
  state: {
    metric1: undefined,
    metric2: undefined,
    date: undefined,
    adsets: undefined
    // adsets:
  },
  mutations: {
    setMetric1(state, payload) {
      state.metric1 = payload;
    },
    setMetric2(state, payload) {
      state.metric2 = payload;
    },
    setDate(state, payload) {
      state.date = payload;
    },
    setAdsets(state, payload) {
      state.adsets = payload;
    }
  },
  actions: {},
  getters: {
    getAdsetByDate(state) {
      return state.adsets.filter(state.date);
    },
    metric1(state) {
      return state.metric1;
    },
    metric2(state) {
      return state.metric2;
    },
    date(state) {
      return state.date;
    },
    adsets(state) {
      if (!state.adsets) {
        return;
      }

      if (!state.date) {
        return state.adsets;
      }

      const startDate = state.date[0];
      const endDate = state.date[1];

      const duration =
        Number(endDate.split("-").join("")) -
        Number(startDate.split("-").join(""));

      const resultAdsets: Adset[] = [];

      for (let i = 0; i < state.adsets?.length; i++) {
        const adset = state.adsets[i];
        const insight: Map<string, Insight> = new Map();

        for (let j = 0; j < duration + 1; j++) {
          const key = startDate.split("-");

          key[2] = Number(key[2]) + j + "";
          key[2] = key[2].length === 1 ? "0" + key[2] : key[2];

          insight.set(key.join("-"), adset.insights.get(key.join("-")));
        }
        const cloneAdset = JSON.parse(JSON.stringify(adset));
        delete cloneAdset.insights;
        cloneAdset.insights = insight;

        resultAdsets.push(cloneAdset);
      }

      return resultAdsets;
    }
  },
  modules: {}
});
