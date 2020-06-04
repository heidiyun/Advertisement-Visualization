import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface State {
  metric: string | undefined;
  // adsets: Adset[] | undefined
}

export default new Vuex.Store<State>({
  state: {
    metric: undefined
    // adsets:
  },
  mutations: {
    setMetric(state, payload) {
      state.metric = payload;
    }
  },
  actions: {},
  getters: {
    adsets(state) {
      //로직...
      // return state.Adset
    }
  },
  modules: {}
});
