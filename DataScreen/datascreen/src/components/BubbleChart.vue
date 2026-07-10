<template>
  <div class="bubble-chart">
    <!-- ===== 顶部栏 ===== -->
    <!-- <div class="bc-topbar">
      <div class="bc-title">Data visualisation</div>
      <div class="bc-time-range">
        <span class="bc-time-label">TIME RANGE</span>
        <div class="bc-time-tabs">
          <span class="bc-time-tab">1W</span>
          <span class="bc-time-tab">1M</span>
          <span class="bc-time-tab bc-time-active">3M</span>
          <span class="bc-time-tab">1Y</span>
          <span class="bc-time-tab">ALL</span>
        </div>
      </div>
    </div> -->

    <!-- ===== 气泡区域 ===== -->
    <div class="bc-bubble-area" ref="bubbleArea">
      <!-- SVG 连线 -->
      <svg class="bc-lines" :width="areaW" :height="areaH"
        :viewBox="`0 0 ${areaW} ${areaH}`" v-if="areaW > 0 && areaH > 0">
        <line v-for="(line, i) in connectionLines" :key="'line-'+i"
          :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"
          stroke="rgba(255,255,255,0.06)" stroke-width="1.2"
          stroke-dasharray="3,4">
          <animate attributeName="stroke-dashoffset" from="0" to="28"
            dur="3s" repeatCount="indefinite" />
        </line>
      </svg>

      <!-- 装饰光环 -->
      <div class="bc-glow-ring" :style="glowRingStyle"></div>

      <!-- 中心大气泡 -->
      <div class="bc-bubble bc-bubble-center" :style="centerStyle">
        <div class="bc-bubble-inner">
          <div class="bc-bubble-label">Investments</div>
          <div class="bc-bubble-value">$76,644</div>
          <div class="bc-bubble-period">3 month</div>
        </div>
      </div>

      <!-- 周围主气泡（两圈分布） -->
      <div
        v-for="(b, idx) in surroundingBubbles"
        :key="'bubble-'+idx"
        class="bc-bubble bc-bubble-surround"
        :class="[b.animClass]"
        :style="b.style"
      >
        <div class="bc-bubble-inner">
          <div class="bc-bubble-label">{{ b.label }}</div>
          <div class="bc-bubble-value">{{ b.value }}</div>
          <div v-if="b.period" class="bc-bubble-period">{{ b.period }}</div>
        </div>
      </div>

      <!-- 小装饰气泡（三圈分布） -->
      <div
        v-for="(dot, idx) in dots"
        :key="'dot-'+idx"
        class="bc-dot"
        :class="[dot.animClass]"
        :style="dot.style"
      ></div>
    </div>

    <!-- ===== 底部统计栏 ===== -->
    <div class="bc-footer">
      <div class="bc-stat">
        <div class="bc-stat-icon bc-icon-goods"></div>
        <div class="bc-stat-info">
          <div class="bc-stat-label">TREND GOODS</div>
          <div class="bc-stat-value">204</div>
        </div>
      </div>
      <div class="bc-stat">
        <div class="bc-stat-icon bc-icon-views"></div>
        <div class="bc-stat-info">
          <div class="bc-stat-label">SHOPPING VIEWS</div>
          <div class="bc-stat-value">65,540</div>
        </div>
      </div>
      <div class="bc-stat">
        <div class="bc-stat-icon bc-icon-dynamics"></div>
        <div class="bc-stat-info">
          <div class="bc-stat-label">STORE DYNAMICS</div>
          <div class="bc-stat-value">325</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const COLORS = {
  red:    ['#ff6b6b', '#e53935', '#b71c1c'],
  orange: ['#ff8a65', '#f4511e', '#bf360c'],
  amber:  ['#ffd54f', '#ffb300', '#ff8f00'],
  purple: ['#e040fb', '#aa00ff', '#7c00b3'],
  deepPurple: ['#b388ff', '#7c4dff', '#4a00b3'],
  blue:   ['#82b1ff', '#448aff', '#0d47a1'],
  cyan:   ['#80deea', '#26c6da', '#00838f'],
  teal:   ['#80cbc4', '#26a69a', '#00695c'],
  pink:   ['#f48fb1', '#ec407a', '#880e4f'],
  indigo: ['#9fa8da', '#5c6bc0', '#283593']
}

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const pick = (arr) => arr[rand(0, arr.length - 1)]

