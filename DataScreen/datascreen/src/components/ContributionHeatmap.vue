<template>
  <div class="ch-card">
    <!-- ===== 标题 ===== -->
    <div class="ch-header">
      <div class="ch-title">Sales per employee per month</div>
      <div class="ch-subtitle">263 contributions in the last year</div>
    </div>

    <!-- ===== 年份选择 ===== -->
    <div class="ch-years">
      <span
        v-for="(y, idx) in years"
        :key="idx"
        class="ch-year"
        :class="{ 'ch-year-active': idx === activeYear }"
        @click="activeYear = idx"
      >{{ y }}</span>
    </div>

    <!-- ===== 描述文字 ===== -->
    <div class="ch-desc">Minim dolor in amet nulla laboris enim dolore consequat.</div>

    <!-- ===== 热力图网格 ===== -->
    <div class="ch-grid-area">
      <!-- 月份标签 -->
      <div class="ch-months">
        <span v-for="m in monthLabels" :key="m" class="ch-month-label">{{ m }}</span>
      </div>
      <!-- 格子网格 -->
      <div class="ch-grid">
        <div
          v-for="(cell, idx) in cells"
          :key="idx"
          class="ch-cell"
          :style="{ background: cell.color }"
          :title="`${cell.date}: ${cell.count} contributions`"
        ></div>
      </div>
    </div>

    <!-- ===== 底部信息 ===== -->
    <div class="ch-footer">
      <div class="ch-footer-left">
        <span class="ch-footer-text">Learn how we count contributions</span>
      </div>
      <div class="ch-legend">
        <span class="ch-legend-label">Less</span>
        <span class="ch-legend-cell" v-for="lvl in 5" :key="lvl"
          :style="{ background: getLevelColor(lvl - 1) }"
        ></span>
        <span class="ch-legend-label">More</span>
      </div>
    </div>

    <!-- ===== 按钮 ===== -->
    <button class="ch-btn">Show more activity</button>
  </div>
</template>

<script>
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const LEVEL_COLORS = [
  'rgba(255,255,255,0.04)',
  'rgba(77,208,225,0.2)',
  'rgba(77,208,225,0.4)',
  'rgba(77,208,225,0.6)',
  'rgba(77,208,225,0.85)'
]

export default {
  name: 'ContributionHeatmap',
  data () {
    return {
      activeYear: 0,
      years: ['2016', '2017', '2018', '2019'],
      monthLabels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
    }
  },
  computed: {
    cells () {
      const cols = 26
      const rows = 7
      const result = []
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const level = Math.random() < 0.4 ? rand(0, 4) : 0
          result.push({
            color: LEVEL_COLORS[level],
            count: level === 0 ? 0 : rand(1, 15 * level),
            date: `${this.monthLabels[c % 6]} ${r + 1}`
          })
        }
      }
      return result
    }
  },
  methods: {
    getLevelColor (lvl) {
      return LEVEL_COLORS[lvl]
    }
  }
}
</script>

<style scoped>
.ch-card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
}

/* ===== 标题 ===== */
.ch-header {
  margin-bottom: 8px;
  flex-shrink: 0;
}

.ch-title {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.ch-subtitle {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 2px;
}

/* ===== 年份 ===== */
.ch-years {
  display: flex;
  gap: 4px;
  margin-bottom: 6px;
  flex-shrink: 0;
}

.ch-year {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
  padding: 2px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.ch-year:hover {
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
}

.ch-year-active {
  color: #4dd0e1 !important;
  background: rgba(77, 208, 225, 0.12) !important;
}

/* ===== 描述 ===== */
.ch-desc {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
  flex-shrink: 0;
  line-height: 1.4;
}

/* ===== 热力图网格 ===== */
.ch-grid-area {
  flex: 1;
  display: flex;
  gap: 4px;
  min-height: 0;
  overflow: hidden;
}

.ch-months {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 0;
  flex-shrink: 0;
}

.ch-month-label {
  font-size: 8px;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 500;
  line-height: 1;
}

.ch-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(26, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 2px;
  align-content: center;
}

.ch-cell {
  aspect-ratio: 1;
  border-radius: 2px;
  transition: transform 0.15s, opacity 0.15s;
  cursor: pointer;
}

.ch-cell:hover {
  transform: scale(1.3);
  opacity: 0.9;
}

/* ===== 底部 ===== */
.ch-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  flex-shrink: 0;
  gap: 8px;
}

.ch-footer-text {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.3);
}

.ch-legend {
  display: flex;
  align-items: center;
  gap: 3px;
}

.ch-legend-label {
  font-size: 8px;
  color: rgba(255, 255, 255, 0.25);
}

.ch-legend-cell {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

/* ===== 按钮 ===== */
.ch-btn {
  width: 100%;
  margin-top: 8px;
  padding: 7px 0;
  border: 1px solid rgba(79, 195, 247, 0.15);
  background: rgba(79, 195, 247, 0.06);
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s;
  flex-shrink: 0;
  letter-spacing: 0.5px;
}

.ch-btn:hover {
  background: rgba(79, 195, 247, 0.14);
  border-color: rgba(79, 195, 247, 0.3);
  color: #fff;
}
</style>
