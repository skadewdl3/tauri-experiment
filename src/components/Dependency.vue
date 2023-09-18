<script lang="ts" async setup>
import useDependencyStore from './../store/dependency'

interface DependencyProps {
  installable?: boolean | undefined
  removable?: boolean | undefined
  id?: string
}

const props: DependencyProps = defineProps(['installable', 'removable', 'id'])

let installed = ref(!props.installable)

let installable = ref(Boolean(props.installable))
let installing = ref(false)

let removable = ref(Boolean(props.removable))
let removing = ref(false)

let ellipsis = ref('')

if (props.id) {
  let res = await checkDeps.check(props.id)
  console.log(props.id, res)
  installed.value = res
}

let { appendOutput } = useDependencyStore()

const installDependency = async () => {
  const interval = setInterval(() => {
    if (ellipsis.value.length < 3) {
      ellipsis.value += '.'
    } else {
      ellipsis.value = ''
    }
  }, 500)

  installing.value = true
  if (props.id) {
    installDeps.install(props.id, appendOutput).then((success) => {
      if (success) {
        installed.value = true
      } else {
        // Show error message
      }
      clearInterval(interval)
      installing.value = false
    })
  }
}

const removeDependency = async () => {
  const interval = setInterval(() => {
    if (ellipsis.value.length < 3) {
      ellipsis.value += '.'
    } else {
      ellipsis.value = ''
    }
  }, 500)

  removing.value = true
  if (props.id) {
    removeDeps.remove(props.id, appendOutput).then((success) => {
      if (success) {
        installed.value = false
      } else {
        // Show error message
      }
      clearInterval(interval)
      removing.value = false
    })
  }
}
</script>

<template>
  <div class="dependency-install">
    <Button
      text="Install"
      v-if="installable && !installing && !installed"
      @click="installDependency"
    />
    <p
      v-else-if="installable && installing && !installed"
      class="text-blue-500 italic"
    >
      Installing{{ ellipsis }}
    </p>
    <p v-else>
      <span v-if="!removable" class="text-green-400 italic">Installed</span>
      <span
        v-else
        class="text-red-400 underline cursor-pointer"
        @click="removeDependency"
      >
        <span v-if="!removing">Remove</span>
        <span v-else>Removing{{ ellipsis }}</span>
      </span>
    </p>
  </div>
</template>

<style></style>
