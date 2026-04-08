<template>
  <div id="chart-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20">
          <div ref="lineChart" style="height: 200px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div ref="barChart1" style="height: 200px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div ref="barChart2" style="height: 200px;"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card>
          <div ref="barChart3" style="height: 200px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import * as echarts from 'echarts'
export default {
  mounted () {
    this.initLineChart()
    this.initBarChart1()
    this.initBarChart2()
    this.initBarChart3()
  },
  methods: {
    initLineChart () {
      const chart = this.$echarts.init(this.$refs.lineChart)
      chart.setOption({
        // ECharts配置项
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line'
        }]
      })
    },
    initBarChart1 () {
      const chart = this.$echarts.init(this.$refs.barChart1)
      chart.setOption({
        // ECharts配置项
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      })
    },
    initBarChart2 () {
      const labelRight = {
        position: 'right'
      }
      const chart = this.$echarts.init(this.$refs.barChart2)
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 80,
          bottom: 30
        },
        xAxis: {
          type: 'value',
          position: 'top',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          data: [
            'ten',
            'nine',
            'eight',
            'seven',
            'six',
            'five',
            'four',
            'three',
            'two',
            'one'
          ]
        },
        series: [
          {
            name: 'Cost',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              formatter: '{b}'
            },
            data: [
              { value: -0.07, label: labelRight },
              { value: -0.09, label: labelRight },
              0.2,
              0.44,
              { value: -0.23, label: labelRight },
              0.08,
              { value: -0.17, label: labelRight },
              0.47,
              { value: -0.36, label: labelRight },
              0.18
            ]
          }
        ]
      })
    },
    initBarChart3 () {
      const chart = this.$echarts.init(this.$refs.barChart3)
      chart.setOption({
        polar: {radius: [30, '80%']},
        radiusAxis: {max: 5},
        angleAxis: {
          type: 'category',
          data: ['a', 'b', 'c', 'd'],
          startAngle: 75
        },
        tooltip: {},
        series: {
          type: 'bar',
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: 'polar',
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}'
          }
        },
        animation: false
      })
    }
  }
}
</script>
