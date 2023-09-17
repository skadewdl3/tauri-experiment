<script setup lang="ts">
import { ref, watch, Ref } from 'vue'
import { Terminal } from 'xterm'
import { Command } from '@tauri-apps/api/shell'

type TerminalProps = {
  command?: Command,
  res?: string
}

const props: TerminalProps = defineProps(['command', 'res'])
const terminalContainer = ref(null)


let terminal = new Terminal()
let listenersSet = false
 

console.log(terminal.element)

watch(terminalContainer, () => {
  if (!terminal.element && terminalContainer.value) {
    terminal.open(terminalContainer.value as HTMLElement)
    terminal.writeln('Hello World')
  }
})

watch (props, () => {
  let { command } = props
  console.log(command)
  if (command && !listenersSet) {
    command.on("close", data => {
      terminal.writeln(`command finished with code ${data.code} and signal ${data.signal}`)
      listenersSet = false
    });
    command.stdout.on("data", line => terminal.writeln(line));
    command.stderr.on("data", line => terminal.writeln(line));
    listenersSet = true
  }
})

</script>

<template>
  <div class="terminal-container" ref="terminalContainer"></div>
</template>

<style scoped>

</style>