<template>
  <nav
    class="flex justify-between px-10 lg:px-24 bg-gray-100 items-center py-2"
  >
    <router-link to="/"
      ><img src="../../assets/images/logo.png" width="60" alt=""
    /></router-link>
    <div class="hidden lg:flex">
      <router-link
        v-for="(i, n) in navItems"
        :key="n"
        :to="i.to"
        class="mr-8 font-bold hover:text-primary flex items-center "
        active-class=" text-primary border-b-2 border-primary pb-1"
      >
        <User v-if="i.to == '/profile'" class="mr-2" />
        <Home v-else-if="i.to == '/'" class="mr-2" />
        <div>{{ i.title }}</div>
      </router-link>
    </div>
    <div class="flex items-center hidden lg:flex">
      <div @click="switchLang" class="mr-6 cursor-pointer">
        <img
          src="../../assets/images/kh_round.png"
          width="40"
          alt=""
          v-if="$i18n.locale == 'kh'"
        />
        <img src="../../assets/images/uk_round.png" width="40" alt="" v-else />
      </div>
      <div
        @click="logout"
        class="bg-red-600 rounded-md  border-red-600 hover:bg-red-900 px-6 text-white py-1  cursor-pointer"
      >
        {{ $t("logout") }}
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
import User from "../Icons/User.vue";
import Home from "../Icons/Home.vue";
export default {
  components: { User, Home },
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
