<template>
  <MainLayout>
    <div class="p-8 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Loading and Error States -->
        <div v-if="isLoading" class="text-center py-20">
          <p>회의록을 불러오는 중입니다...</p>
        </div>
        <div v-else-if="error" class="text-center py-20 text-red-500">
          <p>오류가 발생했습니다: {{ error }}</p>
        </div>

        <!-- Main Content -->
        <div v-if="report">
          <!-- Header -->
          <div class="mb-8 flex items-center">
            <button @click="$router.push('/notes')" class="text-gray-600 hover:text-gray-900 mr-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ noteTitle }}</h1>
              <div class="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span>{{ noteCategory }}</span>
                <span>{{ formattedDate }}</span>
              </div>
            </div>
          </div>

          <!-- Body Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left Column: Chat -->
            <div class="bg-white rounded-lg shadow-sm p-6 flex flex-col h-[70vh]">
              <h2 class="text-xl font-semibold mb-4">Rino Chat</h2>
              <div class="flex-grow overflow-y-auto mb-4 pr-4 space-y-4">
                <!-- Initial AI Message -->
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707"></path></svg>
                  </div>
                  <div class="bg-gray-100 rounded-lg p-3">
                    <p class="text-sm">리노에게 회의에 관한 내용을 물어보세요.</p>
                  </div>
                </div>
                <!-- Chat Messages -->
                <div v-for="(message, index) in chatMessages" :key="index" class="flex" :class="message.isUser ? 'justify-end' : 'items-start gap-3'">
                   <div v-if="!message.isUser" class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                     <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707"></path></svg>
                   </div>
                   <div class="rounded-lg p-3 max-w-xs" :class="message.isUser ? 'bg-indigo-500 text-white' : 'bg-gray-100'">
                    <p class="text-sm">{{ message.text }}</p>
                  </div>
                </div>
              </div>
              <!-- Chat Input -->
              <div class="relative">
                <input
                  type="text"
                  v-model="userMessage"
                  @keyup.enter="handleSendMessage"
                  placeholder="무엇이든 물어보세요."
                  class="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button @click="handleSendMessage" class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                </button>
              </div>
            </div>

            <!-- Right Column: Summary -->
            <div class="bg-white rounded-lg shadow-sm p-8 overflow-y-auto h-[70vh]">
              <h2 class="text-xl font-semibold mb-6">회의 요약</h2>
              <div class="space-y-6 text-gray-800">
                <div>
                  <h3 class="font-semibold text-lg mb-2">1. 회의 요약</h3>
                  <p class="whitespace-pre-wrap text-sm">{{ report.summary }}</p>
                </div>
                <div v-if="reportDetails.risks_and_concerns">
                  <h3 class="font-semibold text-lg mb-2">2. 주요 논의사항</h3>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li v-for="(item, i) in reportDetails.risks_and_concerns" :key="'risk-'+i">{{ item }}</li>
                  </ul>
                </div>
                <div v-if="reportDetails.decisions">
                  <h3 class="font-semibold text-lg mb-2">3. 결정사항</h3>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li v-for="(item, i) in reportDetails.decisions" :key="'decision-'+i">{{ item }}</li>
                  </ul>
                </div>
                <div v-if="report.action_items && report.action_items.length > 0">
                  <h3 class="font-semibold text-lg mb-2">4. 액션 아이템</h3>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li v-for="item in report.action_items" :key="item.item_id">{{ item.title }} - {{ item.assignee }}</li>
                  </ul>
                </div>
                <div v-if="reportDetails.next_steps">
                  <h3 class="font-semibold text-lg mb-2">5. 향후 일정 및 계획</h3>
                  <ul class="list-disc list-inside space-y-1 text-sm">
                    <li v-for="(item, i) in reportDetails.next_steps" :key="'step-'+i">{{ item }}</li>
                  </ul>
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
import { getMeetingReport, chatWithMeeting } from "../api/meetings.js";

