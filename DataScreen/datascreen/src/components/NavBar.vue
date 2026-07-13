<template>
  <div class="topbar">
    <!-- 左侧：Logo 区域 -->
    <div class="topbar-left">
      <div class="topbar-brand">
        <span class="brand-dot"></span>
        <span class="brand-text">数据大屏</span>
      </div>
    </div>

    <!-- 中间：导航标签 -->
    <div class="topbar-center">
      <div
        v-for="item in navItems"
        :key="item.path"
        class="nav-tab"
        :class="{ 'nav-tab--active': isActive(item.path) }"
        @click="navigate(item.path)"
      >
        <span class="nav-tab-icon">{{ item.icon }}</span>
        <span class="nav-tab-label">{{ item.label }}</span>
        <span class="nav-tab-line"></span>
      </div>
    </div>

    <!-- 右侧：时间 -->
    <div class="topbar-right">
      <div class="topbar-time">{{ currentTime }}</div>
      <div class="topbar-date">{{ currentDate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      currentTime: '',
      currentDate: '',
      timer: null,
      navItems: [
        { path: '/screen1', label: '数据概览', icon: '📊' },
        { path: '/screen2', label: '仪表看板', icon: '📈' },
        { path: '/screen3', label: '学习力分析', icon: '🧠' },
        { path: '/screen4', label: '项目看板', icon: '📋' },
        { path: '/screen5', label: '税办监控', icon: '🏛️' },
        { path: '/screen6', label: '学校大脑', icon: '🏫' }
      ]
    }
  },
  methods: {
    isActive (path) {
      return this.$route.path === path
    },
    navigate (path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    },
    updateDateTime () {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      this.currentTime = `${hours}:${minutes}:${seconds}`
      const weekdays = ['日', '一', '二', '三', '四', '五', '六']
      this.currentDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 星期${weekdays[now.getDay()]}`
    }
  },
  mounted () {
    this.updateDateTime()
    this.timer = setInterval(this.updateDateTime, 1000)
  },
  beforeDestroy () {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>

<style scoped>
/* ===== 顶部导航栏 ===== */
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 20px;
  background: linear-gradient(90deg, rgba(4, 16, 46, 0.92), rgba(10, 42, 94, 0.88));
  border-bottom: 1px solid rgba(79, 195, 247, 0.15);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

/* ---- 左侧 Logo ---- */
.topbar-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.topbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4fc3f7, #0d47a1);
  box-shadow: 0 0 12px rgba(79, 195, 247, 0.6);
}

.brand-text {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(79, 195, 247, 0.3);
}

/* ---- 中间导航 ---- */
.topbar-center {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
  justify-content: center;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  border: 1px solid transparent;
}

.nav-tab:hover {
  background: rgba(79, 195, 247, 0.08);
  border-color: rgba(79, 195, 247, 0.15);
}

.nav-tab--active {
  background: rgba(79, 195, 247, 0.12);
  border-color: rgba(79, 195, 247, 0.25);
}

.nav-tab-icon {
  font-size: 14px;
  line-height: 1;
}

.nav-tab-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.2s;
  white-space: nowrap;
}

.nav-tab:hover .nav-tab-label {
  color: rgba(255, 255, 255, 0.9);
}

.nav-tab--active .nav-tab-label {
  color: #4fc3f7;
  font-weight: 700;
}

.nav-tab-line {
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 2px;
  background: #4fc3f7;
  border-radius: 2px;
  transition: transform 0.25s ease;
  box-shadow: 0 0 8px rgba(79, 195, 247, 0.5);
}

.nav-tab--active .nav-tab-line {
  transform: translateX(-50%) scaleX(1);
}

/* ---- 右侧时间 ---- */
.topbar-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
  flex-shrink: 0;
}

.topbar-time {
  font-size: 16px;
  font-weight: 700;
  color: #4fc3f7;
  letter-spacing: 1px;
  line-height: 1.2;
}

.topbar-date {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.2;
}
</style>
