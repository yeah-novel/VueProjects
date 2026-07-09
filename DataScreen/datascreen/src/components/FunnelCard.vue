<template>
  <div class="funnel-card-container" :class="{ 'is-visible': animated }">
    <!-- 顶部数据概览 -->
    <div class="header-section">
      <div class="title">{{ title }}</div>
      <div class="stats-row">
        <div class="stat-item blue-circle" style="--stat-delay: 0.2s">
          <div class="stat-value">{{ stats.newSign }}</div>
          <div class="stat-label">新增签约</div>
        </div>
        
        <div class="arrows" style="--arrow-delay: 0.5s">>>></div>

        <div class="stat-item green-circle" style="--stat-delay: 0.35s">
          <div class="stat-value">{{ stats.growthRate }}</div>
          <div class="stat-label">增长率</div>
        </div>

        <div class="arrows" style="--arrow-delay: 0.65s">>>></div>

        <div class="stat-item orange-circle" style="--stat-delay: 0.5s">
          <div class="stat-value">{{ stats.totalSign }}</div>
          <div class="stat-label">累计签约</div>
        </div>
      </div>
    </div>

    <!-- 漏斗与底座区域 -->
    <div class="funnel-wrapper">
      <!-- 3D 底座 -->
      <div class="funnel-base">
        <div class="base-top"></div>
        <div class="base-side"></div>
      </div>

          <!-- 实际漏斗层级 (SVG) -->
      <div class="funnel-layers">
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" class="funnel-svg">
          <defs>
            <!-- 渐变定义 -->
            <linearGradient id="gradient0" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" :style="`stop-color:#4c8bf5;stop-opacity:1`" />
              <stop offset="100%" :style="`stop-color:#2563d8;stop-opacity:1`" />
            </linearGradient>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" :style="`stop-color:#5fa5fb;stop-opacity:1`" />
              <stop offset="100%" :style="`stop-color:#3b89e8;stop-opacity:1`" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" :style="`stop-color:#7cc3fe;stop-opacity:1`" />
              <stop offset="100%" :style="`stop-color:#4aa5e0;stop-opacity:1`" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" :style="`stop-color:#ffce76;stop-opacity:1`" />
              <stop offset="100%" :style="`stop-color:#ffb822;stop-opacity:1`" />
            </linearGradient>
          </defs>
          
          <!-- 3D 侧面效果 -->
          <g v-for="(layer, index) in layers" :key="`side-${index}`">
            <!-- 左侧面 -->
            <polygon
              :points="getSidePoints(index, layers.length, 'left')"
              :fill="`rgba(0,0,0,${0.15 + index * 0.05})`"
              opacity="0.6"
              class="funnel-side"
              :style="{ '--layer-delay': (0.8 + index * 0.15) + 's' }"
            />
            <!-- 右侧面 -->
            <polygon
              :points="getSidePoints(index, layers.length, 'right')"
              :fill="`rgba(0,0,0,${0.1 + index * 0.03})`"
              opacity="0.4"
              class="funnel-side"
              :style="{ '--layer-delay': (0.8 + index * 0.15) + 's' }"
            />
          </g>

          <!-- 主漏斗层 -->
          <g v-for="(layer, index) in layers" :key="`main-${index}`">
            <!-- 多边形漏斗形（梯形，最后变成三角形） -->
            <polygon
              :points="getPolygonPoints(index, layers.length)"
              :fill="`url(#gradient${index})`"
              stroke="#fff"
              stroke-width="1"
              stroke-opacity="0.3"
              class="funnel-layer"
              :style="{ '--layer-delay': (0.8 + index * 0.15) + 's' }"
            />
            
            <!-- 文字层 -->
            <foreignObject 
              :x="0" 
              :y="getTextY(index, layers.length)" 
              :width="400" 
              height="45"
            >
              <div class="layer-text-content" xmlns="http://www.w3.org/1999/xhtml">
                <!-- 左侧：名称+数量 -->
                <div class="layer-left">
                  <span class="layer-name">{{ layer.name }}</span>
                  <span class="layer-count" v-if="layer.count">{{ layer.count }}</span>
                </div>
                
                <!-- 右侧：转化率 -->
                <div class="layer-right" v-if="layer.rate">
                  <span class="conversion-label">转化率</span>
                  <span class="conversion-value">{{ layer.rate }}</span>
                </div>
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunnelCard',
  props: {
    title: { type: String, default: '建行生活签约' },
    stats: {
      type: Object,
      default: () => ({ newSign: 222, growthRate: '16%', totalSign: '13,933' })
    },
    layers: {
      type: Array,
      default: () => [
        { name: '新增用户', count: 13933, rate: '64.12%', color: '#4c8bf5' },
        { name: '激活用户', count: 8934, rate: '55.69%', color: '#5fa5fb' },
        { name: '交易用户', count: 497, rate: '27.20%', color: '#7cc3fe' },
        { name: '复购用户', count: '', rate: '', color: '#ffce76' }
      ]
    }
  },
  data() {
    return { animated: false }
  },
  mounted() {
    this.$nextTick(() => { this.animated = true })
  },
  methods: {
    // 计算多边形坐标 - 整个漏斗呈现三角形
    getPolygonPoints(index, total) {
      const totalHeight = 200
      const gapSize = 5 // 每层间隙
      const layerHeight = (totalHeight - (total - 1) * gapSize) / total
      
      // 考虑间隙计算Y坐标
      const yTop = index * (layerHeight + gapSize)
      const yBottom = yTop + layerHeight

      // 从顶部最宽逐层缩小，形成三角形
      const topWidth = 380 - (index * (380 / total))
      const bottomWidth = 380 - ((index + 1) * (380 / total))

      const xCenter = 200
      return `${xCenter - topWidth / 2}, ${yTop} ${xCenter + topWidth / 2}, ${yTop} ${xCenter + bottomWidth / 2}, ${yBottom} ${xCenter - bottomWidth / 2}, ${yBottom}`
    },
    // 计算3D侧面 - 整个漏斗呈现三角形
    getSidePoints(index, total, side) {
      const totalHeight = 200
      const gapSize = 5
      const layerHeight = (totalHeight - (total - 1) * gapSize) / total

      const yTop = index * (layerHeight + gapSize)
      const yBottom = yTop + layerHeight

      const topWidth = 380 - (index * (380 / total))
      const bottomWidth = 380 - ((index + 1) * (380 / total))

      const xCenter = 200
      const offset = 6 // 3D偏移量

      if (side === 'left') {
        const topLeft = xCenter - topWidth / 2
        const bottomLeft = xCenter - bottomWidth / 2
        return `${topLeft}, ${yTop} ${topLeft + offset}, ${yTop + offset} ${bottomLeft + offset}, ${yBottom + offset} ${bottomLeft}, ${yBottom}`
      } else {
        const topRight = xCenter + topWidth / 2
        const bottomRight = xCenter + bottomWidth / 2
        return `${topRight}, ${yTop} ${topRight + offset}, ${yTop + offset} ${bottomRight + offset}, ${yBottom + offset} ${bottomRight}, ${yBottom}`
      }
    },
    // 计算 Y 轴坐标
    getTextY(index, total) {
      const totalHeight = 200
      const gapSize = 5
      const layerHeight = (totalHeight - (total - 1) * gapSize) / total
      const yTop = index * (layerHeight + gapSize)
      return yTop + 5
    }
  }
}
</script>

