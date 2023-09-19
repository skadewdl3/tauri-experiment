// stores/counter.js
import { defineStore } from 'pinia'

export const useFirewallStore = defineStore('firewall', () => {
  const enabled = ref(false)

  const sshEnabled = ref(false)

  const setEnabled = (value: boolean) => {
    enabled.value = value
  }

  const setSshEnabled = (value: boolean) => {
    sshEnabled.value = value
  }

  return {
    enabled,
    sshEnabled,
    setEnabled,
    setSshEnabled,
  }
})
