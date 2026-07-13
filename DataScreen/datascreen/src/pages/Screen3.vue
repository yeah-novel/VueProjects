<template>
  <div class="screen3-page">

    <div class="screen3-body">
      <div class="panel left-panel panel-enter" style="--d: 0.1s">
        <div class="section-title">学校信息</div>
        <div class="school-name">都江堰市北街小学实验外国语学校</div>
        <div class="school-stat-row">
          <div class="school-stat-card stat-card-enter" style="--d: 0.2s">
            <div class="stat-number metric-count">{{ displayStudents }}</div>
            <div class="stat-label">学生数(人)</div>
          </div>
          <div class="school-stat-card stat-card-enter" style="--d: 0.35s">
            <div class="stat-number metric-count">{{ displayClasses }}</div>
            <div class="stat-label">班级数(个)</div>
          </div>
        </div>

        <div class="panel-section">
          <div class="section-title">课程概况</div>
          <div class="progress-row" v-for="(item, idx) in courseItems" :key="item.label" :style="{ '--i': idx }">
            <div class="progress-info">
              <div class="progress-label">{{ item.label }}</div>
              <div class="progress-status" :class="item.statusClass">{{ item.statusText }}</div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressWidths[idx] + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="panel-section class-overview">
          <div class="section-title">班级概况</div>
          <div class="class-list">
            <div class="class-item class-item-enter" v-for="(item, idx) in classList" :key="item.grade" :style="{ '--i': idx }">
              <div class="class-meta">
                <div class="class-grade">{{ item.grade }}</div>
                <div class="class-count">综合学习力 {{ item.score }} · 人数 {{ item.count }}</div>
              </div>
              <div class="class-line"></div>
            </div>
          </div>
        </div>
        <div class="panel-section class-overview">
          <map-echart echarts-type="screenRadar" height="20vh" width="100%"/>
        </div>

      </div>

      <div class="panel center-panel panel-enter" style="--d: 0.25s">
        <div class="panel-top">
          <div class="section-title">学习力实时分析</div>
        </div>
        <div class="center-top-cards">
          <div class="center-card card-fade-in" v-for="(item, idx) in radarStats" :key="item.label" :style="{ '--i': idx }">
            <div class="center-card-value metric-count">{{ animatedRadar[idx] }}</div>
            <div class="center-card-label">{{ item.label }}</div>
          </div>
        </div>
        <div class="radar-card">
          <div class="small-chart chart-fade-in" style="--d: 0.6s">
            <bubble-chart />
          </div>
          <div class="small-chart chart-fade-in" style="--d: 0.8s">
            <!-- <div class="small-chart-title">注意力等级人数分布</div> -->
            <contribution-heatmap />
          </div>
        </div>
        <div class="center-bottom-charts chart-fade-in" style="--d: 1.2s">
            <!-- <wind-speed-chart /> -->
            <map-echart echarts-type="screenLine" height="100%" />
          <!-- <div class="small-chart chart-fade-in" style="--d: 1.0s">
            <div class="small-chart-title">注意力指数密度曲线</div>
            <map-echart echarts-type="screenArea" height="140px" width="100%" />
          </div> -->
          <!-- <div class="small-chart chart-fade-in" style="--d: 1.1s">
            <primary-stats-card />
          </div> -->
        </div>
      </div>

      <div class="panel right-panel panel-enter" style="--d: 0.4s">

        <!-- <div class="section-title">能力评价分析</div> -->
        <!-- 排名 -->
          <div class="small-chart chart-fade-in" height="18vh" style="--d: 1.2s">
            <country-rank />
          </div>
          <div class="small-chart chart-fade-in" style="--d: 1.2s">
            <primary-stats-card />

          </div>
        <div class="section-title small-section-title">指数整合分析</div>
          <div class="small-chart ch-heatmap-box chart-fade-in" style="--d: 1.1s">
            <map-echart echarts-type="screenPie3D" height="240px" width="100%" />
          </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import mapEchart from '../components/Echart/MapEchart.vue'
