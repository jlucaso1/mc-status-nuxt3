<template>
  <div>
    <Toast />
    <div class="w-screen h-screen flex flex-col items-center justify-center">
      <Card class="mb-2">
        <template #title> Minecraft Server Status </template>
        <template #content>
          <span class="p-float-label w-full">
            <Toast />
            <InputText
              id="username"
              type="text"
              v-model="input_ip"
              class="w-full"
            />
            <label for="username">Server Ip</label>
          </span>
        </template>
        <template #footer>
          <div class="flex justify-between">
            <Button
              icon="pi pi-check"
              label="Check"
              @click="execute"
              :loading="isFetching"
            />
            <Button
              icon="pi pi-times"
              label="Clear"
              class="p-button-secondary"
              style="margin-left: 0.5em"
              @click="
                input_ip = '';
                status = null;
              "
            />
          </div>
        </template>
      </Card>
      <Card v-if="status">
        <template #title> {{ status.description }} </template>
        <template #content>
          <div class="flex justify-center">
            <img :src="status.favicon" width="150" alt="Server Status" />
          </div>
          <div class="text-emerald-400 text-xl">
            Players: {{ status.players.online }} / {{ status.players.max }}
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import { Status } from "mc-server-status";
import { useToast } from "primevue/usetoast";
import { ToastSeverity } from "primevue/api";

const toast = useToast();

const input_ip = ref("mc.hypixel.net");
const ip = computed(() => "/api/status?ip=" + input_ip.value);
const {
  execute,
  onFetchError,
  data: status,
  isFetching,
} = useFetch(ip, {
  immediate: false,
}).json<Status>();
onFetchError(() => {
  toast.add({
    severity: ToastSeverity.ERROR,
    summary: "Error message",
    detail: `Failed to fetch the server: ${input_ip.value}`,
    life: 5000,
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
