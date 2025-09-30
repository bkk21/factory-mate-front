<template>
  <MainLayout>
    <div class="p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8 flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">Calendar</h1>
          <button class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
            새 일정 추가
          </button>
        </div>

        <!-- Calendar Navigation -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between mb-6">
            <button @click="previousMonth" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <h2 class="text-xl font-semibold text-gray-900">
              {{ currentYear }}년 {{ currentMonth }}월
            </h2>
            
            <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-2">
            <!-- Day Headers -->
            <div v-for="day in weekDays" :key="day" class="text-center py-2 text-sm font-semibold text-gray-600">
              {{ day }}
            </div>

            <!-- Calendar Days -->
            <div 
              v-for="(day, index) in calendarDays" 
              :key="index"
              class="aspect-square border border-gray-200 rounded-lg p-2 cursor-pointer hover:bg-gray-50 transition-colors"
              :class="{
                'bg-gray-50': !day.isCurrentMonth,
                'bg-indigo-50 border-indigo-300': day.isToday,
                'border-indigo-500': day.hasEvent
              }"
              @click="selectDay(day)"
            >
              <div class="text-right">
                <span 
                  class="text-sm"
                  :class="{
                    'text-gray-400': !day.isCurrentMonth,
                    'text-indigo-600 font-bold': day.isToday,
                    'text-gray-900': day.isCurrentMonth && !day.isToday
                  }"
                >
                  {{ day.date }}
                </span>
              </div>
              
              <!-- Event Indicators -->
              <div v-if="day.events.length > 0" class="mt-1 space-y-1">
                <div 
                  v-for="event in day.events.slice(0, 2)" 
                  :key="event.id"
                  class="text-xs px-2 py-1 rounded truncate"
                  :class="event.color"
                >
                  {{ event.time }} {{ event.title }}
                </div>
                <div v-if="day.events.length > 2" class="text-xs text-gray-500 px-2">
                  +{{ day.events.length - 2 }}개 더보기
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Schedule -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">오늘의 일정</h3>
          
          <div v-if="todayEvents.length > 0" class="space-y-3">
            <div 
              v-for="event in todayEvents" 
              :key="event.id"
              class="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div class="flex-shrink-0 text-center">
                <div class="text-sm font-semibold text-gray-900">{{ event.time }}</div>
                <div class="text-xs text-gray-500">{{ event.duration }}</div>
              </div>
              
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900 mb-1">{{ event.title }}</h4>
                <p class="text-sm text-gray-600 mb-2">{{ event.description }}</p>
                <div class="flex items-center gap-2 text-xs text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <span>{{ event.participants.join(', ') }}</span>
                </div>
              </div>
              
              <div>
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full" :class="event.statusColor">
                  {{ event.status }}
                </span>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-12 text-gray-500">
            오늘 예정된 회의가 없습니다.
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue'

export default {
  name: 'Calendar',
  components: {
    MainLayout
  },
  data() {
    return {
      currentYear: 2025,
      currentMonth: 9,
      weekDays: ['일', '월', '화', '수', '목', '금', '토'],
      events: [
        {
          id: 1,
          date: '2025-09-23',
          time: '10:00',
          duration: '1시간',
          title: '주간 팀 회의',
          description: '이번 주 진행 상황 공유 및 다음 주 계획',
          participants: ['김철수', '이영희', '박민수'],
          status: '예정',
          statusColor: 'bg-blue-100 text-blue-700',
          color: 'bg-blue-100 text-blue-700'
        },
        {
          id: 2,
          date: '2025-09-23',
          time: '14:00',
          duration: '30분',
          title: '클라이언트 미팅',
          description: '프로젝트 진행 상황 보고',
          participants: ['최대표', '김부장'],
          status: '예정',
          statusColor: 'bg-green-100 text-green-700',
          color: 'bg-green-100 text-green-700'
        },
        {
          id: 3,
          date: '2025-09-25',
          time: '11:00',
          duration: '2시간',
          title: '기획 회의',
          description: '신규 프로젝트 기획안 논의',
          participants: ['박기획', '이디자인'],
          status: '예정',
          statusColor: 'bg-purple-100 text-purple-700',
          color: 'bg-purple-100 text-purple-700'
        },
        {
          id: 4,
          date: '2025-09-30',
          time: '15:00',
          duration: '1시간',
          title: '월말 결산 회의',
          description: '9월 실적 정리 및 10월 목표 설정',
          participants: ['전팀원'],
          status: '예정',
          statusColor: 'bg-red-100 text-red-700',
          color: 'bg-red-100 text-red-700'
        }
      ]
    }
  },
  computed: {
    calendarDays() {
      const days = []
      const firstDay = new Date(this.currentYear, this.currentMonth - 1, 1)
      const lastDay = new Date(this.currentYear, this.currentMonth, 0)
      const prevLastDay = new Date(this.currentYear, this.currentMonth - 1, 0)
      
      const firstDayWeek = firstDay.getDay()
      const lastDate = lastDay.getDate()
      const prevLastDate = prevLastDay.getDate()
      
      // Previous month days
      for (let i = firstDayWeek - 1; i >= 0; i--) {
        days.push({
          date: prevLastDate - i,
          isCurrentMonth: false,
          isToday: false,
          hasEvent: false,
          events: []
        })
      }
      
      // Current month days
      const today = new Date()
      for (let i = 1; i <= lastDate; i++) {
        const dateStr = `${this.currentYear}-${String(this.currentMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        const dayEvents = this.events.filter(e => e.date === dateStr)
        
        days.push({
          date: i,
          isCurrentMonth: true,
          isToday: today.getFullYear() === this.currentYear && 
                   today.getMonth() + 1 === this.currentMonth && 
                   today.getDate() === i,
          hasEvent: dayEvents.length > 0,
          events: dayEvents
        })
      }
      
      // Next month days
      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: i,
          isCurrentMonth: false,
          isToday: false,
          hasEvent: false,
          events: []
        })
      }
      
      return days
    },
    todayEvents() {
      const today = new Date()
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
      return this.events.filter(e => e.date === dateStr)
    }
  },
  methods: {
    previousMonth() {
      if (this.currentMonth === 1) {
        this.currentMonth = 12
        this.currentYear--
      } else {
        this.currentMonth--
      }
    },
    nextMonth() {
      if (this.currentMonth === 12) {
        this.currentMonth = 1
        this.currentYear++
      } else {
        this.currentMonth++
      }
    },
    selectDay(day) {
      if (day.events.length > 0) {
        console.log('선택된 날짜의 이벤트:', day.events)
      }
    }
  }
}
</script>