export default {
  name: 'BubbleChart',
  data () {
    return {
      areaW: 400,
      areaH: 400,
      centerPos: { x: 200, y: 195 }
    }
  },
  computed: {
    // 自适应缩放系数：保证所有气泡在容器内 100% 可见
    scale () {
      const pad = 18
      const maxRadius = 310
      const topAvail = this.centerPos.y - pad
      const bottomAvail = this.areaH - this.centerPos.y - pad
      const leftAvail = this.centerPos.x - pad
      const rightAvail = this.areaW - this.centerPos.x - pad
      const avail = Math.min(topAvail, bottomAvail, leftAvail, rightAvail)
      return Math.min(1, Math.max(0.35, avail / maxRadius))
    },
    centerStyle () {
      const s = this.centerPos
      const sc = this.scale
      const r = Math.round(90 * sc)
      const shadowSize = Math.round(70 * sc)
      const baseFont = Math.max(9, Math.round(r * 0.17))
      return {
        left: s.x + 'px',
        top: s.y + 'px',
        width: r * 2 + 'px',
        height: r * 2 + 'px',
        marginLeft: -r + 'px',
        marginTop: -r + 'px',
        fontSize: baseFont + 'px',
        background: `radial-gradient(circle at 32% 28%, #ff6b6b, #e53935, #b71c1c)`,
        boxShadow: `0 0 ${shadowSize}px rgba(229,57,53,0.55), 0 0 ${shadowSize * 2}px rgba(229,57,53,0.2), inset 0 0 ${Math.round(50 * sc)}px rgba(255,255,255,0.08)`
      }
    },
    glowRingStyle () {
      const s = this.centerPos
      const r = Math.round(120 * this.scale)
      return {
        left: s.x + 'px',
        top: s.y + 'px',
        width: r * 2 + 'px',
        height: r * 2 + 'px',
        marginLeft: -r + 'px',
        marginTop: -r + 'px'
      }
    },
    surroundingBubbles () {
      const cx = this.centerPos.x
      const cy = this.centerPos.y
      const sc = this.scale
      const list = [
        { label: 'Development', value: '$31,657', period: '',       angle: -130, size: 105,  colors: COLORS.purple },
        { label: 'Design',      value: '$32,982', period: '3 month', angle: -30,  size: 100, colors: COLORS.orange },
        { label: 'Finance',     value: '$23,657', period: '',        angle: 50,   size: 88,  colors: COLORS.deepPurple },
        { label: 'Business',    value: '$21,987', period: '',        angle: 150,  size: 90,  colors: COLORS.blue },
        { label: 'Marketing',   value: '$18,432', period: '',        angle: -160, size: 78,  colors: COLORS.pink },
        { label: 'Research',    value: '$27,110', period: '',        angle: -85,  size: 82,  colors: COLORS.cyan },
        { label: 'Support',     value: '$15,876', period: '',        angle: -10,  size: 75,  colors: COLORS.teal },
        { label: 'Legal',       value: '$19,543', period: '',        angle: 80,   size: 76,  colors: COLORS.indigo },
        { label: 'HR',          value: '$12,298', period: '',        angle: 170,  size: 72,  colors: COLORS.amber },
        { label: 'Operations',  value: '$24,765', period: '',        angle: 110,  size: 80,  colors: COLORS.deepPurple }
      ]
      return list.map((b, idx) => {
        const dist = Math.round((idx < 4 ? 160 : 240) * sc)
        const size = Math.round(b.size * sc)
        const rad = b.angle * Math.PI / 180
        const x = cx + dist * Math.cos(rad) - size / 2
        const y = cy + dist * Math.sin(rad) - size / 2
        const shadowSize = Math.round(35 * sc)
        const baseFont = Math.max(7, Math.round(size * 0.14))
        return {
          ...b,
          animClass: 'bc-anim-float bc-anim-delay-' + ((idx % 5) + 1),
          style: {
            left: x + 'px',
            top: y + 'px',
            width: size + 'px',
            height: size + 'px',
            fontSize: baseFont + 'px',
            background: `radial-gradient(circle at 32% 28%, ${b.colors[0]}, ${b.colors[1]}, ${b.colors[2]})`,
            boxShadow: `0 0 ${shadowSize}px ${b.colors[1]}55, 0 0 ${shadowSize * 2}px ${b.colors[1]}22, inset 0 0 ${Math.round(25 * sc)}px rgba(255,255,255,0.06)`,
            animationDelay: (idx * 0.15) + 's'
          }
        }
      })
    },
    connectionLines () {
      const cx = this.centerPos.x
      const cy = this.centerPos.y
      const sc = this.scale
      const lines = []
      const angles = [-130, -30, 50, 150, -160, -85, -10, 80, 170, 110]
      const distances = [160, 160, 160, 160, 240, 240, 240, 240, 240, 240]
      angles.forEach((a, i) => {
        const rad = a * Math.PI / 180
        const d = Math.round(distances[i] * sc)
        lines.push({
          x1: cx, y1: cy,
          x2: cx + d * Math.cos(rad),
          y2: cy + d * Math.sin(rad)
        })
      })
      return lines
    },
    dots () {
      const cx = this.centerPos.x
      const cy = this.centerPos.y
      const sc = this.scale
      const palette = [
        'rgba(255,107,107,ALPHA)',
        'rgba(234,87,255,ALPHA)',
        'rgba(68,138,255,ALPHA)',
        'rgba(255,112,67,ALPHA)',
        'rgba(124,77,255,ALPHA)',
        'rgba(38,198,218,ALPHA)',
        'rgba(255,213,79,ALPHA)',
        'rgba(255,255,255,ALPHA)'
      ]
      const rings = [
        { count: 10, distMin: 60,  distMax: 90,  sizeMin: 4,  sizeMax: 7,  alphaMin: 0.3, alphaMax: 0.55 },
        { count: 14, distMin: 120,  distMax: 155, sizeMin: 5,  sizeMax: 9,  alphaMin: 0.2, alphaMax: 0.45 },
        { count: 16, distMin: 190, distMax: 230, sizeMin: 4,  sizeMax: 8,  alphaMin: 0.1, alphaMax: 0.35 }
      ]
      const result = []
      rings.forEach((ring, ri) => {
        const step = 360 / ring.count
        for (let i = 0; i < ring.count; i++) {
          const angle = step * i + rand(-8, 8)
          const dist = Math.round(rand(ring.distMin, ring.distMax) * sc)
          const size = Math.max(2, Math.round(rand(ring.sizeMin, ring.sizeMax) * sc))
          const alpha = (ring.alphaMin + Math.random() * (ring.alphaMax - ring.alphaMin)).toFixed(2)
          const colorStr = pick(palette).replace('ALPHA', alpha)
          const rad = angle * Math.PI / 180
          const x = cx + dist * Math.cos(rad) - size / 2
          const y = cy + dist * Math.sin(rad) - size / 2
          result.push({
            animClass: 'bc-anim-dot bc-anim-dot-' + (ri + 1),
            style: {
              left: x + 'px',
              top: y + 'px',
              width: size + 'px',
              height: size + 'px',
              background: colorStr,
              boxShadow: `0 0 ${size * 3}px ${colorStr}`,
              animationDelay: (rand(0, 30) * 0.1) + 's'
            }
          })
        }
      })
      return result
    }
  },
  methods: {
    updateSize () {
      const el = this.$refs.bubbleArea
      if (!el) return
      const w = el.clientWidth
      const h = el.clientHeight
      this.areaW = w
      this.areaH = h
      this.centerPos = { x: w / 2, y: h / 2 - 5 }
    }
  },
  mounted () {
    this.updateSize()
    this._resizeObserver = new ResizeObserver(() => this.updateSize())
    this._resizeObserver.observe(this.$refs.bubbleArea)
  },
  beforeDestroy () {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }
  }
}
</script>

