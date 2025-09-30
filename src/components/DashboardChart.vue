<template>
  <div class="w-full h-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart :data="data">
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" :vertical="false" />
        <XAxis 
          dataKey="month" 
          :style="{ fontSize: '12px', fill: '#64748b' }"
          :tickLine="false"
          :axisLine="false"
        />
        <YAxis 
          :style="{ fontSize: '12px', fill: '#64748b' }"
          :tickLine="false"
          :axisLine="false"
        />
        <Tooltip />
        <Line 
          dataKey="line1" 
          type="monotone" 
          stroke="#0f172a" 
          :strokeWidth="2" 
          :dot="false"
          name="별개 1"
        />
        <Line 
          dataKey="line2" 
          type="monotone" 
          stroke="#94a3b8" 
          :strokeWidth="2" 
          strokeDasharray="5 5"
          :dot="false"
          name="별개 2"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</template>

<script>
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default {
  name: 'DashboardChart',
  components: {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
