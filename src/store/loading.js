export default {
  namespaced: true,
  state: {
    loading:false
  },
  getters: {},
  mutations: {
      toggleLoading: (state, status) => (state.loading = status),
  },
  actions: {
      toggleLoading(ctx,status) {
          console.log("toggled")
          ctx.commit("toggleLoading", status)
      }
  },
};
