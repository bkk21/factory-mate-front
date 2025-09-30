<template>
  <MainLayout>
    <div class="p-8">
      <div class="max-w-[1400px] mx-auto">
        <div class="mb-8 flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">대시보드</h1>

          <div class="flex gap-4">
            <select
              v-model="selectedDate"
              class="px-4 py-2 border rounded-lg bg-white"
            >
              <option v-for="date in dates" :key="date" :value="date">
                {{ date }}
              </option>
            </select>
            <select
              v-model="selectedProject"
              class="px-4 py-2 border rounded-lg bg-white"
            >
              <option
                v-for="project in projects"
                :key="project.id"
                :value="project.id"
              >
                {{ project.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex gap-8">
          <div class="flex-1">
            <div class="grid grid-cols-4 gap-4 mb-8">
              <div
                v-for="kpi in kpiData"
                :key="kpi.id"
                class="bg-white rounded-lg p-6 shadow-sm border"
              >
                <div class="text-sm text-gray-600 mb-2">{{ kpi.title }}</div>
                <div class="flex items-end justify-between">
                  <div class="text-3xl font-bold">
                    {{ kpi.value.toLocaleString() }}
                  </div>
                  <div
                    class="flex items-center gap-1 text-sm"
                    :class="kpi.trend > 0 ? 'text-green-600' : 'text-red-600'"
                  >
                    <svg
                      v-if="kpi.trend > 0"
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                    <span>{{ kpi.trend > 0 ? "+" : "" }}{{ kpi.trend }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6 border">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-semibold">중요피쳐</h2>
                <div class="flex items-center gap-4 text-sm">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-slate-900"></div>
                    <span>별개 1</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-slate-400"></div>
                    <span>별개 2</span>
                  </div>
                </div>
              </div>

              <div class="flex gap-6">
                <div class="w-32">
                  <div class="text-sm font-medium text-gray-500 mb-4">
                    피쳐이름
                  </div>
                  <div
                    v-for="feature in features"
                    :key="feature.id"
                    class="flex items-center gap-2 py-2"
                  >
                    <div class="w-2 h-2 rounded-full bg-slate-900"></div>
                    <div class="w-12 h-0.5" :class="feature.lineStyle"></div>
                    <span class="text-sm">{{ feature.name }}</span>
                  </div>
                </div>

                <div
                  class="flex-1 h-80 bg-gray-50 rounded flex items-center justify-center"
                >
                  <p class="text-gray-400">
                    차트는 recharts 문제로 임시 비활성화
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="w-80">
            <div class="bg-slate-50 rounded-lg p-4 border">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold">오류 내역</h3>
                <button class="p-1 hover:bg-slate-200 rounded">
                  <svg
                    class="w-5 h-5 text-gray-600"
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
              </div>
              <div class="text-sm text-gray-500 mb-4">전체기간</div>
              <div class="space-y-3 max-h-[650px] overflow-y-auto">
                <div
                  v-for="error in errorTimeline"
                  :key="error.id"
                  class="flex items-start gap-3 p-2 rounded hover:bg-white"
                >
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center"
                    :class="error.iconBg"
                  >
                    <svg
                      class="w-4 h-4"
                      :class="error.iconColor"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        v-if="error.type === 'factory'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                      <path
                        v-else
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-sm font-medium mb-1">
                      {{ error.title }}
                    </div>
                    <div class="text-xs text-gray-500">{{ error.time }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";

export default {
  name: "Dashboard",
  components: { MainLayout },
  data() {
    return {
      selectedDate: "2025-09-30",
      selectedProject: 1,
      dates: ["2025-09-30", "2025-09-29", "2025-09-28"],
      projects: [
        { id: 1, name: "프로젝트 01" },
        { id: 2, name: "프로젝트 02" },
        { id: 3, name: "프로젝트 03" },
      ],
      kpiData: [
        { id: 1, title: "피쳐 1", value: 7265, trend: 11.01 },
        { id: 2, title: "피쳐 2", value: 3671, trend: -0.03 },
        { id: 3, title: "피쳐 3", value: 256, trend: 15.03 },
        { id: 4, title: "피쳐 4", value: 2318, trend: 6.08 },
      ],
      features: [
        { id: 1, name: "피쳐 1", lineStyle: "bg-slate-900" },
        { id: 2, name: "피쳐 2", lineStyle: "bg-slate-400" },
        { id: 3, name: "피쳐 3", lineStyle: "bg-slate-900" },
        { id: 4, name: "피쳐 4", lineStyle: "bg-slate-400" },
        { id: 5, name: "피쳐 5", lineStyle: "bg-slate-900" },
        { id: 6, name: "피쳐 6", lineStyle: "bg-slate-400" },
      ],
      errorTimeline: [
        {
          id: 1,
          type: "factory",
          title: "피쳐 1 : 오류 발생",
          time: "Just now",
          iconBg: "bg-slate-100",
          iconColor: "text-slate-700",
        },
        {
          id: 2,
          type: "user",
          title: "피쳐 2 : 오류 발생",
          time: "59 minutes ago",
          iconBg: "bg-slate-200",
          iconColor: "text-slate-800",
        },
        {
          id: 3,
          type: "factory",
          title: "피쳐 3 : 오류 발생",
          time: "12 hours ago",
          iconBg: "bg-slate-100",
          iconColor: "text-slate-700",
        },
        {
          id: 4,
          type: "user",
          title: "피쳐 4 : 오류 발생",
          time: "Today, 11:59 AM",
          iconBg: "bg-slate-200",
          iconColor: "text-slate-800",
        },
      ],
    };
  },
};
</script>
