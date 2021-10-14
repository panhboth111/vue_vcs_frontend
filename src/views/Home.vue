<template>
  <div class="pt-12 px-10 md:px-16 lg:px-16 xl:px18 pb-10">
    <div class="flex justify-between ">
      <input
        type="text"
        class="  py-1 px-4 border border-black "
        size="60"
        placeholder="Search"
      />
      <div class="relative">
        <button
          class="px-6 h-full bg-primary rounded-md text-white cursor-pointer"
          @click="dropdown = !dropdown"
        >
          START A MEETING
        </button>
        <ul class="absolute border  w-full text-center" v-if="dropdown">
          <li
            class="py-1 border border-gray-200 cursor-pointer hover:bg-gray-300"
            @click="openDialog(0)"
          >
            Instant meeting
          </li>
          <li
            class="py-1 border-gray-200 cursor-pointer hover:bg-gray-300"
            @click="openDialog(1)"
          >
            Schedule a meeting
          </li>
        </ul>
      </div>
    </div>
    <div class="mt-10 ">
      <div class="text-lg">
        <div class="font-light">Ongoing meetings</div>
        <div
          class="grid grid-cols-1 gap-6  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:grid-cols-2 mt-4"
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
        <div class="grid grid-cols-1 gap-6  lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 md:grid-cols-4 mt-4">
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
    <MeetingFormDialog
      v-if="dialog"
      :closeDialog="closeDialog"
      :meetingObj="meetingObj"
      :fields="fields"
      :submit="actionType == 0 ? createInstantMeeting : scheduleMeeting"
    />
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
    dropdown: false,
    actionType: 0,
    fields: [],
    meetingObj: {},
  }),
  computed: {
    meetings() {
      return this.$store.state.meeting.meetings;
    },
  },
  methods: {
    openDialog(actionType) {
      this.dialog = true;
      this.actionType = actionType;
      if (actionType == 0) {
        this.fields = [
          { label: "Meeting Name", property: "meetingName", type: "text" },
        ];
        this.meetingObj = { meetingName: "" };
      } else {
        this.fields = [
          { label: "Meeting Name", property: "meetingName", type: "text" },
          { label: "Meeting Date", property: "meetingDate", type: "text" },
          {
            label: "Meeting start time",
            property: "meetingStart",
            type: "text",
          },
          { label: "Meeting end time", property: "meetingEnd", type: "text" },
        ];
        this.meetingObj = {
          meetingName: "",
          meetingDate: "",
          meetingStart: "",
          meetingEnd: "",
        };
      }
    },
    createInstantMeeting() {
      this.$router.push("/meeting/testingrandommeeting");
    },
    scheduleMeeting() {},
    closeDialog() {
      console.log("trigerred");
      this.dialog = false;
      this.meetingObj = {};
      this.fields = [];
    },
  },
};
</script>

<style></style>
