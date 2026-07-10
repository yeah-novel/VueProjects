<template>
  <div class="cr-card">
    <!-- ===== 标题区 ===== -->
    <div class="cr-header">
      <div class="cr-title">Average of the first economies</div>
      <div class="cr-subtitle">Minim dolor in amet nulla laboris enim dolore consequatt.</div>
    </div>

    <!-- ===== 列表头部 ===== -->
    <div class="cr-list-header">
      <span class="cr-list-title">List of countries</span>
      <span class="cr-list-count">{{ countries.length }} countries</span>
    </div>

    <!-- ===== 水平条 ===== -->
    <div class="cr-bars">
      <div
        class="cr-bar-row"
        v-for="(item, idx) in countries"
        :key="idx"
        :style="{ '--i': idx }"
      >
        <span class="cr-bar-rank">{{ idx + 1 }}</span>
        <div class="cr-bar-track">
          <div
            class="cr-bar-fill"
            :style="{ width: item.width + '%', background: item.color }"
          ></div>
        </div>
        <div class="cr-bar-info">
          <span class="cr-bar-name">{{ item.name }}</span>
          <span class="cr-bar-value">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <!-- ===== 底部文字 ===== -->
    <div class="cr-footer-text">Minim dolor in amet nulla laboris enim dolore consequatt.</div>
  </div>
</template>

<script>
export default {
  name: 'CountryRank',
  computed: {
    countries () {
      const raw = [
        { name: 'Noruega',          value: 803 },
        { name: 'Australia',        value: 784 },
        { name: 'Suiza',            value: 775 },
        { name: 'Países Bajos',     value: 752 },
        { name: 'Estados Unidos',   value: 719 },
        { name: 'Alemania',         value: 711 },
        { name: 'Nueva Zelanda',    value: 698 },
        { name: 'Canadá',           value: 680 }
      ]
      const maxVal = Math.max(...raw.map(r => r.value))
      const colors = [
        'linear-gradient(90deg, #4dd0e1, #26c6da)',
        'linear-gradient(90deg, #66bb6a, #43a047)',
        'linear-gradient(90deg, #ffb74d, #ff9800)',
        'linear-gradient(90deg, #7c4dff, #651fff)',
        'linear-gradient(90deg, #ef5350, #e53935)',
        'linear-gradient(90deg, #42a5f5, #1e88e5)',
        'linear-gradient(90deg, #ab47bc, #8e24aa)',
        'linear-gradient(90deg, #26a69a, #00897b)'
      ]
      return raw.map((r, idx) => ({
        ...r,
        color: colors[idx % colors.length],
        width: Math.round((r.value / maxVal) * 100)
      }))
    }
  }
}
</script>

<style scoped>
.cr-card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
}

/* ===== 标题 ===== */
.cr-header {
  margin-bottom: 10px;
  flex-shrink: 0;
}

.cr-title {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.cr-subtitle {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 3px;
  line-height: 1.4;
}

/* ===== 列表头部 ===== */
.cr-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-shrink: 0;
}

.cr-list-title {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.cr-list-count {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
}

/* ===== 水平条 ===== */
.cr-bars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 0;
  overflow-y: auto;
}

.cr-bar-row {
  display: flex;
  align-items: center;
  gap: 8px;
  animation: cr-slide-in 0.5s ease-out both;
  animation-delay: calc(var(--i) * 0.07s);
}

@keyframes cr-slide-in {
  from { opacity: 0; transform: translateX(-16px); }
  to { opacity: 1; transform: translateX(0); }
}

.cr-bar-rank {
  width: 18px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.35);
  text-align: right;
  flex-shrink: 0;
}

.cr-bar-track {
  flex: 1;
  height: 18px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 9px;
  overflow: hidden;
  min-width: 0;
}

.cr-bar-fill {
  height: 100%;
  border-radius: 9px;
  transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: cr-bar-grow 0.8s ease-out both;
  animation-delay: calc(var(--i) * 0.07s + 0.2s);
}

@keyframes cr-bar-grow {
  from { width: 0 !important; }
}

.cr-bar-info {
  display: flex;
  flex-direction: column;
  width: 110px;
  flex-shrink: 0;
}

.cr-bar-name {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.2;
}

.cr-bar-value {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.2;
}

/* ===== 底部 ===== */
.cr-footer-text {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.25);
  margin-top: 8px;
  flex-shrink: 0;
  line-height: 1.3;
}
</style>
