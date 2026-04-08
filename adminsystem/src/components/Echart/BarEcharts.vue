<!-- components/EchartsMap.vue -->
<template>
  <div ref="chartDom" ></div>
</template>
<style scoped>
div {
  width: 250px;
  height: 300px;
}
</style>

<script>
import { ref, onMounted, onBeforeUnmount, watch} from 'vue'
import {BAROPTION} from "./defaultOption"
import echarts from "../../plugins/echarts";

export default {
  name: 'BarEcharts',
  props: {
    option: { type: Object, default: () => ({}) }, // 自定义配置覆盖
    echartsType: {type: String, default: 'map'}
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
        baseOption = BAROPTION
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
