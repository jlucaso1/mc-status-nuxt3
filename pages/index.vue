<template>
  <div>
    <input type="text" v-model="ip" />
    <button @click="fetchServerStatus">Consultar</button>
    <div v-if="!loading && status">
      <img :src="status.favicon" />
      <div>
        {{ status.description }}
      </div>
    </div>
    <div v-if="error">
      <div>
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Status } from "mc-server-status";
import axios from "axios";

const ip = ref("");
const status = ref<Status>({} as Status);
const loading = ref(true);
const error = ref<string | null>(null);
const fetchServerStatus = async () => {
  error.value = null;
  loading.value = true;
  try {
    const {
      data,
      status: statusCode,
      statusText,
    } = await axios.get<Status>("/api/status", {
      params: { ip: ip.value },
    });
    status.value = { ...data };
  } catch (err) {
    error.value = err as string;
  }
  loading.value = false;
};
</script>