import CountryRank from '../components/CountryRank.vue'
import ContributionHeatmap from '../components/ContributionHeatmap.vue'
import WindSpeedChart from '../components/WindSpeedChart.vue'
import PrimaryStatsCard from '../components/PrimaryStatsCard.vue'
import BubbleChart from '../components/BubbleChart.vue'

export default {
  name: 'Screen3',
  components: { mapEchart, CountryRank, ContributionHeatmap, WindSpeedChart, PrimaryStatsCard, BubbleChart },
  data () {
    return {
      currentTime: '',
      currentDate: '',
      // 数字动画
      displayStudents: 0,
      displayClasses: 0,
      animatedRadar: [0, 0, 0, 0],
      // 进度条动画
      progressWidths: [0, 0, 0],
      courseItems: [
        { label: '智能配课-学习力提升课程(强化)', percent: 36, statusText: '进行中', statusClass: 'status-active' },
        { label: '线上学习力课程', percent: 0, statusText: '未开始', statusClass: 'status-wait' },
        { label: '自控力提升课次', percent: 100, statusText: '已完成', statusClass: 'status-done' }
      ],
      classList: [
        { grade: '一年级1班', score: 149, count: 56 },
        { grade: '二年级1班', score: 149, count: 56 },
        { grade: '三年级1班', score: 152, count: 54 },
        { grade: '四年级1班', score: 141, count: 50 },
        { grade: '五年级1班', score: 138, count: 49 }
      ],
      radarStats: [
        { label: '注意力', value: 128 },
        { label: '记忆力', value: 64 },
        { label: '反应力', value: 154 },
        { label: '思维力', value: 158 }
      ],
      summaryCards: [
        { label: '学习力指数', value: '150' },
        { label: '完成率', value: '87%' },
        { label: '课程覆盖率', value: '92%' },
        { label: '在线人数', value: '312' }
      ],
      timer: null
    }
  },
  mounted () {
    this.updateDateTime()
    this.timer = setInterval(this.updateDateTime, 1000)
    this.startAnimations()
  },
  beforeDestroy () {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    updateDateTime () {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      this.currentTime = `${hours}:${minutes}:${seconds}`
      this.currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    },
    // 启动所有入场动画
    startAnimations () {
      this.animateNumber((v) => { this.displayStudents = v }, 3150, 2000, 0)
      this.animateNumber((v) => { this.displayClasses = v }, 78, 1800, 200)
      this.animateRadarStats()
      this.animateProgressBars()
    },
    // 通用数字滚动（easeOutExpo）
    animateNumber (setter, target, duration, delay) {
      setTimeout(() => {
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const p = Math.min(elapsed / duration, 1)
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
          setter(Math.round(eased * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }, delay)
    },
    // 雷达四项数字依次滚动
    animateRadarStats () {
      this.radarStats.forEach((item, idx) => {
        const target = item.value
        const delay = 400 + idx * 250
        this.animateNumber(
          (v) => {
            const arr = [...this.animatedRadar]
            arr[idx] = v
            this.animatedRadar = arr
          },
          target, 1200, delay
        )
      })
    },
    // 进度条展开
    animateProgressBars () {
      const targets = this.courseItems.map(d => d.percent)
      setTimeout(() => {
        const duration = 1000
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const p = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          this.progressWidths = targets.map(t => Math.round(eased * t))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }, 500)
    }
  }
}
</script>

<style scoped>
.screen3-page {
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

.screen3-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
}

.screen3-page::after {
  content: '';
  position: absolute;
  top: 10%;
  right: 12%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(74, 146, 255, 0.12);
  filter: blur(60px);
  pointer-events: none;
}

.screen3-body {
  flex: 1 auto 1;
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

.panel {
  background: rgba(7, 24, 54, 0.94);
  border: 1px solid rgba(83, 158, 255, 0.14);
  border-radius: 18px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  overflow: hidden;
  box-shadow: inset 0 0 35px rgba(23, 71, 140, 0.14);
}

.left-panel,
.center-panel,
.right-panel {
  min-height: 0;
}

.left-panel {
  width: 240px;
}

.right-panel {
  width: 20vw;
}

.center-panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel-title {
  color: #b6d7ff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.panel-subtitle {
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #d6e5ff;
}

.school-stat-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.school-stat-card {
  background: rgba(14, 35, 68, 0.96);
  border: 1px solid rgba(102, 188, 255, 0.16);
  border-radius: 16px;
  padding: 10px;
  min-height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-number {
  font-size: 20px;
  font-weight: 800;
}

.stat-label {
  position: relative;
  z-index: 1;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  margin-top: 8px;
}

.progress-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.progress-label {
  font-size: 12px;
  color: #eaf4ff;
}

.progress-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
}

.progress-status.status-active {
  color: #8bf0ff;
}

.progress-status.status-wait {
  color: #bbc1ff;
}

.progress-status.status-done {
  color: #a9ff9b;
}

.class-list {
  display: grid;
  gap: 10px;
  max-height: 210px;
  overflow: hidden;
}

.class-item {
  padding: 12px 12px;
  background: rgba(11, 28, 64, 0.92);
  border: 1px solid rgba(76, 168, 255, 0.12);
  border-radius: 5px;
}

.class-meta {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  /* flex-wrap: wrap; */
}

.class-grade {
  font-size: 12px;
  font-weight: 700;
}

.class-count {
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
}

.stat-card {
  background: rgba(15, 35, 80, 0.95);
  border: 1px solid rgba(82, 151, 255, 0.14);
  border-radius: 16px;
  padding: 16px;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  animation: floatUp 0.9s ease-out;
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(96, 176, 255, 0.08), transparent 45%);
  opacity: 0.7;
}

.stat-value,
.center-card-value,
.small-card-value,
.summary-value {
  position: relative;
  z-index: 1;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.stat-label {
  position: relative;
  z-index: 1;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
}

.chart-card {
  background: rgba(10, 26, 60, 0.88);
  border: 1px solid rgba(77, 147, 255, 0.14);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}

.chart-card.payment-card {
  min-height: 280px;
}

.payment-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.payment-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 120px;
}

.payment-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.18);
}

