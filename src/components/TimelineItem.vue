<template>
  <div class="relative pl-6 border-l-2 border-gray-300">
    <div class="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
    
    <div class="mb-2">
      <span class="text-sm text-gray-500">{{ item.time }}</span>
    </div>
    
    <div class="bg-white rounded-lg p-4 shadow-sm">
      <h3 class="font-semibold text-gray-900 mb-2">{{ item.title }}</h3>
      <p v-if="item.summary" class="text-sm text-gray-700 mb-3">{{ item.summary }}</p>
      <ul class="space-y-1 text-sm text-gray-600">
        <li v-for="(point, index) in item.points" :key="index">- {{ point }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
