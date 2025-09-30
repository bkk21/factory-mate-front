<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-semibold text-gray-900">프로젝트 선택</h2>
        <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
          프로젝트 추가
        </button>
      </div>

      <!-- Project List -->
      <div class="space-y-3 mb-6">
        <label
          v-for="project in projects"
          :key="project.id"
          class="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-gray-300"
          :class="
            selectedProject === project.id
              ? 'border-gray-400 bg-gray-50'
              : 'border-gray-200'
          "
        >
          <input
            type="radio"
            :value="project.id"
            v-model="selectedProject"
            class="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
          <span class="ml-3 text-gray-700 font-medium">{{ project.name }}</span>
        </label>
      </div>

      <!-- Submit Button -->
      <button
        @click="handleSubmit"
        class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
      >
        프로젝트 선택
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectSelect",
  data() {
    return {
      selectedProject: null,
      projects: [
        { id: 1, name: "프로젝트 01" },
        { id: 2, name: "프로젝트 02" },
        { id: 3, name: "프로젝트 03" },
      ],
    };
  },
  methods: {
    handleSubmit() {
      if (!this.selectedProject) {
        alert("프로젝트를 선택해주세요!");
        return;
      }

      const selectedProjectData = this.projects.find(
        (p) => p.id === this.selectedProject
      );
      console.log("선택된 프로젝트:", selectedProjectData);

      // TODO:프로젝트 로컬 스토리지 저장
      localStorage.setItem(
        "selectedProject",
        JSON.stringify(selectedProjectData)
      );

      this.$router.push("/dashboard");
    },
  },
};
</script>
