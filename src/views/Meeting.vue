<template>
  <div class="h-screen">
    <div class="h-full" id="meet"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    options: {},
    api: {},
    domain: "meet.jit.si",
  }),
  methods: {
    startMeeting() {
      const user = this.$store.state.user.user;
      this.options = {
        roomName: this.$route.params.id,
        width: "100%",
        height: "100%",
        configOverwrite: { prejoinPageEnabled: true },
        interfaceConfigOverwrite: {
          // overwrite interface properties
        },
        parentNode: document.querySelector("#meet"),
        userInfo: {
          displayName: user.displayName,
        },
      };
      this.api = new window.JitsiMeetExternalAPI(this.domain, this.options);
      this.api.addEventListeners({
        videoConferenceLeft: this.handleVideoConferenceLeft,
      });
    },
    handleVideoConferenceLeft() {
      window.location.replace("/");
    },
  },
  mounted() {
    if (window.JitsiMeetExternalAPI) {
      this.startMeeting();
    }
    localStorage.setItem("requestedPath", "");
  },
};
</script>

<style></style>
