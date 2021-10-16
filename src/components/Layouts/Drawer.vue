<template>
  <div class=" w-screen h-screen bg-gray-100 z-10">
    <div class="h-full">
      <router-link v-for="(i, n) in items" :key="n" :to="i.to"
        ><div class="w-full text-center text-lg border-b border-gray-300">
          {{ i.title }}
        </div></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Home", to: "/" },
      { title: "Profile", to: "/profile" },
    ],
  }),
};
</script>

<style></style>
