<template>
  <div class="relative">
    <NavBar v-if="$route.name !== 'Login' && $route.name !== 'Meeting' " />
    <router-view />
    <LoadingDialog v-if="$store.state.loading.loading" />
  </div>
</template>

<script>
import NavBar from "./components/Layouts/NavBar.vue";
import LoadingDialog from "./components/Reusables/LoadingDialog.vue"
export default {
  components: { NavBar, LoadingDialog },
  created() {
    this.$store.dispatch("user/init");
  },
};
</script>

<style></style>