.payment-value {
  font-weight: 700;
}

.payment-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
}

.center-top-cards,
.center-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(80px, 1fr));
  gap: 6px;
}

.center-card {
  background: rgba(15, 40, 88, 0.96);
  border: 1px solid rgba(102, 183, 255, 0.18);
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 30px;
  gap: 12px;
}

.center-card-value {
  font-size: 22px;
  font-weight: 700;
}

.center-card-label {
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
}

.cube-area {
  position: relative;
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.cube-area::before,
.cube-area::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.cube-area::before {
  width: 220px;
  height: 220px;
  background: rgba(86, 169, 255, 0.12);
  top: 8%;
  left: 10%;
  filter: blur(28px);
}

.cube-area::after {
  width: 180px;
  height: 180px;
  background: rgba(72, 178, 255, 0.08);
  bottom: 12%;
  right: 14%;
  filter: blur(24px);
}

.cube {
  position: relative;
  width: 170px;
  height: 170px;
  transform-style: preserve-3d;
  transform: rotateX(25deg) rotateY(-35deg);
  animation: rotateCube 14s linear infinite;
  z-index: 2;
}

.cube-face {
  position: absolute;
  width: 170px;
  height: 170px;
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(7, 23, 57, 0.98), rgba(16, 57, 112, 0.95));
  box-shadow: inset 0 0 18px rgba(59, 143, 255, 0.22), 0 18px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(84, 170, 255, 0.18);
}

.cube-face-front {
  transform: translateZ(85px);
}

.cube-face-top {
  transform: rotateX(90deg) translateZ(85px);
  background: linear-gradient(180deg, rgba(47, 106, 179, 0.92), rgba(13, 37, 84, 0.92));
}

.cube-face-side {
  transform: rotateY(90deg) translateZ(85px);
  background: linear-gradient(90deg, rgba(12, 28, 78, 0.84), rgba(74, 178, 255, 0.12));
}

.cube-shadow {
  position: absolute;
  width: 220px;
  height: 45px;
  background: radial-gradient(circle, rgba(61, 131, 255, 0.25), transparent 65%);
  bottom: 18px;
  border-radius: 50%;
  z-index: 1;
}

