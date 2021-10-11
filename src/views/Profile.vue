<template>
  <div class="flex justify-center items-center bg-red-300 h-64 cover_img ">
    <div class="bg-accent text-white py-5 px-10 rounded-full text-2xl">NP</div>
  </div>
  <div class="mx-64 mt-10">
    <div class="flex justify-center text-xl font-bold">
      <p>
        <span class="mr-4"> USER INFORMATION</span>
        <i
          class="fa fa-pencil cursor-pointer hover:bg-gray-200 p-2 rounded-full "
          aria-hidden="true"
          @click="toggleEdit"
        ></i>
      </p>
    </div>
    <div class="flex justify-center">
      <form action="" class="mt-2 text-lg">
        <div v-for="(f, n) in fields" :key="n" class="flex justify-between">
          <label :for="f.property" class="mr-10">{{ f.label }} </label>
          <input
            :type="f.type"
            :name="f.property"
            :id="f.property"
            class="border border-gray-200 px-4 mb-2"
            :value="user[f.property]"
            v-model="user[f.property]"
            :disabled="disabled"
          />
        </div>

        <button
          type="submit"
          class="bg-primary text-white w-full mt-4"
          v-if="!disabled"
        >
          Save
        </button>
        <button
          class="bg-transparent border border-red-500 text-red-500 w-full mt-2"
          v-if="!disabled"
          @click="cancelEdit"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    fields: [
      { label: "Username", property: "username", type: "text" },
      { label: "Display Name", property: "displayName", type: "text" },
      { label: "Email", property: "email", type: "text" },
      { label: "Phone", property: "phone", type: "text" },
      { label: "Password", property: "password", type: "password" },
    ],
    user: {},
    disabled: true,
  }),
  methods: {
    initialize() {
      this.user = { ...this.$store.state.user.user };
    },
    toggleEdit() {
      if (!this.disabled) {
        this.user = { ...this.$store.state.user.user };
      }
      this.disabled = !this.disabled;
    },
    cancelEdit() {
      this.user = { ...this.$store.state.user.user };
      this.disabled = true;
    },
  },
  created() {
    this.initialize();
  },
};
</script>

<style>
.cover_img {
  background: url("../assets/images/cover1.jpg");
}
</style>
