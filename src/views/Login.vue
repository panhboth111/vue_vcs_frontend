<template>
  <div class="h-screen justify-center items-center bg-gray-100 hidden lg:flex">
    <div class="grid grid-cols-2 h-full w-full px-60 py-32 ">
      <LoginThumbnail />
      <LoginForm />
    </div>
  </div>
  <div class=" h-screen flex justify-center items-center  lg:hidden" >
    <LoginForm />
  </div>
</template>

<script>
import LoginThumbnail from "../components/Login/LoginThumbnail.vue";
import LoginForm from "../components/Login/LoginForm.vue";
export default {
  components: {
    LoginForm,
    LoginThumbnail,
  },
};
</script>

<style></style>
