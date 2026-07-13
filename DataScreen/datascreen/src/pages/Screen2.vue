<template>
  <div class="datav-screen">

    <!-- ===== 主体区域 ===== -->
    <div class="main-body">
      <!-- ===== 左侧栏 ===== -->
      <div class="left-column">
        <!-- 左上：柱状图 -->
        <div class="panel panel-left-top">
          <div class="panel-label">Solar Module</div>
          <div class="panel-caption">Creativity is the key to success in the great and primary education</div>
          <div class="chart-container chart-container--bar">
            <map-echart echarts-type="screen2Bar" height="100%" />
          </div>
        </div>

        <!-- 左中：雷达图 -->
        <div class="panel panel-left-mid">
          <div class="panel-label">Solar Module</div>
          <div class="panel-caption">Creativity is the key to success in the great and primary education</div>
          <div class="chart-container chart-container--radar">
            <map-echart echarts-type="screen2Radar" height="100%" />
          </div>
        </div>
      </div>

      <!-- ===== 中间区域（地图 + 底部覆盖折线图） ===== -->
      <div class="center-column">
        <div class="map-wrapper">
          <map-echart region="china" class="map-chart" />
          <!-- 地图上的标记点 -->
          <div class="map-marker marker-1m" style="top: 22%; left: 28%;">
            <div class="marker-dot" style="background: #f5a623;"></div>
            <div class="marker-ring" style="border-color: #f5a623;"></div>
            <div class="marker-label" style="color: #f5a623;">1M</div>
          </div>
          <div class="map-marker marker-2m" style="top: 38%; left: 48%;">
            <div class="marker-dot" style="background: #5cb87a;"></div>
            <div class="marker-ring" style="border-color: #5cb87a;"></div>
            <div class="marker-label" style="color: #5cb87a;">2M</div>
          </div>
          <div class="map-marker marker-3m" style="top: 15%; left: 58%;">
            <div class="marker-dot" style="background: #9b7fd4;"></div>
            <div class="marker-ring" style="border-color: #9b7fd4;"></div>
            <div class="marker-label" style="color: #9b7fd4;">3M</div>
          </div>
        </div>

        <!-- 底部覆盖面板：折线图 -->
        <div class="panel overlay-panel">
          <div class="panel-label">Solar Module</div>
          <div class="overlay-content">
            <div class="chart-container chart-container--overlay-line">
              <map-echart echarts-type="screen2Line" height="100%" />
            </div>
            <div class="overlay-list">
              <div class="list-item" v-for="(item, i) in listData" :key="i">
                <span class="list-text">/通用格式</span>
                <span class="list-text">/通用格式</span>
                <span class="list-text">/通用格式</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 右侧栏 ===== -->
      <div class="right-column">
        <!-- 右上：人员统计 -->
        <div class="panel panel-right-top">
          <div class="people-stats">
            <div class="people-group">
              <div class="people-row" v-for="(group, i) in peopleGroups" :key="i">
                <div class="people-icons">
                  <span v-for="n in group.count" :key="n" class="person-icon">👤</span>
                </div>
                <div class="people-badge">{{ group.year }}</div>
                <div class="people-percent">{{ group.percent }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右中上：86% 仪表盘 -->
        <div class="panel panel-right-gauge">
          <div class="panel-label">Solar Module</div>
          <div class="panel-caption">Creativity is the key to success in the great and primary education</div>
          <div class="chart-container chart-container--gauge">
            <map-echart echarts-type="semiGauge" height="100%" />
          </div>
        </div>

        <!-- 右中下：68% 仪表盘 -->
        <div class="panel panel-right-gauge">
          <div class="panel-label">Solar Module</div>
          <div class="panel-caption">Creativity is the key to success in the great and primary education</div>
          <div class="chart-container chart-container--gauge">
            <map-echart echarts-type="screen2Gauge68" height="100%" />
          </div>
        </div>

        <!-- 右下：饼图 -->
        <div class="panel panel-right-pie">
          <div class="chart-container chart-container--pie">
            <map-echart echarts-type="screen2Pie" height="100%" />
          </div>
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
      listData: [1, 2, 3, 4],
      peopleGroups: [
        { year: '2018', percent: '40%', count: 4 },
        { year: '2019', percent: '60%', count: 6 }
      ]
    }
  }
}
</script>

