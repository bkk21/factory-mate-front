<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-semibold text-gray-900">프로젝트 선택</h2>
        <button @click="handleAddProject" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
          프로젝트 추가
        </button>
      </div>

      <!-- Project List -->
      <div class="space-y-3 mb-6 h-48 overflow-y-auto pr-2">
         <p v-if="error" class="text-red-500">{{ error }}</p>
         <p v-if="isLoading">프로젝트를 불러오는 중...</p>
        <label
          v-for="project in projects"
          :key="project.project_id"
          class="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-gray-300"
          :class="
            selectedProject === project.project_id
              ? 'border-gray-400 bg-gray-50'
              : 'border-gray-200'
          "
        >
          <input
            type="radio"
            :value="project.project_id"
            v-model="selectedProject"
            class="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
          <span class="ml-3 text-gray-700 font-medium">{{ project.name }}</span>
        </label>
      </div>

      <!-- Submit Button -->
      <button
        @click="goToDashboard"
        class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
      >
        프로젝트 선택
      </button>
    </div>
  </div>
</template>

<script>
import { getProjects, createProject } from "../api/projects.js";

export default {
  name: "ProjectSelect",
  data() {
    return {
      selectedProject: null,
      projects: [],
      isLoading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects() {
      console.log("Using dummy data for ProjectSelect.vue");
      this.isLoading = true;
      setTimeout(() => {
        this.projects = [
          { project_id: 1, name: "프로젝트 01", description: "" },
          { project_id: 2, name: "프로젝트 02", description: "" },
        ];
        this.isLoading = false;
      }, 500);
      /*
      // NOTE: Real API call is commented out
      async fetchProjects() {
        try {
          this.isLoading = true;
          this.error = null;
          this.projects = await getProjects();
        } catch (err) {
          this.error = "프로젝트 목록을 불러오는 데 실패했습니다.";
          console.error(err);
        } finally {
          this.isLoading = false;
        }
      }
      */
    },
    handleAddProject() {
      const projectName = prompt("새 프로젝트의 이름을 입력하세요:");
      if (!projectName || !projectName.trim()) {
        return;
      }
      // Add to local dummy data
      const newProject = {
        project_id: Date.now(),
        name: projectName,
        description: "",
      };
      this.projects.push(newProject);
      alert(`'${newProject.name}' 프로젝트가 생성되었습니다.`);

      /*
      // NOTE: Real API call is commented out
      async handleAddProject() {
        const projectName = prompt("새 프로젝트의 이름을 입력하세요:");
        if (!projectName || !projectName.trim()) {
          return;
        }

        try {
          // TODO: Replace with actual user ID from auth context
          const creatorId = 1;
          const newProjectData = { 
            name: projectName, 
            description: "", 
            creator_id: creatorId 
          };
          
          const newProject = await createProject(newProjectData);
          alert(`'${newProject.name}' 프로젝트가 생성되었습니다.`);
          await this.fetchProjects(); // Refresh the list

        } catch (err) {
          alert(`프로젝트 생성에 실패했습니다: ${err.message}`);
          console.error(err);
        }
      }
      */
    },
    goToDashboard() {
      if (!this.selectedProject) {
        alert("프로젝트를 선택해주세요!");
        return;
      }

      const selectedProjectData = this.projects.find(
        (p) => p.project_id === this.selectedProject
      );
      console.log("선택된 프로젝트:", selectedProjectData);

      localStorage.setItem(
        "selectedProject",
        JSON.stringify(selectedProjectData)
      );

      this.$router.push("/dashboard");
    },
  },
};
</script>
