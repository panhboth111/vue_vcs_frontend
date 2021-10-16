import axios from "axios";
export default {
  namespaced: true,
  state: {
    user: { username: "" },
  },
  getters: {},
  mutations: {
    init: (state, user) => (state.user = user),
  },
  actions: {
    async init(ctx) {
      try {
        const access_token = localStorage.getItem("jwt_token");
        if (access_token != "null") {
          const res = await axios.get("/user", {
            headers: { Authorization: `Bearer ${access_token}` },
          });

          if (res.status == 200) {
            ctx.commit("init", res.data);
            localStorage.setItem("authed", 1);
          } else {
            localStorage.setItem("authed", 0);
          }
        } else {
          localStorage.setItem("authed", 0);
        }
      } catch (error) {
        localStorage.setItem("authed", 0);
      }
    },
  },
};
