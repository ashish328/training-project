import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import formatDate from "./directives/Date.js";

loadFonts();

const app = createApp(App);
app.directive("format", formatDate);
app.use(store).use(router).use(vuetify).mount("#app");
