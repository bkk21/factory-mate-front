<template>
  <MainLayout>
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8 flex items-center justify-between">
          <div class="flex items-center gap-4">
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

          <button
            @click="completeRecording"
            class="px-6 py-2 rounded-lg transition-colors"
            :class="
              isRecordingStarted
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            "
          >
            {{ isRecordingStarted ? "녹음 완료하기" : "녹음 시작하기" }}
          </button>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div class="flex items-center justify-between mb-4">
            <div class="text-gray-500 text-sm">00:00</div>
            <div class="text-gray-500 text-sm">05:00</div>
          </div>

          <div class="flex items-center justify-center gap-8 mb-4">
            <button
              @click="changeSpeed"
              class="text-gray-600 hover:text-gray-900 font-medium"
            >
              {{ playbackSpeed }}x
            </button>

            <button @click="rewind" class="text-gray-600 hover:text-gray-900">
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                />
              </svg>
            </button>

            <button
              @click="togglePlay"
              class="w-16 h-16 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
            >
              <svg
                v-if="!isRecordingStarted || !isPlaying"
                class="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg
                v-else
                class="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            </button>

            <button @click="forward" class="text-gray-600 hover:text-gray-900">
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-8">
          <div v-if="isRecordingStarted" class="bg-gray-50 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">총간 요약</h2>
              <button
                @click="addSummary"
                class="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
              >
                중간 요약하기
              </button>
            </div>

            <div class="mb-6 flex items-start gap-2 text-sm text-gray-600">
              <svg
                class="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0"
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
              <span>지금까지의 회의 내용을 요약해 확인해보세요.</span>
            </div>

            <div class="space-y-6">
              <TimelineItem
                v-for="(item, index) in leftTimeline"
                :key="index"
                :item="item"
              />
            </div>
          </div>

          <div v-if="isRecordingStarted" class="bg-gray-50 rounded-lg p-6">
            <div class="space-y-6">
              <TimelineItem
                v-for="(item, index) in rightTimeline"
                :key="index"
                :item="item"
              />
            </div>
          </div>

          <div
            v-if="!isRecordingStarted"
            class="col-span-2 bg-white rounded-lg shadow-sm p-12 text-center"
          >
            <h2 class="text-xl font-semibold text-gray-900 mb-8">
              PDF 업로드하기
            </h2>

            <!-- File Input (Always visible for testing) -->
            <input
              ref="fileInput"
              type="file"
              accept="application/pdf,.pdf"
              @change="onFileChange"
              class="hidden"
            />

            <!-- Upload Area or File Display -->
            <div v-if="!uploadedFileName">
              <button
                @click="clickFileInput"
                class="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-gray-400 transition-colors cursor-pointer w-full"
              >
                <div class="flex flex-col items-center">
                  <div
                    class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
                  >
                    <svg
                      class="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p class="text-gray-500">PDF 파일을 클릭하여 업로드</p>
                </div>
              </button>
            </div>

            <!-- Uploaded File Display -->
            <div v-else class="border-2 border-gray-300 rounded-lg p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="text-left">
                    <p class="font-medium text-gray-900">
                      {{ uploadedFileName }}
                    </p>
                    <p class="text-sm text-gray-500">{{ uploadedFileSize }}</p>
                  </div>
                </div>
                <button
                  @click="removeFile"
                  class="text-gray-400 hover:text-red-600 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
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
import TimelineItem from "../components/TimelineItem.vue";

export default {
  name: "RecordingNote",
  components: {
    MainLayout,
    TimelineItem,
  },
  data() {
    return {
      isPlaying: false,
      isRecordingStarted: false,
      playbackSpeed: 1,
      noteTitle: "새 녹음",
      noteCategory: "기본 폴더",
      noteDate: "",
      noteDuration: "",
      summaryCounter: 1,
      uploadedFileName: "",
      uploadedFileSize: "",
      leftTimeline: [
        {
          time: "01:00",
          title: "메모 작성 방법",
          points: [
            "PC에서 클로바노트 웹사이트 접속",
            "녹음 중인 노트나 생성된 노트에 메모 추가",
          ],
        },
      ],
      rightTimeline: [
        {
          time: "03:00",
          title: "메모 작성 방법",
          points: [
            "PC에서 클로바노트 웹사이트 접속",
            "녹음 중인 노트나 생성된 노트에 메모 추가",
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
      this.isRecordingStarted = true;
    }
  },
  methods: {
    clickFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
          this.uploadedFileName = file.name;
          this.uploadedFileSize = this.formatFileSize(file.size);
          alert("PDF 업로드 성공: " + file.name);
        } else {
          alert("PDF 파일만 업로드 가능합니다.");
          event.target.value = "";
        }
      }
    },
    removeFile() {
      this.uploadedFileName = "";
      this.uploadedFileSize = "";
      this.$refs.fileInput.value = "";
    },
    formatFileSize(bytes) {
      if (bytes < 1024) return bytes + " B";
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    },
    completeRecording() {
      if (this.isRecordingStarted) {
        this.$router.push("/note-done");
      } else {
        this.isRecordingStarted = true;
        this.isPlaying = true;
      }
    },
    addSummary() {
      const newTime = `0${this.summaryCounter + 1}:00`;
      const newItem = {
        time: newTime,
        title: "중간 요약 " + (this.summaryCounter + 1),
        points: ["회의 주요 내용 요약", "결정된 사항 정리", "다음 단계 계획"],
      };

      this.leftTimeline.push(newItem);
      this.rightTimeline.push({
        ...newItem,
        time: `0${this.summaryCounter + 3}:00`,
      });

      this.summaryCounter++;
    },
    togglePlay() {
      if (this.isRecordingStarted) {
        this.isPlaying = !this.isPlaying;
      }
    },
    changeSpeed() {
      const speeds = [1, 1.5, 2, 0.5];
      const currentIndex = speeds.indexOf(this.playbackSpeed);
      this.playbackSpeed = speeds[(currentIndex + 1) % speeds.length];
    },
    rewind() {
      console.log("5초 뒤로");
    },
    forward() {
      console.log("5초 앞으로");
    },
  },
};
</script>
