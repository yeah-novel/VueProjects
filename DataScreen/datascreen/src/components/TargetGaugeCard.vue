<template>
  <div class="target-gauge-card" :style="containerStyle" :class="{ 'is-visible': animated }">
    <!-- 卡片标题 -->
    <div class="card-header">
      <div class="header-left">
        <div class="title-icon" :style="{ background: themeGradient }"></div>
        <span class="card-title">{{ title }}</span>
      </div>
      <div class="header-right" v-if="showMore">
        <span class="more-text">详情</span>
        <span class="more-arrow">›</span>
      </div>
    </div>

    <div class="card-body">
      <!-- 左侧：环形图 -->
      <div class="gauge-section" ref="gaugeRef">
        <svg class="gauge-svg" :viewBox="`0 0 ${svgSize} ${svgSize}`" xmlns="http://www.w3.org/2000/svg">
          <!-- 背景轨道 -->
          <circle
            :cx="center"
            :cy="center"
            :r="radius"
            fill="none"
            :stroke="trackColor"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
          />
          <!-- 进度弧 -->
          <circle
            :cx="center"
            :cy="center"
            :r="radius"
            fill="none"
            :stroke="progressColor"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="currentDashOffset"
            class="progress-circle"
            :class="{ 'is-animated': animated }"
            :transform="`rotate(-90, ${center}, ${center})`"
          />
          <!-- 辉光装饰圆 -->
          <circle
            :cx="center"
            :cy="center"
            :r="radius"
            fill="none"
            :stroke="progressColor"
            :stroke-width="strokeWidth + 4"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="currentDashOffset"
            opacity="0.15"
            class="glow-circle"
            :class="{ 'is-animated': animated }"
            :transform="`rotate(-90, ${center}, ${center})`"
          />
          <!-- 中心文字 -->
          <text
            :x="center"
            :y="center - 10"
            text-anchor="middle"
            class="gauge-value"
            fill="#fff"
          >{{ displayValue }}</text>
          <text
            :x="center"
            :y="center + 18"
            text-anchor="middle"
            class="gauge-label"
            :fill="labelColor"
          >{{ mainLabel }}</text>
        </svg>
      </div>

      <!-- 右侧：目标列表 -->
      <div class="targets-section">
        <div
          class="target-item"
          v-for="(item, index) in targets"
          :key="index"
          :style="{ '--delay': index * 0.12 + 's' }"
        >
          <div class="target-dot" :style="{ background: item.color || progressColor }"></div>
          <div class="target-content">
            <span class="target-label">{{ item.label }}</span>
            <span class="target-value">{{ item.value }}</span>
          </div>
        </div>
        <!-- 插槽：允许外部追加额外内容 -->
        <slot name="targets-extra"></slot>
      </div>
    </div>

    <!-- 底部插槽 -->
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TargetGaugeCard',
  props: {
    // 卡片标题
    title: {
      type: String,
      default: '模拟芯片设计中心'
    },
    // 环形图主数值（纯数字，用于滚动动画）
    mainValue: {
      type: [String, Number],
      default: '562万'
    },
    // 数值后缀（如 '万'、'%'）
    valueSuffix: {
      type: String,
      default: ''
    },
    // 环形图主标签
    mainLabel: {
      type: String,
      default: '月度目标'
    },
    // 进度百分比 (0-100)
    percentage: {
      type: Number,
      default: 68,
      validator: val => val >= 0 && val <= 100
    },
    // 目标列表
    targets: {
      type: Array,
      default: () => [
        { label: '年度目标', value: '2435万' },
        { label: '完成进度', value: '68%' }
      ]
    },
    // 主题色
    color: {
      type: String,
      default: '#4fc3f7'
    },
    // 轨道颜色
    trackColor: {
      type: String,
      default: 'rgba(255,255,255,0.08)'
    },
    // 标签颜色
    labelColor: {
      type: String,
      default: 'rgba(255,255,255,0.6)'
    },
    // SVG 尺寸
    svgSize: {
      type: Number,
      default: 160
    },
    // 环的粗细
    strokeWidth: {
      type: Number,
      default: 10
    },
    // 是否显示"详情"
    showMore: {
      type: Boolean,
      default: false
    },
    // 自定义容器样式（合并到 containerStyle）
    cardStyle: {
      type: Object,
      default: () => ({})
    },
    // 卡片宽度（如 '320px'、'50%'、'auto'）
    width: {
      type: String,
      default: ''
    },
    // 卡片高度（如 '200px'、'auto'）
    height: {
      type: String,
      default: ''
    },
    // 单元格布局下固定宽度（与 width 二选一，优先级低于 width）
    cardWidth: {
      type: String,
      default: ''
    },
    // 最小宽度
    cardMinWidth: {
      type: String,
      default: ''
    },
    // 动画持续时间(ms)
    animationDuration: {
      type: Number,
      default: 1500
    },
    // 动画延迟(ms)
    animationDelay: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      animated: false,
      displayNum: 0,
      targetNum: 0,
      actualSvgSize: 160
    }
  },
  computed: {
    center() {
      return this.actualSvgSize / 2
    },
    radius() {
      return (this.actualSvgSize - this.strokeWidth) / 2
    },
    circumference() {
      return 2 * Math.PI * this.radius
    },
    dashOffset() {
      return this.circumference * (1 - this.percentage / 100)
    },
    currentDashOffset() {
      return this.animated ? this.dashOffset : this.circumference
    },
    progressColor() {
      return this.color
    },
    themeGradient() {
      return `linear-gradient(135deg, ${this.color}, ${this.adjustColor(this.color, 30)})`
    },
    displayValue() {
      if (this.valueSuffix) {
        return Math.round(this.displayNum) + this.valueSuffix
      }
      return this.mainValue
    },
    gaugeSize() {
      return this.actualSvgSize
    },
    containerStyle() {
      return {
        ...this.cardStyle,
        ...(this.width ? { width: this.width } : {}),
        ...(this.cardWidth && !this.width ? { width: this.cardWidth } : {}),
        ...(this.height ? { height: this.height } : {}),
        ...(this.cardMinWidth ? { minWidth: this.cardMinWidth } : {})
      }
    }
  },
  mounted() {
    // 解析数值用于滚动动画
    const raw = String(this.mainValue)
    const match = raw.match(/^([\d,.]+)/)
    if (match) {
      this.targetNum = parseFloat(match[1].replace(/,/g, ''))
      if (!this.valueSuffix) {
        const suffix = raw.slice(match[1].length)
        this.valueSuffix = suffix
      }
    }

    // 用 ResizeObserver 监听环形图容器尺寸，实现自适应
    this.$nextTick(() => {
      this.observeGaugeSize()
    })

    // 延迟触发动画
    setTimeout(() => {
      this.animated = true
      this.animateNumber()
    }, this.animationDelay)
  },
  beforeDestroy() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }
  },
  methods: {
    adjustColor(hex, percent) {
      const num = parseInt(hex.replace('#', ''), 16)
      const r = Math.min(255, (num >> 16) + percent)
      const g = Math.min(255, ((num >> 8) & 0x00ff) + percent)
      const b = Math.min(255, (num & 0x0000ff) + percent)
      return `rgb(${r},${g},${b})`
    },
    animateNumber() {
      const startTime = performance.now()
      const startVal = 0
      const endVal = this.targetNum
      const duration = this.animationDuration

      const step = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3)
        this.displayNum = startVal + (endVal - startVal) * ease
        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          this.displayNum = endVal
        }
      }
      requestAnimationFrame(step)
    },
    observeGaugeSize() {
      const el = this.$refs.gaugeRef
      if (!el) return

      // 初始同步
      this.syncGaugeSize(el)

      // 用 ResizeObserver 持续监听
      if (window.ResizeObserver) {
        this._resizeObserver = new ResizeObserver(() => {
          this.syncGaugeSize(el)
        })
        this._resizeObserver.observe(el)
      }
    },
    syncGaugeSize(el) {
      const rect = el.getBoundingClientRect()
      const size = Math.round(Math.min(rect.width, rect.height))
      if (size > 20 && size !== this.actualSvgSize) {
        this.actualSvgSize = size
      }
    }
  }
}
</script>