.cube-spot {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(6, 20, 44, 0.9);
  border: 1px solid rgba(86, 175, 255, 0.18);
  border-radius: 16px;
  padding: 12px 14px;
  min-width: 190px;
  box-shadow: 0 0 32px rgba(29, 95, 196, 0.18);
  z-index: 3;
}

.cube-spot.spot-left {
  top: 20%;
  left: 12%;
}

.cube-spot.spot-right {
  bottom: 18%;
  right: 14%;
}

.spot-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #66c3ff;
  box-shadow: 0 0 14px rgba(102, 195, 255, 0.45);
}

.spot-title {
  font-size: 12px;
  font-weight: 700;
}

.spot-detail {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
}

.cube-info {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  z-index: 3;
}

.cube-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
}

.cube-detail {
  color: rgba(255, 255, 255, 0.64);
  font-size: 12px;
}

.center-bottom-charts {
  flex: 1;
  display: flex;
  gap: 8px;
}

.sc-transaction {
  min-height: 140px;
}

.ch-heatmap-box {
  min-height: 140px;
}

.small-chart,
.chart-box {
  /* flex: 1; */
  background: rgba(15, 40, 88, 0.96);
  border: 1px solid rgba(88, 168, 255, 0.16);
  border-radius: 16px;
  padding: 10px;
  /* min-height: 100px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.small-chart-title {
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  margin-bottom: 8px;
}

.right-chart-box {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.country-rank-box {
  flex: 1;
  min-height: 0;
  margin-top: 8px;
}

.radar-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  border-radius: 18px;
  /* background: rgba(12, 30, 63, 0.9);
  border: 1px solid rgba(88, 168, 255, 0.16); */
  overflow: hidden;
}

.radar-card map-echart {
  width: 100%;
}

.radar-label {
  position: absolute;
  color: rgba(255, 255, 255, 0.78);
  font-size: 12px;
  font-weight: 600;
}

.radar-label-top {
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
}

.radar-label-right {
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
}

.radar-label-bottom {
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
}

.radar-label-left {
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
}

.small-card-label {
  color: rgba(255, 255, 255, 0.72);
  font-size: 11px;
  margin-bottom: 8px;
}

.small-card-value {
  font-size: 15px;
  font-weight: 700;
}

.region-list {
  display: grid;
  gap: 10px;
}

.region-item {
  background: rgba(10, 28, 64, 0.9);
  border: 1px solid rgba(82, 158, 255, 0.12);
  border-radius: 14px;
  padding: 14px;
}

.region-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.region-name {
  font-size: 13px;
  font-weight: 700;
}

.region-value {
  color: rgba(255, 255, 255, 0.64);
  font-size: 11px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #44b1ff, #6cffd8);
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
  animation: progressShimmer 2.5s ease-in-out infinite;
  animation-delay: calc(var(--i, 0) * 0.2s + 0.8s);
}

.screen3-footer {
  display: grid;
  flex: 0 0 auto;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 6px;
}

.summary-card {
  background: rgba(9, 23, 51, 0.94);
  border: 1px solid rgba(74, 160, 255, 0.14);
  border-radius: 16px;
  padding: 10px;
  min-height: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.summary-value {
  font-size: 18px;
  margin-top: 6px;
}

.summary-label {
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  margin-top: 10px;
}

.s5-doughnut-box {
  flex: 1;
  min-height: 120px;
}

/* ============================================================
   动画效果
   ============================================================ */

/* -------- 1. 面板入场：上滑 + 淡入 -------- */
@keyframes panelEnter {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
.panel-enter {
  animation: panelEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0s);
}

/* -------- 2. 统计卡片交错入场 -------- */
@keyframes statCardEnter {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.stat-card-enter {
  animation: statCardEnter 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0s);
}

/* -------- 3. 雷达值卡片交错入场 -------- */
@keyframes cardFadeIn {
  from { opacity: 0; transform: translateX(-15px); }
  to   { opacity: 1; transform: translateX(0); }
}
.card-fade-in {
  animation: cardFadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(0.4s + var(--i, 0) * 0.12s);
}

/* -------- 4. 图表淡入 -------- */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
.chart-fade-in {
  animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0s);
}


