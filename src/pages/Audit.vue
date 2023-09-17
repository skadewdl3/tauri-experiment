<script setup lang="ts">

import { ref } from 'vue'
import { Command } from '@tauri-apps/api/shell'
import Terminal from '../components/Terminal.vue'
// import { resolveResource } from '@tauri-apps/api/path'

const command = ref<Command | null>(null)

const runAudit = async () => {
  // let script = await resolveResource('resources/lynis')
  command.value = Command.sidecar('binaries/lynis', ['audit', 'system'])
  console.log(command.value)
  command.value?.spawn()
}

</script>

<template>
<button class="bg-blue-400 rounded px-4 py-2 active:scale-95 transition-all" @click="runAudit">Run Lynis Audit</button>
<Terminal :command="command" class="w-1/2 max-h-[20rem]" />
</template>

<style lang="stylus">

</style>