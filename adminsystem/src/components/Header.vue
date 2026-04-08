<template>
  <div class="header">
    <div class="header-left">
      <div class="logo">
        <img src="../assets/logo.png" />
        <span>后台管理系统</span>
      </div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip class="item" effect="dark" content="消息中心" placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <el-avatar :src="avatorUrl" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        用户名
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      avatorUrl: require('../assets/images/avatar.jpeg')
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command === ' loginOut ') {
        this.$router.push({
          path: '/'
        })
      }
    }
  }
}

</script>

<style>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  color: #2E8B57;
}
.header-left {
  float: left;
  padding-left: 50px;
}
.logo {
  display: flex;
  height: 60px;
  align-items: center;
}
.logo img {
  width: 50px;
  height: 50px;
  display: block;
}
.header span {
  text-align: center;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 60px;
  align-items: center;
}
.btn-bell {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell .el-icon-bell {
  color: #2E8B57;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: 	#2E8B57;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
