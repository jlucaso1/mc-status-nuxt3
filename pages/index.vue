<template>
  <div class="h-full flex flex-col items-center justify-center">
    <Toast
      position="bottom-center"
      :breakpoints="{ '640px': { width: '100%' } }"
    />
    <div class="mx-2 my-5">
      <Card class="fit-content mb-2">
        <template #title> Minecraft Server Status </template>
        <template #content>
          <span class="p-float-label">
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
      <transition name="fade">
        <Card v-if="status" class="max-fit-content">
          <template #title>
            <div>
              {{ status.description }}
            </div>
          </template>
          <template #content>
            <div class="flex justify-center">
              <img :src="status.favicon" width="150" alt="Server Status" />
            </div>
          </template>
          <template #footer>
            <div class="font-mono text-xl text-shadow-sm">
              Players: {{ status.players.online }} / {{ status.players.max }}
            </div>
          </template>
        </Card>
      </transition>
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

<style lang="scss">
.fit-content {
  width: fit-content;
}
.max-fit-content {
  max-width: fit-content;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
