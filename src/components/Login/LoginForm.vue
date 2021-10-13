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
export default {
  data: () => ({
    loginUser: {
      username: "",
      password: "",
    },
  }),
  methods: {
    login() {
      localStorage.setItem("loggedIn", 1);
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
