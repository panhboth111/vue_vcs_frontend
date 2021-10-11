export default {
  namespaced: true,
  state: {
    meetings: [
      {
        meetingName: "Department meeting",
        meetingCreator: "John Cena",
        meetingCode: "asdf",
        meetingThumbnail: `thumbnail${Math.floor(Math.random() * 4) + 1}.jpg`,
        meetingDate: new Date().toLocaleString("default", {
          month: "long",
          day: "2-digit",

          year: "numeric",
        }),
      },
      {
        meetingName: "Extra class",
        meetingCreator: "Tony Stark",
        meetingCode: "1234",
        meetingThumbnail: `thumbnail${Math.floor(Math.random() * 4) + 1}.jpg`,
        meetingDate: new Date().toLocaleString("default", {
          month: "long",
          day: "2-digit",

          year: "numeric",
        }),
      },
      {
        meetingName: "Semester Review",
        meetingCreator: "Naruto Uzumaki",
        meetingCode: "4567",
        meetingThumbnail: `thumbnail${Math.floor(Math.random() * 4) + 1}.jpg`,
        meetingDate: new Date().toLocaleString("default", {
          month: "long",
          day: "2-digit",

          year: "numeric",
        }),
      },
      {
        meetingName: "Department meeting",
        meetingCreator: "John Cena",
        meetingCode: "4324",
        meetingThumbnail: `thumbnail${Math.floor(Math.random() * 4) + 1}.jpg`,
        meetingDate: new Date().toLocaleString("default", {
          month: "long",
          day: "2-digit",

          year: "numeric",
        }),
      },
      {
        meetingName: "Department meeting",
        meetingCreator: "John Cena",
        meetingCode: "asd7",
        meetingThumbnail: `thumbnail${Math.floor(Math.random() * 4) + 1}.jpg`,
        meetingDate: new Date().toLocaleString("default", {
          month: "long",
          day: "2-digit",

          year: "numeric",
        }),
      },
    ],
  },
  getters: {},
  mutations: {},
  actions: {},
};
