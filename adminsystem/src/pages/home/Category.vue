<template>
  <div class="menu">
    <el-row v-for="(category, index) in categories"  @mouseenter="hoveredId = category.id"
            @mouseleave="hoveredId = null" :class="{ 'active': hoveredId === category.id }">
      <el-col :span="7">
        <!-- 主分类 -->
        <span :class="{ 'active-text': hoveredId === category.id , 'item-text':true }">{{category.name}}</span>
      </el-col>
      <el-col :span="4" v-for="(sub, index) in category.subs" v-if="index<4">
        <!-- 主分类 -->
        <span :class="{ 'active-text': hoveredId === category.id , 'sub-text':true }">{{sub}}</span>
      </el-col>
    </el-row>
    <transition>

    </transition>
  </div>
</template>

<script>
export default {
  name: "category",
  // props: ['categories'],
  data () {
    return {
      hoveredId:1,
      categories:[
        {
          id:1,
          name:"教学课件",
          subs:["主题班会", "家长会", "说课", "读书笔记"]
        },
        {
          id:2,
          name:"企业职场",
          subs:["工作总结", "述职报告", "岗位竞聘", "公司介绍"]
        },
        {
          id:3,
          name:"竞赛汇报",
          subs:["网络科技","智能农业","文化遗产"]
        },
        {
          id:4,
          name:"其他",
          subs:["旅游旅行", "体育运动", "影视音乐",""]
        }
      ]
    }
  }
}
</script>

<style scoped>
.left-expand-nav {
  --primary-color: #5C832F; /* 主绿色 */
  --hover-bg: #f0f5ea;     /* 悬停背景 */
  --border-color: #A9B586; /* 柔和绿边框 */
  --text-color: #333;
  --level-indent: 20px;    /* 每级缩进量 */
}

.menu {
  /*background-color: #225548;*/
  --primary-color: #2E8B57; /* 主绿色 */
  --hover-bg: #f0f5ea;     /* 悬停背景 */
  --border-color: #A9B586; /* 柔和绿边框 */
  --text-color: #333;
}

.item-text {
  color: #ffffff;
  font-size: medium;
  font-weight: bold;
}

.sub-text {
  color: #ffffff;
  font-size:small;
}
.el-row {
  list-style: none;
  padding: 0;
  margin: 0;
}

.el-col {
  padding: 8px 12px;
  position: relative;
  height: 40px;
}

.active {
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 10px;
}

.active-text {
  color: #000000;
}
</style>