/* -------- 5. 班级列表交错入场 -------- */
@keyframes classItemEnter {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}
.class-item-enter {
  animation: classItemEnter 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(0.8s + var(--i, 0) * 0.08s);
}

/* -------- 6. 标题流光 -------- */
@keyframes titleShimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.title-shimmer {
  display: inline;
  background: linear-gradient(90deg, #fff 0%, #4fc3f7 25%, #80deea 50%, #4fc3f7 75%, #fff 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleShimmer 4s ease-in-out infinite;
}

/* -------- 7. 数字脉冲高亮 -------- */
@keyframes countHighlight {
  0%   { color: inherit; }
  50%  { color: #80deea; text-shadow: 0 0 20px rgba(79, 195, 247, 0.5); }
  100% { color: inherit; }
}
.metric-count {
  display: inline-block;
  animation: countHighlight 0.6s ease 2s;
}

/* -------- 8. 进度条光泽动画 -------- */
@keyframes progressShimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* -------- 9. 切换按钮发光呼吸 -------- */
@keyframes btnGlow {
  0%, 100% { box-shadow: 0 0 6px rgba(79, 195, 247, 0); }
  50%      { box-shadow: 0 0 18px rgba(79, 195, 247, 0.3); }
}
.top-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}
.top-button:hover {
  background: rgba(79, 195, 247, 0.15);
  border-color: #4fc3f7;
  animation: btnGlow 2s ease-in-out infinite;
  transform: translateY(-1px);
}

/* -------- 10. 底部边框脉动 -------- */
@keyframes borderPulse {
  0%, 100% { border-color: rgba(255, 255, 255, 0.08); }
  50%      { border-color: rgba(79, 195, 247, 0.25); }
}
.screen3-topbar {
  animation: borderPulse 4s ease-in-out 1s infinite;
}

/* -------- 11. 班级项悬停增强 -------- */
.class-item {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.class-item:hover {
  background: rgba(20, 50, 100, 0.96);
  border-color: rgba(79, 195, 247, 0.3);
  transform: translateX(4px);
}

/* -------- 12. 统计卡片悬停增强 -------- */
.school-stat-card {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.school-stat-card:hover {
  border-color: rgba(79, 195, 247, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 195, 247, 0.15);
}

/* -------- 13. 中心卡片悬停增强 -------- */
.center-card {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.center-card:hover {
  border-color: rgba(79, 195, 247, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(79, 195, 247, 0.12);
}

/* -------- 14. 小图表区域悬停 -------- */
.small-chart {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.small-chart:hover {
  border-color: rgba(79, 195, 247, 0.3);
  box-shadow: 0 0 24px rgba(79, 195, 247, 0.08);
}

@keyframes rotateCube {
  0% { transform: rotateX(25deg) rotateY(-35deg); }
  100% { transform: rotateX(25deg) rotateY(325deg); }
}

@keyframes floatUp {
  0% { transform: translateY(12px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@media (max-width: 1380px) {
  .screen3-body {
    grid-template-columns: 1fr;
  }
  .panel {
    min-height: auto;
  }
  .center-top-cards,
  .center-footer-cards,
  .payment-row {
    flex-direction: column;
  }
  .screen3-footer {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .screen3-topbar {
    flex-direction: column;
    align-items: flex-start;
  }
  .top-right {
    align-items: flex-start;
    text-align: left;
  }
  .screen3-body {
    gap: 14px;
  }
  .screen3-footer {
    grid-template-columns: 1fr;
  }
  .cube-area {
    min-height: 320px;
  }
  .cube-spot.spot-left,
  .cube-spot.spot-right {
    position: static;
    width: 100%;
    justify-content: flex-start;
    margin-top: 12px;
  }
  .cube-info {
    position: static;
    transform: none;
    margin-top: 16px;
  }
}

@media (max-width: 720px) {
  .top-time {
    font-size: 28px;
  }
  .top-title {
    font-size: 22px;
  }
  .top-subtitle {
    font-size: 12px;
  }
  .panel {
    padding: 16px;
  }
  .stat-card,
  .small-card,
  .center-card,
  .summary-card,
  .chart-card {
    border-radius: 14px;
  }
}
</style>
