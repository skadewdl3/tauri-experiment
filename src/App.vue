<script setup lang="ts">
import { Command } from "@tauri-apps/api/shell";
import { ref } from "vue";
import { resolveResource } from "@tauri-apps/api/path";
import Terminal from './components/Terminal.vue'
import 'xterm/css/xterm.css'

let command = ref<Command>();

const runScript = async () => {

  // Load script from resources folder
  let script = await resolveResource('resources/update.sh')

  // Instantiate a new 'bash' command
  // Assign it to the command ref
  // This ref is to be passed to Terminal component
  command.value = new Command('bash', script);

  // Spawn the command
  command.value?.spawn();
};
</script>

<template>
  <div class="w-full h-screen bg-black text-white">
    <button class="px-2 py-1 text-lg bg-blue-400 rounded" @click="runScript">
      Click Me now
    </button>
    <Terminal :command="command" />
  </div>
</template>

<style></style>