<style scoped>
.bubble-chart {
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at 50% 40%, #0d1b3e, #060e24);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* ===== 顶部栏 ===== */
.bc-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.bc-title {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.bc-time-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bc-time-label {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 1px;
  font-weight: 500;
}

.bc-time-tabs {
  display: flex;
  gap: 2px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
  padding: 2px;
}

.bc-time-tab {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  padding: 2px 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.bc-time-tab:hover {
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.06);
}

.bc-time-active {
  color: #fff !important;
  background: rgba(79, 195, 247, 0.2) !important;
}

/* ===== 气泡区域 ===== */
.bc-bubble-area {
  flex: 1;
  position: relative;
  min-height: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bc-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* ===== 装饰光环 ===== */
.bc-glow-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.04);
  pointer-events: none;
  animation: bc-ring-pulse 4s ease-in-out infinite;
}

@keyframes bc-ring-pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.08); opacity: 1; }
}

/* ===== 气泡通用 ===== */
.bc-bubble {
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
}

.bc-bubble:hover {
  transform: scale(1.12) !important;
  z-index: 20;
  box-shadow: 0 0 60px rgba(255, 255, 255, 0.15) !important;
}

.bc-bubble-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px;
}

.bc-bubble-label {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
  line-height: 1.3;
  font-size: 0.85em;
}

