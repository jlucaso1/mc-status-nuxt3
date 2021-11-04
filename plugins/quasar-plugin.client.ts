import { defineNuxtPlugin } from "#app";
import {
  Notify,
  QBtn,
  QCard,
  QForm,
  QImg,
  QInput,
  Quasar,
  QuasarPluginOptions,
} from "quasar";

export default defineNuxtPlugin((nuxtApp) => {
  const quasarUserOptions: Partial<QuasarPluginOptions> = {
    plugins: { Notify },
    components: { QInput, QBtn, QForm, QImg, QCard },
  };

  nuxtApp.vueApp.use(Quasar, quasarUserOptions);
});
