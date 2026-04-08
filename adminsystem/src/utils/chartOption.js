import { onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import chinaJson from '../data/mapJson/China.json'

// utils/chartOptions.js
export const baseOptions = {
  tooltip: { trigger: 'axis' },
  grid: { left: '3%', right: '4%', bottom: '3%' }
}

export const getBarSeries = (data) => ({
  type: 'bar',
  data,
  itemStyle: { color: '#5470c6' }
})

export const getLineSeries = (data) => ({
  type: 'line',
  data,
  smooth: true
})

export const getMapSeries = (data) => ({
  type: 'map',
  data,
  itemStyle: { color: '#5470c6' }
})
