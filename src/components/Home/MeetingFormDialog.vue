<template>
  <div
    class="absolute top-0  left-0	 w-full h-screen flex justify-center items-center bg-gray-800 bg-opacity-80"
  >
    <div class="bg-white rounded-3xl card_container p-6">
      <div class=" px-10 pb-4 drop-shadow-2xl">
        <div class="font-normal text-gray-600 text-lg  mb-2 border-b-2">
          {{ $t("schedule.create") }}
        </div>
        <form @submit.prevent="submit">
          <div class="mb-2">
            <label class="text-xs ">{{ $t("schedule.title") }}: </label>
            <input
              type="text"
              name="title"
              placeholder="Enter a title for your meeting"
              @input="fieldInput($event, 'title')"
              required
              class="border border-gray-600 px-2 py-1 rounded-md w-full "
            />
          </div>
          <div class="mb-2">
            <label class="text-xs">{{ $t("schedule.start") }}:</label>
            <input
              type="datetime-local"
              :min="getISOStringWithoutSecsAndMillisecs1(new Date())"
              placeholder="start"
              @input="fieldInput($event, 'start_date')"
              required
              class="border border-gray-600 px-2 py-1 rounded-md w-full "
            />
          </div>
          <div class="mb-2">
            <label class="text-xs">{{ $t("schedule.end") }}:</label>
            <input
              type="datetime-local"
              placeholder="end"
              :min="
                meetingObj.start_date
                  ? getISOStringWithoutSecsAndMillisecs1(
                      new Date(meetingObj.start_date)
                    )
                  : getISOStringWithoutSecsAndMillisecs1(new Date())
              "
              @input="fieldInput($event, 'end_date')"
              required
              class="border border-gray-600 px-2 py-1 rounded-md w-full "
            />
          </div>

          <div>
            <label class="text-xs">{{ $t("schedule.participants") }}:</label>
            <input
              type="text"
              placeholder="Invite Participants"
              class="border border-gray-600 px-2 py-1 rounded-md w-full "
              @input="attendeesSearch($event)"
              @click="dropDownUsersClicked"
              @blur="attendeesFieldBlur"
            />
            <div class="relative" v-if="attendeesDropDown">
              <ul class="absolute bg-white w-full">
                <li
                  v-for="(u, n) in dropDownUsers"
                  :key="n"
                  class="border-b border-gray-300 p-2 hover:bg-gray-100 cursor-pointer"
                  @mousedown="attendeeSelected(u)"
                >
                  <p class="text-base font-bold">{{ u.displayName }}</p>
                  <p class="text-sm font-light">@{{ u.username }}</p>
                </li>
              </ul>
            </div>
            <div
              v-if="meetingObj.attendees.length > 0"
              class="mt-2 flex flex-wrap"
            >
              <div
                v-for="(a, n) in meetingObj.attendees"
                :key="n"
                class="flex justify-between  py-2 px-4 bg-gray-100 rounded-2xl mt-2 mr-2 "
              >
                <p class="mr-4 ">{{ a.username }}</p>
                <div
                  class="font-bold text-red-500 cursor-pointer"
                  @click="attendeeRemove(a)"
                >
                  x
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 ">
            <button
              class="bg-primary px-12 py-1   text-white mr-4 rounded-md"
              type="submit"
            >
              {{ $t("create") }}
            </button>
            <button
              class="border border-red-500 px-12 py-1   text-red-500 rounded-md"
              @click="closeDialog"
            >
              {{ $t("cancel") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    closeDialog: Function,
    fields: Array,
    meetingObj: Object,
    submit: Function,
    dropDownUsers: Array,
    search: String,
    attendeesSearch: Function,
    attendeeSelected: Function,
    attendeesDropDown: Boolean,
    dropDownUsersClicked: Function,
    fieldInput: Function,
    attendeeRemove: Function,
    attendeesFieldBlur: Function,
  },

  methods: {
    getISOStringWithoutSecsAndMillisecs1(date) {
      const dateAndTime = date.toISOString().split("T");
      const time = dateAndTime[1].split(":");

      return dateAndTime[0] + "T" + time[0] + ":" + time[1];
    },
    test() {
      console.log("testing");
    },
  },
};
</script>

<style>
.card_container {
  width: 600px;
}
</style>
