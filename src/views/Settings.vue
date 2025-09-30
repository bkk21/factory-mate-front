<template>
  <MainLayout>
    <div class="p-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">설정</h1>
          <p class="text-gray-600 mt-2">개인 정보 및 계정 설정을 관리하세요</p>
        </div>

        <!-- Profile Card -->
        <div class="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div class="flex items-start gap-6">
            <!-- Profile Image -->
            <div class="flex-shrink-0">
              <div
                class="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-12 h-12 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            <!-- Profile Info -->
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-900 mb-1">
                {{ userInfo.name }}
              </h2>
              <p class="text-sm text-gray-500 mb-3">@{{ userInfo.userId }}</p>
              <div class="space-y-3">
                <div class="flex items-center gap-2 text-gray-600">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{{ userInfo.department }}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{{ userInfo.email }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Information Sections -->
        <div class="space-y-6">
          <!-- Account Information -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">계정 정보</h3>
            <div class="space-y-4">
              <div class="grid grid-cols-3 gap-4">
                <div class="text-sm font-medium text-gray-500">아이디</div>
                <div class="col-span-2 text-gray-900">
                  {{ userInfo.userId }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="text-sm font-medium text-gray-500">이메일</div>
                <div class="col-span-2 text-gray-900">{{ userInfo.email }}</div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="text-sm font-medium text-gray-500">가입일</div>
                <div class="col-span-2 text-gray-900">
                  {{ userInfo.joinDate }}
                </div>
              </div>
            </div>
          </div>

          <!-- Personal Information -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">개인 정보</h3>
            <div class="space-y-4">
              <div class="grid grid-cols-3 gap-4">
                <div class="text-sm font-medium text-gray-500">이름</div>
                <div class="col-span-2 text-gray-900">{{ userInfo.name }}</div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="text-sm font-medium text-gray-500">소속</div>
                <div class="col-span-2 text-gray-900">
                  {{ userInfo.department }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="text-sm font-medium text-gray-500">전화번호</div>
                <div class="col-span-2 text-gray-900">{{ userInfo.phone }}</div>
              </div>
            </div>
          </div>

          <!-- Managed Projects -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              관리 프로젝트
            </h3>
            <div class="space-y-3">
              <div
                v-for="project in managedProjects"
                :key="project.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">
                      {{ project.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ project.members }}명의 멤버
                    </div>
                  </div>
                </div>
                <span
                  class="px-3 py-1 text-xs font-medium rounded-full"
                  :class="project.statusColor"
                >
                  {{ project.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4">
            <button
              @click="openEditModal"
              class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              정보 수정
            </button>
            <button
              @click="handleLogout"
              class="flex-1 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-300 rounded-lg transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeEditModal"
    >
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4" @click.stop>
        <h3 class="text-xl font-bold text-gray-900 mb-6">정보 수정</h3>

        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >이름</label
            >
            <input
              v-model="editForm.name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >소속</label
            >
            <input
              v-model="editForm.department"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >전화번호</label
            >
            <input
              v-model="editForm.phone"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="saveChanges"
            class="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            저장
          </button>
          <button
            @click="closeEditModal"
            class="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";

export default {
  name: "Settings",
  components: {
    MainLayout,
  },
  data() {
    return {
      showEditModal: false,
      userInfo: {
        userId: "kimchulsoo",
        name: "김철수",
        department: "개발팀",
        email: "kim.chulsoo@facto.com",
        phone: "010-1234-5678",
        joinDate: "2024.01.15",
      },
      editForm: {
        name: "",
        department: "",
        phone: "",
      },
      managedProjects: [
        {
          id: 1,
          name: "프로젝트 01",
          members: 5,
          status: "진행중",
          statusColor: "bg-green-100 text-green-700",
        },
        {
          id: 2,
          name: "프로젝트 02",
          members: 3,
          status: "대기",
          statusColor: "bg-yellow-100 text-yellow-700",
        },
        {
          id: 3,
          name: "프로젝트 03",
          members: 8,
          status: "완료",
          statusColor: "bg-gray-100 text-gray-700",
        },
      ],
    };
  },
  methods: {
    openEditModal() {
      this.editForm = {
        name: this.userInfo.name,
        department: this.userInfo.department,
        phone: this.userInfo.phone,
      };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    saveChanges() {
      this.userInfo.name = this.editForm.name;
      this.userInfo.department = this.editForm.department;
      this.userInfo.phone = this.editForm.phone;
      this.showEditModal = false;
      alert("정보가 수정되었습니다.");
    },
    handleLogout() {
      if (confirm("로그아웃 하시겠습니까?")) {
        localStorage.clear();
        this.$router.push("/");
      }
    },
  },
};
</script>
