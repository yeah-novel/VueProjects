<template>
  <div class="school-dashboard">
    <!-- ===== 顶部导航 ===== -->
    <div class="top-bar">
      <div class="top-left">
        <span class="switch-btn">切换大屏</span>
      </div>
      <div class="top-center">
        <div class="header-title">
          <span class="title-deco-left"></span>
          <span class="title-text">学校大脑数据中心</span>
          <span class="title-deco-right"></span>
        </div>
      </div>
      <div class="top-right">
        <span class="switch-btn">切换全屏</span>
      </div>
    </div>

    <!-- ===== 主体区域 ===== -->
    <div class="main-area">
      <!-- ===== 左侧栏 ===== -->
      <div class="left-column">
        <!-- 学校信息 -->
        <div class="panel school-info panel-enter" :style="{ '--d': '0.1s' }">
          <div class="panel-title">学校信息</div>
          <div class="school-name">杭州市第一实验小学</div>
          <div class="school-metrics">
            <div class="metric-item">
              <span class="metric-value metric-count">{{ animatedStudents }}</span>
              <span class="metric-unit">学生数(个)</span>
            </div>
            <div class="metric-divider"></div>
            <div class="metric-item">
              <span class="metric-value metric-count">{{ animatedClasses }}</span>
              <span class="metric-unit">班级数(个)</span>
            </div>
          </div>
        </div>
        <!-- 进度追踪 -->
        <div class="panel right-panel panel-enter" :style="{ '--d': '0.85s' }">
          <div class="panel-title small-title">任务进度</div>
          <div class="pt-container chart-fade-in" :style="{ '--d': '1.1s' }">
            <progress-tracker />
          </div>
        </div>
        <!-- 课程概况 -->
        <div class="panel course-overview panel-enter" :style="{ '--d': '0.25s' }">
          <div class="panel-title">课程概况</div>
          <div class="progress-list">
            <div class="progress-item" v-for="(item, index) in courseData" :key="index">
              <div class="progress-label">{{ item.label }}</div>
              <div class="progress-bar-bg">
                <div
                  class="progress-bar-fill"
                  :style="{
                    width: progressWidths[index] + '%',
                    background: item.color,
                    '--i': index
                  }"
                ></div>
              </div>
              <div class="progress-percent" :style="{ color: item.color }">{{ progressWidths[index] }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 中间区域 ===== -->
      <div class="center-column">
        <div class="panel center-panel panel-enter" :style="{ '--d': '0.4s' }">
          <div class="panel-title center-title">学习力实时分析</div>
          <div class="center-charts">
            <!-- 柱状图 -->
            <div class="chart-container chart-container--bar chart-fade-in" :style="{ '--d': '0.6s' }">
              <div class="chart-subtitle">能力评价分布</div>
              <map-echart echarts-type="schoolBar" height="100%" />
            </div>
            <!-- 雷达图 -->
            <div class="chart-container chart-container--radar chart-fade-in" :style="{ '--d': '0.8s' }">
              <div class="radar-center-score">
                <div class="radar-score-value">150</div>
                <div class="radar-score-change">↑18</div>
                <div class="radar-score-label">综合学习力</div>
              </div>
              <map-echart echarts-type="schoolRadar" height="100%" />
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 右侧栏 ===== -->
      <div class="right-column">
        <!-- 饼图 -->
        <div class="panel right-panel panel-enter" :style="{ '--d': '0.55s' }">
          <div class="panel-title small-title">注意力 等级人数分布</div>
          <div class="chart-container chart-container--pie chart-fade-in" :style="{ '--d': '0.9s' }">
            <map-echart echarts-type="schoolPie" height="100%" />
          </div>
        </div>
        <!-- 折线图 -->
        <div class="panel right-panel panel-enter" :style="{ '--d': '0.7s' }">
          <div class="panel-title small-title">注意力 指数数据度量</div>
          <div class="chart-container chart-container--line chart-fade-in" :style="{ '--d': '1.0s' }">
            <map-echart echarts-type="schoolLine" height="100%" />
          </div>
        </div>
      </div>
    </div>

    <!-- ===== 底部 - 班级概况 ===== -->
    <div class="bottom-area">
      <div class="panel bottom-panel panel-enter" :style="{ '--d': '0.85s' }">
        <div class="panel-title">班级概况</div>
        <div class="bottom-content">
          <!-- 年级选择器 -->
          <div class="grade-selector">
            <div
              v-for="(grade, index) in grades"
              :key="index"
              :class="['grade-item', { active: activeGrade === index }]"
              @click="activeGrade = index"
            >
              {{ grade }}
            </div>
          </div>
          <!-- 班级卡片列表 -->
          <div class="class-card-list">
            <div
              class="class-card"
              v-for="(cls, index) in filteredClasses"
              :key="index"
              :style="{ '--i': index }"
            >
              <div class="class-name">{{ cls.name }}</div>
              <div class="class-metrics">
                <div class="class-metric">
                  <span class="metric-icon">📊</span>
                  <span>综合学习力: {{ cls.score }}</span>
                </div>
                <div class="class-metric">
                  <span class="metric-icon">👥</span>
                  <span>人数: {{ cls.students }}</span>
                </div>
              </div>
              <div class="class-trend" :class="cls.trend > 0 ? 'up' : 'down'">
                {{ cls.trend > 0 ? '↑' : '↓' }}{{ Math.abs(cls.trend) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapEchart from '../components/Echart/MapEchart.vue'
import ProgressTracker from '../components/ProgressTracker.vue'

export default {
  name: 'Screen6',
  components: { mapEchart, ProgressTracker },
  data () {
    return {
      activeGrade: 0,
      // 数字动画
      animatedStudents: 0,
      animatedClasses: 0,
      // 进度条动画宽度
      progressWidths: [0, 0, 0, 0, 0, 0, 0],
      grades: ['全部年级', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
      courseData: [
        { label: '语文', percent: 99, color: '#4fc3f7' },
        { label: '数学', percent: 90, color: '#66bb6a' },
        { label: '英语', percent: 80, color: '#ffb74d' },
        { label: '科学', percent: 0, color: '#ef5350' },
        { label: '音乐', percent: 100, color: '#ab47bc' },
        { label: '体育', percent: 62, color: '#26c6da' },
        { label: '美术', percent: 30, color: '#ff8a65' }
      ],
      allClasses: [
        { name: '一年级1班', score: 149, students: 56, trend: 8, grade: '一年级' },
        { name: '一年级05班', score: 149, students: 56, trend: 8, grade: '一年级' },
        { name: '一年级07班', score: 149, students: 56, trend: -3, grade: '一年级' },
        { name: '一年级03班', score: 148, students: 55, trend: 6, grade: '一年级' },
        { name: '一年级08班', score: 150, students: 57, trend: 12, grade: '一年级' },
        { name: '二年级1班', score: 152, students: 54, trend: 5, grade: '二年级' },
        { name: '二年级03班', score: 147, students: 58, trend: -2, grade: '二年级' },
        { name: '二年级05班', score: 151, students: 53, trend: 9, grade: '二年级' },
        { name: '三年级1班', score: 146, students: 55, trend: 4, grade: '三年级' },
        { name: '三年级04班', score: 153, students: 52, trend: 7, grade: '三年级' },
        { name: '四年级2班', score: 148, students: 57, trend: -1, grade: '四年级' },
        { name: '四年级05班', score: 150, students: 56, trend: 10, grade: '四年级' },
        { name: '五年级1班', score: 155, students: 50, trend: 15, grade: '五年级' },
        { name: '五年级03班', score: 147, students: 54, trend: 3, grade: '五年级' },
        { name: '六年级1班', score: 154, students: 48, trend: 11, grade: '六年级' },
        { name: '六年级02班', score: 149, students: 51, trend: 6, grade: '六年级' }
      ]
    }
  },
  computed: {
    filteredClasses () {
      if (this.activeGrade === 0) return this.allClasses
      const grade = this.grades[this.activeGrade]
      return this.allClasses.filter(c => c.grade === grade)
    }
  },
  mounted () {
    this.animateNumbers()
    this.animateProgressBars()
  },
  methods: {
    // 数字滚动动画
    animateNumbers () {
      const studentTarget = 3150
      const classTarget = 78
      const duration = 1800
      const startTime = Date.now()

      const tick = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        this.animatedStudents = Math.round(eased * studentTarget)
        this.animatedClasses = Math.round(eased * classTarget)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    },
    // 进度条展开动画
    animateProgressBars () {
      const duration = 1000
      const startTime = Date.now()
      const targets = this.courseData.map(d => d.percent)

      const tick = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3)
        this.progressWidths = targets.map(t => Math.round(eased * t))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  }
}
</script>

<style scoped>
/* ==================== 全局 ==================== */
.school-dashboard {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0b1e3a 0%, #1a3f7a 40%, #0d47a1 100%);
  display: flex;
  flex: 1 auto 1; 
  flex-direction: column;
  padding: 12px 16px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #fff;
}

.panel {
  background: rgba(12, 30, 70, 0.55);
  border: 1px solid rgba(79, 195, 247, 0.12);
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  overflow: hidden;
}

.panel-title {
  color: #4fc3f7;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 12px;
  padding-left: 10px;
  border-left: 3px solid #4fc3f7;
}

.small-title {
  font-size: 13px;
  margin-bottom: 8px;
}

/* ==================== 顶部导航 ==================== */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  padding: 6px 0 12px 0;
}

.top-left,
.top-right {
  flex: 0 0 auto;
}

.switch-btn {
  display: inline-block;
  padding: 6px 16px;
  border: 1px solid rgba(79, 195, 247, 0.4);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.switch-btn:hover {
  background: rgba(79, 195, 247, 0.15);
  border-color: #4fc3f7;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 14px;
}

.title-text {
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 4px;
  text-shadow: 0 0 30px rgba(79, 195, 247, 0.3);
}

.title-deco-left,
.title-deco-right {
  display: block;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #4fc3f7, transparent);
}

/* ==================== 主体区域 ==================== */
.main-area {
  display: flex;
  gap: 14px;
  flex: 1;
  min-height: 0;
  max-height: 65vh;
}

/* ===== 左侧栏 ===== */
.left-column {
  width: 15vw;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

/* 学校信息 */
.school-info {
  flex-shrink: 0;
}

.school-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 14px;
  color: #fff;
  letter-spacing: 0.5px;
}

.school-metrics {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 8px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.metric-value {
  font-size: 28px;
  font-weight: 800;
  color: #4fc3f7;
  line-height: 1.1;
}

.metric-unit {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
}

.metric-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
}

/* 课程概况 */
.course-overview {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.course-overview .panel-title {
  flex-shrink: 0;
}

.progress-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
  overflow-y: auto;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.progress-label {
  width: 32px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-align: right;
  flex-shrink: 0;
}

.progress-bar-bg {
  flex: 1;
  height: 10px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 5px;
  min-width: 0;
}

.progress-percent {
  width: 32px;
  font-size: 11px;
  font-weight: 600;
  text-align: right;
  flex-shrink: 0;
}

/* ===== 中间区域 ===== */
.center-column {
  flex: 1;
  min-width: 0;
  min-height: 0;
}

.center-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.center-title {
  flex-shrink: 0;
}

.center-charts {
  flex: 1;
  display: flex;
  gap: 12px;
  min-height: 0;
}

.chart-container {
  position: relative;
  min-height: 0;
}

.chart-container--bar {
  flex: 1.1;
}

.chart-container--radar {
  flex: 1;
}

.chart-subtitle {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  z-index: 10;
}

/* 雷达图中心分数 */
.chart-container--radar {
  position: relative;
}

.radar-center-score {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  pointer-events: none;
}

.radar-score-value {
  font-size: 34px;
  font-weight: 800;
  color: #4fc3f7;
  line-height: 1;
  text-shadow: 0 0 20px rgba(79, 195, 247, 0.4);
}

.radar-score-change {
  font-size: 14px;
  font-weight: 700;
  color: #66bb6a;
  margin-top: 2px;
}

.radar-score-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
  letter-spacing: 1px;
}

/* ===== 右侧栏 ===== */
.right-column {
  width: 20vw;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chart-container--pie,
.chart-container--line {
  flex: 1;
  min-height: 0;
}

/* ===== 进度追踪 ===== */
.pt-container {
  flex: 1;
  min-height: 0;
}

/* ==================== 底部 - 班级概况 ==================== */
.bottom-area {
  flex-shrink: 0;
  margin-top: 12px;
  max-height: 20vh;
}

.bottom-panel {
  display: flex;
  height: 100%;
  flex-direction: column;
  /* padding: 12px 16px; */
}

.bottom-panel .panel-title {
  flex-shrink: 0;
  margin-bottom: 10px;
}

.bottom-content {
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

/* 年级选择器 */
.grade-selector {
  width: 80px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.grade-item {
  padding: 5px 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  white-space: nowrap;
}

.grade-item:hover {
  background: rgba(79, 195, 247, 0.1);
  color: #fff;
}

.grade-item.active {
  background: rgba(79, 195, 247, 0.2);
  color: #4fc3f7;
  font-weight: 700;
  border: 1px solid rgba(79, 195, 247, 0.3);
}

/* 班级卡片列表 */
.class-card-list {
  flex: 1;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 4px;
}

.class-card {
  min-width: 170px;
  flex-shrink: 0;
  background: rgba(79, 195, 247, 0.06);
  border: 1px solid rgba(79, 195, 247, 0.12);
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  position: relative;
  transition: all 0.2s;
}

.class-card:hover {
  background: rgba(79, 195, 247, 0.12);
  border-color: rgba(79, 195, 247, 0.3);
  transform: translateY(-2px);
}

.class-name {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
}

.class-metrics {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.class-metric {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 4px;
}

.metric-icon {
  font-size: 12px;
}

.class-trend {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 14px;
  font-weight: 700;
}

.class-trend.up {
  color: #66bb6a;
}

.class-trend.down {
  color: #ef5350;
}

/* ============================================================
   动画效果
   ============================================================ */

/* -------- 1. 面板入场：上滑 + 淡入 -------- */
@keyframes panelEnter {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-enter {
  animation: panelEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0s);
}

/* -------- 2. 图表淡入 -------- */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chart-fade-in {
  animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0s);
}

/* -------- 3. 班级卡片交错入场 -------- */
@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateX(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.class-card {
  animation: cardSlideIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(0.9s + var(--i, 0) * 0.06s);
}

/* -------- 4. 数字脉冲高亮 -------- */
@keyframes countHighlight {
  0% { color: #4fc3f7; }
  50% { color: #b3e5fc; text-shadow: 0 0 20px rgba(79, 195, 247, 0.6); }
  100% { color: #4fc3f7; }
}

.metric-count {
  display: inline-block;
  animation: countHighlight 0.6s ease 1.8s;
}

/* -------- 5. 标题装饰线流光 -------- */
@keyframes decoShimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

.title-deco-left,
.title-deco-right {
  background: linear-gradient(90deg, transparent, #4fc3f7, #80deea, #4fc3f7, transparent);
  background-size: 200% 100%;
  animation: decoShimmer 3s ease-in-out infinite;
}

/* -------- 6. 雷达中心分数呼吸光晕 -------- */
@keyframes scorePulse {
  0%, 100% { text-shadow: 0 0 20px rgba(79, 195, 247, 0.4); }
  50% { text-shadow: 0 0 40px rgba(79, 195, 247, 0.8), 0 0 60px rgba(79, 195, 247, 0.3); }
}

.radar-score-value {
  animation: scorePulse 3s ease-in-out infinite;
}

/* -------- 7. 进度条波纹光泽 -------- */
@keyframes progressShimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-bar-fill {
  position: relative;
  overflow: hidden;
}

.progress-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: progressShimmer 2.5s ease-in-out infinite;
  animation-delay: calc(var(--i, 0) * 0.15s + 1s);
}

/* -------- 8. 切换按钮边框发光 -------- */
@keyframes btnGlow {
  0%, 100% { box-shadow: 0 0 4px rgba(79, 195, 247, 0); }
  50% { box-shadow: 0 0 12px rgba(79, 195, 247, 0.25); }
}

.switch-btn {
  position: relative;
  overflow: hidden;
}

.switch-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(79, 195, 247, 0.08) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}

.switch-btn:hover::after {
  opacity: 1;
  animation: btnGlow 2s ease-in-out infinite;
}

/* -------- 9. 面板呼吸边框 -------- */
@keyframes borderGlow {
  0%, 100% { border-color: rgba(79, 195, 247, 0.12); }
  50% { border-color: rgba(79, 195, 247, 0.25); }
}

.panel {
  animation: borderGlow 4s ease-in-out 2s infinite;
}

/* -------- 10. 标题文字渐显 -------- */
@keyframes titleReveal {
  from {
    opacity: 0;
    letter-spacing: 12px;
    filter: blur(4px);
  }
  to {
    opacity: 1;
    letter-spacing: 4px;
    filter: blur(0);
  }
}

.title-text {
  animation: titleReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* -------- 11. 年级选中态呼吸 -------- */
@keyframes activeGradePulse {
  0%, 100% { box-shadow: 0 0 6px rgba(79, 195, 247, 0.15); }
  50% { box-shadow: 0 0 14px rgba(79, 195, 247, 0.3); }
}

.grade-item.active {
  animation: activeGradePulse 2.5s ease-in-out infinite;
}

/* -------- 12. 分隔线渐亮 -------- */
@keyframes dividerGlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.metric-divider {
  animation: dividerGlow 3s ease-in-out infinite;
}
</style>
