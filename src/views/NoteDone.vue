<template>
  <MainLayout>
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <!-- Back Button -->
            <button
              @click="$router.push('/notes')"
              class="text-gray-600 hover:text-gray-900"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <!-- Title -->
            <div>
              <div class="flex items-center gap-2">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <h1 class="text-2xl font-bold text-gray-900">
                  {{ noteTitle }}
                </h1>
              </div>
              <div class="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span>{{ noteCategory }}</span>
                <span v-if="noteDate">{{ noteDate }}</span>
                <span v-if="noteDuration">{{ noteDuration }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Area: Chat & Summary -->
        <div class="grid grid-cols-2 gap-8">
          <!-- Left: Chat Interface -->
          <div
            class="bg-white rounded-lg shadow-sm flex flex-col"
            style="height: calc(100vh - 200px)"
          >
            <!-- Chat Header -->
            <div class="p-4 border-b flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">회의록 Chat</h2>
              <button class="text-gray-400 hover:text-gray-600">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <!-- Chat Messages -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
              <!-- AI Message -->
              <div
                v-for="message in messages"
                :key="message.id"
                class="flex gap-3"
                :class="message.isUser ? 'justify-end' : 'justify-start'"
              >
                <!-- Avatar (AI only) -->
                <div v-if="!message.isUser" class="flex-shrink-0">
                  <div
                    class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center"
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
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Message Content -->
                <div
                  class="max-w-[70%] rounded-lg p-4"
                  :class="
                    message.isUser
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  "
                >
                  <p class="text-sm">{{ message.text }}</p>
                </div>
              </div>
            </div>

            <!-- Chat Input -->
            <div class="p-4 border-t">
              <div class="flex gap-2">
                <input
                  v-model="newMessage"
                  @keyup.enter="sendMessage"
                  type="text"
                  placeholder="무엇이든 물어보세요."
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  @click="sendMessage"
                  class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Right: Summary Content -->
          <div
            class="bg-white rounded-lg shadow-sm p-6 overflow-y-auto"
            style="height: calc(100vh - 200px)"
          >
            <h2 class="text-xl font-semibold text-gray-900 mb-6">회의 요약</h2>

            <!-- Summary Sections -->
            <div class="space-y-6">
              <div v-for="(section, index) in summarySections" :key="index">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                  {{ index + 1 }}. {{ section.title }}
                </h3>
                <ul class="space-y-2 ml-4">
                  <li
                    v-for="(item, idx) in section.items"
                    :key="idx"
                    class="text-sm text-gray-700"
                  >
                    • {{ item }}
                  </li>
                </ul>
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
  name: "NoteDone",
  components: {
    MainLayout,
  },
  data() {
    return {
      noteTitle: "녹음 파일 1",
      noteCategory: "기본 폴더",
      noteDate: "2025.09.23 화 오전 12:00",
      noteDuration: "3분",
      newMessage: "",
      messages: [
        {
          id: 1,
          text: "AI에게 회의에 관한 내용을 물어보세요.",
          isUser: false,
        },
        {
          id: 2,
          text: "회의에서 나온 결정사항들을 정리해줘.",
          isUser: true,
        },
        {
          id: 3,
          text: "추후 일정과 계획에 대해 알려줘.",
          isUser: true,
        },
      ],
      summarySections: [
        {
          title: "회의 요약",
          items: [
            "회의는 정년 시기의 중요성에 대한 논의로 진행되었습니다.",
            "정년 시기는 자기 주체적인 선택과 부모로부터의 독립이 중요한 시기로 인식되었습니다.",
          ],
        },
        {
          title: "주요 논의사항",
          items: [
            "정년 시기의 정의와 중요성에 대한 공통 의식 확립",
            "자기 주체적 선택과 부모로부터의 독립이 주요 요소로 부각",
            "정년 시기에 필요한 지원과 교육 프로그램에 대한 논의",
          ],
        },
        {
          title: "결정사항",
          items: [
            "정년 시기의 정의를 자기 주체적 선택과 부모로부터의 독립을 중심으로 한다.",
            "정년 시기에 대한 교육 및 지원 프로그램을 개발하여 추후 시행한다.",
          ],
        },
        {
          title: "액션 아이템",
          items: [
            "교육 프로그램 개발: A 팀 담당",
            "지원 프로그램 마련: B 팀 담당",
          ],
        },
        {
          title: "향후 일정 및 계획",
          items: [
            "교육 및 지원 프로그램 개발 완료 후 다음 회의에서 보고 예정",
            "정년 시기에 대한 중요성을 강조하는 캠페인 계획 수립하여 추후 발표 예정",
          ],
        },
      ],
    };
  },
  mounted() {
    const savedNote = localStorage.getItem("currentNote");
    if (savedNote) {
      const note = JSON.parse(savedNote);
      this.noteTitle = note.title;
      this.noteCategory = note.category;
      this.noteDate = note.date;
      this.noteDuration = note.duration;
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        this.messages.push({
          id: Date.now(),
          text: this.newMessage,
          isUser: true,
        });

        setTimeout(() => {
          this.messages.push({
            id: Date.now() + 1,
            text: "해당 내용에 대해 회의록을 검토하여 답변드리겠습니다.",
            isUser: false,
          });
        }, 500);

        this.newMessage = "";
      }
    },
  },
};
</script>
