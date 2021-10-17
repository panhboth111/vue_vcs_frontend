<template>
  <div class="pt-12 px-10 md:px-16 lg:px-16 xl:px18 pb-10">
    <div class="lg:flex justify-between ">
      <input
        type="text"
        class="  py-1 px-4 border border-black w-full lg:w-1/3 "
        placeholder="Search"
        v-model="meetingSearch"
        @input="meetingSearched"
      />
      <div class="relative mt-2 lg:m-0">
        <button
          class="px-6 py-1 w-full h-full bg-primary rounded-md text-white cursor-pointer"
          @click="dropdown = !dropdown"
        >
          {{ $t("start_a_meeting") }}
        </button>
        <ul
          class="absolute border  w-full text-center bg-white"
          v-if="dropdown"
        >
          <li
            class="py-1 border border-gray-200 cursor-pointer hover:bg-gray-300"
            @click="startInstantMeeting"
          >
            {{ $t("instant_meeting") }}
          </li>
          <li
            class="py-1 border-gray-200 cursor-pointer hover:bg-gray-300"
            @click="openDialog"
          >
            {{ $t("schedule_meeting") }}
          </li>
        </ul>
      </div>
    </div>
    <div class="mt-10 ">
      <div class="text-lg">
        <div class="font-light">{{ $t("ongoing_meetings") }}</div>
        <div
          class="grid grid-cols-1 gap-6  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:grid-cols-2 mt-4"
          v-if="onGoingMeetings.length"
        >
          <MeetingCard
            v-for="(m, n) in onGoingMeetings"
            :key="n"
            :meetingObj="m"
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
        <div class="font-light">{{ $t("upcoming_meetings") }}</div>
        <div
          class="grid grid-cols-1 gap-6  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:grid-cols-2 mt-4"
        >
          <MeetingCard
            v-for="(m, n) in upComingMeetings"
            :key="n"
            :meetingObj="m"
          />
        </div>
      </div>
    </div>
    <MeetingFormDialog
      v-if="dialog"
      :closeDialog="closeDialog"
      :meetingObj="meetingObj"
      :fields="fields"
      :submit="scheduleMeeting"
      :dropDownUsers="dropDownUsers"
      :attendeesSearch="attendeesSearch"
      :attendeeSelected="attendeeSelected"
      :search="search"
      :attendeesDropDown="attendeesDropDown"
      :dropDownUsersClicked="dropDownUsersClicked"
      :fieldInput="fieldInput"
      :attendeeRemove="attendeeRemove"
      :participantSelected="participantSelected"
      :participantClicked="participantClicked"
    />
  </div>
</template>

<script>
import MeetingCard from "../components/Home/MeetingCard.vue";
import MeetingFormDialog from "../components/Home/MeetingFormDialog.vue";
import axios from "axios";
export default {
  components: {
    MeetingCard,
    MeetingFormDialog,
  },
  data: () => ({
    dialog: false,
    dropdown: false,
    attendeesDropDown: false,
    actionType: 0,
    users: [],
    dropDownUsers: [],
    fields: [
      { label: "Meeting Name", property: "title", type: "text" },
      {
        label: "Meeting start time",
        property: "start_date",
        type: "datetime-local",
      },
      {
        label: "Meeting end time",
        property: "end_date",
        type: "datetime-local",
      },
    ],
    meetingObj: {
      title: "",
      start_date: "",
      end_date: "",
      attendeeIds: [],
      attendees: [],
      attendeeValue: "",
    },
    onGoingMeetings: [],
    upComingMeetings: [],
    search: "",
    meetingSearch: "",
  }),
  computed: {},
  methods: {
    participantSelected($event) {
      console.log($event);
      $event.target.value = "";
    },
    participantClicked() {
      console.log("trigerred");
    },
    attendeesFieldBlur() {
      this.attendeesDropDown = false;
    },
    meetingSearched() {},
    openDialog() {
      this.dialog = true;
      this.dropdown = false;
      this.$store.dispatch("ui/toggleDialogDisplay", true);
    },
    attendeesSearch($event) {
      this.search = $event.target.value;
      this.dropDownUsers = this.users.filter(
        (u) =>
          u.username.toLowerCase().includes(this.search) ||
          u.displayName.toLowerCase().includes(this.search)
      );
    },
    fieldInput($event, property) {
      let data = $event.target.value;
      if (property == "start_date" || property == "end_date") {
        data = new Date($event.target.value).toISOString();
      }
      this.meetingObj[property] = data;
    },
    attendeeSelected(attendee) {
      console.log("selected");
      this.meetingObj.attendees.push(attendee);
      this.meetingObj.attendeeIds.push(attendee.id);
      this.users = this.users.filter((u) => u.id !== attendee.id);
      this.dropDownUsers = this.users;
      this.attendeesDropDown = false;
    },
    dropDownUsersClicked() {
      this.attendeesDropDown = !this.attendeesDropDown;
    },
    attendeeRemove(attendee) {
      this.meetingObj.attendees = this.meetingObj.attendees.filter(
        (u) => u.id != attendee.id
      );
      this.meetingObj.attendeeIds = this.meetingObj.attendeeIds.filter(
        (i) => i != attendee.id
      );
      this.users.push(attendee);
      this.dropDownUsers = this.users;
    },
    async startInstantMeeting() {
      try {
        this.dropdown = false;
        this.$store.dispatch("ui/toggleLoading", true);
        const jwt_token = localStorage.getItem("jwt_token");
        const res = await axios.post(
          "/meeting",
          {},
          {
            headers: { Authorization: `Bearer ${jwt_token}` },
          }
        );
        this.$store.dispatch("ui/toggleLoading", false);
        if (res.status == 200) {
          this.$router.push(`/meeting/${res.data["id"]}`);
        }
      } catch (error) {
        this.$store.dispatch("ui/toggleLoading", false);
      }
    },

    async scheduleMeeting() {
      try {
        this.$store.dispatch("ui/toggleLoading", true);
        const { attendees, ...data } = this.meetingObj;
        const jwt_token = localStorage.getItem("jwt_token");
        console.log("straight out of the input field");
        console.log(data);
        const res = await axios.post("/meeting/scheduled", data, {
          headers: { Authorization: `Bearer ${jwt_token}` },
        });
        console.log("response from server");
        console.log(res.data);
        this.upComingMeetings.push(res.data);
        this.dialog = false;
        this.$store.dispatch("ui/toggleLoading", false);
      } catch (error) {
        this.$store.dispatch("ui/toggleLoading", false);
      }
    },
    async init() {
      try {
        const jwt_token = localStorage.getItem("jwt_token");
        const res = await axios.get("/user/all", {
          headers: { Authorization: `Bearer ${jwt_token}` },
        });
        const onGoingMeetings = await axios.get("/meeting/ongoing", {
          headers: { Authorization: `Bearer ${jwt_token}` },
        });
        console.log(onGoingMeetings.data);
        const upComingMeetings = await axios.get("/meeting/upcoming", {
          headers: { Authorization: `Bearer ${jwt_token}` },
        });
        this.onGoingMeetings = onGoingMeetings.data;
        this.upComingMeetings = upComingMeetings.data;
        this.users = res.data.filter(
          (u) => u.id != this.$store.state.user.user.id
        );
        this.dropDownUsers = this.users;
      } catch (error) {
        this.onGoingMeetings = [];
        this.upComingMeetings = [];
        this.users = [];
        this.dropDownUsers = [];
      }
    },
    closeDialog() {
      this.dialog = false;
      this.$store.dispatch("ui/toggleDialogDisplay", true);
    },
  },
  async created() {
    await this.init();
  },
};
</script>

<style></style>
