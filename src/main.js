import Vue from "vue";
import axios from "axios";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/js/config/firebase";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/assets/main.scss";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

library.add(fas);
library.add(fab);
library.add(far);
Vue.component("icon", FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$db = getFirestore();

const auth = getAuth();
let isAuthReady = false;
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.commit("userLoggin", user);
  }
  if (!isAuthReady) {
    isAuthReady = true;
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
