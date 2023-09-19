<script setup lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue'

let props = defineProps(['enabled', 'showLoading'])

// get the @click attribute from parent

let loading = ref(false)

</script>

<template>
  <div
    class="bg-blue-400 relative w-12 h-6 rounded-full cursor-pointer transition-all"
    :class="{ 'bg-gray-400': !props.enabled }"
    @click="() => {
      let callback = ($attrs['onClick'] as Function)
      if (!callback) return
      if (props.showLoading) {
        loading = true
        callback().then(() => {
          loading = false
        })
      }

    }"
  >
    <div
      class="bg-white absolute top-1/2 w-5 h-5 transition-all -translate-y-1/2 rounded-full text-blue-400 flex justify-center items-center"
      :class="{
        'left-[5%]': !props.enabled,
        'left-[95%] -translate-x-full': props.enabled,
      }"
    >
  <LoadingOutlined v-if="loading" />
  </div>
  </div>
</template>

<style lang="stylus"></style>
