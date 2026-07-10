<template>
  <div class="ps-card">
    <!-- ===== 主数据区 ===== -->
    <div class="ps-hero">
      <div class="ps-primary-label">PRIMARY TEXT</div>
      <div class="ps-primary-value">5.987,34</div>
      <div class="ps-secondary-text">Secondary text</div>
    </div>

    <!-- ===== 水平条形图 ===== -->
    <div class="ps-chart-area">
      <div class="ps-chart">
        <!-- Y轴月份标签 -->
        <div class="ps-yaxis">
          <div class="ps-y-label" v-for="m in months" :key="m">{{ m }}</div>
        </div>
        <!-- 条形区域 -->
        <div class="ps-bars-area">
          <div class="ps-bar-row" v-for="(row, ri) in barRows" :key="ri">
            <!-- Product 3 (粉色) -->
            <div
              class="ps-bar-seg"
              :style="{ width: row.w2 + '%', background: '#f48fb1', left: row.x2 + '%' }"
            ></div>
            <!-- Product 2 (紫色) -->
            <div
              class="ps-bar-seg"
              :style="{ width: row.w1 + '%', background: '#ce93d8', left: row.x1 + '%' }"
            ></div>
            <!-- Product 1 (蓝色) -->
            <div
              class="ps-bar-seg"
              :style="{ width: row.w0 + '%', background: '#4dd0e1', left: row.x0 + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== 图例 ===== -->
    <div class="ps-legend">
      <div class="ps-legend-item" v-for="l in legendItems" :key="l.label">
        <span class="ps-legend-dot" :style="{ background: l.color }"></span>
        <span class="ps-legend-label">{{ l.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrimaryStatsCard',
  data () {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      legendItems: [
        { label: 'Product 1', color: '#4dd0e1' },
        { label: 'Product 2', color: '#ce93d8' },
        { label: 'Product 3', color: '#f48fb1' }
      ]
    }
  },
  computed: {
    barRows () {
      // 数据：[product1, product2, product3] 各月值
      const data = [
        [48, 30, 22],
        [52, 25, 18],
        [38, 35, 27],
        [55, 28, 15],
        [42, 32, 20],
        [50, 22, 28]
      ]
      // 堆积计算位置
      return data.map(d => {
        const total = d.reduce((a, b) => a + b, 0)
        // 从右到左排列: p3(粉)右, p2(紫)中, p1(蓝)左
        const cum = [0, d[0], d[0] + d[1]]
        const widths = d.map(v => Math.round((v / total) * 100))
        const starts = cum.map(c => Math.round((c / total) * 100))
        return {
          w0: widths[0], x0: starts[0],
          w1: widths[1], x1: starts[1],
          w2: widths[2], x2: starts[2]
        }
      })
    }
  }
}
</script>

<style scoped>
.ps-card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
}

/* ===== 主数据 ===== */
.ps-hero {
  margin-bottom: 12px;
  flex-shrink: 0;
}

.ps-primary-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.ps-primary-value {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-top: 2px;
  letter-spacing: 0.5px;
}

.ps-secondary-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 2px;
}

/* ===== 图表 ===== */
.ps-chart-area {
  flex: 1;
  min-height: 0;
  display: flex;
}

.ps-chart {
  display: flex;
  width: 100%;
  gap: 6px;
}

.ps-yaxis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 0;
  flex-shrink: 0;
}

.ps-y-label {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 500;
  line-height: 1;
}

.ps-bars-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
  padding: 2px 0;
}

.ps-bar-row {
  position: relative;
  height: 16px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.ps-bar-seg {
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease-out;
  animation: ps-bar-grow 0.6s ease-out both;
}

@keyframes ps-bar-grow {
  from { width: 0 !important; }
}

/* ===== 图例 ===== */
.ps-legend {
  display: flex;
  gap: 14px;
  margin-top: 8px;
  flex-shrink: 0;
}

.ps-legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ps-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

.ps-legend-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
