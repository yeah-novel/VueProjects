<template>
  <div class="s5-page">
    <!-- ===== 顶部栏 ===== -->
    <div class="s5-topbar">
      <div class="s5-top-left">
        <div class="s5-top-label">服务数据</div>
        <div class="s5-mini-gauges">
          <div class="s5-mini-gauge">
            <map-echart echarts-type="semiGauge" width="70px" height="70px" />
            <span class="s5-gauge-val">2.5</span>
            <span class="s5-gauge-tag">平均等候</span>
          </div>
          <div class="s5-mini-gauge">
            <map-echart echarts-type="semiGauge" width="70px" height="70px" />
            <span class="s5-gauge-val">3.5</span>
            <span class="s5-gauge-tag">平均办理</span>
          </div>
          <div class="s5-mini-gauge">
            <map-echart echarts-type="semiGauge" width="70px" height="70px" />
            <span class="s5-gauge-val">4.0</span>
            <span class="s5-gauge-tag">平均耗时</span>
          </div>
        </div>
      </div>
      <div class="s5-top-center">
        <div class="s5-top-title">某某市某某厅办税渠道运行状态监控平台</div>
        <div class="s5-top-subtitle">Tax Service Channel Monitoring Platform</div>
      </div>
      <div class="s5-top-right">
        <div class="s5-top-label">业务数据</div>
        <div class="s5-ring-group">
          <div class="s5-ring-item">
            <map-echart echarts-type="safetyRing" width="50px" height="55px" />
            <span class="s5-ring-val">35</span>
          </div>
          <div class="s5-ring-item">
            <map-echart echarts-type="safetyRing" width="50px" height="55px" />
            <span class="s5-ring-val">20</span>
          </div>
          <div class="s5-ring-item">
            <map-echart echarts-type="safetyRing" width="50px" height="55px" />
            <span class="s5-ring-val">40</span>
          </div>
          <div class="s5-ring-item">
            <map-echart echarts-type="safetyRing" width="50px" height="55px" />
            <span class="s5-ring-val">12</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== 主体区域 ===== -->
    <div class="s5-body">
      <!-- ===== 左列 ===== -->
      <div class="s5-col s5-col-left">
        <!-- 各办税渠道使用情况 -->
        <div class="s5-card">
          <div class="s5-card-title">各办税渠道使用情况</div>
          <div class="s5-chart-box">
            <map-echart echarts-type="screenHorizStackBar" height="200px" />
          </div>
        </div>
        <!-- 接待情况 -->
        <div class="s5-card">
          <div class="s5-card-title">接待情况</div>
          <div class="s5-reception">
            <div class="s5-reception-item">
              <span class="s5-reception-label">本月累计办事人次</span>
              <span class="s5-reception-num">40</span>
              <span class="s5-reception-unit">人</span>
            </div>
            <div class="s5-reception-item">
              <span class="s5-reception-label">今日接待人数</span>
              <span class="s5-reception-num">40</span>
              <span class="s5-reception-unit">人</span>
            </div>
            <div class="s5-reception-item">
              <span class="s5-reception-label">本周接待人数</span>
              <span class="s5-reception-num">101</span>
              <span class="s5-reception-unit">人</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 中列 ===== -->
      <div class="s5-col s5-col-center">
        <!-- 等待人数 -->
        <div class="s5-waiting-area">
          <div class="s5-waiting-main">
            <div class="s5-waiting-label">当前等待人数</div>
            <div class="s5-waiting-num">149</div>
            <div class="s5-waiting-sub">
              <span>今日叫号 <b>20</b></span>
              <span>剩余号 <b>40</b></span>
            </div>
          </div>
          <div class="s5-counter-group">
            <div class="s5-counter">
              <div class="s5-counter-num">32</div>
              <div class="s5-counter-label">综合窗口</div>
            </div>
            <div class="s5-counter">
              <div class="s5-counter-num">12</div>
              <div class="s5-counter-label">自助终端</div>
            </div>
            <div class="s5-counter">
              <div class="s5-counter-num">10</div>
              <div class="s5-counter-label">网上办理</div>
            </div>
          </div>
        </div>

        <!-- 业务办理实时监管汇总 -->
        <div class="s5-card s5-card-monitor">
          <div class="s5-card-title">业务办理实时监管汇总</div>
          <div class="s5-monitor-charts">
            <div class="s5-doughnut-box">
              <map-echart echarts-type="screenPie" height="220px" />
            </div>
          </div>
        </div>

        <!-- 底部小图 -->
        <div class="s5-bottom-charts">
          <div class="s5-card s5-card-tiny">
            <div class="s5-card-title s5-tiny-title">当日各时段大厅人流量曲线图</div>
            <map-echart echarts-type="screenLine" height="120px" />
          </div>
          <div class="s5-card s5-card-tiny">
            <div class="s5-card-title s5-tiny-title">当月大厅人流量变化趋势图</div>
            <map-echart echarts-type="screenLine" height="120px" />
          </div>
        </div>
      </div>

      <!-- ===== 右列 ===== -->
      <div class="s5-col s5-col-right">
        <!-- 区域收入情况 -->
        <div class="s5-card">
          <div class="s5-card-title">区域收入情况</div>
          <div class="s5-income-chart">
            <map-echart echarts-type="screenBar" height="140px" />
          </div>
          <div class="s5-income-stats">
            <div class="s5-income-item">
              <span class="s5-income-val">442户</span>
              <span class="s5-income-amt">32.62万</span>
            </div>
            <div class="s5-income-item">
              <span class="s5-income-val">622户</span>
              <span class="s5-income-amt">52.68万</span>
            </div>
          </div>
          <div class="s5-tax-gauge">
            <span class="s5-tax-label">税收占比</span>
            <map-echart echarts-type="semiGauge" height="100px" />
          </div>
        </div>

        <!-- 数据统计分析 -->
        <div class="s5-card">
          <div class="s5-card-title">数据统计分析</div>
          <map-echart echarts-type="screenBar" height="150px" />
        </div>

        <!-- 风险提醒 -->
        <div class="s5-card">
          <div class="s5-card-title">风险提醒</div>
          <div class="s5-risk-list">
            <div class="s5-risk-item" v-for="(item, idx) in riskList" :key="idx">
              <span class="s5-risk-dot" :style="{ background: item.color }"></span>
              <span class="s5-risk-text">{{ item.text }}</span>
              <a class="s5-risk-link" href="javascript:;">了解详情</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== 底部栏 ===== -->
    <div class="s5-footer">
      <div class="s5-footer-left">
        <span class="s5-footer-date">{{ footerDate }}</span>
      </div>
      <div class="s5-footer-center">
        版权所有：某某软件集团有限公司
      </div>
      <div class="s5-footer-right">
        <button class="s5-btn-back">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import mapEchart from '../components/Echart/MapEchart.vue'