<style scoped>
/* ===== 卡片入场动画 ===== */
.target-gauge-card {
  width: 100%;
  box-sizing: border-box;
  border-radius: 18px;
  padding: 20px;
  backdrop-filter: blur(10px);
  font-family: 'PingFang SC', 'Helvetica Neue', sans-serif;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease;
}
.target-gauge-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.target-gauge-card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

/* ===== 标题栏 ===== */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(10px, 2.5cqi, 20px);
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
}
.is-visible .card-header {
  opacity: 1;
  transform: translateX(0);
}
.header-left {
  display: flex;
  align-items: center;
  gap: clamp(6px, 1.5cqi, 10px);
  min-width: 0;
  overflow: hidden;
}
.title-icon {
  flex-shrink: 0;
  width: clamp(3px, 0.6cqi, 4px);
  height: clamp(14px, 3cqi, 18px);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}
/* 标题图标流光 */
.title-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer-line 2.2s ease-in-out infinite;
}
@keyframes shimmer-line {
  0% { left: -100%; }
  60% { left: 100%; }
  100% { left: 100%; }
}
.card-title {
  font-size: clamp(13px, 2.5cqi, 16px);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.header-right:hover {
  opacity: 1;
}
.more-text {
  font-size: clamp(10px, 1.8cqi, 12px);
  color: rgba(255, 255, 255, 0.7);
}
.more-arrow {
  font-size: clamp(12px, 2.5cqi, 16px);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1;
  transition: transform 0.2s ease;
}
.header-right:hover .more-arrow {
  transform: translateX(3px);
}

/* ===== 主体：环形图 + 目标列表 ===== */
.card-body {
  display: flex;
  /* align-items: center; */
  /* gap: clamp(12px, 3cqi, 24px); */
  container-type: inline-size;
}

/* ===== 环形图区域 ===== */
.gauge-section {
  flex: 0 0 auto;
  width: 50%;
  /* max-width: 180px; */
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.5s ease 0.15s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
}
.is-visible .gauge-section {
  opacity: 1;
  transform: scale(1);
}
.gauge-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* 进度弧动画 */
.progress-circle {
  transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.progress-circle.is-animated {
  filter: drop-shadow(0 0 8px rgba(79, 195, 247, 0.35));
  animation: progress-glow 3s ease-in-out infinite;
}
@keyframes progress-glow {
  0%, 100% { filter: drop-shadow(0 0 6px rgba(79, 195, 247, 0.3)); }
  50% { filter: drop-shadow(0 0 14px rgba(79, 195, 247, 0.55)); }
}

/* 辉光装饰层 */
.glow-circle {
  transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.glow-circle.is-animated {
  animation: glow-pulse 2.8s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.25; }
}

/* 中心数值 */
.gauge-value {
  font-size: 28px;
  font-weight: 800;
  dominant-baseline: central;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s;
}
.is-visible .gauge-value {
  opacity: 1;
  transform: translateY(0);
}

/* 中心标签 */
.gauge-label {
  font-size: 12px;
  font-weight: 400;
  dominant-baseline: central;
  opacity: 0;
  transition: opacity 0.5s ease 0.55s;
}
.is-visible .gauge-label {
  opacity: 1;
}

/* ===== 右侧目标列表 ===== */
.targets-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 2cqi, 16px);
  min-width: 0;
  overflow: hidden;
}
.target-item {
  display: flex;
  align-items: center;
  gap: clamp(6px, 1.5cqi, 12px);
  opacity: 0;
  transform: translateX(-16px);
  transition: opacity 0.45s ease var(--delay, 0.2s),
              transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0.2s);
}
.is-visible .target-item {
  opacity: 1;
  transform: translateX(0);
}
/* 悬停微动 */
.target-item:hover {
  transform: translateX(4px) !important;
}
.target-item:hover .target-value {
  color: v-bind(color);
  transition: color 0.2s ease;
}

.target-dot {
  width: clamp(6px, 1.2cqi, 8px);
  height: clamp(6px, 1.2cqi, 8px);
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 6px currentColor;
  animation: dot-pulse 2s ease-in-out infinite;
}
@keyframes dot-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
}

.target-content {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
  overflow: hidden;
}
.target-label {
  font-size: clamp(10px, 2cqi, 12px);
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.target-value {
  font-size: clamp(13px, 3.5cqi, 18px);
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease;
}

/* ===== 底部分隔 ===== */
.card-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
