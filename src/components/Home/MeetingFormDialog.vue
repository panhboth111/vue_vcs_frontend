<template>
  <div
    class="absolute top-0  left-0	 w-full h-screen flex justify-center items-center bg-gray-800 bg-opacity-80"
  >
    <div class="bg-white">
      <div class=" text-center font-bold text-lg">
        Create a meeting
      </div>
      <div class="px-16 py-4 drop-shadow-2xl">
        <form @submit.prevent="submit">
          <input
            type="text"
            placeholder="meeting name"
            class="border border-gray-600 p-2 "
          /><br />
          <button class="bg-primary w-full mt-2 text-white" type="submit">
            Create
          </button>
          <button
            class="border border-red-500 w-full mt-2 text-red-500"
            @click="closeDialog"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    closeDialog: Function,
  },
  methods: {
    submit() {
      console.log("submitted");
    },
  },
};
</script>

<style></style>
