<template>
  <router-link :to="`/meeting/${meetingObj.id}`">
    <div class="cursor-pointer drop-shadow rounded-lg hover:opacity-60 ">
      <img
        src="../../assets/images/thumbnail1.jpg"
        class="rounded-t-lg h-48  w-full"
      />
      <div class="bg-gray-100 px-4 py-6 rounded-b-lg">
        <div class="font-bold text-lg leading-4 pb-4 truncate">
          {{ meetingObj.title }}
        </div>

        <div class="text-base font-bold text-primary">
          {{ meetingObj.owner.username }}
        </div>
        <div class="flex justify-between text-base mt-3 ">
          <div>
            {{
              new Date(meetingObj.start_date).toLocaleString("default", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })
            }}
          </div>
          <div>
            {{ formartTime(meetingObj.start_date) }}
            - {{ formartTime(meetingObj.end_date) }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    meetingObj: Object,
  },
  data: () => ({
    img: `thumbnail${Math.floor(Math.random() * 4) + 1}.jpg`,
  }),
  methods: {
    getImgUrl(pic) {
      return require(pic);
    },
    formartTime(d) {
      const date = new Date(d);
      var hours = date.getHours();

      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
  },
};
</script>

<style></style>
