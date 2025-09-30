<template>
  <aside
    class="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8"
  >
    <div class="flex items-center justify-center">
      <span class="text-xl font-bold text-gray-900">Facto</span>
    </div>
    <nav class="flex-1 flex flex-col items-center space-y-6">
      <!-- Dashboard Icon -->
      <button
        @click="$router.push('/dashboard')"
        class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
        :class="
          isActive('/dashboard')
            ? 'bg-indigo-100 text-indigo-600'
            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
        "
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      </button>

      <!-- Notes Icon -->
      <button
        @click="$router.push('/notes')"
        class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
        :class="
          isNotesActive
            ? 'bg-indigo-100 text-indigo-600'
            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
        "
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </button>

      <!-- Calendar Icon -->
      <button
        @click="$router.push('/calendar')"
        class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
        :class="
          isActive('/calendar')
            ? 'bg-indigo-100 text-indigo-600'
            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
        "
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      <!-- Bell Icon -->
      <button
        class="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>
    </nav>

    <!-- Settings Icon (Bottom) -->
    <button
      @click="$router.push('/settings')"
      class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
      :class="
        isActive('/settings')
          ? 'bg-indigo-100 text-indigo-600'
          : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
      "
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </button>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  computed: {
    isNotesActive() {
      return (
        this.$route.path === "/notes" ||
        this.$route.path === "/recording-note" ||
        this.$route.path === "/note-done"
      );
    },
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
  },
};
</script>
