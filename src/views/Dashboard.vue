<template>
  <MainLayout>
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">대시보드</h1>
          <p class="mt-2 text-gray-600" v-if="project">
            현재 프로젝트: {{ project.name }}
          </p>
        </div>
        <div class="bg-white rounded-lg shadow p-12 text-center">
          <p class="text-2xl text-gray-400">대시보드 컨텐츠 영역</p>
          <p class="mt-2 text-gray-500">여기에 차트와 통계가 들어갑니다</p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";

export default {
  name: "Dashboard",
  components: {
    MainLayout,
  },
  data() {
    return {
      project: null,
    };
  },
  mounted() {
    const savedProject = localStorage.getItem("selectedProject");
    if (savedProject) {
      this.project = JSON.parse(savedProject);
    } else {
      this.$router.push("/projects");
    }
  },
};
</script>
