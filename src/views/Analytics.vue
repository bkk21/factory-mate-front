<template>
  <MainLayout>
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900">분석</h1>
        <div class="mt-8 bg-white rounded-lg shadow p-12 text-center">
          <p class="text-2xl text-gray-400">분석 페이지</p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue'

export default {
  name: 'Analytics',
  components: {
    MainLayout
  }
}
</script>
