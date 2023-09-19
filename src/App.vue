<template>
  <Sidebar class="fixed top-0 left-0 w-1/5 h-screen bg-black text-white" />
  <div class="h-screen bg-black text-white absolute top-0 right-0 w-4/5">
    <div class="page-container relative w-full h-screen py-4 px-24">
      <Suspense>
        <router-view></router-view>
      </Suspense>
    </div>
  </div>
</template>