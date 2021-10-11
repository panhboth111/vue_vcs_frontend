<template>
  <div class="pt-12 px-24">
    <div class="flex justify-between ">
      <input
        type="text"
        class="  py-1 px-4 border border-black "
        size="60"
        placeholder="Search"
      />
      <button
        class="px-6 bg-primary rounded-md text-white cursor-pointer"
        @click="openDialog"
      >
        START A MEETING
      </button>
    </div>
    <div class="mt-10 ">
      <div class="text-lg">
        <div class="font-light">Ongoing meetings</div>
        <div
          class="grid grid-cols-1 gap-6  lg:grid-cols-5 xl:grid-cols-5 mt-4"
          v-if="meetings.length"
        >
          <MeetingCard
            v-for="(m, n) in meetings"
            :key="n"
            :meetingName="m.meetingName"
            :meetingCreator="m.meetingCreator"
            :meetingCode="m.meetingCode"
            :meetingDate="m.meetingDate"
            :meetingThumbnail="m.meetingThumbnail"
          />
        </div>
        <div
          class="flex justify-center items-center bg-gray-100 h-20 font-normal text-base"
          v-else
        >
          It seems there is no ongoing meeting at the moment
        </div>
      </div>
      <div class="text-lg mt-6">
        <div class="font-light">Upcoming meetings</div>
        <div class="grid grid-cols-1 gap-6  lg:grid-cols-5 xl:grid-cols-5 mt-4">
          <MeetingCard
            v-for="(m, n) in meetings"
            :key="n"
            :meetingName="m.meetingName"
            :meetingCreator="m.meetingCreator"
            :meetingDate="m.meetingDate"
            :meetingThumbnail="m.meetingThumbnail"
          />
        </div>
      </div>
    </div>
    <MeetingFormDialog v-if="dialog" :closeDialog="closeDialog" />
  </div>
</template>

<script>
import MeetingCard from "../components/Home/MeetingCard.vue";
import MeetingFormDialog from "../components/Home/MeetingFormDialog.vue";
export default {
  components: {
    MeetingCard,
    MeetingFormDialog,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    meetings() {
      return this.$store.state.meeting.meetings;
    },
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      console.log("trigerred");
      this.dialog = false;
    },
  },
};
</script>

<style></style>
