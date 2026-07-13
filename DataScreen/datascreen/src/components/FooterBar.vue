<template>
  <div class="footerbar">
    <div class="footer-left">
      <span class="footer-date">{{ footerDate }}</span>
    </div>
    <div class="footer-center">
      数据可视化大屏展示系统
    </div>
    <div class="footer-right">
      <span>技术支持</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  data () {
    return {
      footerDate: ''
    }
  },
  mounted () {
    this.updateFooterDate()
    setInterval(this.updateFooterDate, 60000)
  },
  methods: {
    updateFooterDate () {
      const now = new Date()
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const y = now.getFullYear()
      const m = String(now.getMonth() + 1).padStart(2, '0')
      const d = String(now.getDate()).padStart(2, '0')
      const w = weekdays[now.getDay()]
      this.footerDate = `${y}年${m}月${d}日 ${w}`
    }
  }
}
</script>

<style scoped>
.footerbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  padding: 0 20px;
  background: rgba(4, 16, 46, 0.85);
  border-top: 1px solid rgba(79, 195, 247, 0.1);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
}

.footer-left,
.footer-right {
  flex-shrink: 0;
}

.footer-center {
  text-align: center;
  letter-spacing: 1px;
}
</style>
