<script setup lang="ts">

import { Command } from '@tauri-apps/api/shell'
import { resolveResource } from '@tauri-apps/api/path'

const command = ref<Command | null>(null)

const runAudit = async () => {
  let scriptFolder = await resolveResource('resources/lynis')
  command.value = new Command('bash', [`${scriptFolder}/lynis`, 'audit', 'system'], { cwd: scriptFolder })
  console.log(command.value)
  command.value?.spawn()
}

</script>

<template>
<Button text="Run Lynis Audit" @click="runAudit" />
<Terminal :command="command" class="w-1/2 max-h-[20rem]" />
</template>

<style lang="stylus">

</style>