<template>
  <div
    class="absolute top-0  left-0	 w-full h-screen flex justify-center items-center bg-gray-800 bg-opacity-80"
  >
    <div class="bg-white">
      <div class=" text-center font-bold text-lg">
        {{ $t("profile.change_password") }}
      </div>
      <div class="px-16 py-4">
        <form @submit.prevent="saveChangePassword">
          <div class="mb-2">
            <input
              type="password"
              class="w-full border border-gray-600 p-2"
              :placeholder="$t('profile.password')"
              required
              @input="fieldInput($event, 'password')"
            />
          </div>
          <div class="mb-2">
            <input
              type="password"
              class="w-full border border-gray-600 p-2"
              :placeholder="$t('profile.new_password')"
              required
              @input="fieldInput($event, 'newPassword')"
            />
          </div>
          <div class="mb-2">
            <input
              type="password"
              class="w-full border border-gray-600 p-2"
              :placeholder="$t('profile.confirm_password')"
              required
              @input="fieldInput($event, 'confirmPassword')"
            />
          </div>
          <div v-if="errorMessage" class="text-red-500">
            {{ errorMessage }}
          </div>
          <button class="bg-primary w-full mt-2 text-white" type="submit">
            Save
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
    fieldInput: Function,
    saveChangePassword: Function,
    errorMessage: String,
  },
};
</script>

<style></style>
