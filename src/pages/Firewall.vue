<script setup lang="ts">
  import { Command } from '@tauri-apps/api/shell';
  import { resolveResource } from '@tauri-apps/api/path';

  

  const ufwScript = await resolveResource('resources/ufw.sh')
  let command = ref<Command | null>();
  let stdout = ref<string>('')


  let enabled = ref(false)

  const executeUFWCommand = async (cmd: string) => {
    command.value = new Command('bash', [ufwScript, cmd])

    command.value.stdout.on('data', (data) => {
      stdout.value = stdout.value.concat(data)
    })

    command.value.on('close', (code) => {
      updateStatus(cmd)
    });

    await command.value.execute()
  }

  const updateStatus = (cmd: string) => {
    if (cmd === 'probe' || cmd === 'status') {
      console.log(stdout.value.toLowerCase())
      enabled.value = stdout.value.includes('Status: active')
    }
    else if (cmd === 'enable' || cmd === 'disable') {
      console.log(stdout.value)
      enabled.value = !stdout.value.includes('stopped and disabled')
    }
  }

  onMounted(() => {
    executeUFWCommand('probe')
  })
</script>

<template>
<button @click="executeUFWCommand('status')">Status - {{ enabled }}</button><br />
<button @click="enabled ? executeUFWCommand('disable') : executeUFWCommand('enable')">toggle</button>
<Terminal :command="command" :collapsible="true" :collapsed="true" width="95%" :height="20" />
</template>

<style lang="stylus">

</style>