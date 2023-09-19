<script setup lang="ts">
  import { Command } from '@tauri-apps/api/shell';
  import { resolveResource } from '@tauri-apps/api/path';

  

  const ufwScript = await resolveResource('resources/ufw.sh')
  let command = ref<Command | null>();
  // let stdout = ref<string>('')


  let enabled = ref(false)

  const executeUFWCommand = async (cmd: string) => {
    command.value = new Command('bash', [ufwScript, cmd])
    let result = await command.value.execute()
    updateStatus(cmd, result.stdout, result.stderr)
  }

  const updateStatus = (cmd: string, stdout: string, stderr: string = '') => {
    if (cmd === 'probe' || cmd === 'status') {
      // console.log(stdout.toLowerCase())
      enabled.value = stdout.includes('Status: active')
    }
    else if (cmd === 'enable' || cmd === 'disable') {
      // console.log(stdout.value)
      enabled.value = !stdout.includes('stopped and disabled')
    }
  }

  onMounted(() => {
    executeUFWCommand('probe')
  })
</script>

<template>
<button @click="executeUFWCommand('status')">Status - {{ enabled }}</button><br />
<Switch :enabled="enabled" @click="enabled ? executeUFWCommand('disable') : executeUFWCommand('enable')" />
<!-- <button @click="enabled ? executeUFWCommand('disable') : executeUFWCommand('enable')">toggle</button> -->
<Terminal :command="command" :collapsible="true" :collapsed="true" width="95%" :height="20" />
</template>

<style lang="stylus">

</style>