import { createStore } from "vuex";
import user from "./user";
import meeting from "./meeting";
import ui from "./ui";
export default createStore({
  state: {
    test: "hiiii",
  },
  mutations: {},
  actions: {},
  modules: { user, meeting, ui },
});
