<template>
  <div class="dashboard">
    <div class="dashboard-grid">
      <!-- 左上：仪表盘 + 指标 -->
      <div class="panel">
        <div class="panel-header">
          <div class="title">Focus on the right stuff</div>
          <div class="subtitle">
            Explore only what you need and don't waste time on the unneccesary stuff.
          </div>
        </div>
        <div class="gauge-row">
          <div class="inner-card">
            <div class="inner-label">Solar Module</div>
            <div class="chart-box">
              <map-echart echarts-type="semiGauge" height="150px" />
            </div>
          </div>
          <div class="inner-card inner-card--metrics">
            <div class="inner-label">Solar Module</div>
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
              <div class="safety-ring">
                <map-echart echarts-type="safetyRing" width="120px" height="130px" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右上：柱状图 + 侧边栏 -->
      <div class="panel">
        <div class="panel-header">
          <div class="title">Increase togetherness</div>
          <div class="subtitle">
            Get everyone on the same page all of the time
          </div>
        </div>
        <div class="bar-section">
          <div class="section-sidebar">
            <div
              v-for="(section, index) in sections"
              :key="index"
              :class="['section-btn', { active: activeSection === index }]"
              @click="activeSection = index"
            >
              <span class="section-icon">{{ section.icon }}</span>
              <span class="section-text">{{ section.label }}</span>
            </div>
          </div>
          <div class="chart-box chart-box--bar">
            <map-echart echarts-type="screenBar" height="220px" />
          </div>
        </div>
      </div>

      <!-- 左下：饼图 -->
      <div class="panel">
        <div class="panel-header">
          <div class="title">Increase togetherness</div>
          <div class="subtitle">
            Get everyone on the same page all of the time
          </div>
        </div>
        <div class="chart-box chart-box--pie">
          <map-echart echarts-type="screenPie" height="240px" />
        </div>
      </div>

      <!-- 右下：折线图 -->
      <div class="panel">
        <div class="panel-header">
          <div class="title">Increase togetherness</div>
          <div class="subtitle">
            Get everyone on the same page all of the time
          </div>
        </div>
        <div class="chart-box chart-box--line">
          <map-echart echarts-type="screenLine" height="240px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapEchart from '../components/Echart/MapEchart.vue'

export default {
  name: 'Screen2',
  components: { mapEchart },
  data () {
    return {
      activeSection: 0,
      sections: [
        { icon: '👍', label: 'SECTION 1' },
        { icon: '▦', label: 'SECTION 2' },
        { icon: '◎', label: 'SECTION 3' }
      ]
    }
  }
}
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
  background: #4a8fd4;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  height: 100%;
}

.panel {
  background: rgba(42, 90, 160, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(10, 40, 100, 0.25);
}

.panel-header {
  margin-bottom: 12px;
  flex-shrink: 0;
}

.title {
  color: #fff;
  font-family: Inter, 'PingFang SC', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
}

.subtitle {
  color: rgba(255, 255, 255, 0.65);
  font-size: 11px;
  line-height: 1.5;
  margin-top: 4px;
}

.gauge-row {
  display: flex;
  gap: 12px;
  flex: 1;
  min-height: 0;
}

.inner-card {
  flex: 1;
  background: #1a3a6b;
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.inner-label {
  color: rgba(255, 255, 255, 0.55);
  font-size: 10px;
  margin-bottom: 4px;
}

.metrics-row {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
}

.metrics-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.metric-box {
  background: rgba(10, 30, 70, 0.6);
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

.safety-ring {
  flex-shrink: 0;
}

.chart-box {
  flex: 1;
  background: #1a3a6b;
  border-radius: 10px;
  padding: 4px;
  min-height: 0;
  overflow: hidden;
}

.inner-card .chart-box {
  background: transparent;
  padding: 0;
}

.bar-section {
  display: flex;
  gap: 12px;
  flex: 1;
  min-height: 0;
}

.section-sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  width: 90px;
}

.section-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 6px;
  background: rgba(26, 58, 107, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.section-btn.active {
  background: rgba(77, 208, 225, 0.2);
  border-color: rgba(77, 208, 225, 0.4);
}

.section-icon {
  font-size: 16px;
  line-height: 1;
}

.section-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 9px;
  letter-spacing: 0.5px;
}

.section-btn.active .section-text {
  color: #fff;
}

.chart-box--bar {
  flex: 1;
}

.chart-box--pie,
.chart-box--line {
  flex: 1;
}
</style>
