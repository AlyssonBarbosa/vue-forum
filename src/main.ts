import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
import AppDate from "./components/AppDate.vue";
import fontAwesome from "./plugins/fontAwesome";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(fontAwesome);
app.component("AppDate", AppDate);
app.mount("#app");
