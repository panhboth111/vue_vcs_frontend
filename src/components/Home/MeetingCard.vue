<template>
  <router-link :to="`/meeting/${meetingCode}`">
    <div class="cursor-pointer drop-shadow rounded-lg hover:opacity-60 ">
      <img
        v-bind:src="require(`../../assets/images/${meetingThumbnail}`)"
        class="rounded-t-lg max-h-48 w-full"
      />
      <div class="bg-gray-100 px-4 py-6 rounded-b-lg ">
        <div class="font-bold text-lg leading-4 ">
          {{ meetingName }}
        </div>

        <div class="text-base font-bold mt-3 text-primary">
          {{ meetingCreator }}
        </div>
        <div class="flex justify-between text-base mt-3 ">
          <div>{{ meetingDate }}</div>
          <div>1:00PM - 2:00PM</div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    meetingName: String,
    meetingCreator: String,
    meetingCode: String,
    meetingDate: Date,
    meetingThumbnail: String,
  },
  data: () => ({
    img: `thumbnail${Math.floor(Math.random() * 4) + 1}.jpg`,
  }),
  methods: {
    getImgUrl(pic) {
      return require(pic);
    },
  },
};
</script>

<style></style>
