<template>
  <div class="ws-card">
    <!-- ===== 头部 ===== -->
    <div class="ws-header">
      <div class="ws-title-group">
        <div class="ws-title">Wind speed</div>
        <div class="ws-location">Tarragona, Salou</div>
      </div>
      <div class="ws-date">Wednesday 18</div>
    </div>

    <!-- ===== 描述 ===== -->
    <div class="ws-desc">Lorem ipsum dolor sit amet consectetur. Pellentesque fames aliquet vitae proin aliquam vitae mi mauris.</div>

    <!-- ===== 图表 ===== -->
    <div class="ws-chart-area">
      <svg :width="chartW" :height="chartH" :viewBox="`0 0 ${chartW} ${chartH}`" class="ws-svg">
        <!-- Y网格 -->
        <line v-for="(gy, i) in gridY" :key="'gy-'+i"
          :x1="0" :y1="gy" :x2="chartW" :y2="gy"
          stroke="rgba(255,255,255,0.05)" stroke-width="0.5"
        />
        <!-- Zone one (深蓝区域) -->
        <polygon
          :points="zoneOnePoints"
          fill="rgba(30, 80, 160, 0.25)"
          class="ws-zone"
        />
        <!-- Zone two (浅蓝区域) -->
        <polygon
          :points="zoneTwoPoints"
          fill="rgba(77, 208, 225, 0.15)"
          class="ws-zone"
        />
        <!-- 上线 -->
        <polyline
          :points="line1Points"
          stroke="rgba(30, 80, 160, 0.8)"
          fill="none"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ws-line"
        />
        <!-- 下线 -->
        <polyline
          :points="line2Points"
          stroke="#4dd0e1"
          fill="none"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ws-line"
        />
      </svg>
    </div>

    <!-- ===== 图例 ===== -->
    <div class="ws-legend">
      <div class="ws-legend-item">
        <span class="ws-legend-dot" style="background: rgba(30, 80, 160, 0.8);"></span>
        <span class="ws-legend-label">Zone one</span>
      </div>
      <div class="ws-legend-item">
        <span class="ws-legend-dot" style="background: #4dd0e1;"></span>
        <span class="ws-legend-label">Zone two</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WindSpeedChart',
  data () {
    return {
      chartW: 240,
      chartH: 90
    }
  },
  computed: {
    gridY () {
      const lines = []
      for (let y = 0; y <= this.chartH; y += this.chartH / 3) {
        lines.push(Math.round(y))
      }
      return lines
    },
    line1Points () {
      const w = this.chartW
      const h = this.chartH
      const vals = [12, 18, 14, 22, 16, 20, 15, 24, 18, 22]
      return this.pointsFrom(vals, w, h)
    },
    line2Points () {
      const w = this.chartW
      const h = this.chartH
      const vals = [8, 12, 10, 14, 9, 13, 11, 16, 10, 14]
      return this.pointsFrom(vals, w, h)
    },
    zoneOnePoints () {
      const w = this.chartW
      const h = this.chartH
      const top = this.line1Points
      const bottom = this.line2Points
      // reverse bottom for polygon
      const topArr = top.split(' ').map(p => p.trim()).filter(Boolean)
      const botArr = bottom.split(' ').map(p => p.trim()).filter(Boolean)
      const botReversed = [...botArr].reverse()
      return [...topArr, ...botReversed].join(' ')
    },
    zoneTwoPoints () {
      const w = this.chartW
      const h = this.chartH
      const bot = this.line2Points
      const botArr = bot.split(' ').map(p => p.trim()).filter(Boolean)
      const botReversed = [...botArr].reverse()
      // bottom line + x-axis baseline
      const baseline = `0,${h} ${w},${h}`
      return [...botArr, baseline].join(' ')
    }
  },
  methods: {
    pointsFrom (vals, w, h) {
      const min = Math.min(...vals)
      const max = Math.max(...vals)
      const range = max - min || 1
      const pad = 6
      const stepX = (w - pad * 2) / (vals.length - 1)
      return vals.map((v, i) => {
        const x = Math.round((pad + i * stepX) * 10) / 10
        const y = Math.round((h - 4 - ((v - min) / range) * (h - 8)) * 10) / 10
        return `${x},${y}`
      }).join(' ')
    }
  }
}
</script>

<style scoped>
.ws-card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
}

/* ===== 头部 ===== */
.ws-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 4px;
  flex-shrink: 0;
}

.ws-title {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.ws-location {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 1px;
}

.ws-date {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 500;
  flex-shrink: 0;
}

/* ===== 描述 ===== */
.ws-desc {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1.4;
  margin-bottom: 8px;
  flex-shrink: 0;
}

/* ===== 图表 ===== */
.ws-chart-area {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: flex-end;
}

.ws-svg {
  width: 100%;
  height: 100%;
}

.ws-zone {
  animation: ws-fade-in 0.8s ease-out both;
}

.ws-line {
  animation: ws-draw 1s ease-out both;
}

@keyframes ws-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes ws-draw {
  from { stroke-dasharray: 500; stroke-dashoffset: 500; }
  to { stroke-dasharray: 500; stroke-dashoffset: 0; }
}

/* ===== 图例 ===== */
.ws-legend {
  display: flex;
  gap: 14px;
  margin-top: 6px;
  flex-shrink: 0;
}

.ws-legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ws-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

.ws-legend-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
