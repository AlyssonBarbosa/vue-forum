import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import type { App } from "vue";

library.add(faPencil);

export default (app: App) => {
  app.component("fa-icon", FontAwesomeIcon);
};