<style scoped>
/* ===== 容器入场 ===== */
.funnel-card-container {
  /* padding: 10px 20px; */
  font-family: 'PingFang SC', sans-serif;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
  container-type: inline-size;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.funnel-card-container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 标题 ===== */
.title {
  text-align: center;
  font-size: clamp(14px, 2.5cqi, 18px);
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
}
.is-visible .title {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 顶部圆圈 ===== */
.stats-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(8px, 2cqi, 15px);
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.stat-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: clamp(56px, 10cqi, 80px);
  height: clamp(56px, 10cqi, 80px);
  border-radius: 50%;
  color: white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  flex-shrink: 0;
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) var(--stat-delay, 0.2s),
              transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--stat-delay, 0.2s),
              box-shadow 0.3s ease;
}
.is-visible .stat-item {
  opacity: 1;
  transform: scale(1);
}
.stat-item:hover {
  box-shadow: 0 0 24px rgba(255,255,255,0.15);
  transform: scale(1.08) !important;
}

.stat-value { font-size: clamp(14px, 3cqi, 22px); font-weight: bold; line-height: 1.2; }
.stat-label { font-size: clamp(9px, 1.5cqi, 12px); opacity: 0.9; white-space: nowrap; }
.blue-circle { background: linear-gradient(135deg, #3b8bfd, #6baaff); }
.green-circle { background: linear-gradient(135deg, #26c6da, #4dd0e1); }
.orange-circle { background: linear-gradient(135deg, #ffa726, #ffca28); }

/* ===== 箭头动画 ===== */
.arrows {
  font-size: clamp(14px, 3cqi, 24px);
  color: #8bb4ff;
  font-weight: 900;
  letter-spacing: -2px;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.3s ease var(--arrow-delay, 0.5s);
  animation: arrow-flow 1.8s ease-in-out infinite;
  animation-delay: var(--arrow-delay, 0.5s);
}
.is-visible .arrows {
  opacity: 1;
}
@keyframes arrow-flow {
  0%, 100% { transform: translateX(0); opacity: 0.7; }
  50% { transform: translateX(4px); opacity: 1; }
}

/* ===== 底部包裹 ===== */
.funnel-wrapper {
  position: relative;
  padding-bottom: 30px;
  width: 100%;
}

/* ===== 3D底座 ===== */
.funnel-base {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 40px;
  perspective: 500px;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.4s ease 1s;
}
.is-visible .funnel-base {
  opacity: 1;
}
.base-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(173, 216, 255, 0.25);
  border: 2px solid rgba(173, 216, 255, 0.6);
  border-radius: 50%;
  transform: rotateX(65deg);
  box-shadow: 0 0 30px rgba(100, 149, 237, 0.15);
  animation: base-glow 3s ease-in-out infinite;
}
@keyframes base-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(100, 149, 237, 0.1); }
  50% { box-shadow: 0 0 40px rgba(100, 149, 237, 0.25); }
}
.base-side {
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 100%;
  height: 35px;
  background: radial-gradient(ellipse at center, rgba(100,149,237,0.1) 0%, rgba(173,216,255,0.2) 100%);
  border-radius: 50%;
  transform: rotateX(65deg);
  filter: blur(6px);
}

/* ===== SVG 容器 ===== */
.funnel-layers {
  position: relative;
  z-index: 1;
  width: 100%;
  aspect-ratio: 2 / 1;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
}
.funnel-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* ===== 漏斗层级揭示动画 ===== */
.funnel-layer {
  opacity: 0;
  transform-origin: center center;
  transition: opacity 0.5s ease var(--layer-delay, 0.8s),
              transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) var(--layer-delay, 0.8s);
  transform: scaleX(0.3) scaleY(0);
}
.is-visible .funnel-layer {
  opacity: 1;
  transform: scaleX(1) scaleY(1);
}
/* 悬停高亮 */
.funnel-layer:hover {
  filter: brightness(1.25);
  transition: filter 0.2s ease;
}

/* 3D侧面 */
.funnel-side {
  opacity: 0;
  transition: opacity 0.4s ease var(--layer-delay, 0.8s);
}
.is-visible .funnel-side {
  opacity: 0.6;
}
.is-visible .funnel-side:nth-child(even) {
  opacity: 0.4;
}

/* ===== 文字布局 ===== */
.layer-text-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 clamp(16px, 8cqi, 40px) 0 clamp(24px, 12cqi, 60px);
  height: 100%;
  width: 100%;
  color: white;
  font-size: clamp(10px, 2cqi, 13px);
  box-sizing: border-box;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.35s ease calc(var(--layer-delay, 0.8s) + 0.2s);
}
.is-visible .layer-text-content {
  opacity: 1;
}

.layer-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.layer-name { font-weight: 500; font-size: clamp(10px, 2cqi, 13px); }
.layer-count { font-weight: bold; font-size: clamp(10px, 2.5cqi, 14px); }

.layer-right {
  display: flex;
  align-items: center;
  gap: 6px;
}
.conversion-label { font-size: clamp(8px, 1.5cqi, 11px); opacity: 0.85; }
.conversion-value { font-size: clamp(10px, 2.5cqi, 14px); font-weight: bold; }

</style>