.bc-bubble-value {
  font-weight: 800;
  color: #fff;
  margin-top: 2px;
  letter-spacing: 0.5px;
  font-size: 1.18em;
}

.bc-bubble-period {
  color: rgba(255, 255, 255, 0.55);
  margin-top: 1px;
  letter-spacing: 0.5px;
  font-size: 0.72em;
}

/* ===== 中心气泡 ===== */
.bc-bubble-center {
  z-index: 10;
  animation: bc-center-float 4s ease-in-out infinite;
}

.bc-bubble-center .bc-bubble-label {
  font-size: 0.88em;
}

.bc-bubble-center .bc-bubble-value {
  margin-top: 4px;
  font-size: 1.3em;
}

.bc-bubble-center .bc-bubble-period {
  margin-top: 2px;
  font-size: 0.75em;
}

@keyframes bc-center-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* ===== 周围气泡浮动 ===== */
.bc-anim-float {
  animation: bc-surround-float 3.5s ease-in-out infinite;
}

.bc-anim-delay-1 { animation-delay: 0s; }
.bc-anim-delay-2 { animation-delay: 0.7s; }
.bc-anim-delay-3 { animation-delay: 1.4s; }
.bc-anim-delay-4 { animation-delay: 2.1s; }
.bc-anim-delay-5 { animation-delay: 2.8s; }

@keyframes bc-surround-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* ===== 小装饰气泡 ===== */
.bc-dot {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.bc-anim-dot {
  animation: bc-dot-float 3s ease-in-out infinite;
}

.bc-anim-dot-1 {
  animation: bc-dot-orbital-1 6s ease-in-out infinite;
}

.bc-anim-dot-2 {
  animation: bc-dot-orbital-2 8s ease-in-out infinite;
}

.bc-anim-dot-3 {
  animation: bc-dot-orbital-3 10s ease-in-out infinite;
}

@keyframes bc-dot-float {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.4); }
}

@keyframes bc-dot-orbital-1 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  25% { transform: translate(4px, -6px) scale(1.3); opacity: 0.7; }
  50% { transform: translate(-3px, 4px) scale(1.1); opacity: 0.5; }
  75% { transform: translate(5px, 3px) scale(1.4); opacity: 0.8; }
}

@keyframes bc-dot-orbital-2 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
  25% { transform: translate(-5px, 3px) scale(1.2); opacity: 0.6; }
  50% { transform: translate(4px, -5px) scale(1.4); opacity: 0.4; }
  75% { transform: translate(-3px, -4px) scale(1.1); opacity: 0.7; }
}

@keyframes bc-dot-orbital-3 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
  25% { transform: translate(6px, 4px) scale(1.3); opacity: 0.5; }
  50% { transform: translate(-4px, -6px) scale(1); opacity: 0.35; }
  75% { transform: translate(3px, 5px) scale(1.5); opacity: 0.6; }
}

/* ===== 底部统计栏 ===== */
.bc-footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
  gap: 12px;
}

.bc-stat {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bc-stat-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  flex-shrink: 0;
}

.bc-icon-goods {
  background: linear-gradient(135deg, #e040fb, #7c4dff);
}

.bc-icon-views {
  background: linear-gradient(135deg, #448aff, #2979ff);
}

.bc-icon-dynamics {
  background: linear-gradient(135deg, #ff7043, #f4511e);
}

.bc-stat-info {
  display: flex;
  flex-direction: column;
}

.bc-stat-label {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.5px;
  font-weight: 500;
}

.bc-stat-value {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}
</style>
