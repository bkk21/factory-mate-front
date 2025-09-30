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
import { createRecording } from "../api/meetings.js";

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
          external_id: "meeting-001-completed",
          title: "녹음 파일 1 (완료)",
          content:
            "완료된 회의록입니다. 요약 및 액션 아이템을 확인하세요.",
          category: "전체 노트",
          date: "2025.09.23 화 오전 11:00",
          duration: "30분",
          status: "completed",
        },
        {
          id: 2,
          external_id: "meeting-002-in-progress",
          title: "녹음 파일 2 (진행중)",
          content:
            "현재 녹음이 진행중인 회의입니다. 중간 요약을 확인하세요.",
          category: "전체 노트",
          date: "2025.09.24 수 오후 2:00",
          duration: "15분",
          status: "recording",
        },
        {
          id: 3,
          external_id: "meeting-003-completed",
          title: "녹음 파일 3 (완료)",
          content:
            "완료된 회의록입니다. 요약 및 액션 아이템을 확인하세요.",
          category: "전체 노트",
          date: "2025.09.25 목 오전 10:00",
          duration: "1시간 5분",
          status: "completed",
        },
      ],
    };
  },
  methods: {
    handleNoteClick(note) {
      localStorage.setItem("currentNote", JSON.stringify(note));
      if (note.status === 'completed') {
        this.$router.push(`/note-done/${note.external_id}`);
      }
      else {
        this.$router.push("/recording-note");
      }
    },
    async handleStartRecording() {
      /* 
      // NOTE: The following is the correct implementation for production.
      // It is temporarily commented out to allow frontend development without a running backend.
      try {
        // TODO: Replace with actual project ID and user ID from auth context
        const projectExternalId = 'proj-123'; 
        const creatorId = 1;
        const newTitle = `새 녹음 - ${new Date().toLocaleString('ko-KR')}`;

        const newRecordingData = {
          title: newTitle,
          creator_id: creatorId,
        };

        console.log("새 녹음 생성 중...");
        const newRecording = await createRecording(projectExternalId, newRecordingData);
        console.log("새 녹음 생성 완료:", newRecording);

        const note = {
          id: newRecording.meeting_id, // The object is still a 'meeting' from the backend
          external_id: newRecording.external_id,
          title: newRecording.title,
          category: "기본 폴더", // Or from project data
          date: new Date(newRecording.created_at).toLocaleString('ko-KR'),
          duration: "진행 중",
          status: "recording",
        };

        localStorage.setItem("currentNote", JSON.stringify(note));
        this.$router.push("/recording-note");

      } catch (error) {
        console.error("녹음 생성 실패:", error);
        alert(`새 녹음 생성에 실패했습니다: ${error.message}`);
      }
      */

      // Temporary implementation for frontend development:
      console.log("새 녹음 시작 (임시 데이터 사용)");
      const tempNote = {
        id: Date.now(),
        external_id: `temp-recording-${Date.now()}`,
        title: `새 녹음 - ${new Date().toLocaleString('ko-KR')}`,
        category: "기본 폴더",
        date: new Date().toLocaleString('ko-KR'),
        duration: "진행 중",
        status: "recording",
      };
      localStorage.setItem("currentNote", JSON.stringify(tempNote));
      this.$router.push("/recording-note");
    },
  },
};
</script>
