<script setup lang="ts">
import { Command } from '@tauri-apps/api/shell'
import { SettingOutlined } from '@ant-design/icons-vue'

const ufwScript = await resolveResource('resources/ufw.sh')
let command = ref<Command | null>()

let store = useFirewallStore()

let { enabled, enabledLoading } = toRefs(store)
let { setEnabled } = store

const executeUFWCommand = async (cmd: string) => {
  command.value = new Command('bash', [ufwScript, cmd])
  let result = await command.value.execute()
  updateStatus(cmd, result.stdout, result.stderr)
  if (result.code !== 0) {
    console.error(result.stderr)
    return false
  }
  return true
}

const updateStatus = (cmd: string, stdout: string, stderr: string = '') => {
  if (cmd === 'probe' || cmd === 'status') {
    setEnabled(stdout.includes('Status: active'))
  } else if (cmd === 'enable' || cmd === 'disable') {
    setEnabled(!stdout.includes('stopped and disabled'))
  }
}

onMounted(() => {
  executeUFWCommand('probe')
})
</script>

<template>
  <div class="firewall">
    <h1 class="dependencies-title text-2xl font-bold">Firewall Status</h1>
    <div class="flex firewall-option items-center justify-between my-4">
      <div class="firewall-option-content">
        <h3 class="text-xl">1. Enable/Disable</h3>
        <p>
          Switch the firewall on or off. The firewall is currently
          <span
            class="font-bold uppercase"
            :class="{ 'text-red-400': !enabled, 'text-green-400': enabled }"
            >{{ enabled ? 'on' : 'off' }}.</span
          >
        </p>
      </div>
      <Switch
        :enabled="enabled"
        :showLoading="true"
        @click="
          enabled ? executeUFWCommand('disable') : executeUFWCommand('enable')
        "
      />
    </div>

    <h3 class="text-xl mt-4">2. Network Protocols</h3>
    <p>
      Turn on/off networks protocols in their entirety, or for a specific port.
    </p>

    <ul class="pl-8 list-disc">
      <li class="flex items-center justify-between my-2">
        <p>a. SSH</p>
        <div class="flex items-center justify-around">
          <Switch />
          <SettingOutlined
            class="ml-2 hover:border-gray-400/50 border-black border-2 border-solid rounded p-1 cursor-pointer"
          />
        </div>
      </li>
      <li class="flex items-center justify-between my-2">
        <p>b. HTTP</p>
        <div class="flex items-center justify-around">
          <Switch />
          <SettingOutlined
            class="ml-2 hover:border-gray-400/50 border-black border-2 border-solid rounded p-1 cursor-pointer"
          />
        </div>
      </li>
    </ul>

    <!-- <Terminal
      :command="command"
      :collapsible="true"
      :collapsed="true"
      width="100%"
      :height="20"
    /> -->
  </div>
</template>

<style lang="stylus"></style>
