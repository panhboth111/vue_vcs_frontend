<template>
  <div class="flex justify-center items-center bg-red-300 h-64 cover_img ">
    <div class="bg-accent text-white py-6 px-16 rounded-full text-2xl">
      {{ user.username[0].toUpperCase() }}
    </div>
  </div>
  <div class="mt-10">
    <div class="flex justify-center items-center text-xl font-bold">
      <span class="mr-4"> {{ $t("profile.user_information") }}</span>

      <Pencil class="cursor-pointer  mr-2" @click="toggleEdit" />
      <Lock class="cursor-pointer  " @click="passwordDialog = true" />
    </div>
    <div class="flex justify-center">
      <form @submit.prevent="submit" class="mt-2 text-lg px-2">
        <div v-for="(f, n) in fields" :key="n" class="flex justify-between">
          <label :for="f.property" class="mr-2 lg:mr-10">{{ f.label }} </label>
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
        <div class="text-red">{{ error }}</div>
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
    <ChangePasswordDialog
      v-if="passwordDialog"
      :closeDialog="closeDialog"
      :fieldInput="fieldInput"
      :saveChangePassword="saveChangePassword"
      :errorMessage="errorMessage"
    />
  </div>
</template>

<script>
import axios from "axios";
import ChangePasswordDialog from "../components/Profile/ChangePasswordDialog.vue";
import Pencil from "../components/Icons/Pencil.vue";
import Lock from "../components/Icons/Lock.vue";
export default {
  components: { Pencil, Lock, ChangePasswordDialog },
  data: () => ({
    disabled: true,
    error: null,
    passwordDialog: false,
    changePasswordObj: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    errorMessage: null,
  }),
  computed: {
    user() {
      return this.$store.state.user.displayUser;
    },
    fields() {
      return [
        {
          label: this.$t("profile.display_name"),
          property: "displayName",
          type: "text",
        },
        { label: this.$t("profile.email"), property: "email", type: "text" },
        { label: this.$t("profile.phone"), property: "phone", type: "text" },
      ];
    },
  },
  methods: {
    closeDialog() {
      console.log("called");
      this.passwordDialog = false;
      this.changePasswordObj = {
        password: "",
        newPassword: "",
        confirmPassword: "",
      };
    },
    async saveChangePassword() {
      if (
        this.changePasswordObj.newPassword !==
        this.changePasswordObj.confirmPassword
      ) {
        this.errorMessage = "new password does not match with confirm password";
      }
      try {
        this.$store.dispatch("ui/toggleLoading", true);
        const jwt_token = localStorage.getItem("jwt_token");
        const res = await axios.put(
          "/user/changepassword",
          this.changePasswordObj,
          {
            headers: { Authorization: `Bearer ${jwt_token}` },
          }
        );
        this.$store.dispatch("ui/toggleLoading", false);
        this.passwordDialog = false;
      } catch (error) {
        this.$store.dispatch("ui/toggleLoading", false);
        this.errorMessage = "incorrect password";
        this.changePasswordObj = {
          password: "",
          newPassword: "",
          confirmPassword: "",
        };
      }
      console.log(this.changePasswordObj);
    },
    fieldInput($event, property) {
      this.changePasswordObj[property] = $event.target.value;
    },
    toggleEdit() {
      if (!this.disabled) {
        this.$store.dispatch("user/resetUser");
      }
      this.disabled = !this.disabled;
    },
    async submit() {
      try {
        this.$store.dispatch("ui/toggleLoading", true);
        const {
          username,
          ...submitUserData
        } = this.$store.state.user.displayUser;
        console.log(submitUserData);
        const jwt_token = localStorage.getItem("jwt_token");
        const res = await axios.put("/user", submitUserData, {
          headers: { Authorization: `Bearer ${jwt_token}` },
        });
        console.log(res.data);
        this.$store.dispatch("ui/toggleLoading", false);
        this.disabled = true;
      } catch (error) {
        console.log(error);
        this.error = "something went wrong please check again";
        this.$store.dispatch("ui/toggleLoading", false);
      }
    },
    cancelEdit() {
      this.$store.dispatch("user/resetUser");

      this.disabled = true;
    },
  },
  created() {},
};
</script>

<style>
.cover_img {
  background: url("../assets/images/cover1.jpg");
}
</style>
