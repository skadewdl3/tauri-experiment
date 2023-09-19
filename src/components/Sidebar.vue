<script setup lang="ts">
let route = useRoute()
console.log(route.fullPath)


const links = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Audit',
    path: '/audit',
  },
  {
    name: 'Firewall',
    path: '/firewall',
  },
]
</script>

<template>
  <aside class="flex flex-col items-start justify-start w-full px-2 py-4">
    <div class="logo text-2xl font-bold">🥵S Hardening</div>

    <router-link 
      class="px-4 py-2 w-full"
      :class="{'text-blue-400': route.fullPath == path}"
      v-for="({ name, path }, index) in links"
      :to="path"
      :key="index"
      @click="route.fullPath == path"
    >
      {{ name }}
    </router-link>
  </aside>
</template>

<style lang="stylus"></style>