export default {
  name: "NoteDone",
  components: {
    MainLayout,
  },
  data() {
    return {
      report: null,
      isLoading: true,
      error: null,
      noteTitle: '회의록',
      noteCategory: '기본 폴더',
      noteDate: '',
      chatMessages: [],
      userMessage: '',
    };
  },
  computed: {
    reportDetails() {
      if (!this.report || !this.report.details) return {};
      try {
        return JSON.parse(this.report.details);
      } catch (e) {
        console.error("Failed to parse report details:", e);
        return {};
      }
    },
    formattedDate() {
      if (!this.report) return this.noteDate;
      return new Date(this.report.created_at).toLocaleString('ko-KR');
    }
  },
  methods: {
    async handleSendMessage() {
      const messageText = this.userMessage.trim();
      if (!messageText) return;

      this.chatMessages.push({ text: messageText, isUser: true });
      this.userMessage = '';

      // Dummy response for UI check
      setTimeout(() => {
          this.chatMessages.push({ text: `"${messageText}"에 대한 답변입니다.`, isUser: false });
      }, 1000);

      /*
      // NOTE: Real API call is commented out.
      try {
        const meetingId = this.$route.params.id;
        const res = await chatWithMeeting(meetingId, messageText);
        this.chatMessages.push({ text: res.answer, isUser: false });
      } catch (err) {
        this.chatMessages.push({ text: '오류가 발생했습니다: ' + err.message, isUser: false });
      }
      */
    }
  },
  mounted() {
    // Load initial data from localStorage
    const savedNote = localStorage.getItem("currentNote");
    if (savedNote) {
      const note = JSON.parse(savedNote);
      this.noteTitle = note.title;
      this.noteCategory = note.category;
      this.noteDate = note.date;
    }

    // --- Dummy Data Implementation ---
    console.log("Using dummy data for NoteDone.vue");
    const dummyReport = {
        summary: "청년 시기의 중요성에 대한 논의를 중심으로 회의가 진행되었습니다. 자기 주체적인 선택과 부모로부터의 독립이 중요한 시기로 인식되었습니다.",
        details: JSON.stringify({
            risks_and_concerns: [
                "청년 시기의 정의와 중요성에 대한 공통 인식 확립",
                "자기 주체적 선택과 부모로부터의 독립이 주요 요소로 부각",
                "청년 시기에 필요한 지원과 교육 프로그램에 대한 논의"
            ],
            decisions: [
                "청년 시기의 정의를 자기 주체적 선택과 부모로부터의 독립을 중심으로 한다.",
                "청년 시기에 대한 교육 및 지원 프로그램을 개발하여 추후 시행한다."
            ],
            next_steps: [
                "교육 및 지원 프로그램 개발 완료 후 다음 회의에서 보고 예정",
                "청년 시기 중요성 강조하는 캠페인 계획 수립하여 추후 발표 예정"
            ]
        }),
        action_items: [
            { item_id: 1, title: "교육 프로그램 개발", assignee: "A팀 담당" },
            { item_id: 2, title: "지원 프로그램 마련", assignee: "B팀 담당" },
        ],
        created_at: new Date().toISOString(),
    };
    this.report = dummyReport;
    this.isLoading = false;

    this.chatMessages = [
        { text: "회의에서 나온 결정사항들을 정리해줘.", isUser: true },
        { text: "네, 회의의 결정사항은 다음과 같습니다: 1. 청년 시기의 정의를 자기 주체적 선택과 부모로부터의 독립을 중심으로 한다. 2. 청년 시기에 대한 교육 및 지원 프로그램을 개발하여 추후 시행한다.", isUser: false },
    ];
    // --- End of Dummy Data ---

    /*
    // NOTE: Real API call logic is commented out.
    const meetingId = this.$route.params.id;
    if (!meetingId) {
      this.error = "회의 ID를 찾을 수 없습니다.";
      this.isLoading = false;
      return;
    }

    try {
      this.report = await getMeetingReport(meetingId);
    } catch (err) {
      this.error = err.message || "회의록을 불러오는 데 실패했습니다.";
    } finally {
      this.isLoading = false;
    }
    */
  },
};
</script>
