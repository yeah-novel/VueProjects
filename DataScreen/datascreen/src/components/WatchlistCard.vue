<template>
  <div class="wl-card">
    <!-- ===== 头部 ===== -->
    <div class="wl-header">
      <span class="wl-title">Watchlist</span>
      <span class="wl-sort">Price <svg class="wl-sort-icon" width="10" height="10" viewBox="0 0 10 10"><path d="M3 7L5 9L7 7" stroke="rgba(255,255,255,0.35)" fill="none" stroke-width="1.2"/><path d="M3 3L5 1L7 3" stroke="rgba(255,255,255,0.35)" fill="none" stroke-width="1.2"/></svg></span>
    </div>

    <!-- ===== 股票列表 ===== -->
    <div class="wl-list">
      <div class="wl-item" v-for="(stock, idx) in stocks" :key="idx">
        <div class="wl-item-left">
          <span class="wl-symbol">{{ stock.symbol }}</span>
          <span class="wl-company">{{ stock.company }}</span>
        </div>
        <div class="wl-item-right">
          <svg class="wl-sparkline" :width="sparkW" :height="sparkH" :viewBox="`0 0 ${sparkW} ${sparkH}`">
            <polyline
              :points="stock.sparkPoints"
              :stroke="stock.up ? '#4dd0e1' : '#ff5252'"
              fill="none"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="wl-price" :class="stock.up ? 'wl-up' : 'wl-down'">
            {{ stock.price }}
            <span class="wl-arrow">{{ stock.up ? '↑' : '↓' }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- ===== 底部按钮 ===== -->
    <div class="wl-footer">
      <button class="wl-btn-details">Details</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WatchlistCard',
  data () {
    return {
      sparkW: 60,
      sparkH: 24
    }
  },
  computed: {
    stocks () {
      const w = this.sparkW
      const h = this.sparkH
      return [
        {
          symbol: 'AMZN',
          company: 'Amazon Inc',
          price: '1,658.90',
          up: true,
          sparkPoints: this.genSpark(w, h, [12, 18, 14, 20, 16, 22, 19, 24, 21, 18])
        },
        {
          symbol: 'NFLX',
          company: 'Netflix Inc',
          price: '368.90',
          up: false,
          sparkPoints: this.genSpark(w, h, [20, 18, 22, 16, 14, 18, 12, 10, 8, 6])
        },
        {
          symbol: 'AMZN',
          company: 'Amazon Inc',
          price: '1,658.90',
          up: true,
          sparkPoints: this.genSpark(w, h, [8, 14, 10, 16, 12, 18, 14, 20, 17, 22])
        }
      ]
    }
  },
  methods: {
    genSpark (w, h, values) {
      const min = Math.min(...values)
      const max = Math.max(...values)
      const range = max - min || 1
      const stepX = w / (values.length - 1)
      return values.map((v, i) => {
        const x = Math.round(i * stepX * 10) / 10
        const y = h - ((v - min) / range) * (h - 4) - 2
        return `${x},${Math.round(y * 10) / 10}`
      }).join(' ')
    }
  }
}
</script>

<style scoped>
.wl-card {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(10, 30, 65, 0.92), rgba(4, 16, 46, 0.88));
  border: 1px solid rgba(79, 195, 247, 0.12);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backdrop-filter: blur(6px);
}

/* ===== 头部 ===== */
.wl-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.wl-title {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.wl-sort {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.wl-sort-icon {
  opacity: 0.6;
}

/* ===== 列表 ===== */
.wl-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  min-height: 0;
}

.wl-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  transition: background 0.2s;
  cursor: pointer;
  flex-shrink: 0;
}

.wl-item:hover {
  background: rgba(79, 195, 247, 0.06);
}

.wl-item + .wl-item {
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.wl-item-left {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.wl-symbol {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.wl-company {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
}

.wl-item-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wl-sparkline {
  flex-shrink: 0;
}

.wl-price {
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 2px;
}

.wl-up {
  color: #4dd0e1;
}

.wl-down {
  color: #ff5252;
}

.wl-arrow {
  font-size: 12px;
}

/* ===== 底部 ===== */
.wl-footer {
  padding: 10px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.wl-btn-details {
  width: 100%;
  padding: 8px 0;
  border: 1px solid rgba(79, 195, 247, 0.2);
  background: rgba(79, 195, 247, 0.08);
  color: #81d4fa;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s;
  letter-spacing: 1px;
}

.wl-btn-details:hover {
  background: rgba(79, 195, 247, 0.18);
  border-color: rgba(79, 195, 247, 0.35);
  box-shadow: 0 0 20px rgba(79, 195, 247, 0.1);
}
</style>
