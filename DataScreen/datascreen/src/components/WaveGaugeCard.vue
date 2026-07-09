<template>
  <div class="wave-gauge-card" :style="containerStyle" :class="{ 'is-visible': animated }">
    <!-- 环形图主体 -->
    <svg class="gauge-svg" :viewBox="`0 0 ${size} ${size}`" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 外圈渐变 -->
        <linearGradient :id="`ringGrad-${_uid}`" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="ringColorStart" />
          <stop offset="100%" :stop-color="ringColorEnd" />
        </linearGradient>

        <!-- 波浪渐变 1（紫） -->
        <linearGradient :id="`wave1-${_uid}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#a855f7" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.3" />
        </linearGradient>
        <!-- 波浪渐变 2（青） -->
        <linearGradient :id="`wave2-${_uid}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#0d9488" stop-opacity="0.25" />
        </linearGradient>
        <!-- 波浪渐变 3（蓝） -->
        <linearGradient :id="`wave3-${_uid}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.55" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.2" />
        </linearGradient>

        <!-- 内圈阴影裁剪 -->
        <clipPath :id="`innerClip-${_uid}`">
          <circle :cx="cx" :cy="cy" :r="innerR" />
        </clipPath>
      </defs>

      <!-- 外圈背景轨道 -->
      <circle
        :cx="cx" :cy="cy" :r="outerR"
        fill="none"
        :stroke="trackColor"
        :stroke-width="strokeW"
        opacity="0.3"
      />

      <!-- 进度弧 -->
      <circle
        :cx="cx" :cy="cy" :r="outerR"
        fill="none"
        :stroke="`url(#ringGrad-${_uid})`"
        :stroke-width="strokeW"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="currentDashOffset"
        class="progress-ring"
        :class="{ 'is-animated': animated }"
        :transform="`rotate(-90, ${cx}, ${cy})`"
      />

      <!-- 进度端点圆点（旋钮） -->
      <circle
        v-if="showKnob"
        :cx="knobX" :cy="knobY"
        :r="knobR"
        :fill="knobColor"
        class="knob-dot"
        :class="{ 'is-animated': animated }"
        :style="{ filter: `drop-shadow(0 0 4px ${knobColor})` }"
      />

      <!-- 内圈底色（波浪背景） -->
      <circle
        :cx="cx" :cy="cy" :r="innerR"
        fill="rgba(0,0,0,0.6)"
        :stroke="innerBorderColor"
        :stroke-width="1"
      />

      <!-- 波浪区域（在内圈中） -->
      <g :clip-path="`url(#innerClip-${_uid})`">
        <!-- 波浪 1（底层 - 紫） -->
        <path
          :d="wavePath1"
          :fill="`url(#wave1-${_uid})`"
          class="wave wave-1"
        />
        <!-- 波浪 2（中层 - 青） -->
        <path
          :d="wavePath2"
          :fill="`url(#wave2-${_uid})`"
          class="wave wave-2"
        />
        <!-- 波浪 3（上层 - 蓝） -->
        <path
          :d="wavePath3"
          :fill="`url(#wave3-${_uid})`"
          class="wave wave-3"
        />
      </g>

      <!-- 中心数值 -->
      <text
        :x="cx" :y="cy - 8"
        text-anchor="middle"
        class="center-value"
        fill="#fff"
      >{{ displayValue }}</text>
      <text
        :x="cx" :y="cy + 18"
        text-anchor="middle"
        class="center-label"
        :fill="labelColor"
      >{{ label }}</text>
    </svg>

    <!-- 底部插槽 -->
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaveGaugeCard',
  props: {
    // 容器尺寸
    size: { type: Number, default: 200 },
    // 进度百分比
    percentage: { type: Number, default: 52 },
    // 中心数值文字
    value: { type: [String, Number], default: '52%' },
    // 中心标签
    label: { type: String, default: '完成度' },
    // 环起始颜色
    ringColorStart: { type: String, default: '#2dd4bf' },
    // 环结束颜色
    ringColorEnd: { type: String, default: '#06b6d4' },
    // 环轨道颜色
    trackColor: { type: String, default: 'rgba(255,255,255,0.1)' },
    // 内圈边框颜色
    innerBorderColor: { type: String, default: 'rgba(255,255,255,0.08)' },
    // 标签颜色
    labelColor: { type: String, default: 'rgba(255,255,255,0.5)' },
    // 旋钮颜色
    knobColor: { type: String, default: '#2dd4bf' },
    // 旋钮大小
    knobR: { type: Number, default: 5 },
    // 是否显示旋钮
    showKnob: { type: Boolean, default: true },
    // 环粗细占比 (相对 size)
    ringRatio: { type: Number, default: 0.08 },
    // 动画持续时间
    animDuration: { type: Number, default: 1500 },
    // 动画延迟
    animDelay: { type: Number, default: 300 },
    // 自定义样式
    cardStyle: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      animated: false
    }
  },
  computed: {
    cx() { return this.size / 2 },
    cy() { return this.size / 2 },
    strokeW() { return this.size * this.ringRatio },
    outerR() { return (this.size - this.strokeW) / 2 },
    innerR() { return this.outerR - this.strokeW / 2 - 4 },
    circumference() { return 2 * Math.PI * this.outerR },
    dashOffset() { return this.circumference * (1 - this.percentage / 100) },
    currentDashOffset() { return this.animated ? this.dashOffset : this.circumference },
    displayValue() { return this.value },
    containerStyle() {
      return { width: this.size + 'px', height: this.size + 'px', ...this.cardStyle }
    },
    // 旋钮位置（按进度角度）
    knobAngle() {
      return (this.percentage / 100) * 360 - 90
    },
    knobX() {
      return this.cx + this.outerR * Math.cos((this.knobAngle * Math.PI) / 180)
    },
    knobY() {
      return this.cy + this.outerR * Math.sin((this.knobAngle * Math.PI) / 180)
    },
    // 三条波浪路径（在内圈下半部分波动）
    wavePath1() {
      const r = this.innerR
      const cx = this.cx
      const cy = this.cy
      // 底部起始 y = cy + r*0.8，波浪幅度在内圈下半
      const baseY = cy + r * 0.15
      const amp = r * 0.25
      const w = r * 0.8
      const left = cx - r
      const right = cx + r
      return this.buildWavePath(left, right, baseY, amp, w)
    },
    wavePath2() {
      const r = this.innerR
      const cx = this.cx
      const cy = this.cy
      const baseY = cy + r * 0.3
      const amp = r * 0.2
      const w = r * 0.6
      const left = cx - r
      const right = cx + r
      return this.buildWavePath(left, right, baseY, amp, w)
    },
    wavePath3() {
      const r = this.innerR
      const cx = this.cx
      const cy = this.cy
      const baseY = cy + r * 0.45
      const amp = r * 0.15
      const w = r * 0.4
      const left = cx - r
      const right = cx + r
      return this.buildWavePath(left, right, baseY, amp, w)
    }
  },
  methods: {
    buildWavePath(left, right, baseY, amp, _waveWidth) {
      const cx = this.cx
      const bottom = this.cy + this.innerR
      const segments = 8
      const step = (right - left) / segments
      let d = `M ${left} ${bottom}`

      // 从左下角到波浪起点
      d += ` L ${left} ${baseY}`

      // 贝塞尔曲线波浪
      for (let i = 0; i < segments; i++) {
        const x0 = left + i * step
        const x1 = left + (i + 1) * step
        const cpx1 = x0 + step * 0.3
        const cpx2 = x0 + step * 0.7
        const waveY = baseY + (i % 2 === 0 ? -amp : amp)
        const nextWaveY = baseY + ((i + 1) % 2 === 0 ? -amp : amp)
        d += ` C ${cpx1} ${waveY}, ${cpx2} ${nextWaveY}, ${x1} ${nextWaveY}`
      }

      // 回到右下角闭合
      d += ` L ${right} ${bottom} Z`
      return d
    }
  },
  mounted() {
    // 修复 transform rotate 引用
    // 延迟触发动画
    setTimeout(() => {
      this.animated = true
    }, this.animDelay)
  }
}
</script>

