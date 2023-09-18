<script setup lang="ts">
// Tauri imports
import { Command } from '@tauri-apps/api/shell'

// Xterm.js imports
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

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

// On unmount, destroy the terminal
// and remove all listeners from this terminal on the command
onUnmounted(() => {
  terminal.dispose()
  if (props.command) props.command.removeAllListeners() 
})
</script>

<template>
  <div class="terminal-container w-full" ref="terminalContainer"></div>
</template>

<style lang="stylus" scoped>
// Hide scrollbar on the outer container
.terminal-container
  overflow hidden

// Style the scrollbar on the terminal
.xterm
  height 100%
  width 100%
  &-viewport
    scroll-behavior smooth
    &::-webkit-scrollbar
      background transparent
      width 0.5rem
      &-thumb
        background #444
        border-radius 0.5rem
</style>