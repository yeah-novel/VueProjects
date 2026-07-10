<template>
  <div class="pt-card">
    <!-- ===== 顶部文字 ===== -->
    <div class="pt-header-text">{{ remainingText }}</div>

    <!-- ===== 圆形进度环 + 清单 ===== -->
    <div class="pt-body">
      <!-- 左：环形进度 -->
      <div class="pt-ring-wrapper">
        <svg class="pt-ring" :width="ringSize" :height="ringSize" :viewBox="`0 0 ${ringSize} ${ringSize}`">
          <!-- 背景圆环 -->
          <circle
            :cx="center" :cy="center" :r="radius"
            fill="none"
            :stroke="trackColor"
            :stroke-width="strokeWidth"
          />
          <!-- 前景圆环（分段） -->
          <circle
            v-for="(seg, idx) in segments"
            :key="idx"
            :cx="center" :cy="center" :r="radius"
            fill="none"
            :stroke="seg.color"
            :stroke-width="strokeWidth"
            :stroke-dasharray="seg.dashArray"
            :stroke-dashoffset="seg.dashOffset"
            stroke-linecap="round"
            transform-origin="50% 50%"
            :transform="`rotate(-90, ${center}, ${center})`"
            class="pt-ring-segment"
          />
          <!-- 中心文字 -->
          <text :x="center" :y="center - 4" text-anchor="middle" class="pt-ring-pct">{{ progressPercent }}%</text>
          <text :x="center" :y="center + 14" text-anchor="middle" class="pt-ring-label">Complete</text>
        </svg>
      </div>

      <!-- 右：清单列表 -->
      <div class="pt-checklist">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="pt-check-item"
          :class="{ 'pt-checked': item.checked }"
        >
          <span class="pt-check-icon">{{ item.checked ? '✓' : '○' }}</span>
          <span class="pt-check-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressTracker',
  data () {
    return {
      ringSize: 130,
      strokeWidth: 8,
      trackColor: 'rgba(255,255,255,0.07)',
      progressPercent: 50,
      items: [
        { label: 'Email Verification', checked: true },
        { label: 'Add profile Photo', checked: false },
        { label: 'Link bank account', checked: false }
      ]
    }
  },
  computed: {
    center () { return this.ringSize / 2 },
    radius () { return this.center - this.strokeWidth / 2 - 2 },
    circumference () { return 2 * Math.PI * this.radius },
    remainingText () {
      const done = this.items.filter(i => i.checked).length
      const total = this.items.length
      const left = total - done
      return left > 0
        ? `${left} more step${left > 1 ? 's' : ''} to finish`
        : 'All steps completed!'
    },
    // 将进度环分成 3 段（每段对应一个清单项）
    segments () {
      const total = this.items.length
      const segAngle = 360 / total
      const doneCount = this.items.filter(i => i.checked).length
      const circ = this.circumference
      const segLen = circ / total
      const gap = 3 // 间隔角度（度）
      const gapLen = (gap / 360) * circ

      return this.items.map((item, idx) => {
        const checked = item.checked
        // 已完成项显示颜色，未完成项显示半透明灰色
        const color = checked ? '#4dd0e1' : 'rgba(255,255,255,0.12)'
        // 每段实际长度 = 段长 - 间隔
        const actualLen = segLen - gapLen
        // 偏移：跳过前面的段 + 间隔
        const offset = -circ * (doneCount / total) + idx * segLen + gapLen / 2

        return {
          color,
          dashArray: `${actualLen} ${circ - actualLen}`,
          dashOffset: -offset
        }
      })
    }
  }
}
</script>

<style scoped>
.pt-card {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(10, 30, 65, 0.9), rgba(4, 16, 46, 0.85));
  border: 1px solid rgba(79, 195, 247, 0.12);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
}

/* ===== 顶部文字 ===== */
.pt-header-text {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.5px;
  margin-bottom: 14px;
  flex-shrink: 0;
}

/* ===== 主体 ===== */
.pt-body {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 0;
}

/* ===== 环形进度 ===== */
.pt-ring-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pt-ring {
  display: block;
}

.pt-ring-segment {
  transition: stroke-dashoffset 0.8s ease-out;
}

.pt-ring-pct {
  fill: #fff;
  font-size: 22px;
  font-weight: 800;
}

.pt-ring-label {
  fill: rgba(255, 255, 255, 0.4);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* ===== 清单 ===== */
.pt-checklist {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.pt-check-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.25s;
  cursor: pointer;
}

.pt-check-item:hover {
  background: rgba(79, 195, 247, 0.06);
  border-color: rgba(79, 195, 247, 0.15);
}

.pt-checked {
  background: rgba(77, 208, 225, 0.06);
  border-color: rgba(77, 208, 225, 0.15);
}

.pt-check-icon {
  font-size: 16px;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.pt-checked .pt-check-icon {
  color: #4dd0e1;
  background: rgba(77, 208, 225, 0.12);
}

.pt-check-item:not(.pt-checked) .pt-check-icon {
  color: rgba(255, 255, 255, 0.25);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  font-size: 11px;
}

.pt-check-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pt-checked .pt-check-label {
  color: rgba(255, 255, 255, 0.95);
}
</style>
