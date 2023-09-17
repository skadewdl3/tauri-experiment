<script setup lang="ts">
// import { Command } from "@tauri-apps/api/shell";
// import { ref } from "vue";
// import { resolveResource } from "@tauri-apps/api/path";

import Sidebar from "./components/Sidebar.vue";

// let command = ref<Command>();

// const runScript = async () => {

//   // Load script from resources folder
//   let script = await resolveResource('resources/update.sh')

//   // Instantiate a new 'bash' command
//   // Assign it to the command ref
//   // This ref is to be passed to Terminal component
//   command.value = new Command('bash', script);

//   // Spawn the command
//   command.value?.spawn();
// };
</script>

<template>
  <Sidebar class="fixed top-0 left-0 w-1/5 h-screen bg-black text-white" />
  <div class="h-screen bg-black text-white absolute top-0 right-0 w-4/5">
    <div class="page-container relative w-full h-screen py-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<style></style>
