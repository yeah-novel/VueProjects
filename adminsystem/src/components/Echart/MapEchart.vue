<!-- components/EchartsMap.vue -->
<template>
  <div ref="chartDom" :style="{'width':width, 'height': height}"></div>
</template>


<script>
import { ref, onMounted, onBeforeUnmount, watch} from 'vue';
import {BAROPTION, MAPOPTION, RADAROPTION, GAUGEOPTIO} from "./defaultOption";
import echarts from "../../plugins/echarts";

export default {
  name: 'MapEchart',
  props: {
    region:{type: String, default:'china'},
    mapData: { type: Array, default: () => [] },  // 地图数据（如省份值）
    option: { type: Object, default: () => ({}) }, // 自定义配置覆盖
    echartsType: {type: String, default: 'map'}, //such as: map, bar, line...
    width: {type: String},
    height: {type: String}
  },
  setup(props) {
    const chartDom = ref(null);
    let chartInstance = null;

    // 初始化图表
    const initChart = () => {
      console.log(props.echartsType)
      if (!chartInstance) {
        chartInstance = echarts.init(chartDom.value);
      }
      let baseOption = null
      if(props.echartsType === 'map') {
        const geoJson = require( `../../data/mapJson/${props.region}.json`)
        echarts.registerMap(props.region, geoJson)
        baseOption = MAPOPTION
      }else if(props.echartsType === 'bar') {
        baseOption = BAROPTION
      }else if(props.echartsType === 'radar') {
        baseOption = RADAROPTION
      }else if(props.echartsType == 'gauge') {
        baseOption = GAUGEOPTIO
      }
      // 合并外部配置
      chartInstance.setOption(baseOption)
      console.log(baseOption)
    };
    
    // 响应窗口变化
    const resizeChart = () => {
      if(chartDom.value){
        chartInstance.resize();
      }
    };

    // 监听数据变化
    watch(() => props.mapData, (newVal) => {
      // chartInstance.setOption({ series: [{ data: newVal }] });
    });

    onMounted(() => {
      initChart();
      window.addEventListener('resize', resizeChart);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeChart);
      // if(chartDom.value){
      //   chartInstance.dispose();
      // }
    });

    return { chartDom };
  }
};
</script>
