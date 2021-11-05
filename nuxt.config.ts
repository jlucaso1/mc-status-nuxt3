import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  buildModules: ["@vueuse/core/nuxt", "nuxt-windicss"],
  css: [
    "primevue/resources/themes/saga-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
  ],
  meta: {
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
});
