<!-- components/EchartsMap.vue -->
<template>
  <div ref="chartDom" :style="{'width':width, 'height': height}"></div>
</template>

<script>
// eslint-disable-next-line standard/object-curly-even-spacing
import { ref, onMounted, onBeforeUnmount, watch} from 'vue'
import {
  BAROPTION,
  MAPOPTION,
  RADAROPTION,
  GAUGEOPTIO,
  SEMI_GAUGE_OPTION,
  SAFETY_RING_OPTION,
  SCREEN_BAR_OPTION,
  SCREEN_PIE_OPTION,
  SCREEN_RADAR_OPTION,
  SCREEN_LINE_OPTION
  , SCREEN_AREA_STACK_OPTION
} from './defaultOption'
import echarts from '../../plugins/echarts'

const GAUGE_TYPES = ['semiGauge', 'safetyRing']
const SCREEN_CHART_TYPES = ['semiGauge', 'safetyRing', 'screenBar', 'screenPie', 'screenLine', 'screenArea']
const REPLAY_INTERVAL = 10000

export default {
  name: 'MapEchart',
  props: {
    region: {type: String, default: 'china'},
    mapData: { type: Array, default: () => [] },
    option: { type: Object, default: () => ({}) },
    echartsType: {type: String, default: 'map'},
    width: {type: String},
    height: {type: String},
    autoReplay: { type: Boolean, default: true }
  },
  setup (props) {
    const chartDom = ref(null)
    let chartInstance = null
    let savedOption = null
    let replayTimer = null

    const getBaseOption = () => {
      if (props.echartsType === 'map') {
        const geoJson = require(`../../mapJson/${props.region}.json`)
        echarts.registerMap(props.region, geoJson)
        return MAPOPTION
      } else if (props.echartsType === 'bar') {
        return BAROPTION
      } else if (props.echartsType === 'radar') {
        return RADAROPTION
      } else if (props.echartsType === 'gauge') {
        return GAUGEOPTIO
      } else if (props.echartsType === 'semiGauge') {
        return SEMI_GAUGE_OPTION
      } else if (props.echartsType === 'safetyRing') {
        return SAFETY_RING_OPTION
      } else if (props.echartsType === 'screenBar') {
        return SCREEN_BAR_OPTION
      } else if (props.echartsType === 'screenPie') {
        return SCREEN_PIE_OPTION
      } else if (props.echartsType === 'screenRadar') {
        return SCREEN_RADAR_OPTION
      } else if (props.echartsType === 'screenLine') {
        return SCREEN_LINE_OPTION
      } else if (props.echartsType === 'screenArea') {
        return SCREEN_AREA_STACK_OPTION
      }
      return null
    }

    const playGaugeFromZero = (option) => {
      const targetData = option.series[0].data[0]
      chartInstance.setOption({
        animation: false,
        series: [{ data: [{ value: 0, name: targetData.name }] }]
      })
      setTimeout(() => {
        chartInstance.setOption(option)
      }, 80)
    }

    const playChartAnimation = (option) => {
      if (GAUGE_TYPES.includes(props.echartsType)) {
        playGaugeFromZero(option)
      } else {
        chartInstance.setOption(option, true)
      }
    }

    const initChart = () => {
      if (!chartInstance) {
        chartInstance = echarts.init(chartDom.value)
      }
      savedOption = getBaseOption()
      if (!savedOption) return
      playChartAnimation(savedOption)
    }

    const startReplayLoop = () => {
      if (!props.autoReplay || !SCREEN_CHART_TYPES.includes(props.echartsType)) return
      replayTimer = setInterval(() => {
        if (savedOption) playChartAnimation(savedOption)
      }, REPLAY_INTERVAL)
    }

    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize()
      }
    }

    watch(() => props.mapData, () => {})

    onMounted(() => {
      initChart()
      startReplayLoop()
      window.addEventListener('resize', resizeChart)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeChart)
      if (replayTimer) clearInterval(replayTimer)
      if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
      }
    })

    return { chartDom }
  }
}
</script>
