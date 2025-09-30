<template>
  <div
    class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
  >
    <div class="flex items-start gap-4">
      <!-- Avatar -->
      <div class="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>

      <!-- Content -->
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <svg
            class="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <h3 class="font-semibold text-gray-900">{{ note.title }}</h3>
        </div>
        <p class="text-gray-600 text-sm mb-3">{{ note.content }}</p>
        <div class="flex items-center justify-between text-sm text-gray-500">
          <span>{{ note.category }}</span>
          <div class="flex items-center gap-4">
            <span>{{ note.date }}</span>
            <span>{{ note.duration }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteItem",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
};
</script>
