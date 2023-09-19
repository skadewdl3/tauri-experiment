<script setup lang="ts">
let props = defineProps(['enabled'])
</script>

<template>
  <div class="bg-blue-400 relative w-14 h-6 rounded-full">
    <div
      class="bg-white absolute top-1/2 w-5 h-5 transition-all -translate-y-1/2 rounded-full"
      :class="{ 'left-0.5': !props.enabled, 'left-[100%] -translate-x-full': props.enabled }"
    ></div>
  </div>
</template>

<style lang="stylus"></style>
