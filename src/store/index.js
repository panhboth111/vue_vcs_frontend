import { createStore } from "vuex";
import user from "./user";
import meeting from "./meeting";
import loading from "./loading";
export default createStore({
  state: {
    test: "hiiii",
  },
  mutations: {},
  actions: {},
  modules: { user, meeting, loading },
});
