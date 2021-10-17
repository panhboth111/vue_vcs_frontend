<template>
  <div
    class="absolute top-0  left-0	 w-full h-screen flex justify-center items-center bg-gray-800 bg-opacity-80"
  >
    <div class="bg-white ">
      <div class=" text-center font-bold text-lg">
        Create a meeting
      </div>
      <div class="px-16 py-4 drop-shadow-2xl">
        <form @submit.prevent="submit">
          <div class="mb-2">
            <input
              type="text"
              placeholder="title"
              @input="fieldInput($event, 'title')"
              required
              class="border border-gray-600 p-2 w-full "
            />
          </div>
          <div class="mb-2">
            <input
              type="datetime-local"
              :min="getISOStringWithoutSecsAndMillisecs1(new Date())"
              placeholder="start"
              @input="fieldInput($event, 'start_date')"
              required
              class="border border-gray-600 p-2 w-full "
            />
          </div>
          <div class="mb-2">
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
              class="border border-gray-600 p-2 w-full "
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Invite Participants"
              class="border border-gray-600 p-2 w-full "
              @input="attendeesSearch($event)"
              @click="dropDownUsersClicked"
            />
            <div class="relative" v-if="attendeesDropDown">
              <ul class="absolute bg-white w-full">
                <li
                  v-for="(u, n) in dropDownUsers"
                  :key="n"
                  class="border-b border-gray-300 p-2 hover:bg-gray-100 cursor-pointer"
                  @click="attendeeSelected(u)"
                >
                  <p class="text-base font-bold">{{ u.displayName }}</p>
                  <p class="text-sm font-light">@{{ u.username }}</p>
                </li>
              </ul>
            </div>
            <div v-if="meetingObj.attendees.length > 0" class="mt-2">
              <div
                v-for="(a, n) in meetingObj.attendees"
                :key="n"
                class="flex justify-between w-full p-2 bg-gray-100 mt-2"
              >
                {{ a.username }}
                <div
                  class="font-bold text-red-500 cursor-pointer"
                  @click="attendeeRemove(a)"
                >
                  x
                </div>
              </div>
            </div>
          </div>
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
  },

  methods: {
    getISOStringWithoutSecsAndMillisecs1(date) {
      const dateAndTime = date.toISOString().split("T");
      const time = dateAndTime[1].split(":");

      return dateAndTime[0] + "T" + time[0] + ":" + time[1];
    },
  },
};
</script>

<style></style>
