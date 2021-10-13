export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    init: (state, user) => (state.user = user),
  },
  actions: {
    init(ctx) {
      console.log("init");
      const loggedIn = localStorage.getItem("loggedIn");
      const user = {
        username: "johncena",
        displayName: "John Cena",
        email: "johncena69@gmail.com",
        phone: "012 123 123",
        password: "johncena168",
      };
      if (loggedIn == 1) ctx.commit("init", user);
    },
  },
};