export default {
  name: 'Screen5',
  components: { mapEchart },
  data () {
    return {
      footerDate: '',
      riskList: [
        { text: '某企业存在逾期未申报风险', color: '#ff5252' },
        { text: '某企业发票使用异常预警', color: '#ff9800' },
        { text: '某企业纳税信用等级下降', color: '#ffb74d' },
        { text: '某企业存在虚开发票嫌疑', color: '#4dd0e1' },
        { text: '某企业关联交易异常提醒', color: '#81d4fa' }
      ]
    }
  },
  mounted () {
    this.updateFooterDate()
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
/* ===== 全局 ===== */
.s5-page {
  width: 100%;
  height: 100vh;
  background: radial-gradient(ellipse at center top, #0a2a5e, #04102e);
  color: #fff;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* ===== 顶部栏 ===== */
.s5-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: linear-gradient(90deg, rgba(10, 42, 94, 0.9), rgba(4, 16, 46, 0.6));
  border-bottom: 1px solid rgba(79, 195, 247, 0.15);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.s5-top-left,
.s5-top-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.s5-top-label {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 1px;
  writing-mode: vertical-lr;
  text-orientation: upright;
}

.s5-mini-gauges {
  display: flex;
  gap: 8px;
}

.s5-mini-gauge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  position: relative;
}

.s5-gauge-val {
  font-size: 16px;
  font-weight: 700;
  color: #4dd0e1;
  margin-top: -10px;
}

.s5-gauge-tag {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.55);
}

.s5-top-center {
  text-align: center;
  flex: 1;
}

.s5-top-title {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(90deg, #4dd0e1, #81d4fa, #b3e5fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 3px;
}

.s5-top-subtitle {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 2px;
  margin-top: 2px;
}

.s5-ring-group {
  display: flex;
  gap: 6px;
}

.s5-ring-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.s5-ring-val {
  font-size: 13px;
  font-weight: 700;
  color: #4dd0e1;
  margin-top: -8px;
}

/* ===== 主体 ===== */
.s5-body {
  flex: 1;
  display: flex;
  gap: 12px;
  padding: 10px 16px;
  min-height: 0;
  position: relative;
  z-index: 1;
}

.s5-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.s5-col-left {
  width: 260px;
  flex-shrink: 0;
}

.s5-col-center {
  flex: 1;
  min-width: 0;
}

.s5-col-right {
  width: 280px;
  flex-shrink: 0;
}

/* ===== 卡片 ===== */
.s5-card {
  background: rgba(7, 24, 54, 0.85);
  border: 1px solid rgba(79, 195, 247, 0.12);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: inset 0 0 30px rgba(23, 71, 140, 0.1);
}

.s5-card-title {
  font-size: 14px;
  font-weight: 700;
  color: #b3e5fc;
  padding-left: 10px;
  border-left: 3px solid #4dd0e1;
  line-height: 1.3;
  flex-shrink: 0;
}

.s5-chart-box {
  flex: 1;
  min-height: 0;
}

/* ===== 接待情况 ===== */
.s5-reception {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 0;
}

.s5-reception-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: rgba(79, 195, 247, 0.06);
  border-radius: 6px;
  border-left: 3px solid #4dd0e1;
}

.s5-reception-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  flex: 1;
}

.s5-reception-num {
  font-size: 22px;
  font-weight: 700;
  color: #4dd0e1;
}

.s5-reception-unit {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* ===== 等待区域 ===== */
.s5-waiting-area {
  background: rgba(7, 24, 54, 0.85);
  border: 1px solid rgba(79, 195, 247, 0.12);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-shadow: inset 0 0 30px rgba(23, 71, 140, 0.1);
}

.s5-waiting-main {
  text-align: center;
  flex-shrink: 0;
}

.s5-waiting-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

.s5-waiting-num {
  font-size: 64px;
  font-weight: 900;
  color: #ffd54f;
  line-height: 1;
  text-shadow: 0 0 30px rgba(255, 213, 79, 0.4);
}

.s5-waiting-sub {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.s5-waiting-sub b {
  color: #4dd0e1;
  font-weight: 700;
}

.s5-counter-group {
  display: flex;
  gap: 16px;
  flex: 1;
  justify-content: center;
}

.s5-counter {
  text-align: center;
  padding: 8px 16px;
  background: rgba(79, 195, 247, 0.06);
  border-radius: 8px;
  border: 1px solid rgba(79, 195, 247, 0.1);
  min-width: 70px;
}

.s5-counter-num {
  font-size: 28px;
  font-weight: 700;
  color: #4dd0e1;
}

.s5-counter-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 2px;
}

/* ===== 监管图表 ===== */
.s5-card-monitor {
  flex: 1;
  min-height: 0;
}

.s5-monitor-charts {
  flex: 1;
  display: flex;
  min-height: 0;
}

.s5-doughnut-box {
  flex: 1;
  min-height: 0;
}

/* ===== 底部小图 ===== */
.s5-bottom-charts {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.s5-card-tiny {
  flex: 1;
  padding: 8px 10px;
}

.s5-tiny-title {
  font-size: 12px;
  border-left-width: 2px;
  padding-left: 6px;
}

/* ===== 收入区域 ===== */
.s5-income-chart {
  height: 140px;
}

.s5-income-stats {
  display: flex;
  gap: 12px;
}

.s5-income-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  background: rgba(79, 195, 247, 0.05);
  border-radius: 6px;
}

.s5-income-val {
  font-size: 14px;
  font-weight: 700;
  color: #81d4fa;
}

.s5-income-amt {
  font-size: 12px;
  color: #ffd54f;
  margin-top: 2px;
}

.s5-tax-gauge {
  display: flex;
  align-items: center;
  gap: 10px;
}

.s5-tax-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
}

/* ===== 风险提醒 ===== */
.s5-risk-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.s5-risk-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  font-size: 12px;
}

.s5-risk-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.s5-risk-text {
  flex: 1;
  color: rgba(255, 255, 255, 0.8);
}

.s5-risk-link {
  font-size: 11px;
  color: #4dd0e1;
  text-decoration: none;
  flex-shrink: 0;
}

.s5-risk-link:hover {
  text-decoration: underline;
}

/* ===== 底部栏 ===== */
.s5-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  background: rgba(4, 16, 46, 0.8);
  border-top: 1px solid rgba(79, 195, 247, 0.1);
  flex-shrink: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
}

.s5-btn-back {
  border: 1px solid rgba(79, 195, 247, 0.25);
  background: rgba(79, 195, 247, 0.1);
  color: #81d4fa;
  padding: 5px 16px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.s5-btn-back:hover {
  background: rgba(79, 195, 247, 0.2);
  border-color: rgba(79, 195, 247, 0.4);
}

/* ===== 背景网格 ===== */
.s5-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

/* ===== 光晕 ===== */
.s5-page::after {
  content: '';
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 300px;
  border-radius: 50%;
  background: rgba(74, 146, 255, 0.08);
  filter: blur(80px);
  pointer-events: none;
}
</style>
