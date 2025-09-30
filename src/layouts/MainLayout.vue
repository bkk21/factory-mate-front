<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "MainLayout",
  components: {
    Sidebar,
  },
};
</script>
