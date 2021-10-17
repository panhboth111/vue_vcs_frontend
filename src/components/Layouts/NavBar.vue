<template>
  <nav
    class="flex justify-between px-10 lg:px-24 bg-gray-100 items-center py-2"
  >
    <router-link to="/"><div class="text-xl font-bold ">VCS</div></router-link>
    <div class="hidden lg:flex">
      <router-link
        v-for="(i, n) in navItems"
        :key="n"
        :to="i.to"
        class="mr-8 font-bold hover:text-primary "
        active-class="text-primary"
      >
        {{ i.title }}
      </router-link>
    </div>
    <div class="flex items-center hidden lg:flex">
      <div
        @click="switchLang"
        class="mr-6 cursor-pointer  font-bold hover:bg-gray-500 p-2 rounded-full"
      >
        {{ $i18n.locale }}
      </div>
      <div
        @click="logout"
        class="bg-red-600 rounded-md  border-red-600 hover:bg-red-900 px-6 text-white py-1  cursor-pointer"
      >
        Log out
      </div>
    </div>
    <i
      class="fa fa-bars cursor-pointer lg:hidden"
      aria-hidden="true"
      @click="toggleDrawer"
    ></i>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    navItems() {
      return [
        { title: this.$t("nav.home"), to: "/", exact: true },
        { title: this.$t("nav.profile"), to: "/profile", exact: false },
      ];
    },
  },
  data: () => ({}),
  props: {
    toggleDrawer: Function,
  },
  methods: {
    logout() {
      localStorage.setItem("jwt_token", null);
      localStorage.setItem("loggedIn", 0);
      window.location.reload();
    },
    switchLang() {
      const currentLang = this.$i18n.locale;
      localStorage.setItem("lang", currentLang == "en" ? "kh" : "en");
      window.location.reload();
    },
  },
};
</script>

<style></style>
