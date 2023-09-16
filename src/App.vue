<script setup lang="ts">
import { Command } from "@tauri-apps/api/shell";
import { ref } from "vue";
import { resolveResource } from "@tauri-apps/api/path";

let stdout = ref("");
let stderr = ref("");

const runScript = async () => {

  let script = await resolveResource('resources/update.sh')

  console.log(script)

  let command = new Command('bash', [script]);
  command.on("close", (data) => {
    console.log(
      `command finished with code ${data.code} and signal ${data.signal}`
    );
  });
  command.stdout.on("data", (line) => (stdout.value = line));
  command.stderr.on("data", (line) => (stderr.value = line));

  const child = await command.spawn();
  console.log("pid:", child.pid);
};
</script>

<template>
  <div class="w-full h-screen bg-black text-white">
    <button class="px-2 py-1 text-lg bg-blue-400 rounded" @click="runScript">
      Click Me
    </button>
    <div>
      stdout:<br />
      {{ stdout }}
    </div>
    <div>
      stderr:<br />
      {{ stderr }}
    </div>
  </div>
</template>

<style></style>
