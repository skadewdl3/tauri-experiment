// stores/counter.js
import { defineStore } from 'pinia'
import { Ref } from 'vue'

const useDependencyStore = defineStore('dependencies', () => {
  const terminalOutput: Ref<string[]> = ref([])
  const appendOutput = (str: string) => {
    terminalOutput.value.push(str)
  }

  return { terminalOutput, appendOutput }
})

export default useDependencyStore
