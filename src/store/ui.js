export default {
  namespaced: true,
  state: {
    loading: false,
    dialogDisplay: false,
  },
  getters: {},
  mutations: {
    toggleLoading: (state, status) => (state.loading = status),
    toggleDialogDisplay: (state, status) => (state.dialogDisplay = status),
  },
  actions: {
    toggleLoading(ctx, status) {
      ctx.commit("toggleLoading", status);
    },
    toggleDialogDisplay(ctx, status) {
      ctx.commit("toggleDialogDisplay", status);
    },
  },
};
