<template>
  <nav class="flex justify-between px-24 bg-gray-100 items-center py-2">
    <router-link to="/"><div class="text-xl font-bold ">VCS</div></router-link>
    <div class="flex">
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
    <div class="flex items-center">
      <div
        class="mr-6 cursor-pointer  font-bold hover:bg-gray-500 p-2 rounded-full"
      >
        ENG
      </div>

      <router-link to="/login" @click="logout">
        <div
          class="bg-red-600 rounded-md  border-red-600 hover:bg-red-900 px-6 text-white py-1  cursor-pointer"
        >
          Log out
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  data: () => ({
    navItems: [
      { title: "HOME", to: "/", exact: true },
      { title: "PROFILE", to: "/profile", exact: false },
    ],
  }),
  methods: {
    logout() {
      console.log("logging out");
      localStorage.setItem("loggedIn", 0);
    },
  },
};
</script>

<style></style>
