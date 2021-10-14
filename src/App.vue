<template>
  <div class="relative">
    <NavBar v-if="$route.name !== 'Login' && $route.name !== 'Meeting' " />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/Layouts/NavBar.vue";
export default {
  components: { NavBar },
  created() {
    this.$store.dispatch("user/init");
  },
};
</script>

<style></style>
