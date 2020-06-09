import Vue from "vue";
import Vuex from "vuex";
import Adset from "@/model/Adset";

Vue.use(Vuex);

interface State {
  metric1: string | undefined;
  metric2: string | undefined;
  adsets: Adset[] | undefined;
  // adsets: Adset[] | undefined
}

export default new Vuex.Store<State>({
  state: {
    metric1: undefined,
    metric2: undefined,
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
    setAdsets(state, payload) {
      state.adsets = payload;
    }
  },
  actions: {},
  getters: {
    adsets(state) {
      return state.adsets;
      // date와 metric이 변경되면 adset을 넘겨줘야 한다.
      // getters는 각 컴포넌트 마다 하나씩 할당된다.
      //로직...
      // return state.Adset
    }
  },
  modules: {}
});
