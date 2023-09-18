<script lang="ts" async setup>

interface DependencyProps {
  installable?: boolean | undefined
  id?: string
}

const props : DependencyProps = defineProps(['installable', 'id'])

let installed = ref(!props.installable)
let installing = ref(false)
let installable = ref(Boolean(props.installable))
let ellipsis = ref('')

if (props.id) {
  let res = await checkDeps.check(props.id)
  console.log(props.id, res)
  installed.value = res
}

const installDependency = async () => {

  const interval = setInterval(() => {
    if (ellipsis.value.length < 3) {
      ellipsis.value += '.'
    }
    else {
      ellipsis.value = ''
    }
  }, 500)

  installing.value = true
  if (props.id) {
    installDeps.install(props.id).then((success) => {
      if (success) {
        installed.value = true
      }
      else {
        // Show error message
      }
      clearInterval(interval)
      installing.value = false
    })
  }
}
</script>

<template>
  <div class="dependency-install">
    <Button text="Install" v-if="installable && !installing && !installed" @click="installDependency" />
    <p v-else-if="installable && installing && !installed" class="text-blue-500 italic">Installing{{ ellipsis }}</p>
    <p v-else class="text-green-400 italic">Installed</p>
    
  </div>
</template>

<style></style>