<style scoped>
/* ===== 全局容器 ===== */
.datav-screen {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #00377a 0%, #0a6bb5 50%, #1a8fd8 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* ===== 主体 ===== */
.main-body {
  flex: 1;
  display: flex;
  gap: 14px;
  padding: 0 16px 16px;
  min-height: 0;
}

/* ===== 列宽 ===== */
.left-column {
  width: 22%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}

.center-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
}

.right-column {
  width: 22%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
}

/* ===== 面板通用样式 ===== */
.panel {
  background: rgba(12, 40, 100, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 24px rgba(0, 20, 60, 0.3);
}

.panel-label {
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 2px;
  flex-shrink: 0;
}

.panel-caption {
  color: rgba(255, 255, 255, 0.40);
  font-size: 9px;
  line-height: 1.4;
  margin-bottom: 6px;
  flex-shrink: 0;
}

/* ===== 左侧面板 ===== */
.panel-left-top {
  flex: 1.1;
  min-height: 0;
}

.panel-left-mid {
  flex: 1;
  min-height: 0;
}

.chart-container {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* ===== 中间 - 地图区域 ===== */
.map-wrapper {
  flex: 1;
  position: relative;
  min-height: 0;
  overflow: hidden;
}

.map-chart {
  width: 100%;
  height: 100%;
}

/* 地图标记点 */
.map-marker {
  position: absolute;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  animation: markerPulse 2.5s ease-in-out infinite;
}

.marker-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: absolute;
  z-index: 2;
}

.marker-ring {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid;
  position: absolute;
  opacity: 0.3;
  animation: ringExpand 2.5s ease-out infinite;
}

.marker-label {
  position: absolute;
  top: -18px;
  font-size: 16px;
  font-weight: 800;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
  z-index: 3;
}

@keyframes markerPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}

@keyframes ringExpand {
  0% { transform: scale(0.6); opacity: 0.5; }
  100% { transform: scale(1.8); opacity: 0; }
}

/* ===== 中间 - 覆盖折线图面板 ===== */
.overlay-panel {
  flex-shrink: 0;
  height: 38%;
  margin-top: -4px;
  position: relative;
  z-index: 3;
  background: rgba(8, 30, 78, 0.6);
}

.overlay-content {
  flex: 1;
  display: flex;
  gap: 10px;
  min-height: 0;
}

.chart-container--overlay-line {
  flex: 1;
  min-height: 0;
}

.overlay-list {
  width: 110px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 4px 0;
}

.list-item {
  display: flex;
  gap: 6px;
  justify-content: space-between;
}

.list-text {
  color: rgba(255, 255, 255, 0.45);
  font-size: 9px;
  font-family: 'Courier New', monospace;
}

/* ===== 右侧面板 ===== */
.panel-right-top {
  flex-shrink: 0;
  padding: 14px;
}

.people-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
}

.people-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}

.people-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.people-icons {
  display: flex;
  gap: 3px;
  flex: 1;
}

.person-icon {
  font-size: 16px;
  opacity: 0.85;
}

.people-badge {
  background: rgba(77, 208, 225, 0.2);
  border: 1px solid rgba(77, 208, 225, 0.35);
  border-radius: 10px;
  padding: 2px 10px;
  color: #4dd0e1;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.people-percent {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  min-width: 40px;
  text-align: right;
}

.panel-right-gauge {
  flex: 1;
  min-height: 0;
}

.panel-right-pie {
  flex: 1.2;
  min-height: 0;
}

.chart-container--gauge {
  min-height: 60px;
}

/* ===== 响应式处理 ===== */
@media (max-width: 1200px) {
  .left-column,
  .right-column {
    width: 26%;
  }
  .header-title {
    font-size: 22px;
  }
}

@media (max-width: 900px) {
  .main-body {
    flex-direction: column;
    gap: 10px;
  }
  .left-column,
  .right-column,
  .center-column {
    width: 100%;
  }
  .left-column {
    flex-direction: row;
  }
  .right-column {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .overlay-panel {
    height: auto;
    min-height: 160px;
  }
}
</style>
