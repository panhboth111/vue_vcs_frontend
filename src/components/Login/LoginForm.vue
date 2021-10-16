<template>
  <div class="flex justify-center items-center bg-white px-10 py-4 ">
    <form action="" class="mt-6" @submit.prevent="login">
      <div class="text-center mb-7">
        <div class="text-2xl font-bold text-primary">SARKH</div>
        <div class="text-xl font-light">VIDEO CONFERENCING SYSTEM</div>
      </div>
      <input
        placeholder="username"
        type="text"
        class="border py-2 px-2 w-full"
        name="username"
        v-model="loginUser.username"
      />
      <br />
      <input
        placeholder="password"
        type="password"
        class="border mt-2 py-2 px-2 w-full"
        name="password"
        v-model="loginUser.password"
      />
      <br />
      <div class="text-red-600">{{ errorMessage.message }}</div>
      <button
        type="submit"
        class="w-full bg-primary text-white font-bold py-1 mt-4"
      >
        LOGIN
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    loading: false,
    loginUser: {
      username: "",
      password: "",
    },
    errorMessage: {
      display: false,
      message: "",
    },
  }),
  methods: {
    async login() {
      try {
        this.$store.dispatch("loading/toggleLoading", true);
        const res = await axios.post("/auth/login", this.loginUser);
        this.$store.dispatch("loading/toggleLoading", false);
        if (res.status == 201) {
          const access_token = res.data["access_token"];
          localStorage.setItem("jwt_token", access_token);
          localStorage.setItem("authed", 1);
          const requestedPath = localStorage.getItem("requestedPath");
          const redirectPath = requestedPath.includes("meeting")
            ? requestedPath
            : "/";
          window.location.replace(redirectPath);
        }
      } catch (error) {
        this.errorMessage.display = true;
        this.errorMessage.message = "something went wrong please try again";
        this.$store.dispatch("loading/toggleLoading", false);
      }
    },
  },
};
</script>

<style></style>
