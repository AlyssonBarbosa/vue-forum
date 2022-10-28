import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
import AppDate from "./components/AppDate.vue";
import fontAwesome from "./plugins/fontAwesome";
import AppSpinner from "./components/AppSpinner.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUsersStore } from "./stores/user";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(fontAwesome);
app.component("AppDate", AppDate);
app.component("AppSpinner", AppSpinner);
app.mount("#app");

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     useUsersStore().fetchAuthUser();
//   }
// });
