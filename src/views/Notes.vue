<template>
  <MainLayout>
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">녹음</h1>
        </div>

        <div class="space-y-4 mb-24">
          <NoteItem
            v-for="note in notes"
            :key="note.id"
            :note="note"
            @click="handleNoteClick(note)"
          />
        </div>

        <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            @click="handleStartRecording"
            class="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 px-8 py-4 rounded-full shadow-lg flex items-center gap-3 transition-colors"
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
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            <span class="font-medium text-lg">새 녹음 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
import NoteItem from "../components/NoteItem.vue";

export default {
  name: "Notes",
  components: {
    MainLayout,
    NoteItem,
  },
  data() {
    return {
      notes: [
        {
          id: 1,
          title: "녹음 파일 1",
          content:
            "반갑습니다. 자는 위클라 메이트 담당자입니다. 궁금한 내용이 있으면 편하게 물어봐 주세요.",
          category: "전체 노트",
          date: "2025.09.23 화 오전 12:00",
          duration: "3분",
        },
        {
          id: 2,
          title: "녹음 파일 2",
          content:
            "반갑습니다. 자는 위클라 메이트 담당자입니다. 궁금한 내용이 있으면 편하게 물어봐 주세요.",
          category: "전체 노트",
          date: "2025.09.23 화 오전 12:00",
          duration: "3분",
        },
        {
          id: 3,
          title: "녹음 파일 3",
          content:
            "반갑습니다. 자는 위클라 메이트 담당자입니다. 궁금한 내용이 있으면 편하게 물어봐 주세요.",
          category: "전체 노트",
          date: "2025.09.23 화 오전 12:00",
          duration: "3분",
        },
      ],
    };
  },
  methods: {
    handleNoteClick(note) {
      // 완료된 녹음 파일 -> NoteDone 페이지로 이동
      localStorage.setItem("currentNote", JSON.stringify(note));
      this.$router.push("/note-done");
    },
    handleStartRecording() {
      // 새 녹음 시작 -> RecordingNote 페이지로 이동
      localStorage.removeItem("currentNote");
      this.$router.push("/recording-note");
    },
  },
};
</script>
