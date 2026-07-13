<template>
  <div class="progress-slider-card" :style="containerStyle" :class="{ 'is-visible': animated }">
    <div class="card-header" v-if="title">
      <div class="header-icon" :style="{ background: accentColor }"></div>
      <span class="card-title">{{ title }}</span>
    </div>

    <div class="slider-list">
      <div
        class="slider-row"
        v-for="(item, index) in items"
        :key="index"
        :style="{ '--slide-delay': index * 0.1 + 's' }"
      >
        <!-- 左侧标签 -->
        <span class="slider-label">{{ item.label }}</span>

        <!-- 轨道 -->
        <div class="slider-track">
          <!-- 已填充部分 -->
          <div
            class="slider-fill"
            :style="{
              width: animWidths[index] + '%',
              background: getBarColor(index)
            }"
          >
            <!-- 旋钮 -->
            <span
              class="slider-knob"
              :style="{
                background: getBarColor(index),
                boxShadow: `0 0 8px ${getBarColor(index)}`
              }"
            ></span>
          </div>
          <!-- 未填充暗色部分 -->
          <div class="slider-remain" :style="{ width: (100 - item.percent) + '%' }"></div>
        </div>

        <!-- 右侧数值 -->
        <span class="slider-value">{{ displayNums[index] }}%</span>
      </div>
    </div>

    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressSliderCard',
  props: {
    title: { type: String, default: '' },
    // 颜色方案：交替使用此数组中的颜色
    colors: {
      type: Array,
      default: () => ['#fbbf24', '#2dd4bf', '#f59e0b', '#14b8a6', '#eab308', '#0d9488']
    },
    accentColor: { type: String, default: '#2dd4bf' },
    containerStyle: { type: Object, default: () => ({}) },
    // 滑块数据
    items: {
      type: Array,
      default: () => [
        { label: '数据展示', percent: 82, value: '82%' },
        { label: '数据展示', percent: 65, value: '65%' },
        { label: '数据展示', percent: 90, value: '90%' },
        { label: '数据展示', percent: 45, value: '45%' }
      ]
    },
    animDuration: { type: Number, default: 1200 }
  },
  data() {
    return {
      animated: false,
      displayNums: this.items.map(() => 0),
      animWidths: this.items.map(() => 0)
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.animated = true
        this.animateWidths()
        this.animateNumbers()
      }, 150)
    })
  },
  methods: {
    getBarColor(index) {
      return this.colors[index % this.colors.length]
    },
    animateWidths() {
      this.items.forEach((item, index) => {
        const target = item.percent
        const delay = index * 100
        setTimeout(() => {
          this.$set(this.animWidths, index, target)
        }, delay)
      })
    },
    animateNumbers() {
      this.items.forEach((item, index) => {
        const target = item.percent
        const delay = 400 + index * 100
        const duration = this.animDuration
        setTimeout(() => {
          const startTime = performance.now()
          const step = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            this.$set(this.displayNums, index, Math.round(target * ease))
            if (progress < 1) requestAnimationFrame(step)
            else this.$set(this.displayNums, index, target)
          }
          requestAnimationFrame(step)
        }, delay)
      })
    }
  }
}
</script>

<style scoped>
.progress-slider-card {
  width: 100%;
  box-sizing: border-box;
  border-radius: 18px;
  padding: 20px;
  backdrop-filter: blur(10px);
  font-family: 'PingFang SC', 'Helvetica Neue', sans-serif;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.progress-slider-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.progress-slider-card:hover {
  box-shadow: inset 0 0 40px rgba(19, 83, 179, 0.18), 0 8px 32px rgba(0,0,0,0.25);
}

/* ===== 标题 ===== */
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.header-icon {
  width: 4px;
  height: 18px;
  border-radius: 2px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
/* 图标流光 */
.header-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
  animation: shimmer-line 2.4s ease-in-out infinite;
}
@keyframes shimmer-line {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}
.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

/* ===== 滑块列表 ===== */
.slider-list {
  display: flex;
  flex-direction: column;
  /* gap: 16px; */
}

/* ===== 每一行 ===== */
.slider-row {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 0.4s ease var(--slide-delay, 0s),
              transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) var(--slide-delay, 0s),
              background 0.2s ease;
  padding: 4px 6px;
  border-radius: 8px;
  margin: 0 -6px;
}
.is-visible .slider-row {
  opacity: 1;
  transform: translateX(0);
}
/* 行悬停高亮 */
.slider-row:hover {
  background: rgba(255, 255, 255, 0.04);
}

/* ===== 左侧标签 ===== */
.slider-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  min-width: 56px;
  flex-shrink: 0;
  transition: color 0.2s ease;
}
.slider-row:hover .slider-label {
  color: rgba(255, 255, 255, 0.85);
}

/* ===== 轨道容器 ===== */
.slider-track {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(10, 30, 60, 0.6);
  display: flex;
  overflow: hidden;
  position: relative;
}

/* ===== 已填充（变形 + 流光扫描） ===== */
.slider-fill {
  height: 100%;
  border-radius: 3px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--slide-delay, 0s);
  overflow: hidden;
}
/* 填充条上的流光扫描 */
.slider-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  animation: fill-shimmer 2.8s ease-in-out infinite;
  animation-delay: calc(var(--slide-delay, 0s) + 1.5s);
}
@keyframes fill-shimmer {
  0% { left: -60%; }
  60% { left: 100%; }
  100% { left: 100%; }
}

/* ===== 旋钮（脉冲发光 + 跟随填充动画） ===== */
.slider-knob {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: absolute;
  right: -7px;
  top: 50%;
  transform: translateY(-50%) scale(0);
  border: 2px solid rgba(255, 255, 255, 0.85);
  opacity: 0;
  transition: opacity 0.3s ease calc(var(--slide-delay, 0s) + 1.2s),
              transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--slide-delay, 0s) + 1.2s);
}
.is-visible .slider-knob {
  opacity: 1;
  transform: translateY(-50%) scale(1);
  animation: knob-pulse 2.4s ease-in-out infinite;
  animation-delay: calc(var(--slide-delay, 0s) + 1.6s);
}
@keyframes knob-pulse {
  0%, 100% {
    box-shadow: 0 0 6px currentColor;
    transform: translateY(-50%) scale(1);
  }
  50% {
    box-shadow: 0 0 14px currentColor, 0 0 24px currentColor;
    transform: translateY(-50%) scale(1.15);
  }
}
.slider-row:hover .slider-knob {
  transform: translateY(-50%) scale(1.35) !important;
  animation-play-state: paused;
}

/* ===== 未填充暗色部分（渐变 + 高亮过渡） ===== */
.slider-remain {
  height: 100%;
  background: linear-gradient(90deg, rgba(20, 50, 100, 0.5), rgba(10, 25, 55, 0.3));
  border-radius: 0 3px 3px 0;
  transition: background 0.3s ease;
}
.slider-row:hover .slider-remain {
  background: linear-gradient(90deg, rgba(30, 70, 140, 0.5), rgba(20, 50, 100, 0.35));
}

/* ===== 右侧数值 ===== */
.slider-value {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  min-width: 40px;
  text-align: right;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.3s ease calc(var(--slide-delay, 0s) + 0.7s),
              color 0.2s ease;
}
.is-visible .slider-value {
  opacity: 1;
}
.slider-row:hover .slider-value {
  color: v-bind(accentColor);
}

/* ===== 底部 ===== */
.card-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
