import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import axios from "axios";
import i18n from "./i18n";
import { lang } from "moment";

axios.defaults.baseURL = "https://rcaf-vcs-api.sarkhsolution.com/api";

router.beforeEach((to, from, next) => {
  let language = to.params.lang;
  if (!language) {
    language = "en";
  }
  i18n.local = language;
  next();
});

createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .mount("#app");