<style scoped>
.wave-gauge-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.wave-gauge-card.is-visible {
  opacity: 1;
  transform: scale(1);
}

.gauge-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
  filter: drop-shadow(0 0 20px rgba(45, 212, 191, 0.08));
}

/* 进度环 */
.progress-ring {
  transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.progress-ring.is-animated {
  filter: drop-shadow(0 0 10px rgba(45, 212, 191, 0.3));
}

/* 旋钮 */
.knob-dot {
  opacity: 0;
  transition: opacity 0.3s ease 1.2s;
}
.knob-dot.is-animated {
  opacity: 1;
}
.knob-dot::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

/* 波浪动画 */
.wave {
  animation: wave-drift 4s ease-in-out infinite;
}
.wave-1 { animation-duration: 5s; animation-delay: 0s; }
.wave-2 { animation-duration: 4.2s; animation-delay: 0.5s; }
.wave-3 { animation-duration: 3.5s; animation-delay: 1s; }

@keyframes wave-drift {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6px);
  }
  75% {
    transform: translateX(6px);
  }
}

/* 中心文字 */
.center-value {
  font-size: 28px;
  font-weight: 800;
  dominant-baseline: central;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
}
.is-visible .center-value {
  opacity: 1;
  transform: translateY(0);
}

.center-label {
  font-size: 11px;
  font-weight: 400;
  dominant-baseline: central;
  opacity: 0;
  transition: opacity 0.5s ease 0.7s;
}
.is-visible .center-label {
  opacity: 1;
}

.card-footer {
  margin-top: 12px;
  width: 100%;
}
</style>
