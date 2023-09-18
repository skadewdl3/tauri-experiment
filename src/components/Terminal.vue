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
  command?: Command
  output?: string[]
  collapsible?: boolean
  title?: string
  collapsed?: boolean
  height?: number
  width?: number | string
}
const props: TerminalProps = defineProps([
  'command',
  'output',
  'collapsible',
  'title',
  'collapsed',
  'height',
  'width',
])

// Instantiate a new xterm terminal
let terminal = new Terminal()
let fitAddon = new FitAddon()

// whether terminal is collapsed
const isCollapsed = ref(props.collapsed)

// this ref holds value of terminalContainer div
const terminalContainer = ref(null)

// Whether listeners of stdout and stderr are set for the command
let listenersSet = false

// When terminalContainer mounts, open the terminal and write a line
watch(terminalContainer, () => {
  if (!terminal.element && terminalContainer.value) {
    terminal.loadAddon(fitAddon)
    terminal.open(terminalContainer.value as HTMLElement)
    fitAddon.fit()
    console.log(fitAddon.proposeDimensions())
  }
})

// When command changes, set listeners for stdout and stderr
watch(props, () => {
  let { command } = props
  console.log(command)
  if (props.output) {
    props.output.forEach((line) => terminal.writeln(line))
  } else if (command && !listenersSet) {
    command.on('close', (data) => {
      // Display exit code and exit signal of command

      terminal.writeln(`${'-'.repeat(terminal.cols)}`)
      terminal.writeln(`Exit code: ${data.code}`)
      if (data.signal) terminal.writeln(`Signal:${data.signal}`)
      terminal.writeln(`${'-'.repeat(terminal.cols)}`)

      // When command ends, set listenersSet to false
      listenersSet = false
    })

    // Display stdout and stderr of command in terminal
    command.stdout.on('data', (line) => terminal.writeln(line))
    command.stderr.on('data', (line) => terminal.writeln(line))
    listenersSet = true
  }
})

// On unmount, destroy the terminal
// and remove all listeners from this terminal on the command
onUnmounted(() => {
  terminal.dispose()
  console.log(props.command && props.command.removeAllListeners)
  if (props.command && props.command.removeAllListeners)
    props.command.removeAllListeners()
})
</script>

<template>
  <div
    class="terminal-collapser w-full border-[#ccc]/50 rounded-md px-4 py-2 border-2"
    :style="`width: ${typeof width == 'string' ? width : (width || 40) + 'rem' }`"
  >
    <div v-if="collapsible" class="w-full flex justify-between items-center">
      <span class="text-lg">{{ title || 'Output' }}</span>
      <button @click="isCollapsed = !isCollapsed" class="underline">
        {{ isCollapsed ? 'Show' : 'Hide' }}
      </button>
    </div>
    <div
      class="terminal-container w-full"
      :class="{ hidden: isCollapsed }"
      :style="`height: ${height || 10}rem`"
      ref="terminalContainer"
    ></div>
  </div>
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
        background #ccc
        border-radius 0.5rem
</style>
