<template>
  <MainLayout>
    <div class="p-8">
      <div class="max-w-[1400px] mx-auto">
        <div class="mb-8 flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">DashBoard</h1>
          <div class="flex gap-4">
            <select v-model="selectedProject" class="px-4 py-2 border rounded-lg bg-white">
              <option v-if="isLoading" :value="null">Loading...</option>
              <option v-for="project in projects" :key="project.project_id" :value="project.project_id">
                {{ project.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex gap-8">
          <div class="flex-1">
            <div class="grid grid-cols-4 gap-4 mb-8">
              <div v-for="kpi in kpiData" :key="kpi.id" class="bg-white rounded-lg p-6 shadow-sm border">
                <div class="text-sm text-gray-600 mb-2">{{ kpi.title }}</div>
                <div class="flex items-end justify-between">
                  <div class="text-3xl font-bold">{{ kpi.value.toLocaleString() }}</div>
                  <div class="flex items-center gap-1 text-sm" :class="kpi.trend > 0 ? 'text-green-600' : 'text-red-600'">
                    <svg v-if="kpi.trend > 0" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <span>{{ kpi.trend > 0 ? "+" : "" }}{{ kpi.trend }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6 border">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-semibold">중요 지표: {{ selectedFeatureName }}</h2>
              </div>
              <div class="flex gap-6">
                <div class="w-56">
                  <div class="text-sm font-medium text-gray-500 mb-4">피쳐이름</div>
                  <div v-for="feature in features" :key="feature.id" @click="selectFeature(feature.id)"
                       class="flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer transition-colors"
                       :class="selectedFeature === feature.id ? 'bg-indigo-100' : 'hover:bg-gray-100'">
                    <div class="w-2 h-2 rounded-full" :class="selectedFeature === feature.id ? 'bg-indigo-500' : 'bg-gray-400'"></div>
                    <span class="text-sm font-medium" :class="selectedFeature === feature.id ? 'text-indigo-700' : 'text-gray-600'">{{ feature.name }}</span>
                  </div>
                </div>
                <div class="flex-1 h-80">
                  <Line v-if="!isLoading" :data="currentChartData" :options="chartOptions" />
                </div>
              </div>
            </div>
          </div>

          <div class="w-80">
            <div class="bg-slate-50 rounded-lg p-4 border">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold">오류 내역</h3>
                <button class="p-1 hover:bg-slate-200 rounded"><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></button>
              </div>
              <div class="text-sm text-gray-500 mb-4">전체기간</div>
              <div class="space-y-3 max-h-[650px] overflow-y-auto">
                <div v-for="error in errorTimeline" :key="error.id" class="flex items-start gap-3 p-2 rounded hover:bg-white">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="error.iconBg">
                    <svg class="w-4 h-4" :class="error.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="error.type === 'factory'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-sm font-medium mb-1">{{ error.title }}</div>
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const hardcodedData = {
    "Acoustic_Signals": {"success": true, "feature_name": "Acoustic_Signals", "data": [{"datetime": "2025-09-23T00:00:00", "original_value": 42.709897154040725, "ma_value": null}, {"datetime": "2025-09-23T01:00:00", "original_value": 56.14653498530183, "ma_value": null}, {"datetime": "2025-09-23T02:00:00", "original_value": 80.48797940873995, "ma_value": null}, {"datetime": "2025-09-23T03:00:00", "original_value": 63.602072121720816, "ma_value": null}, {"datetime": "2025-09-23T04:00:00", "original_value": 47.57415024787894, "ma_value": null}, {"datetime": "2025-09-23T05:00:00", "original_value": 24.84077989915309, "ma_value": null}, {"datetime": "2025-09-23T06:00:00", "original_value": 25.23624368841735, "ma_value": null}, {"datetime": "2025-09-23T07:00:00", "original_value": 33.2956765741033, "ma_value": null}, {"datetime": "2025-09-23T08:00:00", "original_value": 65.24963213433126, "ma_value": null}, {"datetime": "2025-09-23T09:00:00", "original_value": 43.75838421088194, "ma_value": null}, {"datetime": "2025-09-23T10:00:00", "original_value": 55.81106028938845, "ma_value": 48.290135}, {"datetime": "2025-09-23T11:00:00", "original_value": 30.868010066868973, "ma_value": 49.600251}, {"datetime": "2025-09-23T12:00:00", "original_value": 61.388703607017, "ma_value": 47.072399}, {"datetime": "2025-09-23T13:00:00", "original_value": 55.24261098100757, "ma_value": 45.162471}, {"datetime": "2025-09-23T14:00:00", "original_value": 53.22415276833017, "ma_value": 44.326525}, {"datetime": "2025-09-23T15:00:00", "original_value": 71.2290357901047, "ma_value": 44.891525}, {"datetime": "2025-09-23T16:00:00", "original_value": 48.768381573306826, "ma_value": 49.530351}, {"datetime": "2025-09-23T17:00:00", "original_value": 48.64396056300546, "ma_value": 51.883565}, {"datetime": "2025-09-23T18:00:00", "original_value": 57.28042457437928, "ma_value": 53.418393}, {"datetime": "2025-09-23T19:00:00", "original_value": 70.28115939677151, "ma_value": 52.621472}]},
    "Actual_vs_Setpoint_Values": {"success": true, "feature_name": "Actual_vs_Setpoint_Values", "data": [{"datetime": "2025-09-23T00:00:00", "original_value": 53.63333393973709, "ma_value": null}, {"datetime": "2025-09-23T01:00:00", "original_value": 56.2923623080896, "ma_value": null}, {"datetime": "2025-09-23T02:00:00", "original_value": 44.10320855332797, "ma_value": null}, {"datetime": "2025-09-23T03:00:00", "original_value": 51.05723450971754, "ma_value": null}, {"datetime": "2025-09-23T04:00:00", "original_value": 55.86506028916152, "ma_value": null}, {"datetime": "2025-09-23T05:00:00", "original_value": 48.94874507740185, "ma_value": null}, {"datetime": "2025-09-23T06:00:00", "original_value": 52.62351195882509, "ma_value": null}, {"datetime": "2025-09-23T07:00:00", "original_value": 42.45330013951865, "ma_value": null}, {"datetime": "2025-09-23T08:00:00", "original_value": 47.28438044485302, "ma_value": null}, {"datetime": "2025-09-23T09:00:00", "original_value": 45.29301201762439, "ma_value": null}, {"datetime": "2025-09-23T10:00:00", "original_value": 52.7822873612668, "ma_value": 49.755415}, {"datetime": "2025-09-23T11:00:00", "original_value": 57.91363971567591, "ma_value": 49.67031}, {"datetime": "2025-09-23T12:00:00", "original_value": 44.05753908381628, "ma_value": 49.832438}, {"datetime": "2025-09-23T13:00:00", "original_value": 56.20815190718769, "ma_value": 49.827871}, {"datetime": "2025-09-23T14:00:00", "original_value": 42.92075981800017, "ma_value": 50.342963}, {"datetime": "2025-09-23T15:00:00", "original_value": 36.12940000377777, "ma_value": 49.048533}, {"datetime": "2025-09-23T16:00:00", "original_value": 51.23831929524403, "ma_value": 47.766598}, {"datetime": "2025-09-23T17:00:00", "original_value": 43.7958380892473, "ma_value": 47.628079}, {"datetime": "2025-09-23T18:00:00", "original_value": 50.76789529263825, "ma_value": 47.762333}, {"datetime": "2025-09-23T19:00:00", "original_value": 46.41459414605572, "ma_value": 48.110684}]},
    "Air_Quality_Index": {"success": true, "feature_name": "Air_Quality_Index", "data": [{"datetime": "2025-09-23T00:00:00", "original_value": 12.110422438901688, "ma_value": null}, {"datetime": "2025-09-23T01:00:00", "original_value": 16.954551370588078, "ma_value": null}, {"datetime": "2025-09-23T02:00:00", "original_value": 14.837031408870976, "ma_value": null}, {"datetime": "2025-09-23T03:00:00", "original_value": 10.80610839289074, "ma_value": null}, {"datetime": "2025-09-23T04:00:00", "original_value": 12.260188520886324, "ma_value": null}, {"datetime": "2025-09-23T05:00:00", "original_value": 79.56044435781877, "ma_value": null}, {"datetime": "2025-09-23T06:00:00", "original_value": 55.85391248434699, "ma_value": null}, {"datetime": "2025-09-23T07:00:00", "original_value": 16.70544008562372, "ma_value": null}, {"datetime": "2025-09-23T08:00:00", "original_value": 9.818805944036596, "ma_value": null}, {"datetime": "2025-09-23T09:00:00", "original_value": 4.378715028934739, "ma_value": null}, {"datetime": "2025-09-23T10:00:00", "original_value": 46.95661315615729, "ma_value": 23.328562}, {"datetime": "2025-09-23T11:00:00", "original_value": 18.200085737077394, "ma_value": 26.813181}, {"datetime": "2025-09-23T12:00:00", "original_value": 120.2076224161264, "ma_value": 26.937735}, {"datetime": "2025-09-23T13:00:00", "original_value": 81.53739025240077, "ma_value": 37.474794}, {"datetime": "2025-09-23T14:00:00", "original_value": 26.849609491417155, "ma_value": 44.547922}, {"datetime": "2025-09-23T15:00:00", "original_value": 59.75554395154885, "ma_value": 46.006864}, {"datetime": "2025-09-23T16:00:00", "original_value": 36.44292916346887, "ma_value": 44.026374}, {"datetime": "2025-09-23T17:00:00", "original_value": 38.8073234695627, "ma_value": 42.085276}, {"datetime": "2025-09-23T18:00:00", "original_value": 35.840836025312775, "ma_value": 44.295464}, {"datetime": "2025-09-23T19:00:00", "original_value": 101.4618773467055, "ma_value": 46.897667}]},
    "Energy_Consumption": {"success": true, "feature_name": "Energy_Consumption", "data": [{"datetime": "2025-09-23T00:00:00", "original_value": 1.994422231109727, "ma_value": null}, {"datetime": "2025-09-23T01:00:00", "original_value": 7.086932963797126, "ma_value": null}, {"datetime": "2025-09-23T02:00:00", "original_value": 8.1559450518437, "ma_value": null}, {"datetime": "2025-09-23T03:00:00", "original_value": 0.9749474472915548, "ma_value": null}, {"datetime": "2025-09-23T04:00:00", "original_value": 1.4012104632377045, "ma_value": null}, {"datetime": "2025-09-23T05:00:00", "original_value": 4.213988678626195, "ma_value": null}, {"datetime": "2025-09-23T06:00:00", "original_value": 3.825750666326429, "ma_value": null}, {"datetime": "2025-09-23T07:00:00", "original_value": 30.09474902527128, "ma_value": null}, {"datetime": "2025-09-23T08:00:00", "original_value": 6.805151120151152, "ma_value": null}, {"datetime": "2025-09-23T09:00:00", "original_value": 9.607207087521276, "ma_value": null}, {"datetime": "2025-09-23T10:00:00", "original_value": 34.46363980270608, "ma_value": 7.41603}, {"datetime": "2025-09-23T11:00:00", "original_value": 19.481551975784893, "ma_value": 10.662952}, {"datetime": "2025-09-23T12:00:00", "original_value": 3.24316710621399, "ma_value": 11.902414}, {"datetime": "2025-09-23T13:00:00", "original_value": 4.109644145073478, "ma_value": 11.411136}, {"datetime": "2025-09-23T14:00:00", "original_value": 3.056812661558048, "ma_value": 11.724606}, {"datetime": "2025-09-23T15:00:00", "original_value": 19.08499489357572, "ma_value": 11.890166}, {"datetime": "2025-09-23T16:00:00", "original_value": 11.941765280410175, "ma_value": 13.377267}, {"datetime": "2025-09-23T17:00:00", "original_value": 5.316721779495309, "ma_value": 14.188868}, {"datetime": "2025-09-23T18:00:00", "original_value": 3.493992340528282, "ma_value": 11.711066}, {"datetime": "2025-09-23T19:00:00", "original_value": 10.899728229785564, "ma_value": 11.37995}]},
    "Torque_Data": {"success": true, "feature_name": "Torque_Data", "data": [{"datetime": "2025-09-23T00:00:00", "original_value": 3.67724296239074, "ma_value": null}, {"datetime": "2025-09-23T01:00:00", "original_value": 1.0572763826287763, "ma_value": null}, {"datetime": "2025-09-23T02:00:00", "original_value": 0.8810627293237756, "ma_value": null}, {"datetime": "2025-09-23T03:00:00", "original_value": 1.3725670052335903, "ma_value": null}, {"datetime": "2025-09-23T04:00:00", "original_value": 0.4378238473903473, "ma_value": null}, {"datetime": "2025-09-23T05:00:00", "original_value": 1.6213237824598534, "ma_value": null}, {"datetime": "2025-09-23T06:00:00", "original_value": 1.2613844252736128, "ma_value": null}, {"datetime": "2025-09-23T07:00:00", "original_value": 4.018119203959803, "ma_value": null}, {"datetime": "2025-09-23T08:00:00", "original_value": 0.8583306408647748, "ma_value": null}, {"datetime": "2025-09-23T09:00:00", "original_value": 6.862827144739817, "ma_value": null}, {"datetime": "2025-09-23T10:00:00", "original_value": 1.1258917714443948, "ma_value": 2.204796}, {"datetime": "2025-09-23T11:00:00", "original_value": 4.124906427132698, "ma_value": 1.949661}, {"datetime": "2025-09-23T12:00:00", "original_value": 3.8368603078917793, "ma_value": 2.256424}, {"datetime": "2025-09-23T13:00:00", "original_value": 0.2998350322723141, "ma_value": 2.552003}, {"datetime": "2025-09-23T14:00:00", "original_value": 0.1376612279827331, "ma_value": 2.44473}, {"datetime": "2025-09-23T15:00:00", "original_value": 2.973528845499504, "ma_value": 2.414714}, {"datetime": "2025-09-23T16:00:00", "original_value": 3.026441558833037, "ma_value": 2.549935}, {"datetime": "2025-09-23T17:00:00", "original_value": 5.150457744366703, "ma_value": 2.72644}, {"datetime": "2025-09-23T18:00:00", "original_value": 4.057168383284761, "ma_value": 2.839674}, {"datetime": "2025-09-23T19:00:00", "original_value": 2.108059148678292, "ma_value": 3.159558}]},
    "Vibration_Level": {"success": true, "feature_name": "Vibration_Level", "data": [{"datetime": "2025-09-23T00:00:00", "original_value": 0.3361286323188019, "ma_value": null}, {"datetime": "2025-09-23T01:00:00", "original_value": 0.4416800520333024, "ma_value": null}, {"datetime": "2025-09-23T02:00:00", "original_value": 0.3490801074414479, "ma_value": null}, {"datetime": "2025-09-23T03:00:00", "original_value": 0.5071084058741137, "ma_value": null}, {"datetime": "2025-09-23T04:00:00", "original_value": 1.4022467081927728, "ma_value": null}, {"datetime": "2025-09-23T05:00:00", "original_value": 0.0406649210580611, "ma_value": null}, {"datetime": "2025-09-23T06:00:00", "original_value": 0.4454684683052489, "ma_value": null}, {"datetime": "2025-09-23T07:00:00", "original_value": 0.0187098262496654, "ma_value": null}, {"datetime": "2025-09-23T08:00:00", "original_value": 1.905904658983668, "ma_value": null}, {"datetime": "2025-09-23T09:00:00", "original_value": 0.7805003980590659, "ma_value": null}, {"datetime": "2025-09-23T10:00:00", "original_value": 0.07796183247516, "ma_value": 0.622749}, {"datetime": "2025-09-23T11:00:00", "original_value": 2.011206895974655, "ma_value": 0.596933}, {"datetime": "2025-09-23T12:00:00", "original_value": 0.4042667988124749, "ma_value": 0.753885}, {"datetime": "2025-09-23T13:00:00", "original_value": 0.516304628082427, "ma_value": 0.759404}, {"datetime": "2025-09-23T14:00:00", "original_value": 0.3740580463773685, "ma_value": 0.760324}, {"datetime": "2025-09-23T15:00:00", "original_value": 0.0604493066698493, "ma_value": 0.657505}, {"datetime": "2025-09-23T16:00:00", "original_value": 0.7048171164844109, "ma_value": 0.659483}, {"datetime": "2025-09-23T17:00:00", "original_value": 0.7955539343492798, "ma_value": 0.685418}, {"datetime": "2025-09-23T18:00:00", "original_value": 0.1893295700921552, "ma_value": 0.763102}, {"datetime": "2025-09-23T19:00:00", "original_value": 0.3893841486133833, "ma_value": 0.591445}]},
};

export default {
  name: "Dashboard",
  components: { MainLayout, Line },
  data() {
    return {
      selectedProject: null,
      projects: [],
      isLoading: true,
      error: null,
      kpiData: [
        { id: 1, title: "Energy Consumption", value: 7265, trend: 11.01 },
        { id: 2, title: "Vibration Level", value: 3671, trend: -0.03 },
        { id: 3, title: "Air Quality", value: 256, trend: 15.03 },
        { id: 4, title: "Torque", value: 2318, trend: 6.08 },
      ],
      features: [],
      errorTimeline: [
          {id: 1, title: "오류 감지: 진동 레벨 급상승", time: "3시간 전", type: "factory", iconBg: "bg-red-100", iconColor: "text-red-600"},
          {id: 2, title: "오류 감지: 에너지 소비량 급증", time: "5시간 전", type: "factory", iconBg: "bg-red-100", iconColor: "text-red-600"},
          {id: 3, title: "점검 필요: 토크 데이터 이상", time: "1일 전", type: "factory", iconBg: "bg-yellow-100", iconColor: "text-yellow-600"},
      ],
      selectedFeature: null,
      allChartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 0,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: 10, 
            }
          }
        }
      },
    };
  },
  computed: {
    currentChartData() {
      if (this.selectedFeature && this.allChartData[this.selectedFeature]) {
        return this.allChartData[this.selectedFeature];
      }
      return { labels: [], datasets: [] };
    },
    selectedFeatureName() {
        const feature = this.features.find(f => f.id === this.selectedFeature);
        return feature ? feature.name : '';
    }
  },
  mounted() {
    this.loadInitialProject();
    this.fetchProjects();
    this.processChartDataFiles();
  },
  methods: {
    loadInitialProject() {
        const savedProject = localStorage.getItem("selectedProject");
        if (savedProject) {
            try {
                const project = JSON.parse(savedProject);
                this.selectedProject = project.project_id;
            } catch (e) {
                console.error("Failed to parse selected project from localStorage", e);
                localStorage.removeItem("selectedProject");
            }
        }
    },
    fetchProjects() {
      this.isLoading = true;
      setTimeout(() => {
        this.projects = [
          { project_id: 1, name: "프로젝트 01" },
          { project_id: 2, name: "프로젝트 02" },
          { project_id: 3, name: "프로젝트 03" },
        ];
        if (!this.selectedProject && this.projects.length > 0) {
            this.selectedProject = this.projects[0].project_id;
        }
        this.isLoading = false;
      }, 500);
    },
    processChartDataFiles() {
        const allData = {};
        
        const featureOrder = [
            "Energy_Consumption",
            "Actual_vs_Setpoint_Values",
            "Vibration_Level",
            "Torque_Data",
            "Air_Quality_Index",
            "Acoustic_Signals"
        ];

        const featureList = featureOrder.map(id => ({
            id,
            name: id.replace(/_/g, ' ')
        }));

        for (const featureId in hardcodedData) {
            try {
                const rawData = hardcodedData[featureId];
                
                const labels = rawData.data.map(item => {
                    const d = new Date(item.datetime);
                    return `${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:00`;
                });
                const originalValues = rawData.data.map(item => item.original_value);
                const maValues = rawData.data.map(item => item.ma_value);

                allData[featureId] = {
                    labels,
                    datasets: [
                        {
                            label: 'Original Value',
                            borderColor: '#3b82f6',
                            backgroundColor: '#3b82f6',
                            borderWidth: 2,
                            pointRadius: 1,
                            tension: 0.3,
                            data: originalValues,
                        },
                        {
                            label: 'Moving Average',
                            borderColor: '#ef4444',
                            backgroundColor: '#ef4444',
                            borderWidth: 2,
                            pointRadius: 1,
                            tension: 0.3,
                            data: maValues,
                        }
                    ]
                };
            } catch (e) {
                console.error(`Failed to parse data for ${featureId}`, e);
            }
        }

        this.features = featureList;
        this.allChartData = allData;
        if (this.features.length > 0) {
            this.selectedFeature = this.features[0].id;
        }
    },
    selectFeature(featureId) {
        this.selectedFeature = featureId;
    }
  },
};
</script>