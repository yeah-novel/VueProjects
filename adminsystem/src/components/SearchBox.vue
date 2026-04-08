<template>
  <div class="custom-search">
    <!-- 搜索输入框 -->
    <div class="search-input-wrapper">
      <el-row>
        <el-col :span="20">
          <el-input placeholder="请输入内容"
                    v-model="searchQuery"
                    class="input-with-select"
                    @focus="showHistory = true"
                    @blur="handleBlur"
                    @keyup.enter="handleSearch"
          >
            <el-select v-model="value" slot="prepend" placeholder="请选择" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="4"  class="search-btn">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 历史记录面板 -->
    <transition name="fade">
      <div v-if="showHistory && searchHistory.length > 0" class="history-panel">
        <div class="history-header">
          <span>搜索历史</span>
          <button @click="clearHistory">清空历史</button>
        </div>
        <ul>
          <li
            v-for="(item, index) in searchHistory"
            :key="index"
            @click="selectHistory(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
export default {
  name: "SearchBox",
  data(){
    return {
      searchQuery :'',  // 搜索输入
      showHistory : ref(false), //是否展示历史记录
      searchHistory : [], //历史记录数组
      options: [{
        value: '选项1',
        label: 'PPT模板'
      }, {
        value: '选项2',
        label: 'PPT素材'
      }],
      value: 'PPT模板'
    }
  },
  methods: {
    handleSearch () {
      console.log("handleSearch")
      if (this.searchQuery === '') return
      this.addToHistory(this.searchQuery)
      this.showHistory = false
      console.log('执行搜索:', this.searchQuery) // 替换为实际搜索逻辑
    },
    clearHistory() {
      this.searchHistory = []
    },
    selectHistory (item) {
      this.searchQuery = item
      this.handleSearch()
    },
    addToHistory (query) {
      console.log("handleSearch", query)
      // 去重并限制最多10条
      const index = this.searchHistory.indexOf(query)
      if (index >= 0) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(query)
      if (this.searchHistory.length > 10) {
        this.searchHistory.pop()
      }
    },
    handleBlur() {
      // 使用setTimeout确保点击历史项能先执行
      this.blurTimer = setTimeout(() => {
        this.showHistory = false
      }, 200)
    }
  },
  // 监听数据变化
  watch: {
    /// 同步本地缓存和UI
    searchHistory (newVal, oldVal) {
      localStorage.setItem('searchHistory', JSON.stringify(newVal))
    }
  },
  mounted() {
    const savedHistory = localStorage.getItem('searchHistory')
    if (savedHistory) {
      this.searchHistory = JSON.parse(savedHistory)
    }
  },
  beforeDestroy() {
    clearTimeout(this.blurTimer)
  }
}
</script>

<style scoped>
.custom-search {
  position: relative;
  /*width: 800px;*/
  font-family: Arial, sans-serif;
}

.search-input-wrapper {
  border-radius: 5px;
  overflow: hidden;
  height: 40px;
  padding: 2px 2px 2px 2px;
  background-color: #2E8B57;
}

.input-with-select .el-select {
  width: 105px;
  background-color: #ffffff;
}

.search-input-wrapper .el-button {
  color: #ffffff;
  height: 40px;
}

.search-input-wrapper button {
  background: none;
  border: none;
  padding: 0 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.search-input-wrapper button:hover {
  opacity: 0.8;
}

/* 历史记录面板 */
.history-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 5px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
}

.history-header {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  /*border-bottom: 1px solid #f0f0f0;*/
  font-size: 13px;
  color: #666;
}

.history-header button {
  background: none;
  border: none;
  color: #ff4d4f; /* 主绿色 */
  cursor: pointer;
  font-size: 13px;
}

.history-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-panel li {
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-panel li:hover {
  background-color: #f0f5ea; /* 悬停背景色 */
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
