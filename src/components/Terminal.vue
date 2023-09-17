<script setup lang="ts">
import { ref, watch } from 'vue'
import { Terminal } from 'xterm'
import { Command } from '@tauri-apps/api/shell'
import { FitAddon } from 'xterm-addon-fit'

// Get the props from parent component
// Props contain the command (instance of Command)
type TerminalProps = {
  command?: Command,
}
const props: TerminalProps = defineProps(['command'])

// Instantiate a new xterm terminal
let terminal = new Terminal()
let fitAddon = new FitAddon()

// this ref holds value of terminalContainer div
const terminalContainer = ref(null)

// Whether listeners of stdout and stderr are set for the command
let listenersSet = false

// When terminalContainer mounts, open the terminal and write a line
watch(terminalContainer, () => {
  if (!terminal.element && terminalContainer.value) {
    terminal.open(terminalContainer.value as HTMLElement)
    terminal.loadAddon(fitAddon)
    fitAddon.fit()
  }
})



// When command changes, set listeners for stdout and stderr
watch (props, () => {
  let { command } = props
  console.log(command)
  if (command && !listenersSet) {
    command.on("close", data => {

      // Display exit code and exit signal of command
      
      terminal.writeln(`${'-'.repeat(terminal.cols)}`)
      terminal.writeln(`Exit code: ${data.code}`)
      if (data.signal) terminal.writeln(`Signal:${data.signal}`)
      terminal.writeln(`${'-'.repeat(terminal.cols)}`)

      // When command ends, set listenersSet to false
      listenersSet = false
    });

    // Display stdout and stderr of command in terminal
    command.stdout.on("data", line => terminal.writeln(line));
    command.stderr.on("data", line => terminal.writeln(line));
    listenersSet = true
  }
})

</script>

<template>
  <div class="terminal-container w-full" ref="terminalContainer"></div>
</template>

<style scoped>

</style>