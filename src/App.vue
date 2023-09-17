<script setup lang="ts">
import { Command } from "@tauri-apps/api/shell";
import { ref } from "vue";
import { resolveResource } from "@tauri-apps/api/path";
import Terminal from './components/Terminal.vue'
import 'xterm/css/xterm.css'

let command = ref<Command>();
let res = ref('hi')

const runScript = async () => {

  let script = await resolveResource('resources/update.sh')

  command.value = new Command('bash', script);
  res.value = 'ok bro'

  console.log(command.value)

  command.value?.spawn();
};
</script>

<template>
  <div class="w-full h-screen bg-black text-white">
    <button class="px-2 py-1 text-lg bg-blue-400 rounded" @click="runScript">
      Click Me now
    </button>
    <Terminal :command="command" :res="res" />
  </div>
</template>

<style></style>
