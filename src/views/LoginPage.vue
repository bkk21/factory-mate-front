<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md px-6">
      <!-- Logo and Title -->
      <div class="flex flex-col items-center mb-12">
        <div class="mb-4">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="#6366F1" />
            <path
              d="M14 24C14 24 18 16 24 16C30 16 34 24 34 24"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M14 24C14 24 18 32 24 32C30 32 34 24 34 24"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <h1 class="text-3xl font-semibold text-gray-900">Facto</h1>
      </div>

      <!-- Login Form -->
      <div class="space-y-4">
        <!-- Email Input -->
        <div>
          <input
            type="text"
            placeholder="이메일"
            v-model="email"
            class="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- Password Input -->
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            v-model="password"
            class="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- Login Button -->
        <button
          @click="handleLogin"
          class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 mt-6"
        >
          로그인
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../api/auth.js";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      // Temporary backdoor for development
      if (this.email === '1111@test.ac.kr' && this.password === '1111') {
        console.log("개발용 임시 로그인 성공");
        const dummyUser = {
          user_id: 1111,
          external_id: 'user-1111-dummy',
          org_id: 1,
          role_global: 'admin',
          created_at: new Date().toISOString(),
          email: '1111@test.com',
          display_name: 'Test User'
        };
        localStorage.setItem("user", JSON.stringify(dummyUser));
        this.$router.push("/projects");
        return;
      }

      if (!this.email.trim()) {
        alert("이메일을 입력해주세요!");
        return;
      }

      if (!this.password.trim()) {
        alert("비밀번호를 입력해주세요!");
        return;
      }

      try {
        console.log("로그인 시도 중...", this.email);
        const userData = await login(this.email, this.password);
        console.log("로그인 성공:", userData);

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect to the projects page
        this.$router.push("/projects");

      } catch (error) {
        console.error("로그인 실패:", error);
        alert(`로그인에 실패했습니다: ${error.message}`);
      }
    },
  },
};
</script>
