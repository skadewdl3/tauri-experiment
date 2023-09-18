<script setup lang="ts">

const dependencies = [
  {
    name: 'Lynis',
    install: false,
    description: 'Used for auditing you machine and checking for security vulnerabilities.'
  },
  {
    name: 'Uncomplicated Firewall',
    install: true,
    command: '...',
    description: 'Used for managing your firewall settings.'
  }
]
</script>

<template>
<div class="home">
  <h1 class="dependencies-title text-2xl font-bold">Dependencies</h1>
  <ol class="w-5/6">
    <li v-for="({ name, description, install }, index) in dependencies" :key="index" class="flex w-full justify-between items-center my-4 ">
      <div class="dependency-content">
        <h3 class="text-xl"> {{ index + 1 }}. {{ name }}</h3>  
        <p>{{ description }}</p>
      </div>
      <div class="dependency-install">
        <Button text="Install" v-if="install" />
        <p v-else class="text-green-400 italic">Installed</p>
      </div>
    </li>
  </ol>
</div>
</template>

<style lang="stylus">

</style>