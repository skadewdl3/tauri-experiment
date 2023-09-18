<script setup lang="ts">
let { text } = defineProps(['text'])
</script>

<template>
<button class="bg-blue-400 rounded px-4 py-2 active:scale-95 transition-all">{{ text }}</button>
</template>

<style lang="stylus">
</style>