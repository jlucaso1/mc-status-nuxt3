<template>
  <div
    class="window-height flex column justify-center items-center q-gutter-y-md"
  >
    <div
      class="flex column justify-center items-center q-gutter-y-md fit-content"
    >
      <q-form @submit.prevent="execute" class="flex column q-gutter-y-sm">
        <q-card class="q-pa-sm">
          <div class="text-h6">Servers de exemplo</div>
          <div class="flex items-center q-gutter-x-sm">
            <div v-for="(server, index) in example_server" :key="index">
              <q-btn
                color="secondary"
                :label="server"
                @click="input_ip = server"
              />
            </div>
          </div>
        </q-card>
        <q-input v-model="input_ip" label="Ip do server" />
        <q-btn type="submit" label="Consultar" :loading="isFetching" />
      </q-form>

      <q-card
        v-if="isFinished && status"
        bordered
        class="q-mt-sm flex justify-center items-center column q-pa-sm max-fit-content"
      >
        <q-img class="q-mb-md" :src="status.favicon" width="100px" />
        <div>
          <div>
            {{ status.description }}
          </div>
          <div>
            Players: {{ status.players.online }} / {{ status.players.max }}
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import { Status } from "mc-server-status";
import { Notify } from "quasar";

const example_server = ["mc.hypixel.net", "mccentral.org", "redesky.com"];
const input_ip = ref("");
const ip = computed(() => "/api/status?ip=" + input_ip.value);
const {
  execute,
  isFetching,
  data: status,
  isFinished,
  onFetchError,
} = useFetch(ip, {
  immediate: false,
}).json<Status>();
onFetchError(() => {
  Notify.create({
    message: "Erro ao consultar o servidor",
    color: "negative",
    icon: "error_outline",
  });
});
</script>

<style>
.fit-content {
  width: fit-content;
}
.max-fit-content {
  max-width: fit-content;
}
</style>
