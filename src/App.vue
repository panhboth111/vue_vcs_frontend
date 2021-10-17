<template>
  <div class="relative">
    <NavBar
      v-if="$route.name !== 'Login' && $route.name !== 'Meeting'"
      :toggleDrawer="toggleDrawer"
    />
    <Drawer v-if="drawer" />
    <router-view />
    <LoadingDialog v-if="$store.state.ui.loading" />
  </div>
</template>

<script>
import NavBar from "./components/Layouts/NavBar.vue";
import Drawer from "./components/Layouts/Drawer.vue";
import LoadingDialog from "./components/Reusables/LoadingDialog.vue";
export default {
  components: { NavBar, LoadingDialog, Drawer },
  created() {
    this.$store.dispatch("user/init");
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style></style>
