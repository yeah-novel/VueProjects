<template>
  <div class="screen4-page">

        <div class="screen4-body">
            <div class="overview-row">
            <div class="overview-panel">
                <!-- <div class="panel-title">需求概览</div> -->
                <div class="overview-main">
                  <div class="overview-metric">
                      <div class="metric-number">565/1230</div>
                      <div class="metric-label">立项项目数 / 储备项目总数</div>
                  </div>
                </div>
               
                <div class="overview-cards">
                <div class="overview-card">
                    <div class="card-value">1456</div>
                    <div class="card-label">政府项目</div>
                </div>
                <div class="overview-card">
                    <div class="card-value">2345</div>
                    <div class="card-label">民营项目</div>
                </div>
                <div class="overview-card">
                    <div class="card-value">45</div>
                    <div class="card-label">专项立项</div>
                </div>
                </div>

                <div class="chart-panel">
                  <div class="panel-title">Solar Module</div>
                  <div class="metrics-row">
                    <div class="metrics-info">
                      <div class="metric-box">
                        <span class="metric-label">Invited</span>
                        <span class="metric-value">145 people</span>
                      </div>
                      <div class="metric-box">
                        <span class="metric-label">Bonus</span>
                        <span class="metric-value">1,465</span>
                      </div>
                    </div>
                    <map-echart echarts-type="semiGauge" height="150px" />
                  </div>
                </div>
                <div class="chart-panel">
                  <target-gauge-card
                    title="汽车芯片设计中心"
                    main-value="328万"
                    main-label="季度目标"
                    :percentage="45"
                    :targets="carTargets"
                    color="#ffa726"
                    width="100%"
                    height="200px"
                  />
                </div>
              </div>
            </div>

            <div class="product-panel">
                <funnel-card style="width: 60%; height: 100%;" title="" :stats="myStats" :layers="myLayers" />
               
                <div class="feature-grid">
                <div class="chart-panel--center">
                    <wave-gauge-card
                      :percentage="52"
                      value="52%"
                      label="完成度"
                      :size="140"
                    />
                </div>
                <div class="chart-panel--center">
                    <wave-gauge-card
                      :percentage="52"
                      value="52%"
                      label="完成度"
                      :size="140"
                    />
                </div>
                <div class="chart-panel--center">
                    <wave-gauge-card
                      :percentage="52"
                      value="52%"
                      label="完成度"
                      :size="140"
                    />
                </div>
                <div class="chart-panel--center">
                    <wave-gauge-card
                      :percentage="62"
                      value="62%"
                      label="满意度"
                      :size="140"
                    />
                </div>
                </div>
                 <div class="chart-panel ">
                    <div class="panel-title">项目转化分析</div>
                    <map-echart echarts-type="screenMixBarLine" height="20vh" />
                </div>
            </div>


            <div class="chart-row">
                
                <div class="chart-panel ">
                    <div class="panel-title">年度趋势</div>
                    <map-echart echarts-type="screenBar" height="100%" />
                </div>
                <div class="chart-panel ">
                    <div class="panel-title">研发投入</div>
                    <map-echart echarts-type="screenArea"  height="100%" />
                </div>
                <div class="chart-panel ">
                    <div class="panel-title">数据分布</div>
                    <map-echart echarts-type="screenHorizStackBar" height="100%" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mapEchart from '../components/Echart/MapEchart.vue'
import FunnelCard from '../components/FunnelCard.vue'
import TargetGaugeCard from '../components/TargetGaugeCard.vue'
import WaveGaugeCard from '../components/WaveGaugeCard.vue'
import ProgressSliderCard from '../components/ProgressSliderCard.vue'

export default {
  name: 'Screen4',
  components: { mapEchart, FunnelCard, TargetGaugeCard, WaveGaugeCard, ProgressSliderCard },
  data() {
    return {
      myStats: {
        newSign: 222,
        growthRate: '16%',
        totalSign: '13,933'
      },
      myLayers: [
        { name: '新增用户', count: 13933, rate: '64.12%', color: '#4c8bf5' },
        { name: '激活用户', count: 8934, rate: '55.69%', color: '#5fa5fb' },
        { name: '交易用户', count: 497, rate: '27.20%', color: '#7cc3fe' },
        { name: '复购用户', count: '', rate: '', color: '#ffce76' }
      ],
      chipTargets: [
        { label: '年度目标', value: '2435万' },
        { label: '完成进度', value: '68%' }
      ],
      carTargets: [
        { label: '年度目标', value: '1860万' },
        { label: '完成进度', value: '45%' },
        { label: '同比增长', value: '+12.3%', color: '#66bb6a' }
      ]
    }
  }
}
</script>

<style scoped>

.screen4-page {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at top, rgba(14, 43, 97, 0.94), rgba(3, 10, 26, 1));
  color: #fff;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;

}
.screen4-body {
  flex: 1 auto 1;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
  /* margin: 10px 0; */
  min-height: 0;
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-bottom: 50px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4cc7ff, #0f76ff);
  box-shadow: 0 0 18px rgba(45, 155, 255, 0.5);
}

.brand-title {
  font-size: 20px;
  font-weight: 700;
}

.brand-subtitle {
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  margin-top: 4px;
}

.header-tabs {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.tab {
  padding: 8px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  cursor: pointer;
}

.tab.active {
  background: linear-gradient(135deg, rgba(37, 123, 235, 0.95), rgba(74, 192, 255, 0.95));
  color: #fff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.year-label,
.period-label {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 14px;
}

.overview-row {
  display: flex;
  flex-direction: row;
  gap: 18px;
}

.progress-card {
  width: 100%;
  flex-shrink: 0;
  height: 20vh;
}

.overview-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 20vw;
}
.chart-panel--center {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 10vw;
  height: 10vh;
}
.chart-panel {
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  box-shadow: inset 0 0 40px rgba(19, 83, 179, 0.18);
}

/* .chart-panel {
  max-height: 300px;
} */
.product-panel {
  flex: auto 1 1;
  height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel-title {
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
  margin-top: 10px;
}

.overview-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 22px;
  background: rgba(26, 76, 158, 0.35);
  border-radius: 18px;
  /* margin-bottom: 18px; */
}

.overview-metric {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.metric-number {
  font-size: 36px;
  font-weight: 700;
}

.metric-label,
.overview-status {
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
}

.overview-status {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 12px 20px;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.overview-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 8px;
  /* min-height: 50px; */
}

.card-value {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}

.card-label {
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
}

.product-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-summary {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 18px;
}

.summary-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 16px;
  width: 200px
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.summary-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 14px;
}

.feature-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(41, 157, 255, 0.72), rgba(91, 240, 219, 0.75));
  color: #fff;
  font-weight: 700;
}

.feature-meta {
  display: flex;
  flex-direction: column;
}

.feature-number {
  font-size: 16px;
  font-weight: 700;
}

.feature-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
}

.chart-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 20vw;
}


.metrics-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 8px;
  padding-left: 10px;
}

.metrics-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.metric-box {
  background: rgba(26, 76, 158, 0.35);
  border-radius: 6px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.metric-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
}

.metric-value {
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}

.chart-left,
.chart-right {
  display: grid;
  gap: 18px;
}

.chart-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chart-panel > map-echart {
  width: 100%;
}

@media (max-width: 1300px) {
  .overview-row,
  .chart-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .screen4-page {
    padding: 12px;
  }

  .header-right {
    flex-wrap: wrap;
  }
}
</style>
