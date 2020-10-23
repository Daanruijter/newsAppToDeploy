import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
// import Router from "vue-router";
import store from "./store";
// import routes from "./routes";
export const bus = new Vue();

// Vue.use(router);
// const router = new Router({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
