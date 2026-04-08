<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#40826D"
      text-color="#ffffff"
      active-text-color="#20a0ff"
      unique-opened
      router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script >
export default {
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-lx-home',
          index: 'dashboard',
          title: 'Card布局'
        },
        {
          icon: 'el-icon-lx-cascades',
          index: 'table',
          title: '基础表格'
        },
        {
          icon: 'el-icon-lx-cascades',
          index: 'upload',
          title: '上传文件'
        },
        {
          icon: 'el-icon-lx-cascades',
          index: 'data',
          title: '自定义组件'
        },
        {
          icon: 'el-icon-lx-cascades',
          index: 'async',
          title: '异步组件示例'
        },
        {
          icon: 'el-icon-lx-cascades',
          index: 'data-screen',
          title: '数据大屏',
          subs:[
            {
              icon: 'el-icon-lx-cascades',
              index: 'screen1',
              title: '数据大屏1',
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  }
}

</script>

<style>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  background-color: #fff;
  width: 100%;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  margin-top: 2px;
  background-color: #545c64;
  active-text-color: #20a0ff;
  text-color: #bfcbd9;
}
.el-menu-item {
  color: #ffffff;
  line-height: 70px;
}
.sidebar > ul {
  height: 100%;
}
</style>
