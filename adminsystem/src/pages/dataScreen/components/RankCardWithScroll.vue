<template>
  <div :style="{ 'width':width }">
    <div class="title">
      <span class="text">报警数排名</span>
    </div>
    <div class="ranking-container"
         @mouseenter="pause"
         @mouseleave="resume">
      <transition-group
        name="list"
        tag="div"
        class="ranking-list"
        ref="tableBox"
      >
        <div
          v-for="(item, index) in visibleItems"
          :key="item.id"
          class="ranking-item"
          :class="{'top-three': index < 3}"
          :style="{'height': itemHeight}"
        >
          <!-- 排名标识 -->
          <div class="rank-badge">
            <span v-if="item === tableList[0]">🥇</span>
            <span v-else-if="item === tableList[1]">🥈</span>
            <span v-else-if="item === tableList[2]">🥉</span>
            <span v-else>{{ currentStartIndex + index + 1 }}</span>
            <div class="name">{{ item.name }}</div>
          </div>

          <!-- 内容区域 -->
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: item.value /10 + '%' }"
              :class="['color-' + (index % 5)]"
            ></div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>

</template>

<script>

export default {
  name: 'RankCardWithScroll',
  props: {
    tableList: Array,
    interval: Number,
    width: String,
    visibleNum: Number,
    itemHeight: Number
  },
  data () {
    return {
      currentStartIndex : 0,
      timer : null,
      // visibleItems: [],
    }
  },
  computed: {
    visibleItems: function () {
      return [
        ...this.tableList.slice(this.currentStartIndex),
        ...this.tableList.slice(0, this.currentStartIndex)
      ].slice(0, this.visibleNum)
    }
  },
  mounted () {
    this.start()
  },
  beforeDestroy() {
    this.pause()
  },
  methods: {
    // 生成模拟数据
    generateMockData(count) {
      const maxValue = Math.max(...Array(count).fill(0).map(() => Math.random() * 1000))
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        name: `Item ${i + 1}`,
        value: Math.floor(Math.random() * 1000),
        percentage: Math.floor((Math.random() * 1000) / maxValue * 100)
      })).sort((a, b) => b.value - a.value)
    },
    // 滚动到下一个
    next() {
      this.currentStartIndex = (this.currentStartIndex + 1) % this.tableList.length
    },
    // 启动自动播放
    start() {
      if (!this.timer) {
        this.timer = setInterval(this.next, this.interval)
      }
    },
    pause() {
      clearInterval(this.timer)
      this.timer = null
    },
    resume() {
      if (!this.timer) {
        this.start()
      }
    }
  }
}
</script>

<style scoped>

.title .text {
  color: #f0f0f0;
}

.ranking-container {
  margin-top: 5px;
  overflow: hidden;
}

.ranking-list {
  position: relative;
}

.ranking-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 5px;
  transition: all 0.5s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}

.rank-badge {
  width: 100%;
  height: 23px;
  display: flex;
  margin-right: 15px;
  padding-left: 5px;
}

.rank-badge span {
  color: #f0f0f0;
}

.name {
  font-weight: 400;
  /*margin-bottom: 4px;*/
  margin-left: 10px;
  font-size: small;
  color: #f0f0f0;
}

.progress-bar {
  width: 100%;
  display: flex;
  align-items: center;
  height: 10px;
  background: #248fd8;
  border-radius: 12px;
  position: relative;
}

.progress {
  height: 100%;
  border-radius: 12px;
  transition: width 0.8s ease;
}

.value {
  position: absolute;
  right: 10px;
  color: #ffffff;
  font-size: 0.9em;
}

.color-0 { background: #7B68EE; }
.color-1 { background: #67c23a; }
.color-2 { background: #e6a23c; }
.color-3 { background: #f56c6c; }
.color-4 { background: #AFEEEE; }
</style>
